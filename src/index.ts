import 'reflect-metadata'
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import config from './mikro-orm.config';
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
// import { Students } from './entities/Students';
import { StudentResolver } from './resolvers/student';
import { UserResolver } from './resolvers/user';
// import { ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";


const main = async () => {
    const orm = await MikroORM.init(config);

    //auto migrations
    await orm.getMigrator().up();
    
    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver,PostResolver,StudentResolver,UserResolver],
            validate: false,
            // plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
        }),
        context: () => ({em: orm.em})
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app });

    //Not using req, so we can replace it with an '_', jus a best practice
    app.get('/app',(_,res)=>{
        res.send("yooooooo")
    })

    


    //For posting to db
    // const post = orm.em.fork({}).create(Post, { title:'this is a the final post'});
    // await orm.em.persistAndFlush(post);

    // const student = orm.em.fork({}).create(Students, { name:'Naveen', score: 54});
    // await orm.em.persistAndFlush(student);


    // Another way to post, not sure if it's working
    // await orm.em.nativeInsert(Post, { title: "my first post" });

    //For fetching from db
    // const posts = await orm.em.find(Post,{});
    // console.log(posts)

    // const students = await orm.em.find(Students,{});
    // console.log(students)

    console.log("**************** SQL *******************")

    app.listen(4000,()=>{
        console.log("server is running on port 4000")
    })
}

main().catch(err=>{
    console.log("the error: ",err)
})
