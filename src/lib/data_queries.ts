import { PrismaClient, DeliveryStatus, PaymentStatus, Admin } from '@prisma/client';


export async function doesUserExist(email: string): Promise<boolean> {
    const prisma = new PrismaClient();
    const user = await prisma.admin.findFirst({
        where: {
            email: email,
        },
    });
    return !!user;
}

export async function getUserByEmail(email: string): Promise<Admin | null> {
    const prisma = new PrismaClient();
    return await prisma.admin.findFirst({
        where: {
            email: email,
        },
    });
}

// export async function createUserOnGoogleLogin(user: { email: string, name: string }): Promise<void> {
//     const prisma = new PrismaClient();
//     await prisma.user.create({
//         data: {
//             email: user.email,
//             name: user.name,
//         },
//     });
// }

const prisma = new PrismaClient();

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
        include: { jewellery: true }
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
    return await prisma.jewellery.create({ data });
}

export async function getJewelleryWithDetails(id: string) {
    return await prisma.jewellery.findUnique({
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

export async function getCustomerWithRentals(id: string) {
    return await prisma.customer.findUnique({
        where: { id },
        include: {
            sellables: true,
            services: true
        }
    });
}

// Service and Repair Operations
export async function createService(data: {
    image_url: string;
    jewellerytype: string;
    customerId: string;
}) {
    return await prisma.service.create({ data });
}

export async function createRepair(data: {
    service_id: string;
    repair_type: string;
    item_name: string;
    damage_type: string;
    description?: string;
    current_price: number;
    serviceId: string;
}) {
    return await prisma.repair.create({ data });
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

// Admin and Records
export async function createAdminRecord(data: {
    adminId: string;
    activity: string;
    login_time: Date;
}) {
    return await prisma.record.create({ data });
}

export async function updateLogoutTime(recordId: string) {
    return await prisma.record.update({
        where: { id: recordId },
        data: { logout_time: new Date() }
    });
}

// Employee Leave Management
export async function createLeave(data: {
    leave_from: Date;
    leave_to: Date;
    reason: string;
    employeeId: string;
}) {
    return await prisma.leave.create({ data });
}

// Design and Make Operations
export async function createDesign(data: {
    name: string;
    description: string;
    image_url?: string;
    price: number;
}) {
    return await prisma.design.create({ data });
}

export async function createMake(data: {
    status: string;
    weight: number;
    damage_type: string;
    current_price: number;
    designId: string;
}) {
    return await prisma.make.create({ data });
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
                    jewellery: true,
                    customer: true
                }
            }
        }
    });
}
