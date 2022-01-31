import 'reflect-metadata';
import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class UserService {
    
    @Service()
    public prisma = new PrismaClient();

    @Service()
    async getAllUsers() {
        console.log('Estoy en el servicio');
        const allUsers = await this.prisma.user.findMany();
        return allUsers;
    }

    @Service()
    async getOneUserService(idUser:number) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    idUser:idUser
                }
            });
        } catch (error) {
            throw new Error (`El usuario con el id ${idUser} no existe`);
        }
    }
}