export type ProductsRes = {
    data: {
        data: {
            _id: string,
            country: {
                _id: string,
                name: string,
                code: string,
                latitude: string,
                longitude: string,
            },
            name: string,
            latitude: string,
            longitude: string,
            status: string,
        }[],
        page: number,
        perPage: number,
        total: number,
    },
    message: string
}

export type ProductRes = {
    data: {
        _id: string,
        category: {
            _id: string,
            name: string,
        },
        photo: string,
        file: string,
        product: {
            productCode: string;
            title: string;
            subTitle: string;
            author: string;
        },
        rating: {
            averageScore: string;
            totalReviews: string;
        },
        pricing: {
            purchasePrice: number;
            originalPrice: number;
            discountPrice: number;
            discountPercentage: number;
        },
        authorDescription: string,
        description: {
            short: string,
            long: string
        },
        shippingInfo: {
            freeShippingThreshold: string,
            returnPolicy: string,
            secureShopping: string
        },
        specifications: {
            format: string,
            totalPages: string,
            publishDate: string,
            language: string,
            originCountry: string,
            dimensions: string,
            weight: string,
            sku: string,
            category: {
                _id: string,
                name: string,
            },
        },
        features: string[],
        status: string
    },
    message: string
}

export type ProductsReq = {
    page: number,
    perPage: number,
}

export type AddProductReq = {
    data: {
        categoryId: string,
        photo: string,
        file: string,
        title: string,
        price: string,
        descriptionShort: string,
        authorDescription: string,
        descriptionLong: string,
        status: string
    },
    action?: () => void,
}

export type UpdateProductReq = {
    data: {
        _id: string,
        categoryId: string,
        photo: string,
        file: string,
        title: string,
        price: string,
        descriptionShort: string,
        authorDescription: string,
        descriptionLong: string,
        status: string
    },
    action?: () => void,
}

export type DeleteProductReq = {
    _id: string,
    action?: () => void,
}