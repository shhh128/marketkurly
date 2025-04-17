import { createSlice } from "@reduxjs/toolkit";

const viewProduct = createSlice({
    name: '최근본상품',
    initialState: {
        최근본상품: [],
        지금본상품: {}
    },
    reducers: {
        setViewProductAction(state, action){
            state.최근본상품 = action.payload.최근본상품;  //  []
            state.지금본상품 = action.payload.지금본상품;  //  {}
            // console.log(action.payload.최근본상품);
            // console.log(state.최근본상품);
        }
    }
});

export default viewProduct.reducer;
export const {setViewProductAction} = viewProduct.actions;