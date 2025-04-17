import React from 'react';

export default function TopTabFilterComponent({state, onClickFilterBtn, tab}) {
    return (
        <div className="filter-menu-box">
            <ul>
            {
                state.필터.map((item, idx)=>
                    <li key={item}>
                        <a 
                            href="!#"  
                            onClick={(e)=>onClickFilterBtn(e, item, idx)}  
                            title={item}
                            className={tab[idx]?'on':''}
                        >                                    
                            {item}
                        </a>
                    </li>
                )                        
            }
            </ul>
        </div>
    );
}