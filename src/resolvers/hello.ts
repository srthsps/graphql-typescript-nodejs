import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloResolver {
    @Query(()=> String)
    hello() {
        return "hello world"
    }
    @Query(()=> String)
    hol() {
        return "no i will not"
    }
}