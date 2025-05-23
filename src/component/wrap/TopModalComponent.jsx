import React from 'react';
import './scss/TopModalComponent.scss';

export default function TopModalComponent() {
    return (
        <div id='topModal'>
            <div className="container">
                <a href="!#" onClick={(e)=>e.preventDefault()}>
                    <span>지금 가입하고,&nbsp;</span> 
                    <strong>1만원 할인 쿠폰&nbsp;</strong> 
                    <span>받아가세요!</span>
                </a>
                <button className='close-btn'>
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2073_60924)"><path d="M26 26L6 6" stroke="rgba(242, 242, 242, 0.7)" strokeLinecap="round" strokeWidth="0"></path><path d="M6 26L26 6" stroke="rgba(242, 242, 242, 0.7)" strokeLinecap="round" strokeWidth="0"></path></g><path fillRule="evenodd" clipRule="evenodd" d="M6.28431 5.58859L6.35355 5.64645L16 15.293L25.6464 5.64645C25.8417 5.45118 26.1583 5.45118 26.3536 5.64645C26.5271 5.82001 26.5464 6.08944 26.4114 6.28431L26.3536 6.35355L16.707 16L26.3536 25.6464C26.5488 25.8417 26.5488 26.1583 26.3536 26.3536C26.18 26.5271 25.9106 26.5464 25.7157 26.4114L25.6464 26.3536L16 16.707L6.35355 26.3536C6.15829 26.5488 5.84171 26.5488 5.64645 26.3536C5.47288 26.18 5.4536 25.9106 5.58859 25.7157L5.64645 25.6464L15.293 16L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645C5.82001 5.47288 6.08944 5.4536 6.28431 5.58859Z" fill="rgba(242, 242, 242, 0.7)"></path></svg>
                </button>
            </div>
        </div>
    );
}