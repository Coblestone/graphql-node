import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from "graphql";
import { fakeDatabase } from "./FakeDatabase";

//const authors = FakeDatabase.author;
const posts = fakeDatabase.getBlogPosts();

/*async function testAsyncFunction(parent) {
  return authors.find(author => author.id === parent.authorId);
}

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});*/

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    /*author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(author => author.id === args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    },*/
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return posts.find(post => post.id === args.id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return posts;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
