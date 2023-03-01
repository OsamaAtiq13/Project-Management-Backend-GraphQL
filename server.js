//*********************************************/
// Project : Project management Tool Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

//Acquiring the required packages
const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;

//Acquiring the Connection to the Database
const connectToMongoDB = require('./MongoConnection');

//Acquiring The Mutations of the Project
const  Mutation= require("./Mutation/Mutation")

//Acquiring The Query of the Project
const RootQuery= require('./RootQuery/RootQuery')


//Aquiring The required DataTypes.
const app = express();
const {
  GraphQLSchema,
} = require("graphql");

//Connection with the MongoDB
async function main() {
   connectToMongoDB();
  // Use the db variable to interact with the database
}
main();

// Describing GraphQL Schema Here.

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

//Defining the GraphQL End point here
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

//Server listening
app.listen(5000, () => {
  console.log("server is running");
});
