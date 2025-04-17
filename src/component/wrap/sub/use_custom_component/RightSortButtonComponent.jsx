import React from 'react';

export default function RightSortButtonComponent({state, refOrder, onClickSortBtn, order}) {
    return (
        <div className="header">
            <span>총{state.상품.length}건</span>
            <span>
                <a ref={(e)=>refOrder.current[0]=e} onClick={(e)=>onClickSortBtn(e, '추천순', 0)} href="!#" className={order[0]?'on':''}>추천순</a>
                <a ref={(e)=>refOrder.current[1]=e} onClick={(e)=>onClickSortBtn(e, '신상품순', 1)} href="!#" className={order[1]?'on':''}>신상품순</a>
                <a ref={(e)=>refOrder.current[2]=e} onClick={(e)=>onClickSortBtn(e, '판매량순', 2)} href="!#" className={order[2]?'on':''}>판매량순</a>
                <a ref={(e)=>refOrder.current[3]=e} onClick={(e)=>onClickSortBtn(e, '낮은 가격순', 3)} href="!#" className={order[3]?'on':''}>낮은 가격순</a>
                <a ref={(e)=>refOrder.current[4]=e} onClick={(e)=>onClickSortBtn(e, '높은 가격순', 4)} href="!#" className={order[4]?'on':''}>높은 가격순</a>
            </span>

        </div>
    );
}