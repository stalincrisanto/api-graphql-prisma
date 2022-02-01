import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Category {
    @Field((type)=>ID)
    idCategory: number;
    
    @Field()
    nameCategory: string;
}