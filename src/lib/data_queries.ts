import { PrismaClient } from '@prisma/client';
import { User } from "../../node_modules/@auth/core/src/types";


export async function doesUserExist(email: string): Promise<boolean> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    return !!user;
}

export async function createUserOnGoogleLogin(user: User): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.user.create({
        data: {
            email: user.email!,
            name: user.name!,
        },
    });
}

export async function getUserByEmail(email: string) {
    const prisma = new PrismaClient();
    return await prisma.user.findFirst({
        where: {
            email: email,
        },
        include: {
            customer: true,
        },
    });
}


export async function createCustomer(customer: {
    name: string,
    email: string,
    phone: string | null,
    address: string | null
}, id: string) {
    const prisma = new PrismaClient();
    return await prisma.customer.create({
        data: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            userId: id
        }
    });
}

export async function getCustomerById(id: string) {
    const prisma = new PrismaClient();
    return await prisma.customer.findFirst({
        where: {
            id: id
        }, include: {
            User: true,
        },
    });
}