import { createSlice } from "@reduxjs/toolkit";

const address = createSlice({
    name:'주소',
    initialState: {
        우편번호:'',
        주소1:'',
        주소2:''
    },
    reducers: {
        setAddress(state, action){
            state.우편번호 = action.payload.우편번호;
            state.주소1 = action.payload.주소1;
            state.주소2 = action.payload.주소2;
        }
    }
});

export default address.reducer;
export const {setAddress} = address.actions;