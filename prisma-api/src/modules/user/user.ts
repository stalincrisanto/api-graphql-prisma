import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field((type)=>ID)
    idUser: number;
    
    @Field()
    emailUser: string;
    
    @Field()
    nameUser: string;
}