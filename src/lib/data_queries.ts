import { PrismaClient, DeliveryStatus, PaymentStatus, Admin } from '@prisma/client';

const prisma = new PrismaClient();

export async function doesUserExist(email: string): Promise<boolean> {
    const user = await prisma.admin.findFirst({
        where: {
            email: email,
        },
    });
    return !!user;
}

export async function getUserByEmail(email: string): Promise<Admin | null> {

    return await prisma.admin.findFirst({
        where: {
            email: email,
        },
    });
}

export async function createUserOnGoogleLogin(user: { email: string, name: string }): Promise<void> {

    await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
            provider: 'google',
        },
    });
}

// Category Operations
export async function createCategory(data: {
    name: string;
    description?: string;
    commonImageUrl?: string;
}) {
    return await prisma.category.create({ data });
}

export async function updateCategory(id: string, data: {
    name?: string;
    description?: string;
    commonImageUrl?: string;
}) {
    return await prisma.category.update({
        where: { id },
        data
    });
}

export async function deleteCategory(id: string) {
    return await prisma.category.delete({ where: { id } });
}

export async function getAllCategories() {
    return await prisma.category.findMany({
        include: { product: true }
    });
}

// Jewellery Operations
export async function createJewellery(data: {
    name: string;
    material: string;
    image_url?: string;
    supply_price: number;
    categoryId: string;
    supplierId: string;
}) {
    return await prisma.product.create({ data });
}

export async function getProductWithDetails(id: string) {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            supplier: true,
            sellable: true,
        }
    });
}

// Customer Operations
export async function createCustomer(data: {
    nic: string;
    firstName: string;
    lastName: string;
    address: string;
    telephone: string;
    email?: string;
    password: string;
}) {
    return await prisma.customer.create({ data });
}

// Order Management
export async function createOrder(data: {
    recipe?: string;
    deliveryId?: string;
    paymentId?: string;
    sellableId: string;
}) {
    return await prisma.orders.create({
        data: {
            ...data,
            status: PaymentStatus.PENDING
        }
    });
}

export async function updateOrderStatus(id: string, status: PaymentStatus) {
    return await prisma.orders.update({
        where: { id },
        data: { status }
    });
}

// Delivery Management
export async function createDelivery(data: {
    deliveryAddress: string;
    deliveryCity: string;
    deliveryProvince: string;
    district: string;
    phoneNumber: string;
    requestedTime: Date;
    distance: number;
    deliveryBoyId: string;
}) {
    return await prisma.delivery.create({
        data: {
            ...data,
            status: DeliveryStatus.PENDING
        }
    });
}

export async function updateDeliveryStatus(id: string, status: DeliveryStatus) {
    return await prisma.delivery.update({
        where: { id },
        data: {
            status,
            deliveredTime: status === DeliveryStatus.DELIVERED ? new Date() : undefined
        }
    });
}
// Payment Operations
export async function createPayment(data: {
    amount: number;
    payment_date: Date;
    payment_status: string;
}) {
    return await prisma.payment.create({ data });
}

// Utility Functions
export async function getFullOrderDetails(orderId: string) {
    return await prisma.orders.findUnique({
        where: { id: orderId },
        include: {
            delivery: true,
            payment: true,
            sellable: {
                include: {

                    customer: true
                }
            }
        }
    });
}
