import React from 'react';
import './scss/Section3Component.scss';

export default function Section3Component() {
    return (
        <section id='section3'>
            <div className="container">
                <div className="title hide">
                    <h2>아르마니 뷰티</h2>
                </div>
                <div className="content">
                    <a href="!#" onClick={(e)=>e.preventDefault()}>
                        <img src="./images/main/section3/banner.jpg" alt="" />
                    </a>
                </div>
            </div>
        </section>
    );
}