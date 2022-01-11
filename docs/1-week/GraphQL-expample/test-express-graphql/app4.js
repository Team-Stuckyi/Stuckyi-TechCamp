var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const myData1 = require("./myData1.json");
const myData2 = require("./myData2.json");
const axios = require("axios");
const { get } = require("express/lib/response");
var app = express();

var schema = buildSchema(
    `
  type Query {
    users: [User]
    usersData: [UserData]
  }
  type User{
    index : Int
    name : String
    age : Int
    id : String
  }
  type UserData{
    index : Int
    gender: String
    password : String
  }
`
);

var root = { users: () => myData1, usersData: () => myData2 };

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

const router = express.Router();
app.use("/", router);

app.get("/", function (req, res) {
    const url = `http://localhost:4000/graphql`;
    const query = `
      query test{
        users{
          id
          name
        }
        usersData{
          password
          gender
        }
      }`;
    let html = "";
    (async () => {
        let result = null;

        try {
            // URL로 쿼리 보내기
            const res = await axios.post(url, { query });
            result = res.data;
        } catch (error) {
            const errorMsg = `[ ${error.res.status} ]` + error.res.statusText;
            console.log(errorMsg);
            return;
        }
        // 데이터 출력
        console.log(result.data);

        let users = result.data.users;
        let usersData = result.data.usersData;

        for (let i = 0; i < 10; i++) {
            html += `
            <h3>id: <i style="color:red">${users[i].id}</i> password: <i style="color:blue">${usersData[i].password}</i></h3>
            <h3>name: <span style="color:green">${users[i].name}</span> gender: <span style="color:green">${usersData[i].gender}</span></h3><br>
            `;
        }
        res.status(200).send(html);
    })();
});

app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));

/* 

{
  users{
    index
    name
    age
    id
  }
  usersData{
    gender
    password
  }
}

*/
