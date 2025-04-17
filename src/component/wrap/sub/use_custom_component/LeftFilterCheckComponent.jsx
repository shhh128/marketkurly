import React from 'react';

export default function LeftFilterCheckComponent({state, onClickSubBtn, refSub, onChangeCheckEvent}) {
    return (
        <div className="filter-box">
            <div className="header">
                <span>필터</span>
                <button>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.78 3.96303C12.504 2.16973 10.4086 1 8.04 1C4.15192 1 1 4.15192 1 8.04C1 11.9281 4.15192 15.08 8.04 15.08C11.9281 15.08 15.08 11.9281 15.08 8.04" stroke="#ddd" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="round"></path><path d="M14.4933 1L14.4933 4.52H10.9733" stroke="#ddd" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="round"></path></svg>
                    <strong>초기화</strong>
                </button>
            </div>
            <div className='filter-list'>
                <ul>
                {
                    Object.keys(state.필터메뉴).map((item, i)=>
                        <li key={item}>
                            <a onClick={(e)=>onClickSubBtn(e, i, item)} href="!#">{item}</a>
                            <div ref={(e)=>refSub.current[i]=e} className={`sub sub${i+1}`}>
                                <ul>
                                {
                                    state.필터메뉴[item].map((field, j)=>
                                        <li key={field}>
                                            <label htmlFor={`sub${i+1}_chk${j+1}`}>
                                                <input 
                                                    type="checkbox" 
                                                    name={`sub${i+1}_chk${j+1}`} 
                                                    id={`sub${i+1}_chk${j+1}`} 
                                                    value={field} 
                                                    onChange={(e)=>onChangeCheckEvent(e, item, field)}
                                                    checked={state.상품필터박스.map((item2)=>item2[Object.keys(item2)]===field).includes(true)}
                                                />{field}
                                            </label>
                                        </li>
                                    )
                                }
                                </ul>
                            </div>
                        </li>
                    )
                }
                </ul>
            </div>
        </div>
    );
}