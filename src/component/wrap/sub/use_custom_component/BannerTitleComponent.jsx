import React from 'react';

export default function BannerTitleComponent({state}) {
    return (
        <>
            <div className="banner">
                <a href="!#" onClick={(e)=>e.preventDefault()} title=''>
                    <img src={`./images/sub/sub1/${state.배너}`} alt="" />
                </a>
            </div>
            <div className="title">
                <h1>{state.title}</h1>
            </div>
        </>
    );
}