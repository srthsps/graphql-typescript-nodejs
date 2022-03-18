import { Entity,PrimaryKey,Property } from "@mikro-orm/core"
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Students {

  @Field(() => Int)
  @PrimaryKey()
  _id!: number;

  @Field(() => String)
  @Property({ type: "date", default:'NOW()' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type:"text" })
  name!: string;

  @Property({ type: "number" })
  score: number;

}