import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './productApi'
import { partApi } from './partApi'
import cartReducer from './cartSlice'
import userReducer from './userSlice'
import { userApi } from './userApi'
import { orderApi } from './orderApi'
import { emailApi } from './emailApi'
import { searchApi } from './searchApi'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: userReducer,
        [productApi.reducerPath]:productApi.reducer,
        [partApi.reducerPath]:partApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [emailApi.reducerPath]:emailApi.reducer,
        [searchApi.reducerPath]:searchApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productApi.middleware, partApi.middleware, userApi.middleware, orderApi.middleware, emailApi.middleware, searchApi.middleware)
})