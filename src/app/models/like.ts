import { Item } from "./item"

export interface Like {
  id?: string
  liked: boolean
  userId: string
  items: Item[]
}
