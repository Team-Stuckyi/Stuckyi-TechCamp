/**
 * 1) 원하는 값만 요청하기
 */

// 임시로 사용할 데이터
import { products } from "./database/products.js";
// 아폴로 서버 가져오기
import { ApolloServer, gql } from "apollo-server";

/**
 * typeDefs
 * - GraphQL 명세에서 사용될 데이터, 요청의 타입을 지정
 * - gql(template literal tag)로 생성
 *
 * Product 어떤 항목으로 구성되어 있는지
 * 그리고 이 Product가 Query에도
 * 어떤 형식으로 요청이 되는지 선언되어 있다.
 */
const typeDefs = gql`
    type Query {
        products: [Product]
    }
    type Product {
        title: String
        price: Int
        salePer: String
        salePrice: String
        star: String
        starNum: String
    }
`;

/**
 * resolver
 * - 서비스의 액션들을 함수로 지정
 * - 요청에 따라 데이터를 반환, 입력, 수정, 삭제
 */
const resolvers = {
    Query: {
        products: () => products,
    },
};

/**
 * ApolloServer는 typeDefs와 resolvers를 인자로 받아서 서버를 생성하고
 * server.listen()명령어로 서버를 실행한다.
 */
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
