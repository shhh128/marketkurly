import React from 'react';

export default function RightSelectFilterComponent({state, onClickProductFilterBoxDel}) {
    return (
        <>
            {   state.상품필터박스.length>0 &&
                <div className="product-filter-box">
                    <ul>
                        {

                            state.상품필터박스.map((item, idx)=>
                                <li key={idx}>
                                    <span>{item[Object.keys(item)]}</span>
                                    <button onClick={(e)=>onClickProductFilterBoxDel(e, item[Object.keys(item)])}>×</button>
                                </li>
                            )                                    
                        }
                    </ul>
                </div>
            }
        </>
    );
}