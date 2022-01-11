var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const myData1 = require("./myData1.json");

var app = express();

var schema = buildSchema(
    // Users는 [User]를 인자로 받아서 users를 호출했을 때 myData를 출력한다.
    `
  type Query {
    users: [User]
  }
  type User{
    index : Int
    name : String
    age : Int
    id : String
  }
`
);

var root = { users: () => myData1 };

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
}

*/
