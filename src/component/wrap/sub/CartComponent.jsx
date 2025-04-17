import React, { useEffect, useState } from 'react';
import './scss/Cart.scss';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../../store/cart';

export default function CartComponent() { 

    const dispatch = useDispatch();
    
    // 장바구니 수량은 수정
    // 장바구니 판매금액, 정가금액, 할인금액, 배송비  추가

    // 판매금액 = 판매가 * 수량
    // 정가금액 = 정가 * 수량
    // 할인금액 = 정가 - (정가*(1-할인율))
    // 배송비 = 판매금액 < 30000 ? 3000 : 0
    const [state, setState] = useState({
        장바구니: []
    });

    // 집계 계산 
    // 합계 금액 상태변수
    // 상품금액합계 = 판매금액 총합
    // 상품할인금액합계 = 정가금액 - 판매금액
    // 배송비 = 30,000 이상 0원
    // 배송비합계 = 30,000 미만 3000원 
    // 결재예정금액합계 = 상품금액 (합계) + 배송비 (합계)
    const [상품금액합계, set상품금액합계] = useState();
    const [상품할인금액합계, set상품할인금액합계] = useState();
    const [배송비합계, set상배송비합계] = useState();
    const [결제예정금액합계, set결제예정금액합계] = useState();
    const [체크리스트, set체크리스트] = useState([]);

    // 1. 로컬스토레이지 데이터 가져오기
    //    상태변수 state.장바구니에 저장하기
    useEffect(()=>{
        if(localStorage.getItem('CART_PRODUCT_2025')!==null){            
            const CART = JSON.parse(localStorage.getItem('CART_PRODUCT_2025'));
            
            // 1. 수량은 수정, 판매금액, 정가금액, 할인금액, 배송비  연산 결과 추가 
            // 장바구니 데이터 들어오면 처리
            // 장바구니 수량은 수정
            // 장바구니 판매금액, 정가금액, 할인금액, 배송비  추가

            // 판매금액 = 판매가 * 수량
            // 정가금액 = 정가 * 수량
            // 할인금액 = 정가 - (정가*(1-할인율))
            // 배송비 = 판매금액 < 30000 ? 3000 : 0  
            const 장바구니 = CART.map((item)=> ({
                ...item, 
                판매금액: Math.round(item.정가*(1-item.할인율)*item.수량),
                정가금액: Math.round(item.정가*item.수량),
                할인금액: Math.round((item.정가-(item.정가*(1-item.할인율)))*item.수량),
                배송비:   Math.round(item.정가*(1-item.할인율)*item.수량) < 30000 ? 3000 : 0
            }) )

            const obj = {
                장바구니: 장바구니 
            }

            // 컴포넌트 상태변수에 저장  []
            setState({
                장바구니: obj.장바구니
            })

            // 리덕스 상태변수에 저장  {장바구니: []} 
            dispatch(cartAction(obj));
        }
    
    },[dispatch]);
   

    // 2. 상태변수 장바구니 저장되면 집계 계산
    useEffect(()=>{    
        const 상품금액합계 = state.장바구니.reduce((acc, item)=> acc + item.판매금액  , 0);
        const 상품할인금액합계 = state.장바구니.reduce((acc, item)=> acc + item.할인금액  , 0);
        const 배송비합계 = state.장바구니.reduce((acc, item)=> acc + item.배송비 , 0);
        const 결제예정금액합계 = 상품금액합계+배송비합계;

        set상품금액합계(상품금액합계);    
        set상품할인금액합계(상품할인금액합계);
        set상배송비합계(배송비합계);
        set결제예정금액합계(결제예정금액합계);
    }, [state.장바구니])


    // 수량 증가 버튼 클릭 이벤트
    const onClickPlusBtn=(e, {상품번호, 상품명})=>{
        e.preventDefault();
        
        let 장바구니 = state.장바구니;
        장바구니 = 장바구니.map((item)=> (item.상품번호===상품번호 && item.상품명===상품명) ? 
                                       {
                                        ...item, 
                                        수량: (item.수량+1),                                        
                                        판매금액: Math.round(item.정가*(1-item.할인율)*(item.수량+1)),
                                        정가금액: Math.round(item.정가*(item.수량+1)),
                                        할인금액: Math.round((item.정가-(item.정가*(1-item.할인율)))*(item.수량+1)),
                                        배송비:   Math.round(item.정가*(1-item.할인율)*(item.수량+1)) < 30000 ? 3000 : 0
                                       } 
                                       : 
                                       {...item});

        const obj = {
            장바구니: 장바구니 
        }
                        
        // 컴포넌트 상태변수에 저장  []
        setState({
            장바구니: obj.장바구니
        })

        // 리덕스 상태변수에 저장  {장바구니: []} 
        dispatch(cartAction(obj));

        // 로컬 스토레이지 저장
        localStorage.setItem('CART_PRODUCT_2025', JSON.stringify(obj.장바구니))  // []
    }

    // 수량 감소 버튼 클릭 이벤트 Minus
    const onClickMinusBtn=(e, {상품번호, 상품명})=>{
        e.preventDefault();
        
        let 장바구니 = state.장바구니;
        장바구니 = 장바구니.map((item)=> (item.상품번호===상품번호 && item.상품명===상품명) ? 
                                       {
                                        ...item, 
                                        수량: (item.수량-1<=1?1:item.수량-1),                                        
                                        판매금액: Math.round(item.정가*(1-item.할인율)*(item.수량-1<=1?1:item.수량-1)),
                                        정가금액: Math.round(item.정가*(item.수량-1<=1?1:item.수량-1)),
                                        할인금액: Math.round((item.정가-(item.정가*(1-item.할인율)))*(item.수량-1<=1?1:item.수량-1)),
                                        배송비:   Math.round(item.정가*(1-item.할인율)*(item.수량-1<=1?1:item.수량-1)) < 30000 ? 3000 : 0
                                       } 
                                       : 
                                       {...item});

        // 객체 형식
        const obj = {
            장바구니: 장바구니 
        }
                        
        // 컴포넌트 상태변수에 저장  []
        setState({
            장바구니: obj.장바구니
        })

        // 리덕스 상태변수에 저장  {장바구니: []} 
        dispatch(cartAction(obj));

        // 로컬 스토레이지 저장
        localStorage.setItem('CART_PRODUCT_2025', JSON.stringify(obj.장바구니))  // []
    }


    // 상품 우측 삭제 버튼 클릭 이벤트
    const onClickDeleteBtn=(e, {상품번호, 상품명})=>{
        e.preventDefault();
        const 장바구니 = state.장바구니.filter((item)=> !(item.상품번호===상품번호 && item.상품명===상품명) );

        // 객체 형식
        const obj = {
            장바구니: 장바구니 
        }
                        
        // 컴포넌트 상태변수에 저장  []
        setState({
            장바구니: obj.장바구니
        })

        // 리덕스 상태변수에 저장  {장바구니: []} 
        dispatch(cartAction(obj));

        // 로컬 스토레이지 저장
        localStorage.setItem('CART_PRODUCT_2025', JSON.stringify(obj.장바구니))  // []
    }

    // 개별 체크 => 체크항목 => 체크리스트 상태변수에 저장하기
    // 체크박스 true false 결정
        // 체크박스 => 개별 체크 이벤트트 => 체크 리스트 상태변수에 저장
    // 체크박스 => 개별 체크 이벤트트 => 체크 리스트 상태변수에 저장
    const onChangeChecked=(e, {상품번호, 상품명})=>{
        let 체크항목 = 체크리스트;

        if(e.target.checked){
            체크항목 = [...체크항목, {상품번호: 상품번호, 상품명: 상품명}];
        }
        else{
            체크항목 = 체크항목.filter((item)=> !(item.상품번호===상품번호 && item.상품명===상품명) );
        }
        set체크리스트(체크항목);

    }

    // 전체체크 선택
    const onChangeCheckAll=(e)=>{
        let 체크항목 = [];
        if(e.target.checked){
            체크항목 = state.장바구니.map((item)=> ({상품번호: item.상품번호, 상품명: item.상품명}) )
        }
        else{
            체크항목 = [];
        }
        set체크리스트(체크항목);
    }

    // 선택삭제 => 체크박스 개별선택 || 체크박스 전체선택
    const onClickDeleteSelect=(e)=>{
        e.preventDefault();
        // 장바구니 삭제
        let 장바구니 = state.장바구니;
        체크리스트.map((삭제항목)=>
            장바구니 = 장바구니.filter((item)=> !(item.상품번호.includes(삭제항목.상품번호) && item.상품명.includes(삭제항목.상품명)) )
            // 장바구니 = 장바구니.filter((item)=> (item.상품번호!==삭제항목.상품번호 && item.상품명!==삭제항목.상품명) ) 
            // 이방식은 상품번호 같고 상품명이 다른데 같은 상품번호 모두 삭제되는 버그가 있습니다. 반드시 includes()를 사용해야 합니다.
        )

       // 객체 형식
       const obj = {
            장바구니: 장바구니 
        }
                        
        // 컴포넌트 상태변수에 저장  []
        setState({
            장바구니: obj.장바구니
        })

        // 리덕스 상태변수에 저장  {장바구니: []} 
        dispatch(cartAction(obj));

        // 로컬 스토레이지 저장
        localStorage.setItem('CART_PRODUCT_2025', JSON.stringify(obj.장바구니))  // []       
    }

    return (
        <main id='cart'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>장바구니</h2>
                    </div>
                    <div className="content">
                        <div className="left">
                            <div className="cart-btn cart-header">
                                <div className="button-box">
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name='allCheck' 
                                            id='allCheckTop' 
                                            value='allCheck'   
                                            onChange={onChangeCheckAll}
                                            checked={체크리스트.length===state.장바구니.length}                                         
                                        />                                        
                                        <span>전체선택 </span>    
                                    </label>    
                                    <button onClick={onClickDeleteSelect}>선택삭제</button>
                                </div>
                            </div>                            
                            <div className="cart-list">
                                <div className="cart-list-wrap">
                                   {
                                        state.장바구니.length===0 ?
                                            <p className='cart-caption'>장바구니에 담긴 상품이 없습니다</p> 
                                        :
                                        // 냉장, 냉동, 상온
                                        <>
                                            {/* 냉장 */}
                                            {
                                                state.장바구니.filter((item)=>item.포장타입.보관방법==='냉장').length > 0 && 
                                                <div className="list-1 list">
                                                    <div className="title">
                                                        <h2><img src="./images/sub/cart/icon_title1.svg" alt="" /><span>냉장상품</span></h2>
                                                        <button><img src="./images/sub/cart/icon_arrow_up.svg" alt="" /></button>
                                                    </div>
                                                    <ul>
                                                    {
                                                        state.장바구니.filter((item)=>item.포장타입.보관방법==='냉장').map((item, idx)=>
                                                            <li key={`${item.상품번호}-${item.상품명}`} data-key={`${item.상품번호}-${item.상품명}`}>
                                                                <div className="left-box">
                                                                    <span>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name='cartChk'
                                                                            id={`냉장cartChk${idx}`}
                                                                            value={{상품번호: item.상품번호, 상품명: item.상품명}}
                                                                            onChange={(e)=>onChangeChecked(e, {상품번호: item.상품번호, 상품명: item.상품명})}
                                                                            checked={체크리스트.map((item2)=>(item2.상품번호===item.상품번호 && item2.상품명===item.상품명) ? true : false).includes(true)}
                                                                        />
                                                                    </span>
                                                                    <span><img src={item.상품이미지} alt="" /></span>
                                                                    <span>{item.상품명}</span>                                                                
                                                                </div>
                                                                <div className="right-box">
                                                                    <ul>
                                                                        <li><button onClick={(e)=>onClickMinusBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/product_view/icon_minus.svg" alt="" /></button></li>
                                                                        <li><span>{item.수량}</span></li>
                                                                        <li><button onClick={(e)=>onClickPlusBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/product_view/icon_plus.svg" alt="" /></button></li>
                                                                    </ul> 
                                                                    <span>
                                                                    <em>{Number(item.판매금액).toLocaleString('ko-KR')}원</em>
                                                                    <em>{Number(item.정가금액).toLocaleString('ko-KR')}원</em>
                                                                    </span>
                                                                    <button onClick={(e)=>onClickDeleteBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='cart-delete-btn'><img src="./images/sub/product_view/icon_option_delete.svg" alt="" /></button>
                                                                </div>                                                            
                                                            </li>                                                    
                                                        )
                                                    }
                                                    </ul>
                                                </div>  
                                            }
                                            {/* 냉동 */}
                                            {
                                                state.장바구니.filter((item)=>item.포장타입.보관방법==='냉동').length > 0 && 
                                                <div className="list-1 list">
                                                    <div className="title">
                                                        <h2><img src="./images/sub/cart/icon_title2.svg" alt="" /><span>냉동상품</span></h2>
                                                        <button><img src="./images/sub/cart/icon_arrow_up.svg" alt="" /></button>
                                                    </div>
                                                    <ul>
                                                    {
                                                        state.장바구니.filter((item)=>item.포장타입.보관방법==='냉동').map((item, idx)=>                                                                
                                                            <li key={`${item.상품번호}-${item.상품명}`} data-key={`${item.상품번호}-${item.상품명}`}>
                                                                <div className="left-box">
                                                                    <span>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name='cartChk' 
                                                                            id={`냉장cartChk${idx}`}
                                                                            value={item.상품번호}
                                                                            onChange={(e)=>onChangeChecked(e, {상품번호: item.상품번호, 상품명: item.상품명})}
                                                                            checked={
                                                                                체크리스트.map((체크항목)=>
                                                                                    체크항목.상품번호===item.상품번호 && 
                                                                                    체크항목.상품명===item.상품명
                                                                                ).includes(true)
                                                                            }
                                                                        />
                                                                    </span>
                                                                    <span><img src={item.상품이미지}  alt="" /></span>
                                                                    <span>{item.상품명}</span>                                                                
                                                                </div>
                                                                <div className="right-box">
                                                                    <ul>
                                                                        <li><button onClick={(e)=>onClickMinusBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/product_view/icon_minus.svg" alt="" /></button></li>
                                                                        <li><span>{item.수량}</span></li>
                                                                        <li><button onClick={(e)=>onClickPlusBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/product_view/icon_plus.svg" alt="" /></button></li>
                                                                    </ul> 
                                                                    <span>
                                                                        <em>{Number(item.판매금액).toLocaleString('ko-KR')}원</em>
                                                                        <em>{Number(item.정가금액).toLocaleString('ko-KR')}원</em>
                                                                    </span>
                                                                    <button onClick={(e)=>onClickDeleteBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='cart-delete-btn'><img src="./images/sub/product_view/icon_option_delete.svg" alt="" /></button>
                                                                </div>                                                            
                                                            </li>                                                    
                                                        )
                                                    }
                                                    </ul>
                                                </div>  
                                            }
                                            {/* 상온 */}
                                            {
                                                state.장바구니.filter((item)=>item.포장타입.보관방법==='상온').length > 0 && 
                                                <div className="list-1 list">
                                                    <div className="title">
                                                        <h2><img src="./images/sub/cart/icon_title3.svg" alt="" /><span>상온상품</span></h2>
                                                        <button><img src="./images/sub/cart/icon_arrow_up.svg" alt="" /></button>
                                                    </div>
                                                    <ul>
                                                    {
                                                        state.장바구니.filter((item)=>item.포장타입.보관방법==='상온').map((item, idx)=>                                                        
                                                            <li key={`${item.상품번호}-${item.상품명}`} data-key={`${item.상품번호}-${item.상품명}`}>
                                                                <div className="left-box">
                                                                    <span>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name='cartChk' 
                                                                            id={`냉장cartChk${idx}`}
                                                                            value={item.상품번호}
                                                                            onChange={(e)=>onChangeChecked(e, {상품번호: item.상품번호, 상품명: item.상품명})}
                                                                            checked={
                                                                                체크리스트.map((체크항목)=>
                                                                                    체크항목.상품번호===item.상품번호 && 
                                                                                    체크항목.상품명===item.상품명
                                                                                ).includes(true)
                                                                            }
                                                                        />
                                                                    </span>
                                                                    <span><img src={item.상품이미지}  alt="" /></span>
                                                                    <span>{item.상품명}</span>                                                                
                                                                </div>
                                                                <div className="right-box">
                                                                    <ul>
                                                                        <li><button onClick={(e)=>onClickMinusBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/product_view/icon_minus.svg" alt="" /></button></li>
                                                                        <li><span>{item.수량}</span></li>
                                                                        <li><button onClick={(e)=>onClickPlusBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/product_view/icon_plus.svg" alt="" /></button></li>
                                                                    </ul> 
                                                                    <span>
                                                                        <em>{Number(item.판매금액).toLocaleString('ko-KR')}원</em>
                                                                        <em>{Number(item.정가금액).toLocaleString('ko-KR')}원</em>
                                                                    </span>
                                                                    <button onClick={(e)=>onClickDeleteBtn(e, {상품번호: item.상품번호, 상품명: item.상품명})} className='cart-delete-btn'><img src="./images/sub/product_view/icon_option_delete.svg" alt="" /></button>
                                                                </div>                                                            
                                                            </li>                                                    
                                                        )
                                                    }
                                                    </ul>
                                                </div>                                          
                                            }
                                        </>
                                    } 
                                </div>
                            </div>
                            <div className="cart-btn cart-footer">
                                <div className="button-box">
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name='allCheck' 
                                            id='allCheckBottom' 
                                            value='allCheck'
                                            onChange={onChangeCheckAll}
                                            checked={체크리스트.length===state.장바구니.length}                                          
                                        />
                                        <span>전체선택 (0/0)</span>    
                                    </label>    
                                    <button onClick={onClickDeleteSelect}>선택삭제</button>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="payment-box">                        
                                <ul>
                                    <li><strong>상품금액</strong><span>{Number(상품금액합계).toLocaleString('ko-KR')}원</span></li>
                                    <li><strong>상품할인금액</strong><span>{Number(상품할인금액합계).toLocaleString('ko-KR')}원</span></li>
                                    <li><strong>배송비</strong><span>{Number(배송비합계).toLocaleString('KO-KR')}원</span></li>
                                    <li><hr /></li>
                                    <li><strong>결제예정금액</strong><span>{Number(결제예정금액합계).toLocaleString('ko-KR')}원</span></li>
                                </ul>
                            </div>                            
                            <div className="button-box">
                                <button>로그인</button>                               
                            </div>
                            <div className="info-box">
                                <p>
                                    [주문완료] 상태일 경우에만 주문 취소 가능합니다.<br/>
                                    [마이컬리  &gt; 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
