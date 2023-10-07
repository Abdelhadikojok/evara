export interface Order {
  address: string,
  name: string,
  userId: string,
  date: Date,
  products: orderItem[]
}

export interface orderItem {
  id?: string,
  name: string
  singleItemCount: number
}
