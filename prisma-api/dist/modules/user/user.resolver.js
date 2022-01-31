"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./user");
const user_service_1 = require("./user.service");
const client_1 = require("@prisma/client");
const user_input_1 = require("./types/user-input");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
        this.prisma = new client_1.PrismaClient();
    }
    async getAllUsers() {
        try {
            return await this.prisma.user.findMany();
        }
        catch (error) {
            throw new Error(error.messsage);
        }
    }
    async getOneUser(idUser) {
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
    async createUser(dataUser) {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    emailUser: dataUser.emailUser,
                    nameUser: dataUser.nameUser
                }
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async updateUser(idUser, dataUser) {
        const updateUser = await this.prisma.user.update({
            where: {
                idUser
            },
            data: {
                emailUser: dataUser.emailUser,
                nameUser: dataUser.nameUser
            },
        });
        if (!updateUser) {
            console.log('Ha ocurrido un error');
            return false;
        }
        return true;
    }
    async deleteUser(idUser) {
        try {
            const deleteUser = await this.prisma.user.delete({
                where: {
                    idUser
                },
            });
            return `Usuario con id ${idUser}, eliminado correctamente`;
        }
        catch (error) {
            throw new Error(`No existe el usuario con id ${idUser}`);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)((returns) => [user_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("idUser")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getOneUser", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("dataUser")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("idUser")),
    __param(1, (0, type_graphql_1.Arg)("dataUser")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => String),
    __param(0, (0, type_graphql_1.Arg)("idUser")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
