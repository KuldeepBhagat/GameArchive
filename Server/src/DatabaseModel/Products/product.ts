import { model, Document, Schema, Types } from "mongoose";

export interface keySpecI {
    _id?: Types.ObjectId,
    title: string,
    value: string
}

const KeySpecSchema = new Schema<keySpecI>(
    {
        title: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true }
    }
)

export interface productDescriptionI {
    _id?: Types.ObjectId,
    type: 'heading' | 'paragraph' | 'banner' | 'featured_grid',
    headingText?: string,
    paragraphText?: string,
    imageUrl?: string,
    imageAlt?: string,

    featrueGrid?: {
        imageUrl: string,
        imageAlt?: string,
        title: string,
        description: string
    }[]
}

const ProductDescriptionSchema = new Schema<productDescriptionI>(
    {
        type: { type: String, required: true, enum: ['heading', 'paragraph', 'banner', 'featured_grid'] },
        headingText: { type: String, trim: true },
        paragraphText: { type: String, trim: true },
        imageUrl: { type: String, trim: true },
        imageAlt: { type: String, trim: true, default: "" },
        featrueGrid: {
            type: [
                {
                    imageUrl: { type: String, required: true, trim: true },
                    imageAlt: { type: String, trim: true, default: " " },
                    title: { type: String, required: true, trim: true },
                    description: { type: String, required: true, trim: true }
                },
                {
                    _id: false
                }
            ],
            default: []
        }
    }
)

export interface productInformationI {
    _id?: Types.ObjectId,
    title: string,
    keyspecs: keySpecI[]
}

const ProductInformationSchema = new Schema<productInformationI>(
    {
        title: { type: String, required: true, trim: true },
        keyspecs: {
            type: [KeySpecSchema],
            default: []
        }
    }
)

export interface productI extends Document {
    sku: string,
    title: string,
    slug: string,
    brand?: {
        name: string,
        address: string
    },
    price: number,
    offer: number,
    discountedPrice: number,
    keySpecs: keySpecI[],
    aboutItem: string[],
    productDescription: productDescriptionI[],
    extraKeySpecs: keySpecI[],
    productInformation: productInformationI[]
}

const ProductSchema = new Schema<productI>(
    {
        sku: { type: String, required: true, trim: true, unique: true, uppercase: true },
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
        brand: {
            name: { type: String, trim: true },
            address: { type: String, trim: true }
        },
        price: {type: Number, required: true, min: 0},
        offer: {type: Number, required: true, min: 0, max: 100},
        discountedPrice: {type: Number, required: true, min: 0},
        keySpecs: {
            type: [KeySpecSchema],
            default: []
        },
        aboutItem: {
            type: [String],
            default: []
        },
        productDescription: {
            type: [ProductDescriptionSchema],
            default: []
        },
        extraKeySpecs: {
            type: [KeySpecSchema],
            default: []
        },
        productInformation: {
            type: [ProductInformationSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
) 

export const Product = model<productI>("Product", ProductSchema) 