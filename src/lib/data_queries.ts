import { PrismaClient, Roles } from '@prisma/client';

export async function doesUserExist(email: string): Promise<boolean> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    return !!user;
}

export async function createUserOnGoogleLogin(user: { email: string, name: string }): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
        },
    });
}

export async function updateUser(data: {
    id: string,
    name: string
    role?: Roles
}) {
    const prisma = new PrismaClient();
    return await prisma.user.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            role: data.role,
        }
    });
}



export async function getUserByEmail(email: string) {
    const prisma = new PrismaClient();
    return await prisma.user.findFirst({
        where: {
            email: email,
        }
    });
}


export async function createCustomer(customer: {
    name: string,
    email: string,
    phone: string | null,
    address: string | null
}) {
    const prisma = new PrismaClient();
    return await prisma.customer.create({
        data: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
        }
    });
}

export async function updateCustomer(data: {
    id: string,
    name: string,
    phone: string | null,
    email: string,
    address: string | null
    active?: boolean
}) {
    const prisma = new PrismaClient();
    return await prisma.customer.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            active: data.active
        }
    });
}

export async function getCustomerById(id: string) {
    const prisma = new PrismaClient();
    return await prisma.customer.findFirst({
        where: {
            id: id
        }
    });
}

// Products Queries

export async function createProduct(data: {
    name: string,
    price: number,
    description?: string,
    image?: string,
    stock: number,
    catagory: string
    active?: boolean
}) {
    const prisma = new PrismaClient();
    return await prisma.product.create({
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
            image: data.image,
            stock: data.stock,
            catagory: data.catagory,
            active: data?.active
        }
    });

}

export async function updateProduct(data: {
    id: string,
    name: string,
    price: number,
    description?: string,
    image?: string,
    stock: number,
    catagory: string
    active?: boolean
}) {
    const prisma = new PrismaClient();
    return await prisma.product.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
            image: data.image,
            stock: data.stock,
            catagory: data.catagory,
            active: data.active
        }
    });
}

export async function getProductsByName(data: string) {
    const prisma = new PrismaClient();
    return await prisma.product.findMany({
        where: {
            name: data,
        }
    });
}

export async function getProductsById(data: string) {
    const prisma = new PrismaClient();
    return await prisma.product.findMany({
        where: {
            id: data,
        }
    });
}

export async function getProductsByCatagory(data: string) {
    const prisma = new PrismaClient();
    return await prisma.product.findMany({
        where: {
            catagory: data,
        }
    });
}

export async function getProductsAll() {
    const prisma = new PrismaClient();
    return await prisma.product.findMany();
}

export async function getUserAll() {
    const prisma = new PrismaClient();
    return await prisma.user.findMany();
}