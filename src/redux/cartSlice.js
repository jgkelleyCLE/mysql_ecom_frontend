import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartList: localStorage.getItem('sqlCart') ? JSON.parse(localStorage.getItem('sqlCart')) : []
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartList.findIndex(item => item.product_id === action.payload.product_id)

            if(itemIndex >= 0){ //this checks if the item is already in the cart
                state.cartList[itemIndex].cartQuantity += action.payload.cartQuantity;
                
            } else{ //else, add the item to the cart
                const newProduct = {...action.payload, cartQuantity: action.payload.cartQuantity}
                state.cartList.push(newProduct)
            
            }

            localStorage.setItem('sqlCart', JSON.stringify(state.cartList))
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.cartList.findIndex(item=> item.product_id === action.payload.product_id)
            
            if(state.cartList[itemIndex].cartQuantity > 1){
                const remainingItems = state.cartList.filter(item=> item.product_id !== action.payload.product_id);
                state.cartList = remainingItems;
                
            } else{
                const remainingItems = state.cartList.filter(item=> item.product_id !== action.payload.product_id);
                state.cartList = remainingItems;
    
            }
            
            localStorage.setItem('sqlCart', JSON.stringify(state.cartList))
        },
         increaseQuantity: (state, action)=> {
            const itemIndex = state.cartList.findIndex(item=> item.product_id === action.payload.product_id)
            state.cartList[itemIndex].cartQuantity += 1;
            localStorage.setItem('sqlCart', JSON.stringify(state.cartList))
        },
        decreaseQuantity: (state, action)=> {
            const itemIndex = state.cartList.findIndex(item=> item.product_id === action.payload.product_id)
            if(state.cartList[itemIndex].cartQuantity > 1){
                state.cartList[itemIndex].cartQuantity -= 1;
                
            } else if(state.cartList[itemIndex].cartQuantity === 1){
                const remainingCartItems = state.cartList.filter(item=> item.product_id !== action.payload.product_id)
                state.cartList = remainingCartItems;
                
            }
            localStorage.setItem('sqlCart', JSON.stringify(state.cartList))
            
        },
        clearCart: (state, action) => {
            state.cartList = [];
            localStorage.setItem('sqlCart', JSON.stringify(state.cartList))
        }
    }
})

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer