import { configureStore } from '@reduxjs/toolkit'
import products  from '../reducer/Products/products'
import categories  from '../reducer/Categories/categories'
import productById from "../reducer/Products/getProductsById"; 
import wishlist from '../reducer/Likes/like'
import cart from "../reducer/Cart/cart"
import search from "../reducer/Search/search"

export const store = configureStore({
  reducer: {
    products: products,
    category:categories,
    productById: productById,
    wishlist:wishlist,
    cart:cart,
    searchProducts:search
  },
})