import { GraphQLServer } from 'graphql-yoga';

const Users = [
    {
        id: 1,
        username: "john",
        city: "Melbourne"
    },
    {
        id: 2,
        username: "filizgursan",
        city: "Istanbul"
    },
    {
        id: 3,
        username: "maria",
        city: "Zagreb"
    }
];
const Posts = [
    {
        id: 1,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 1
    }, {
        id: 2,
        title: "Lorem Ipsum je jednostavno probni tekst koji se koristi u tiskarskoj i slovoslagarskoj industriji.",
        userId: 3
    }, {
        id: 3,
        title: "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir.",
        userId: 2
    }
];

const typeDefs = `
  type Query {
    user(id: ID!): User!
    users: [User!]!
    
    post(id: ID!): Post!
    posts: [Post!]!
  }
  
  type User{
  	id: ID!
  	username: String!
  	city: String
  }
  
  type Post{
  	id: ID!
  	title: String!
  	userId: ID!
  }
`;

const resolvers = {
    Query: {
        user: (parent, args) => Users.find(user => String(user.id) === args.id),
        users: (parent, args) => Users,

        post: (parent, args) => Posts.find(post => String(post.id) === args.id),
        posts: (parent, args) => Posts,
    },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));