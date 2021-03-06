import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql'
import { MyContext } from 'src/types'
import  { User }  from '../entities/User'
import argon2 from 'argon2' 



// Another way besides Args()
@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => FieldError, { nullable:true })
    errors?: FieldError;

    @Field(() => User, { nullable:true })
    user?: User
}


@Resolver()
export class UserResolver {

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        if(options.username.length <= 2) {
            return {
                errors: {
                    field:'username',
                    message:'username must contain more than two characters'
                }
            }
        }
        if(options.password.length <= 2) {
            return {
                errors: {
                    field:'password',
                    message:'password must contain more than two characters'
                }
            }
        }
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User,{ username:options.username, password: hashedPassword })
        try {
            await em.persistAndFlush(user)
        } catch(error) {
            if(error.code == '23505'){
                return {
                    errors: {
                        field: 'username',
                        message: 'Username already exists'
                    }
                }
            }
        }
        return { user }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User,{username: options.username})
        console.log(user)
        if(!user){
            return {
                errors : {
                    field:'username',
                    message: 'username does not exists'
                }
            }
        }
        const valid = await argon2.verify(user.password,options.password)
        if(!valid){
            return {
                errors: 
                    {
                        field: "password",
                        message:"Invalid credentials"
                    }
                
            }
        }
        return {
            user
        }
    }
    
}

