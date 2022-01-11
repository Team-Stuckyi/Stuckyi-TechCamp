/**
 * 5) HTML과 연동
 *    apollo-server인 index5.js 실행시킨 후
 *    index.html를 LiveServer로 실행시킨 다음에
 *    화면에 input에 값을 넣으면 해당 값이상의 데이터만 쿼리로 요청 할 수 있다.
 */

import { products } from "./database/products.js";
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        products: [Product]
        product(price: Int): [Product]
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

const resolvers = {
    Query: {
        products: () => products,
        product: (parent, args, context, info) =>
            products.filter((product) => {
                return product.price >= args.price;
            }),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
