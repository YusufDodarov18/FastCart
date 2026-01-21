import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:{wishlist:JSON.parse(localStorage.getItem("wishlist"))||[]},
    reducers:{
        addToWishlist:(state,action)=>{
            const isExist=state.wishlist.find(item => item.id === action.payload.id)
             if(!isExist){
                state.wishlist.push(action.payload);
                localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
            }
        },
        removeFromWishlist:(state,action)=>{
            state.wishlist=state.wishlist.filter(item=>item.id!==action.payload.id)
            localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
        },
    },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;