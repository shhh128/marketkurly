import React, { useEffect, useRef, useState } from 'react';
import './scss/Sub4Component.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Sub4Component() {

    const location = useLocation();

    const [order, setOrder] = useState([]);
    const [tab, setTab] = useState([]);
    const [state, setState] = useState({
        title:'',
        배너: [],
        pathName:''
    });

    useEffect(()=>{
        axios({
            url: `./data/sub/${location.pathname}.json`,
            method: 'GET'
        })
        .then((res)=>{
            // console.log(res);
            const pathName = location.pathname.replace(/[/]/g, '')
            setState({
                ...state,
                pathName: pathName,
                배너: res.data[pathName].배너
            })
            let a = Array(7).fill(false);
            a[0] =true;
            setTab(a);

            let b = Array(5).fill(false);
            b[0] =true;
            setOrder(b);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[]);

    return (
        <main id={state.pathName} className='sub-page'>
            <div className="container">
                <div className="title hide">섹션4</div>
                <div className="content">
                    <div className="banner">
                        <ul>
                        {
                            state.배너.map((item, idx)=>
                                <li key={item.번호}>
                                    <div className="gap">
                                        <a href="!#" onClick={(e)=>e.preventDefault()}><img src={`./images/sub/sub4/${item.이미지}`} alt="" /></a>
                                    </div>
                                </li>
                            )
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}