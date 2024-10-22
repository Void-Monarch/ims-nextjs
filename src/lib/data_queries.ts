import { PrismaClient } from '@prisma/client';

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
}) {
    const prisma = new PrismaClient();
    return await prisma.user.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name
        }
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

export async function updateCustomer(data: {
    id: string,
    name: string,
    phone: string | null,
    email: string,
    address: string | null
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
            address: data.address
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

// Products Queries

export async function createProduct(data: {
    name: string,
    price: number,
    description: string,
    image?: string,
    stock: number,
    catagory: string
    storeId: string
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
            storeId: data.storeId,
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
            catagory: data.catagory
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

export async function getProductsForStore(data: string) {
    const prisma = new PrismaClient();
    return await prisma.product.findMany({
        where: {
            storeId: data
        }
    });
}

export async function createStore(data: {
    name: string,
    description: string,
    gstin: string,
    phone: string,
    email?: string,
    address?: string,
    userId: string
}) {
    const prisma = new PrismaClient();
    return await prisma.store.create({
        data: {
            name: data.name,
            description: data.description,
            gstin: data.gstin,
            phone: data.phone,
            email: data.email || null,
            address: data.address || null,
            userId: data.userId
        }
    });
}

export async function getStoreByUser(data: string) {
    const prisma = new PrismaClient();
    return await prisma.store.findFirst({
        where: {
            userId: data
        }
    });
}

export async function updateStore(data: {
    id: string,
    name: string,
    description: string,
    gstin: string,
    phone: string,
    email?: string,
    address?: string
}) {
    const prisma = new PrismaClient();
    return await prisma.store.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            description: data.description,
            gstin: data.gstin,
            phone: data.phone,
            email: data.email,
            address: data.address
        }
    });
}

