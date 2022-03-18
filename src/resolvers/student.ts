import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Students } from '../entities/Students'
import { MyContext } from 'src/types'

@Resolver()
export class StudentResolver {

    //Fetch students list

    @Query(()=> [Students])
    students(
        @Ctx() ctx: MyContext
    ): Promise<Students[]> {
        return ctx.em.find(Students,{})
    }

    //Fetch a single student

    @Query(() => Students, { nullable: true })
    student(
        @Arg('id',() => Int) _id: number,
        @Ctx() { em }: MyContext
    ): Promise<Students | null> {
        return em.findOne(Students, { _id })
    }

    //Adding a new student

    @Mutation(() => Students)
    async createStudent(
        @Arg('name',() => String) name: string,
        @Arg('score',() => Int) score: number,
        @Ctx() { em }: MyContext
    ): Promise<Students> {
        const student = em.create(Students,{name,score})
        await em.persistAndFlush(student)
        return student
    }

    //Update a student

    @Mutation(() => Students, {nullable: true})
    async updateStudent(
        @Arg('id',() => Int) _id: number,
        @Arg('name',() => String) name: string,
        @Ctx() { em }: MyContext
    ): Promise<Students | null> {
        const student = await em.findOne(Students,{ _id })
        if(!student) {
            return null
        }
        if(typeof name !== 'undefined') {
            student.name = name;
            await em.persistAndFlush(student);
        }
        return student
    }

    //Deletes a student

    @Mutation(() => Boolean)
    async deleteStudent(
        @Arg('id',() => Int) _id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        try{
            await em.nativeDelete(Students,{ _id })
        } catch {
            return false
        }
        return true
    }
}    