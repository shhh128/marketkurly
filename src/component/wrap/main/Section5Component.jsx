import React from 'react';
import './scss/Section4Component.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setViewProductAction } from '../../../store/viewProduct';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function Section5Component() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        title1:'',
        title2:'',
        title3:'',
        product:[],
        sectionName:'section5',
        시작시간: "2025-03-16 22:00:00",
        타임세일기한: 2
    });
    
    const {sectionName}=state;
    
    const [timer, setTimer] = React.useState({
        시:9,
        분:13,
        초:24
    });


    // 리액트 쿼리
    const res = useQuery({
        queryKey: ['section5-query'],
        queryFn: ()=> axios.get('./data/main/main.json')
    });
    useEffect(()=>{
        if(res.data){
            setState({
                ...state,
                title1:  res.data.data[sectionName].title1,
                title2:  res.data.data[sectionName].title2,
                title3:  res.data.data[sectionName].title3,
                product: res.data.data[sectionName].product,
                시작시간: res.data.data[sectionName].saleStart,
                타임세일기한: res.data.data[sectionName].expires
            })

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [res.data]);


    React.useEffect(()=>{
        try {
            let 시작시간 = new Date(state.시작시간);
            시작시간.setDate(시작시간.getDate()+state.타임세일기한);
            const setId = setInterval(()=>{
                const 현재시간 = new Date();
                const 남은시간 = 시작시간 - 현재시간;
    
                if(현재시간 > 시작시간){
                    clearInterval(setId);
                    setTimer({
                        시: 0,
                        분: 0,
                        초: 0
                    });
                }
                else{
                    setTimer({
                        시: Math.floor(남은시간/(60*60*1000)) % (state.타임세일기한*24),
                        분: Math.floor(남은시간/(60*1000)) % 60,
                        초: Math.floor(남은시간/(1000)) % 60
                    });
                }
            },1000);
            return ()=>clearInterval(setId);
        }
        catch(err){
            return;
        }
    },[state.시작시간, state.타임세일기한]);

    const onClickViewProduct=(e, 상품, 이미지경로)=>{
        e.preventDefault();
        let 상품정보 = 상품;

        상품정보 = {
            ...상품정보,
            상품이미지: 이미지경로
        }
        let obj = {
            지금본상품: 상품정보         
        }
      
        // 지금본상품
        localStorage.setItem('view_product', JSON.stringify(obj.지금본상품))

        let arr = [];
        if(localStorage.getItem('view_product_list')!==null ){
            const result = JSON.parse(localStorage.getItem('view_product_list'));
            // 중복검사
            const imsi = result.map((item)=>item.상품번호.includes(obj.지금본상품.상품번호) ? true : false);
            if(imsi.includes(true)===true){
                arr = result;  // 그대로로
            }
            else{                
                arr = [obj.지금본상품, ...result]; // 추가
            }
        }
        else{
            arr = [obj.지금본상품];
        }

        obj = {
            ...obj,
            최근본상품: arr
        }       
        // 리덕스 저장
        dispatch(setViewProductAction(obj))
        // 로컬저장소 저장
        localStorage.setItem('view_product_list', JSON.stringify(arr))
        // 상세 페이지로 이동
        navigate('/product-view');

    }

    return (
        <section id={sectionName}>
            <div className="container">
                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">
                            <ul className="slide-wrap">
                                <li className="slide slide1">
                                    <div>
                                        <ul>
                                            <li><h2>{state.title1}</h2></li>
                                                <li><h3>{state.title2}</h3></li>                                              
                                                <li>
                                                    <h5>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" preserveAspectRatio="xMidYMid meet" style={{transform: "translate3d(0px, 0px, 0px)"}}><defs><clipPath id="__lottie_element_12"><rect width="36" height="36" x="0" y="0"></rect></clipPath></defs><g clipPath="url(#__lottie_element_12)"><g style={{display: "block"}} transform="matrix(1,0,0,1,3.75,3.75)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,14.25,14.25)"><path fill="rgb(189,118,255)" fillOpacity="1" d=" M14,0 C14,7.73199987411499 7.73199987411499,14 0,14 C-7.73199987411499,14 -14,7.73199987411499 -14,0 C-14,-7.73199987411499 -7.73199987411499,-14 0,-14 C7.73199987411499,-14 14,-7.73199987411499 14,0z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="2" d=" M14.25,8.293999671936035 C14.25,8.293999671936035 14.25,14.293999671936035 14.25,14.293999671936035"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="2" d=" M20.25,14.293999671936035 C20.25,14.293999671936035 14.25,14.293999671936035 14.25,14.293999671936035"></path></g></g></g></svg>
                                                        <span>
                                                            <em>{String(timer.시).padStart(2, '0')}</em>
                                                            <i>:</i>
                                                            <em>{String(timer.분).padStart(2, '0')}</em>
                                                            <i>:</i>
                                                            <em>{String(timer.초).padStart(2, '0')}</em>
                                                        </span>
                                                    </h5>
                                                </li>
                                                <li><h4>{state.title3}</h4></li>
                                        </ul>
                                    </div>
                                </li>
                            {
                                state.product.map((item, idx)=>{
                                    return(
                                        <li className={`slide slide${idx+2}`} key={item.상품번호}>
                                            <a href="!#" onClick={(e)=>onClickViewProduct(e, item, `./images/main/${sectionName}/${item.상품이미지}`)}>
                                                <div className="row1-box box">
                                                    <span><img src={`./images/main/${sectionName}/${item.상품이미지}`} alt="" /></span>
                                                </div>
                                                <div className="row2-box box">
                                                    <ul>
                                                        <li>
                                                            <button>
                                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.53516 2.70001H3.93316L5.76816 10.609H13.6482L15.2992 4.35901H4.86916M12.8582 14.933C13.0098 14.9375 13.1609 14.9115 13.3024 14.8566C13.4438 14.8017 13.5728 14.7189 13.6817 14.6132C13.7906 14.5075 13.8771 14.381 13.9363 14.2412C13.9954 14.1015 14.0258 13.9513 14.0258 13.7995C14.0258 13.6478 13.9954 13.4975 13.9363 13.3578C13.8771 13.218 13.7906 13.0915 13.6817 12.9858C13.5728 12.8801 13.4438 12.7974 13.3024 12.7424C13.1609 12.6875 13.0098 12.6615 12.8582 12.666C12.5634 12.6748 12.2836 12.798 12.0782 13.0096C11.8727 13.2213 11.7578 13.5046 11.7578 13.7995C11.7578 14.0944 11.8727 14.3778 12.0782 14.5894C12.2836 14.801 12.5634 14.9243 12.8582 14.933ZM6.49316 14.933C6.64484 14.9375 6.79589 14.9115 6.93735 14.8566C7.07881 14.8017 7.20781 14.7189 7.31669 14.6132C7.42558 14.5075 7.51214 14.381 7.57126 14.2412C7.63037 14.1015 7.66083 13.9513 7.66083 13.7995C7.66083 13.6478 7.63037 13.4975 7.57126 13.3578C7.51214 13.218 7.42558 13.0915 7.31669 12.9858C7.20781 12.8801 7.07881 12.7974 6.93735 12.7424C6.79589 12.6875 6.64484 12.6615 6.49316 12.666C6.19836 12.6748 5.91858 12.798 5.71315 13.0096C5.50773 13.2213 5.39283 13.5046 5.39283 13.7995C5.39283 14.0944 5.50773 14.3778 5.71315 14.5894C5.91858 14.801 6.19836 14.9243 6.49316 14.933Z" stroke="#333333" strokeLinecap="square" strokeLinejoin="round"></path></svg>
                                                                <em>담기</em>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <h3>{item.상품명}</h3>
                                                        </li>
                                                        <li>
                                                            <span>{item.정가.toLocaleString('ko-KR')}원</span>
                                                        </li>
                                                        <li>
                                                            <strong>{Math.round(item.할인율*100)}%</strong>
                                                            <strong>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}원</strong>
                                                        </li>
                                                        <li>
                                                            <em>
                                                                <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_1513_17755" fill="white"><path fillRule="evenodd" clipRule="evenodd" d="M3 2C1.89543 2 1 2.89543 1 4V8.67201C1 9.77658 1.89543 10.672 3 10.672H5.11212L6.33682 12.7653C6.5299 13.0954 7.00688 13.0954 7.19995 12.7653L8.42465 10.672H10.5C11.6046 10.672 12.5 9.77658 12.5 8.67201V4C12.5 2.89543 11.6046 2 10.5 2H3Z"></path></mask><path fill="#A7B2BC" d="M5.11212 10.672L5.97526 10.167L5.68564 9.67201H5.11212V10.672ZM6.33682 12.7653L5.47369 13.2703L5.47369 13.2703L6.33682 12.7653ZM7.19995 12.7653L6.33682 12.2604L6.33682 12.2604L7.19995 12.7653ZM8.42465 10.672V9.67201H7.85113L7.56152 10.167L8.42465 10.672ZM2 4C2 3.44772 2.44772 3 3 3V1C1.34315 1 0 2.34315 0 4H2ZM2 8.67201V4H0V8.67201H2ZM3 9.67201C2.44772 9.67201 2 9.22429 2 8.67201H0C0 10.3289 1.34315 11.672 3 11.672V9.67201ZM5.11212 9.67201H3V11.672H5.11212V9.67201ZM7.19995 12.2604L5.97526 10.167L4.24899 11.177L5.47369 13.2703L7.19995 12.2604ZM6.33682 12.2604C6.5299 11.9304 7.00688 11.9304 7.19995 12.2604L5.47369 13.2703C6.05291 14.2604 7.48386 14.2604 8.06309 13.2703L6.33682 12.2604ZM7.56152 10.167L6.33682 12.2604L8.06309 13.2703L9.28779 11.177L7.56152 10.167ZM10.5 9.67201H8.42465V11.672H10.5V9.67201ZM11.5 8.67201C11.5 9.22429 11.0523 9.67201 10.5 9.67201V11.672C12.1569 11.672 13.5 10.3289 13.5 8.67201H11.5ZM11.5 4V8.67201H13.5V4H11.5ZM10.5 3C11.0523 3 11.5 3.44772 11.5 4H13.5C13.5 2.34315 12.1569 1 10.5 1V3ZM3 3H10.5V1H3V3Z" mask="url(#path-1-inside-1_1513_17755)"></path><circle fill="#A7B2BC" cx="4.34998" cy="6.17871" r="0.75"></circle><circle fill="#A7B2BC" cx="6.75" cy="6.17871" r="0.75"></circle><circle fill="#A7B2BC" cx="9.15002" cy="6.17871" r="0.75"></circle></svg>
                                                            </em>
                                                            <em>
                                                                {`${item.리뷰.toLocaleString('ko-KR')}${item.리뷰>=999?'+':''}`}
                                                            </em>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </a>
                                        </li>
                                    )
                                })
                            }     
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}