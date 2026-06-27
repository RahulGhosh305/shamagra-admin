export type OrdersRes = {
    data: {
        data: {
            _id: string;
            user: {
                _id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
            };
            orderNumber: string;
            items: Array<{
                productId: string;
                productTitle: string;
                productCode: string;
                quantity: number;
                unitPrice: number;
                subtotal: number;
                _id?: string;
            }>;
            shippingAddress: {
                firstName: string;
                lastName: string;
                companyName?: string;
                streetAddress: string;
                apartment?: string;
                city: string;
                district: string;
                thana: string;
                country: string;
                state: string;
                zipCode: string;
                phone: string;
                email: string;
                _id?: string;
            };
            pricing: {
                subtotal: number;
                shippingCharge: number;
                taxAmount: number;
                totalAmount: number;
            };
            payment: {
                method: "cod" | "mobile" | "bank";
                status: "pending" | "completed" | "failed" | "refunded";
                transactionId?: string;
            };
            orderNotes?: string;
            orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
            createdAt: string;
            updatedAt: string;
        }[];
        page: number;
        perPage: number;
        total: number;
    };
    message: string;
};

export type OrderRes = {
    data: {
        _id: string;
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
        };
        orderNumber: string;
        items: Array<{
            productId: string;
            productTitle: string;
            productCode: string;
            quantity: number;
            unitPrice: number;
            subtotal: number;
            _id?: string;
        }>;
        shippingAddress: {
            firstName: string;
            lastName: string;
            companyName?: string;
            streetAddress: string;
            apartment?: string;
            city: string;
            district: string;
            thana: string;
            country: string;
            state: string;
            zipCode: string;
            phone: string;
            email: string;
            _id?: string;
        };
        pricing: {
            subtotal: number;
            shippingCharge: number;
            taxAmount: number;
            totalAmount: number;
        };
        payment: {
            method: "cod" | "mobile" | "bank";
            status: "pending" | "completed" | "failed" | "refunded";
            transactionId?: string;
        };
        orderNotes?: string;
        orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
        createdAt: string;
        updatedAt: string;
    };
    message: string;
};

export type OrdersReq = {
    page: number;
    perPage: number;
};

export type AddOrderReq = {
    data: {
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
        };
        items: Array<{
            productId: string;
            productTitle: string;
            productCode: string;
            quantity: number;
            unitPrice: number;
            subtotal: number;
        }>;
        shippingAddress: {
            firstName: string;
            lastName: string;
            companyName?: string;
            streetAddress: string;
            apartment?: string;
            city: string;
            district: string;
            thana: string;
            country: string;
            state: string;
            zipCode: string;
            phone: string;
            email: string;
        };
        pricing: {
            subtotal: number;
            shippingCharge: number;
            taxAmount: number;
            totalAmount: number;
        };
        payment: {
            method: "cod" | "mobile" | "bank";
            status: "pending" | "completed" | "failed" | "refunded";
            transactionId?: string;
        };
        orderNotes?: string;
        orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
    };
    action?: () => void;
};

export type UpdateOrderReq = {
    data: {
        _id: string;
        user?: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
        };
        items?: Array<{
            productId: string;
            productTitle: string;
            productCode: string;
            quantity: number;
            unitPrice: number;
            subtotal: number;
        }>;
        shippingAddress?: {
            firstName: string;
            lastName: string;
            companyName?: string;
            streetAddress: string;
            apartment?: string;
            city: string;
            district: string;
            thana: string;
            country: string;
            state: string;
            zipCode: string;
            phone: string;
            email: string;
        };
        pricing?: {
            subtotal: number;
            shippingCharge: number;
            taxAmount: number;
            totalAmount: number;
        };
        payment?: {
            method: "cod" | "mobile" | "bank";
            status: "pending" | "completed" | "failed" | "refunded";
            transactionId?: string;
        };
        orderNotes?: string;
        orderStatus?: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
    };
    action?: () => void;
};

export type DeleteOrderReq = {
    _id: string;
    action?: () => void;
};