import { Field, ID, ObjectType } from "type-graphql";
import { User } from "../user/user";
import { Category } from "../category/category";

@ObjectType()
export class Post {
    @Field((type)=>ID)
    idPost: number;

    @Field()
    createdAt: Date;

    @Field()
    titlePost: String;

    @Field()
    authorPost: User 

    @Field()
    categoryPost: Category
}