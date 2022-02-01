import 'reflect-metadata';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { User } from './user';
import { PrismaClient } from "@prisma/client";
import { UserInput } from './types/user-input';

@Resolver()
export class UserResolver {

    private prisma = new PrismaClient();

    @Query((returns) => [User])
    async getAllUsers() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            throw new Error(error.messsage);
        }
    }

    @Query((returns) => User)
    async getOneUser(@Arg("idUser") idUser: number) {
        const dataUser = await this.prisma.user.findUnique({
            where: {
                idUser: idUser
            }
        });
        if (!dataUser) {
            throw new Error(`El usuario con el id ${idUser} no existe`);
        }
        return dataUser;
    }

    @Mutation((returns) => Boolean)
    async createUser(@Arg("dataUser") dataUser: UserInput) {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    emailUser: dataUser.emailUser,
                    nameUser: dataUser.nameUser
                }
            })
            return true;
        } catch (error) {
            return false
        }
    }

    @Mutation((returns) => Boolean)
    async updateUser(@Arg("idUser") idUser: number, @Arg("dataUser") dataUser: UserInput) {
        const updateUser = await this.prisma.user.update({
            where: {
                idUser
            },
            data: {
                emailUser: dataUser.emailUser,
                nameUser: dataUser.nameUser
            },
        })
        if (!updateUser) {
            console.log('Ha ocurrido un error');
            return false;
        }
        return true;
    }

    @Mutation((returns) => String)
    async deleteUser(@Arg("idUser") idUser: number) {
        try {
            const deleteUser = await this.prisma.user.delete({
                where: {
                    idUser
                },
            })
            
            return `Usuario con id ${idUser}, eliminado correctamente`;
        } catch (error) {
            throw new Error(`No existe el usuario con id ${idUser}`)   
        }
    }
}