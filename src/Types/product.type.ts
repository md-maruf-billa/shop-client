/* eslint-disable @typescript-eslint/no-explicit-any */
export type TProduct = {
  name: string
  name_native: string
  description: string
  price: number
  price_native: number
  currency: string
  isFlashDeals: boolean
  stock: number
  isInStock: boolean
  weight: number | null
  offerPrice?: number | null;
  offer?: number | null;
  category: {
    name: string
    name_ar: string
  }
  imageUrls?: string
  isActive: boolean
  availableColors: string[]
  specification: Record<string, any>
  keyFeatures: string[]
  isDeleted: boolean
  _id: string,
  isTop: boolean
}


export interface TCartProduct extends TProduct {
  quantity: number;
}

export type TBookReview = {
  bookId: string
  reviewerPhoto: string
  reviewerName: string
  reviewerEmail: string
  empression: string
  feedBack: string
  rating: number
}

export type TCategory = {
  name: string
  categoryLogo?: string
  _id: string
  name_ar: string,
  isTop: boolean,
  sectionId?: string
}
