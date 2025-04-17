import React from 'react';

export default function RightPagenationButtonComponent({onClickFirst, onClickPrev, pageNumber, onClickPage, pageArray, onClickNext, onClickLast}) {
    return (
        <div className="pagenation">
            <span>
                <a href="!#" onClick={onClickFirst}><img src="./images/sub/sub1/first_page.png" alt="" /></a>
                <a href="!#" onClick={onClickPrev}><img src="./images/sub/sub1/prev_page.png" alt="" /></a>
            {
                pageNumber.map((item, idx)=>
                    <a 
                        href="!#" 
                        key={item} 
                        data-key={item}
                        onClick={(e)=>onClickPage(e, item, idx)}
                        className={pageArray[idx]?'on':''}
                    >{item}</a>
                )
            }
                <a href="!#" onClick={onClickNext}><img src="./images/sub/sub1/next_page.png" alt="" /></a>
                <a href="!#" onClick={onClickLast}><img src="./images/sub/sub1/last_page.png" alt="" /></a>
            </span>
        </div>
    );
}