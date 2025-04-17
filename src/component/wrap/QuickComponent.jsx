import React from 'react';
import './scss/QuickComponent.scss';
import { useSelector } from 'react-redux';

export default function QuickComponent() {

    const 최근본상품 = useSelector((state)=>state.viewProduct.최근본상품);
    // console.log(최근본상품);

    const [isOn, setIsOn] = React.useState(false);
    const [cnt, setCnt] = React.useState(0);
    const quickWrap = React.useRef();

    React.useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            if(window.scrollY >= 430){
                setIsOn(true);
            }
            else{
                setIsOn(false);
            }
        })
    },[]);

    const onClickTop=(e)=>{
        e.preventDefault();
        setCnt(cnt=> cnt <= 0 ? 0 : cnt-1);
    }

    const onClickBottom=(e)=>{
        e.preventDefault();
        try{
            setCnt(cnt=> cnt>=(최근본상품.length-3) ? (최근본상품.length-3) : cnt+1);
        }
        catch{
            return;
        }
    }

    React.useEffect(()=>{
        try{
            quickWrap.current.style.transition = 'top 0.3s';
            quickWrap.current.style.top = `${-93.391 * cnt}px`;
        }
        catch(err){
            return;
        }
    },[cnt]);

    return (
        <div id='quickMenu' className={isOn?'on':''}>
            <div className="img-box">
                <a href="!#" onClick={(e)=>e.preventDefault()}>
                    <img src="./images/main/deliveryInfo.jpg" alt="" />
                </a>
            </div>
            <div className="link-box">
                <ul>
                    <li><a href="!#" onClick={(e)=>e.preventDefault()}>컬리 고객 제도</a></li>
                    <li><a href="!#" onClick={(e)=>e.preventDefault()}>컬리 큐레이터</a></li>
                    <li><a href="!#" onClick={(e)=>e.preventDefault()}>레시피</a></li>
                </ul>
            </div>
        { 
            최근본상품.length >= 1 && (
                <div className="view-box">
                    <button onClick={onClickTop}>
                        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="#666" xmlns="http://www.w3.org/2000/svg"><path d="M5 11L9 7L13 11" stroke="#666" strokeWidth="1.3"></path></svg>
                    </button>
                    <h2>최근 본 상품</h2>
                    <div className="quick-img-box">
                        <ul ref={quickWrap}>
                        {
                            최근본상품.map((item)=>{
                                return(
                                    <li key={item.상품번호}>
                                        <a href="!#" onClick={(e)=>e.preventDefault()}>
                                            <img src={item.상품이미지} alt="" />
                                        </a>
                                    </li>
                                )
                            })
                        }   
                        </ul>
                    </div>
                    <button onClick={onClickBottom}>
                        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 7L9 11L5 7" stroke="#666" strokeWidth="1.3"></path></svg>
                    </button>
                </div>
            )
        }    
        </div>
    );
}