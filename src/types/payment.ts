export interface TInvoice {
    id: number; // Unique identification
    invoice_no:string;
    order_id: string; // shurjoPay payment ID used for verification
    currency: string; // Currency in which the payment was made
    amount: number; // Amount paid by the customer
    payable_amount: number; // Total payable amount
    discount_amount: number; // Total discounted amount
    disc_percent: number; // Total discount percentage
    received_amount: number; // Amount received by shurjoPay
    usd_amt: number; // Amount in USD if converted from another currency
    usd_rate: number; // USD to BDT conversion rate at payment time
    transaction_status: string; // Payment status (e.g., Pending, Completed)
    method: string; // Payment method (e.g., bank cards, mobile wallets)
    sp_message: string; // Response message code description
    sp_code: number; // Response code for transaction status
    bank_status: string;
    name: string; // Customer's name who made the payment
    email: string; // Customer's email
    address: string; // Customer's address
    city: string; // Customer's city
    date_time: string; // Date and time of the transaction
    value1?: string; // Additional information (e.g., product name, service name)
    value2?: string; // Additional information
    value3?: string; // Additional information
    value4?: string; // Additional information
  }