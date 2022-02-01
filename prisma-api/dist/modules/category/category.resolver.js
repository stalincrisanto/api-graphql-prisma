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
exports.CategoryResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const client_1 = require("@prisma/client");
const category_1 = require("./category");
const category_input_1 = require("./types/category-input");
let CategoryResolver = class CategoryResolver {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getAllCategories() {
        try {
            return await this.prisma.category.findMany();
        }
        catch (error) {
            throw new Error(error.messsage);
        }
    }
    async getOneCategory(idCategory) {
        const dataCategory = await this.prisma.category.findUnique({
            where: {
                idCategory
            }
        });
        if (!dataCategory) {
            throw new Error(`El usuario con el id ${dataCategory} no existe`);
        }
        return dataCategory;
    }
    async createCategory(dataCategory) {
        try {
            const newCategory = await this.prisma.category.create({
                data: {
                    nameCategory: dataCategory.nameCategory
                }
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async updateCategory(idCategory, dataCategory) {
        const updateCategory = await this.prisma.category.update({
            where: {
                idCategory
            },
            data: {
                nameCategory: dataCategory.nameCategory
            },
        });
        if (!updateCategory) {
            console.log('Ha ocurrido un error');
            return false;
        }
        return true;
    }
    async deleteCategory(idCategory) {
        try {
            const deleteCategory = await this.prisma.category.delete({
                where: {
                    idCategory
                },
            });
            return `Categoría con id ${idCategory}, eliminado correctamente`;
        }
        catch (error) {
            throw new Error(`No existe la categoría con id ${idCategory}`);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)((returns) => [category_1.Category]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getAllCategories", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("idCategory")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getOneCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("dataCategory")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_input_1.CategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("idCategory")),
    __param(1, (0, type_graphql_1.Arg)("dataCategory")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, category_input_1.CategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => String),
    __param(0, (0, type_graphql_1.Arg)("idCategory")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "deleteCategory", null);
CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
