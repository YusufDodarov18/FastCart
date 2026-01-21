import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../../pages/Home/Home.jsx"
import {About,Wishlist, Contact, Login, Register, GetProduct, Cart, Account, Order} from "../../app/others/lazy/lazy"
import {Suspense}  from "react"
import Loading from '../components/Layout/Loading/Loading'
import HomeLayout from "../../pages/HomeLayout/HomeLayout"

export const Layout=()=>{
    const router=createBrowserRouter([
        {
            path:"/",
            element:<HomeLayout/>,
            children:[
                {
                    index:true,
                    element:<Home/>
                },
                {
                    path:"contact",
                    element:<Contact/>
                },
                {
                    path:"about",
                    element:<About/>
                },
                {
                    path:"login/sign-in", 
                    element:<Login/>
                },
                {
                    path:"login/sign-up",
                    element:<Register/>
                },
                {
                    path:"/wishlist",
                    element:<Wishlist/>
                },
                {
                    path:"/product/get-product-by-id/:id",
                    element:<GetProduct/>
                },
                {
                    path:"/cart",
                    element:<Cart/>
                },
                {
                    path:"/account/changeAccount",
                    element:<Account/>
                },
                {
                    path:"/order",
                    element:<Order/>
                }
            ]
        }
    ])
    return (
        <Suspense fallback={<Loading/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )
}