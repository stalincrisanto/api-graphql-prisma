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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
require("reflect-metadata");
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
let UserService = class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getAllUsers() {
        console.log('Estoy en el servicio');
        const allUsers = await this.prisma.user.findMany();
        return allUsers;
    }
    async getOneUserService(idUser) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    idUser: idUser
                }
            });
        }
        catch (error) {
            throw new Error(`El usuario con el id ${idUser} no existe`);
        }
    }
};
__decorate([
    (0, typedi_1.Service)(),
    __metadata("design:type", Object)
], UserService.prototype, "prisma", void 0);
__decorate([
    (0, typedi_1.Service)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getAllUsers", null);
__decorate([
    (0, typedi_1.Service)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getOneUserService", null);
UserService = __decorate([
    (0, typedi_1.Service)()
], UserService);
exports.UserService = UserService;
