import React, { useEffect, useRef, useState } from 'react';
import './scss/HeaderComponent.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart';
import { setLoginAction } from '../../store/login';

export default function HeaderComponent({kakaoModalOpen}) {

    const navigate = useNavigate();
    const login = useSelector((state)=>state.login);
    const address = useSelector((state)=>state.address);
    const cart = useSelector((state)=> state.cart);
    const row3 = useRef();
    const [fixed, setFixed] = useState(false);
    const [isBox2, setIsBox2] = useState(false);
    const dispatch = useDispatch();

    // 주소 상태관리
    const [delivery, setDelivery] = useState({
        우편번호:'',
        주소1:'',
        주소2:''
    });

    // 로그인 데이터 가져오기
    useEffect(()=>{
        try{
            if(localStorage.getItem('LOGIN_INFO')!==null){
                let res = JSON.parse(localStorage.getItem('LOGIN_INFO'));
                // console.log(res.userId);
                // console.log(res.exp);
                // console.log(new Date(res.exp));
                
                // 만료일 지나면 로그아웃
                let 아이디 = '';
                let 만료일 = '';
                if(new Date() > new Date(res.exp)){
                    아이디 = '';
                    만료일 = '';
                }
                else {
                    아이디 = res.userId;
                    만료일 = res.exp;
                }
                const obj = {
                    userId: 아이디,
                    exp: 만료일
                }
                dispatch(setLoginAction(obj));
            }
        }
        catch(err){
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 감시자
    useEffect(()=>{
        setTimeout(()=>{
            setDelivery({
                우편번호: address.우편번호,
                주소1: address.주소1,
                주소2: address.주소2
            });
        }, 10)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);
    
    useEffect(()=>{
        if(delivery.주소1!==''){
            setIsBox2(true);
            setTimeout(()=>{
                setIsBox2(false);
            }, 3000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delivery.주소1]);
    
    // 주소 검색 API 열기
    const onClickDeliveryOpen=(e)=>{
        e.preventDefault();
        kakaoModalOpen();
    }

    // 로그인
    const onClickLogin=(e)=>{
        e.preventDefault();
        navigate('/sub6_login');
    }

    const onMouseEnterDelivery=()=>{
        setIsBox2(true);
    }
    
    const onMouseLeaveDelivery=()=>{
        setIsBox2(false);
    }


    useEffect(()=>{
        const row3Top = row3.current.offsetTop + 42;
        // console.log(row3Top); row3 탑값 확인 + 탑모달 42 => 142
        window.addEventListener('scroll', (e)=>{
            // console.log(window.scrollY); 스크롤 탑값 확인
            if(window.scrollY>=row3Top){  // 윈도우 스크롤탑값이 142 이상이면
                setFixed(true);
            }
            else{
                setFixed(false);
            }
        })
    },[]);

    React.useEffect(()=>{
        
        if(localStorage.getItem('CART')!==null){
            const temp = JSON.parse(localStorage.getItem('CART'));
            const obj = {
                장바구니: temp 
            }
            dispatch(cartAction(obj));
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // 로그아웃
    const onClickLogOut=(e)=>{
        e.preventDefault();
        localStorage.removeItem('LOGIN_INFO');
        const obj = {
            userId:'',
            exp:''
        }
        dispatch(setLoginAction(obj));
    }

    const onClickBoard=(e)=>{
        e.preventDefault();
        alert('해당 페이지는 준비중입니다.');
    }

    const onClickBeauty=(e)=>{
        e.preventDefault();
        alert('해당 페이지는 준비중입니다.');
    }

    const onClickPick=(e)=>{
        e.preventDefault();
        alert('해당 페이지는 준비중입니다.');
    }

    return (
        <>
            <header id='header'>
                <div className="row row1">
                    <div className="container">
                        <aside id='aside'>
                            <ul>
                            {
                                login.userId==='' ? 
                                <li><Link to="/sub5_signup">회원가입</Link></li>
                                :
                                <li><a href="!#" onClick={(e)=>e.preventDefault()}>{login.userId}님!</a></li>
                            }  
                                <li><i>|</i></li>
                            {
                                login.userId==='' ?
                                <li><Link to="/sub6_login">로그인</Link></li>
                                :
                                <li><a href="!#" onClick={onClickLogOut}>로그아웃</a></li>
                            }
                                <li><i>|</i></li>
                                <li><a href='!#' onClick={onClickBoard}>고객센터<span><img src="./images/header/ico_down_16x10.png" alt="" /></span></a></li>
                            </ul>
                        </aside>
                    </div>
                </div>
                <div className="row row2">
                    <div className="container">
                        <div className="left">
                            <h1>
                                <span><img src="./images/header/icon_logo.svg" alt="" /></span>
                                <Link to="/main">마켓컬리</Link>
                            </h1>
                            <i>|</i>
                            <a href="!#" onClick={onClickBeauty}>뷰티컬리</a>
                        </div>
                        <div className={`center${fixed?' on':''}`}>
                            <input type="text" name='search' id='search' placeholder='검색어를 입력해주세요'/>
                            <button><img src="./images/header/icon_search.svg" alt="" /></button>
                        </div>
                        <div className={`right${fixed?' on':''}`}>
                            <ul>
                                <li onMouseLeave={onMouseLeaveDelivery}>
                                    <a href="!#" onMouseEnter={onMouseEnterDelivery} onClick={(e)=>e.preventDefault()}><img src="./images/header/icon_address.svg" alt="" /></a>
                                {
                                    delivery.주소1 !=='' ?
                                    (
                                        <div className={`delivery-box box1${isBox2?' on':''}`}>
                                            <div className="row1">
                                                <p>{`(${delivery.우편번호}) ${delivery.주소1} ${delivery.주소2}`}</p>
                                            </div>                                        
                                            <div className="row2">
                                                <button onClick={onClickDeliveryOpen}>배송지 변경</button>
                                            </div>                                        
                                        </div>
                                    )
                                    :
                                    (
                                        <div className={`delivery-box box2${isBox2?' on':''}`}>
                                            <div className="row1">
                                                <p><strong>배송지를 등록</strong>하고<br /> 구매 가능한 상품을 확인하세요!</p>
                                            </div>                                        
                                            <div className="row2">
                                                <button onClick={onClickLogin}>로그인</button>
                                                <button onClick={onClickDeliveryOpen}>주소 검색</button>
                                            </div>                                        
                                        </div>
                                    )
                                }
                                </li>
                                <li>
                                    <a href="!#" onClick={onClickPick}><img src="./images/header/icon_pick.svg" alt="" /></a>
                                </li>
                                <li className='cart'>
                                    <Link to="/cart">
                                        <img src="./images/header/icon_cart.svg" alt="" />
                                        {
                                            cart.장바구니.length > 0 &&
                                            <span>
                                                {cart.장바구니.length}
                                            </span>
                                        }
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div ref={row3} className={`row row3${fixed?' on':''}`}>
                    <div className="container">
                        <div className={`left${fixed?' on':''}`}>
                            <h1>
                                <a href="!#" onClick={(e)=>e.preventDefault()}>
                                    <i></i>
                                    <span>카테고리</span>
                                </a>
                            </h1>
                        </div>
                        <div className={`center${fixed?' on':''}`}>
                            <nav id='nav'>
                                <ul>
                                    <li><Link to="/sub1" className='main-btn'>신상품</Link></li>
                                    <li><Link to="/sub2" className='main-btn'>베스트</Link></li>
                                    <li><Link to="/sub3" className='main-btn'>알뜰쇼핑</Link></li>
                                    <li><Link to="/sub4" className='main-btn'>특가/혜택</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className={`right${fixed?' on':''}`}>
                            <span>
                                <strong>샛별·하루</strong>
                                <em>배송안내</em>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
}