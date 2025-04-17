import { createSlice } from "@reduxjs/toolkit";

const slideCount = createSlice({
    name:'슬라이드 이전 다음 카운트',
    initialState: {
        cnt: 0
    },
    reducers: {
        setCntIn(state, action){
            state.cnt = state.cnt + 1;
        },
        setCntDe(state, action){
            state.cnt = state.cnt - 1;
        },
        setCnt(state, action){
            state.cnt = action.payload
        },
    }
});

export default slideCount.reducer;
export const {setCntIn, setCntDe, setCnt} = slideCount.actions;