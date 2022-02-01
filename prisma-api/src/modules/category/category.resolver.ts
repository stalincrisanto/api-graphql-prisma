import 'reflect-metadata';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { PrismaClient } from "@prisma/client";
import { Category } from './category';
import { CategoryInput } from './types/category-input';


@Resolver()
export class CategoryResolver {

    private prisma = new PrismaClient();

    @Query((returns) => [Category])
    async getAllCategories() {
        try {
            return await this.prisma.category.findMany();
        } catch (error) {
            throw new Error(error.messsage);
        }
    }

    @Query((returns) => Category)
    async getOneCategory(@Arg("idCategory") idCategory: number) {
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

    @Mutation((returns) => Boolean)
    async createCategory(@Arg("dataCategory") dataCategory: CategoryInput) {
        try {
            const newCategory = await this.prisma.category.create({
                data: {
                    nameCategory: dataCategory.nameCategory
                }
            })
            return true;
        } catch (error) {
            return false
        }
    }

    @Mutation((returns) => Boolean)
    async updateCategory(@Arg("idCategory") idCategory: number, @Arg("dataCategory") dataCategory: CategoryInput) {
        const updateCategory = await this.prisma.category.update({
            where: {
                idCategory
            },
            data: {
                nameCategory: dataCategory.nameCategory
            },
        })
        if (!updateCategory) {
            console.log('Ha ocurrido un error');
            return false;
        }
        return true;
    }

    @Mutation((returns) => String)
    async deleteCategory(@Arg("idCategory") idCategory: number) {
        try {
            const deleteCategory = await this.prisma.category.delete({
                where: {
                    idCategory
                },
            })
            
            return `Categoría con id ${idCategory}, eliminado correctamente`;
        } catch (error) {
            throw new Error(`No existe la categoría con id ${idCategory}`)   
        }
    }
}