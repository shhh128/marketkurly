import React, { useEffect } from 'react';
import './scss/Section1Component.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Section1Component() {

    const slideContainer = React.useRef();
    const slide = React.useRef([]);
    const [state, setState] = React.useState({
        title1:'',
        title2:'',
        slide: [],
        sectionName: 'section1',

        // 드래그앤 드롭 상태관리
        setId : 0,
        touchStart: null,
        touchEnd: null,
        dragStart: null,
        dragEnd: null,
        mouseDown: false
    })

    const {sectionName} = state;

    const slideWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);
    const [isShow, setIsShow] = React.useState(false);

    // 리액트 쿼리 사용 axios api 구현
    // queryKey: 명시
    // queryFn : 명시
    const res = useQuery({
        queryKey: ['section1-query'],
        queryFn: () => axios.get('./data/main/main.json')
    });
   

    //  위에 내용을 간략히 구현
    // const res = useQuery(['main-query'], () => axios.get('./data/main/main.json') );

    // res 값이 들어오면
    useEffect(()=>{
       
        if(res.data){
            // console.log( res )
            // console.log( res.data )
            // console.log( res.data.data )
            setState({  // 상태변수에 저장
                ...state,
                title1: res.data.data[sectionName].title1,
                title2: res.data.data[sectionName].title2,
                slide: res.data.data[sectionName].slide
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[res.data])

    React.useEffect(()=>{
        if(isShow===false){
            const setId = setInterval(()=>{
                setCnt(cnt=>cnt+1)
            },4000)
            setState({
                ...state,
                setId: setId
            })
            return ()=>clearInterval(setId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isShow]);

    React.useEffect(()=>{
        if(cnt>25){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-100*0}%`;
            setTimeout(()=>{
                setCnt(1);
            },10)
        }
        else if(cnt<0){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-100*25}%`;
            setTimeout(()=>{
                setCnt((state.slide.length-2)-1);
            },10)
        }
        else{
            slideWrap.current.style.transition = 'all 0.6s ease-in-out';
            slideWrap.current.style.left = `${-100*cnt}%`;
        }
    },[cnt, state.slide.length]);

    const onMouseEnterSlide=()=>{
        setIsShow(true);
    }

    const onMouseLeaveSlide=()=>{
        setIsShow(false);
    }

    const onClickNextBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt=>cnt+1);
    }

    const onClickPrevBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt=>cnt-1);
    }

    return (
        <section id={sectionName}>
            <div className="title hide">
                <h2>{state.title1}</h2>
                <h3>{state.title2}</h3>
            </div>
            <div 
                ref={slideContainer}
                className="slide-container" 
                onMouseEnter={onMouseEnterSlide}
                onMouseLeave={onMouseLeaveSlide}
            >
                <div className="slide-view">
                    <ul ref={slideWrap} className="slide-wrap">
                    {
                        state.slide.map((item, idx)=>{
                            return(
                                <li ref={(element)=>slide.current[idx]=element} className={`slide slide${item.no}`} data-key={`slideList${idx+1}`} key={`slideList${idx+1}`}>
                                    <a href="!#" onClick={(e)=>e.preventDefault()}>
                                        <img src={`./images/main/${sectionName}/${item.image}`} alt="" />
                                    </a>
                                </li>
                            )
                        })
                    }    
                    </ul>
                </div>
                <button 
                    className={`next-btn slide-btn${isShow?' on':''}`}
                    onClick={onClickNextBtn}
                >
                    <img src={`./images/main/${sectionName}/icon_gray_r.svg`} alt="" />
                </button>
                <button 
                    className={`prev-btn slide-btn${isShow?' on':''}`}
                    onClick={onClickPrevBtn}                
                >
                    <img src={`./images/main/${sectionName}/icon_gray_r.svg`} alt="" />
                </button>
                <div className="slide-count">
                    <span>
                        <em>{cnt+1>state.slide.length-2?1:cnt+1}</em>
                        <i>/</i>
                        <em>{state.slide.length-2}</em>
                    </span>
                </div>
            </div>
        </section>
    );
}