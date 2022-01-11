var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const myData1 = require("./myData1.json");
const myData2 = require("./myData2.json");

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
