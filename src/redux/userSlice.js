import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('sqlEcomUser'))

const initialState = {
    user: user ? user : null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            
            
            state.user = action.payload
            localStorage.setItem('sqlEcomUser', JSON.stringify(action.payload))
        },
        logoutUser: (state, action) => {
            state.user = null
            localStorage.removeItem('sqlEcomUser')
        }
    }
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer