import { lazy } from "react";

export const About=lazy(()=>import("../../../pages/About/about"))
export const Contact=lazy(()=>import("../../../pages/Contact/contact"))
export const Login=lazy(()=>import("../../../pages/Login/Sign-in/sign-in.jsx"))
export const Register=lazy(()=>import("../../../pages/Login/Sign-up/sign-up.jsx"))
export const Cart=lazy(()=>import("../../../pages/Cart/cart"))
export const Order=lazy(()=>import("../../../pages/Order/order"))
export const Account=lazy(()=>import("../../../pages/Account/acount.jsx"))
export const Wishlist=lazy(()=>import("../../../pages/Wishlist/wishlist.jsx"))
export const GetProduct=lazy(()=>import("../../../pages/GetProductById/getProductById.jsx"))