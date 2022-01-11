/**
 * 4) 원하는 값만 필터링하기2 (resolvers)
 *     under fetching 문제 해결
 */

// 임시로 사용할 데이터
import { products } from "./database/products.js";
import { ho } from "./database/ho.js";
import { name } from "./database/name.js";
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
        product(price: Int): [Product]
        hos: [Ho]
        names: [Name]
    }
    type Product {
        title: String
        price: Int
        salePer: String
        salePrice: String
        star: String
        starNum: String
    }
    type Ho {
        index: Int
        Ho: String
        names: [Name]
    }
    type Name {
        index: Int
        Name: String
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

        // products.price이 요청 쿼리 값보다 클 경우만 출력
        product: (parent, args, context, info) =>
            products.filter((product) => {
                return product.price >= args.price;
            }),

        // ho에 name을 연결하기
        // filter로 index값이 일치한 경우만 반환.
        hos: () =>
            ho.map((ho) => {
                ho.names = name.filter((v) => {
                    return ho.index == v.index;
                });
                return ho;
            }),
        names: () => name,
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
