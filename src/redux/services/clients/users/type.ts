export type UsersRes = {
    data: {
        data: {
            _id: string,
            firstName: string,
            lastName: string,
            phone: string,
            email: string,
            photo: string,
            gender: string,
        }[],
        page: number,
        perPage: number,
        total: number,
    },
    message: string
}

export type UserRes = {
    data: {
        firstName: string;
        lastName: string;
        email: string;
        phone: {
            phone: string,
            country: {
                _id: string
                name: string
                code: string
            }
        };
        otp: {
            otp: string;
            verified: boolean;
        };
        password: string;
        gender: string;
        photo: string;
        overview: string;
        country: {
            _id: string,
            name: string
        },
        city: {
            _id: string,
            name: string
        }
        location: {
            _id: string,
            name: string
        }
        area: {
            _id: string,
            name: string
        }
        address: {
            present: string,
            permanent: string
        }
        identity: {
            photoFront: string,
            photoBack: string
        }
        services: {
            vendor: {
                isVendor: boolean;
                organization: {
                    _id: string;
                    name: string;
                };
                branch: {
                    _id: string;
                    name: string;
                };
                designation: string;
                employeeId: string;
                department: string;
                overview: string;
                status: string;
            };
        };
        social: {
            facebook: string;
            linkedin: string;
            instagram: string;
            twitter: string;
        };
        personal: {
            fathersName: string;
            mothersName: string;
            presentAddress: string;
            permanentAddress: string;
            occupation: string;
            dateOfBirth: Date;
            isMarried: boolean;
            spouseName: string;
            nationality: string;
            religion: string;
            monthlyIncome: number | null;
            nid: {
                name: string;
                uid: string;
                file: string;
                type: string;
            };
        };
        invoices: {
            savings: {
                package: {
                    name: string,
                }
                issueDate: string,
                dueDate: string,
                paymentDate: string,
                status: string,
                amount: number
            }[],
            loan: {
                package: {
                    name: string,
                }
                issueDate: string,
                dueDate: string,
                paymentDate: string,
                status: string,
                amount: number
            }[]
        };
        transactions: {
            user: {
                _id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
                photo: string;
            };
            application: {
                _id: string;
                amount: number;
            };
            package: {
                _id: string;
                organizations: Array<{
                    _id: string;
                    name: string;
                }>;
                name: string;
                purpose: string;
                photo: string;
            };
            lead: {
                _id: string;
                acquisition: {
                    name: string;
                };
            };
            issueDate: Date;
            dueDate: Date;
            amount: number;
            paymentDate: Date;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        status: string;
        createdAt: Date;
        updatedAt: Date;
    },
    message: string
}

export type UsersReq = {
    page: number,
    perPage: number,
    cityIds: string,
    locationIds: string,
    areaIds: string,
    createdAtFrom: string,
    createdAtTo: string,
    agentNumber: string
}

export type AddUserReq = {
    data: {
        firstName: string,
        lastName: string,
        countryId: string,
        email: string,
        gender: string,
        phone: string
    },
    action?: () => void
}