import { Ctx, Query, Resolver } from 'type-graphql'
import { Students } from '../entities/Students'
import { MyContext } from 'src/types'

@Resolver()
export class StudentResolver {
    @Query(()=> [Students])
    students(
        @Ctx() ctx: MyContext
    ): Promise<Students[]> {
        return ctx.em.find(Students,{})
    }
}    