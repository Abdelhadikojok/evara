export interface Item {
  [key: string]: any;
  id?: string;
  name: string;
  description: string;
  reviewsNb: number;
  reviewsTotal: number;
  price: number;
  likes: number;
  quantity: number;
  images: {
    imageOne: string;
    imageTwo: string;
  };
  category: string;
  brand: string;
  selledNb: number;
  postDate: Date;
}
