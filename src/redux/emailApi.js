import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emailApi = createApi({
    reducerPath: 'emailApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://tentlify-ecom.up.railway.app" }),
    tagTypes: ['Email'],
    endpoints: (builder) => ({
        sendEmail: builder.mutation({
            query: (cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title)=> ({
                url: '/api/mail/send',
                method: 'POST',
                body: { cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title }
            }),
            invalidatesTags: ['Email']
        })
    })
})

export const { useSendEmailMutation } = emailApi