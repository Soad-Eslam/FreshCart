// Category type
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Subcategory type
interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Brand type
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Main Product type
export interface IProduct {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
  reviews: any[]; // can be replaced with Review[] if reviews have a defined structure
  id: string;
}

export interface ICartData {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
export interface ICartProduct {
  count: number;
  _id: string;
  product: IProduct;
  price: number;
}