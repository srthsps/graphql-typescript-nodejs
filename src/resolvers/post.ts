import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Post } from '../entities/Post'
import { MyContext } from 'src/types'

@Resolver()
export class PostResolver {


    //Fetch List

    @Query(() => [Post])
    posts(
        @Ctx() ctx: MyContext
    ): Promise<Post[]> {
        return ctx.em.find(Post, {}) 
    }

    //Fetch a single post

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id',() => Int) _id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { _id })
    }

    //Create a Post

    @Mutation(() => Post)
    async createPost(
        @Arg('title',() => String) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post,{title})
        await em.persistAndFlush(post)
        return post
    }

    //Update Post

    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg('id',() => Int) _id: number,
        @Arg('title',() => String) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post,{ _id })
        if(!post) {
            return null
        }
        if(typeof title !== 'undefined') {
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post
    }

    //Delete Post

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id',() => Int) _id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        try{
            await em.nativeDelete(Post,{ _id })
        } catch {
            return false
        }
        return true
    }
}

