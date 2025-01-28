export type TProduct = {
    _id: string
    name: string
    author: string
    imgUrl: string
    price: number
    category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious'
    description: string
    quantity: number
    availability: boolean
    createdAt: Date
    updatedAt: Date
}