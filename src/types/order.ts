export interface TOrder {
    _id:string
    user: string
    products: {
      product: string
      quantity: number
    }[]
    totalPrice: number
    status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled'
    transaction: {
      id: string
      transactionStatus: string
      bank_status: string
      sp_code: string
      sp_message: string
      method: string
      date_time: string
    }
    phone: string
    address: string
    city: string
    createdAt: Date
    updatedAt: Date
    __v: number
  }