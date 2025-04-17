import React,{useEffect, useState} from 'react';
import './scss/SubComponent.scss';
import './scss/ProductViewComponent.scss';
import { useDispatch } from 'react-redux';
import { setViewProductAction } from '../../../store/viewProduct';
import { cartAction } from '../../../store/cart';

export default function ProductViewComponent() {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        '지금본상품': {
            '상품번호': '', 
            '상품명': '', 
            '정가': '', 
            '상품이미지': '', 
            '상품설명': '', 
            '배송': '', 
            '할인율': '', 
            '판매자': '', 
            '원산지': '', 
            '포장타입': {}, 
            '판매단위': '', 
            '중량/용량': '', 
            '소비기한 또는 유통기한 정보': '', 
            '안내사항': '', 
            '상품선택': [], 
            '필터': '',
            '카테고리': '', 
            '혜택': '', 
            '유형': '', 
            '프로모션': '', 
            '알레르기정보': [], 
            '리뷰': ''
        }
    })

    useEffect(()=>{
            if(localStorage.getItem('view_product')!==null ){
                const result = JSON.parse(localStorage.getItem('view_product'));               
                let obj = {
                    지금본상품: result
                }

                setState({
                    '지금본상품': {
                        ...state.지금본상품,
                        '상품번호': obj.지금본상품.상품번호, 
                        '상품명': obj.지금본상품.상품명, 
                        '정가': obj.지금본상품.정가, 
                        '상품이미지': obj.지금본상품.상품이미지, 
                        '상품설명': obj.지금본상품.상품설명, 
                        '배송':  obj.지금본상품.배송, 
                        '할인율': obj.지금본상품.할인율, 
                        '판매자': obj.지금본상품.판매자, 
                        '원산지': obj.지금본상품.원산지, 
                        '포장타입': obj.지금본상품.포장타입,  
                        '판매단위' : obj.지금본상품.판매단위,  
                        '중량/용량': obj.지금본상품['중량/용량'], 
                        '소비기한 또는 유통기한 정보': obj.지금본상품['소비기한 또는 유통기한 정보'],  
                        '안내사항': obj.지금본상품.안내사항, 
                        '상품선택': obj.지금본상품.상품선택,  
                        '필터': obj.지금본상품.필터, 
                        '카테고리': obj.지금본상품.카테고리,  
                        '혜택': obj.지금본상품.혜택,  
                        '유형': obj.지금본상품.유형,  
                        '프로모션': obj.지금본상품.프로모션, 
                        '알레르기정보': obj.지금본상품.알레르기정보, 
                        '리뷰': obj.지금본상품.리뷰,
                    }
                })

                let result2 = [];
                // 로컬스토리지 저장소
                if(localStorage.getItem('view_product_list')!==null ){
                    result2 = JSON.parse(localStorage.getItem('view_product_list'));                   
                }
                else{
                    result2 = []; 
                }

                obj = {
                    ...obj,
                    최근본상품: result2
                }

                dispatch(setViewProductAction(obj))
            }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 셀렉트박스 목록 on 상태변수
    const [isSelect, setIsSelect] = useState(false);
    // 총합계
    const [sum, setSum] = useState(0);
    const [list, setList] = useState({
        상품선택: []
    });

    // 로딩시 자동 계산 내용 수량, 판매가, 상품금액
    // 지금본상품 상품의 정보를 판매가, 수량, 상품금액
    useEffect(()=>{
        if(state.지금본상품.상품선택<=0){
            // 상품선택 옵션이 있다면 상품선택: []
            // 상태변수 추가
            // 상품선택 목록 selectList
            // 옵션 있는거, 없는거
            setList({
                상품선택: [
                    {
                        ...state.지금본상품,
                        판매가: Math.round(state.지금본상품.정가 * (1-state.지금본상품.할인율)),
                        수량: 1,
                        상품금액: 1 * Math.round(state.지금본상품.정가 * (1-state.지금본상품.할인율))
                    }
                ]
            })
        }
        else{
            setList({
                상품선택: []
            })
        }
    },[state.지금본상품]);


    // 상세페이지 이벤트 컨트롤러 구현

    // 1. 상품선택 : [] 빈배열 => 옵션이 없는 상품선택
    // 셀렉트박스 버튼 안보임
    // 상품선택 박스 =================================
    // 기본 상품명, 정가, 판매가, 수량증가, 감소 버튼 보임
    // 총 합계금액 자동 계산
    
    // 2. 상품선택 : [{...},{...}] 옵션이 있는 상품선택
    // 셀렉트박스 버튼 보임
    // 셀렉트 선택 목록 클릭시 선택상품 아래에 계속 추가
    // 셀렉트 선택 목록 클릭시 선택상품이 중복되면 이미 추가한 상품입니다. 메시지
    // 상품선택 박스 =================================
    // 상품선택, 상품명, 정가, 판매가, 수량증가, 감소 버튼 보임
    // 반복문 구현 목록 출력
    // 총 합계금액 자동 계산

    // 셀렉트박스 버튼 클릭 이벤트 리스너
    // 토글 기능 구현
    const onClickSelectBtn=(e)=>{
        e.preventDefault();
        setIsSelect(!isSelect);
    }

    // 로딩시 총합계 자동 계산
    useEffect(()=>{        
        // 상품선택 판매가 합계 = 수량1 * (정가 * (1-할인율))
        // 누적 연산 리듀스 reduce()
        let imsi = list.상품선택.reduce((acc, item)=> acc + item.상품금액, 0); 
        setSum(imsi);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[list]);
    
    // 상품선택 상품번호, 상품명이 일치한 상품 수량 증가 버튼 클릭 이벤트
    const onClickIncrement=(e, {상품번호, 상품명})=>{
        e.preventDefault();
        // 지금 상품 수량 증가 판매금액 연산 구현
        const 상품선택 = list.상품선택.map((item)=>
                        (item.상품번호===상품번호 && item.상품명===상품명) ? 
                            {
                                ...item, 
                                수량: (item.수량+1), 
                                상품금액: (item.수량+1) * item.판매가
                            } 
                        : 
                            {...item}
        );

        // 상태변수에 저장
        setList({
            ...list,
            상품선택: 상품선택
        })
    }

    // 상품선택 상품번호, 상품명이 일치한 상품 수량 감소 버튼 클릭 이벤트
    const onClickDecrement=(e, {상품번호, 상품명})=>{
        e.preventDefault();

        // 지금 상품 수량 증가 판매금액 연산 구현
        const 상품선택 = list.상품선택.map((item)=>
                        (item.상품번호===상품번호 && item.상품명===상품명) ? 
                            {
                                ...item, 
                                수량: (item.수량-1)<=1 ? 1 : (item.수량-1), 
                                상품금액: (item.수량-1)<=1 ? (1 * item.판매가) : ((item.수량-1) * item.판매가)
                            } 
                        : 
                            {...item}
        );

        // 상태변수에 저장
        setList({
            ...list,
            상품선택: 상품선택
        })
    }

    // 옵션 목록 선택 이벤트 구현
    const onClickOptionSelect=(e, {상품선택, 선택옵션상품})=>{
        e.preventDefault();

        // 중복검사
        let res = [];
        res = list.상품선택.map((item)=>item.상품명.includes(선택옵션상품.상품명));

        if(res.includes(true)){
            alert('이미 추가된 옵션입니다.')
        }
        else{
            // 상품을 아래 상품선택 박스에 추가 컨트롤러
            // 상태변수 list 상품선택에 추가한다
            // 판매가 계산
            // 상품금액 계산
            // 상품명 설정
            // 정가 설정
            // 수량 기본 수량: 1
            // 중복된 상품은 추가 안된다
            setList({
                ...list,
                상품선택: [
                    {
                        ...상품선택,
                        상품명: 선택옵션상품.상품명,
                        정가: 선택옵션상품.정가,
                        판매가: Math.round(선택옵션상품.정가 * (1-상품선택.할인율)),
                        수량: 1,
                        상품금액: 1 * Math.round(선택옵션상품.정가 * (1-상품선택.할인율))
                    },
                    ...list.상품선택
                ]
            })
        }
        res = [];
        setIsSelect(false);
    }

    // 옵션 목록 삭제
    const onClickDeleteOption=(e, {상품번호, 상품명})=>{
        e.preventDefault();
        // const res = list.상품선택.filter((item)=>!(item.상품번호.includes(상품번호) && item.상품명.includes(상품명)));
        const res = list.상품선택.filter((item)=>!(item.상품번호===상품번호 && item.상품명===상품명));
        setList({
            상품선택: res
        })
    }

    // 3. 장바구니 담기
    // 3-1 list.상품선택을 저장소 로컬스토리지 저장
    // 3-2 list.상품선택을 리덕스 리듀서 상태관리 저장

    // list.상품선택을 장바구니에 이미 등록된 상품이 있다면(중복상품) 수량 계산, 상품금액 계산 합산
    // list.상품선택을 장바구니에 등록된 상품이 없다면 상품 1행 전체 추가
    const onClickCartAppend=(e)=>{
        e.preventDefault();

        let cartStorage = [];

        // 2. 장바구니 가져오기 null 데이터 처리 예외 처리
        if(localStorage.getItem('CART_PRODUCT_2025')!==null){
            // 3. 장바구니 가져오기 => 객체 형식으로 변환 처리
            cartStorage = JSON.parse(localStorage.getItem('CART_PRODUCT_2025'));
            // console.log(cartStorage);
        }
        

        // 4. 중복검사 시작
        // 장바구니 저장하기
        // 중복된 상품 있는지 검사
        // 전체상품 순회하면 중복검사 비교 검증
        let res = [];  // true 또는 false
        list.상품선택.map((상품선택_item)=>{
            res = cartStorage.map((카트_item2)=>(카트_item2.상품번호===상품선택_item.상품번호 && 카트_item2.상품명===상품선택_item.상품명)?true:false)

            if(res.includes(true)){
                // 중복 상품은 장바구니 데이터 중 수량, 상품금액 계산 데이터 수정한다.
                cartStorage = cartStorage.map((카트_item2)=>(카트_item2.상품번호===상품선택_item.상품번호 && 카트_item2.상품명===상품선택_item.상품명)?{...카트_item2, 수량: (카트_item2.수량 + 상품선택_item.수량), 상품금액: (카트_item2.수량 + 상품선택_item.수량) * 카트_item2.판매가}:{...카트_item2});
                // return console.log('중복된 상품입니다.');
            }
            else{
                // 장바구니에 추가
                cartStorage = [상품선택_item, ...cartStorage];
                // return console.log('중복이 안된 추가 가능한 상품입니다.');
            }
    
            // 1. 객체 형식으로 선언 등록
            let obj = {
                장바구니: cartStorage
            }
    
            // 데이터 형식 확인 => 리듀서 {'장바구니": []}
            // console.log(obj);
            // console.log(obj.장바구니);  // 로컬스토리지
    
            // 최종 장바구니에 저장
            localStorage.setItem('CART_PRODUCT_2025', JSON.stringify(obj.장바구니));  // 저장소
            dispatch(cartAction(obj));  // 리덕스 리듀서
        })
        alert('장바구니에 상품이 추가되었습니다. 장바구니를 확인해주세요.');
    }

    return (
        <main id='productViewPage' className='sub-page'>
            <section id="section1">
            <div className="container">                   
                    <div className="content">
                        <div className="left">
                            <div className="gap">
                                <img src={state.지금본상품.상품이미지} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="gap">
                                <div className="row1 row">
                                    <h6>{state.지금본상품.배송}</h6>
                                    <h2>{state.지금본상품.상품명}</h2>
                                    <p>{state.지금본상품.상품설명}</p>
                                    <h3><strong>{Math.round(state.지금본상품.할인율*100)}%</strong><span>{Number(Math.round(state.지금본상품.정가*(1-state.지금본상품.할인율))).toLocaleString('ko-KR')}</span><i>원~</i></h3>
                                    <h4>{Number(state.지금본상품.정가).toLocaleString('ko-KR')}원<i><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><circle cx="10.5" cy="10.5" r="6.9" stroke="#ccc" strokeWidth="1.2"></circle><path fillRule="evenodd" clipRule="evenodd" d="M9.19735 8.7317H7.80005C7.84762 7.32251 8.81681 6.2998 10.5828 6.2998C12.2119 6.2998 13.3 7.23926 13.3 8.55332C13.3 9.46305 12.8482 10.0993 12.0395 10.5809C11.2606 11.0387 11.0406 11.342 11.0406 11.9306V12.2695H9.66113L9.65518 11.8652C9.60167 10.9733 9.94654 10.4382 10.7671 9.95656L10.9414 9.84757C11.5443 9.45619 11.7541 9.14643 11.7541 8.60683C11.7541 7.98845 11.2546 7.54251 10.5055 7.54251C9.73843 7.54251 9.24491 8.00629 9.19735 8.7317ZM9.42924 14.1603C9.42924 14.7312 9.82167 15.1058 10.4163 15.1058C11.0228 15.1058 11.4033 14.7312 11.4033 14.1603C11.4033 13.5836 11.0228 13.209 10.4163 13.209C9.82167 13.209 9.42924 13.5836 9.42924 14.1603Z" fill="#CCCCCC"></path></svg></i></h4>
                                    <h5>
                                        <a href="!#" onClick={(e)=>e.preventDefault()}>
                                            <i>
                                                <strong>첫 구매라면 </strong>
                                                <em>10,000원</em>
                                                <span> 즉시 할인</span>
                                            </i>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="gfk9q0rhta" d="M1.657 1.657L9.657 1.657 9.657 9.657"></path></defs><g fill="none" fillRule="evenodd"><g><g><g><g transform="translate(-339 -398) translate(0 386) translate(339 12) translate(4.69 6.343)"><use stroke="#5f0080" strokeLinecap="round" strokeWidth="1.2" strokeLinejoin="round" transform="rotate(45 5.657 5.657)" href="#gfk9q0rhta"></use></g></g></g></g></g></svg>
                                        </a>
                                    </h5>
                                </div>
                                <div className="row2 row">
                                    <ul>
                                        <li>
                                            <div className="gap">
                                                <div className="left">
                                                    <strong>배송</strong>
                                                </div>
                                                <div className="right">
                                                    <h3>{state.지금본상품.배송}</h3>
                                                    <p>23시 전 주문 시 수도권/충청 내일 아침 7시 전 도착<br />
                                                    (그 외 지역 아침 8시 전 도착)</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="gap">
                                                <div className="left">
                                                    <strong>판매자</strong>
                                                </div>
                                                <div className="right">
                                                    <h3>{state.지금본상품.판매자}</h3>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="gap">
                                                <div className="left">
                                                    <strong>포장타입</strong>
                                                </div>
                                                <div className="right">
                                                    <h3>{state.지금본상품.포장타입.보관방법} ({state.지금본상품.포장타입.포장구분})</h3>
                                                    <p>{state.지금본상품.포장타입.포장설명}</p>
                                                </div>
                                            </div>
                                        </li>
                                    {
                                        state.지금본상품.판매단위 &&
                                        <li>
                                            <div className="gap">
                                                <div className="left">
                                                    <strong>판매단위</strong>
                                                </div>
                                                <div className="right">
                                                    <h3>{state.지금본상품.판매단위}</h3>                                                    
                                                </div>
                                            </div>
                                        </li>
                                    }
                                    {
                                        state.지금본상품['중량/용량'] &&
                                        <li>
                                            <div className="gap">
                                                <div className="left">
                                                    <strong>중량/용량</strong>
                                                </div>
                                                <div className="right">
                                                    <h3>{state.지금본상품['중량/용량']}</h3>                                                    
                                                </div>
                                            </div>
                                        </li>
                                    }
                                    {
                                        state.지금본상품.알레르기정보.length>0 &&
                                        <li>
                                            <div className="gap">
                                                <div className="left">
                                                    <strong>알레르기정보</strong>
                                                </div>
                                                <div className="right">
                                                    <h3>
                                                        {
                                                            state.지금본상품.알레르기정보.map((item, idx)=>
                                                                <p key={idx}>
                                                                    {
                                                                        item.제목 &&
                                                                        <>
                                                                            <span>{item.제목}</span><br/>
                                                                        </>
                                                                    }
                                                                    <span>{item.내용}</span><br/>
                                                                </p>
                                                            )
                                                        }
                                                    </h3>                                                    
                                                </div>
                                            </div>
                                        </li>
                                    }
                                        <li>
                                            <div className="gap">
                                                <div className="left">
                                                    <strong>상품 선택</strong>
                                                </div>
                                                <div className="right">
                                                    <div className='gap'>
                                                        {/* 상품 목록 박스 */}
                                                        <div className="list">
                                                        {
                                                            state.지금본상품.상품선택.length > 0 &&
                                                            <>
                                                                {/* 상품 선택 버튼 */}
                                                                <button onClick={onClickSelectBtn}>
                                                                    상품을 선택해주세요
                                                                    <span className='icon-select-arrow'><svg focusable="false"  viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg></span>
                                                                </button>

                                                                {/* 상품 선택 목록 */}   
                                                                <div className={`select-box${isSelect?' on':''}`}>                                                                
                                                                    {/* 상품번호, 할인율, 상품선택 */}
                                                                    {
                                                                        state.지금본상품.상품선택.map((item)=>
                                                                            <a href='!#' key={item.상품명} onClick={(e)=>onClickOptionSelect(e, {상품선택: state.지금본상품, 선택옵션상품: item})}>
                                                                                <span>{item.상품명}</span> 
                                                                                <span>
                                                                                    <em>{Number(item.정가).toLocaleString('ko-KR')}원</em>
                                                                                    <strong>{Number(Math.round(item.정가 * (1-state.지금본상품.할인율))).toLocaleString('ko-KR')}원</strong>
                                                                                </span>
                                                                            </a>
                                                                        )
                                                                    }                                      
                                                                </div>
                                                            </>
                                                        }
                                                        </div>
                                                    {
                                                        state.지금본상품.상품선택.length > 0 ?
                                                            // list.상품선택.length > 0 &&
                                                            list.상품선택.map((item)=>
                                                                <div className="num-count-box" key={item.상품명}> 
                                                                    <div className="row1">
                                                                        <span>{item.상품명}</span>
                                                                        <button onClick={(e)=>onClickDeleteOption(e, {상품번호: state.지금본상품.상품번호, 상품명: item.상품명})}><img src="./images/sub/product_view/icon_option_delete.svg" alt="" /></button>
                                                                    </div>    
                                                                    <div className="row2">
                                                                        <div className="button-box">
                                                                            <button onClick={(e)=>onClickDecrement(e, {상품번호: state.지금본상품.상품번호, 상품명: item.상품명})}>-</button>
                                                                            <span>{item.수량}</span>
                                                                            <button onClick={(e)=>onClickIncrement(e, {상품번호: state.지금본상품.상품번호, 상품명: item.상품명})}>+</button>
                                                                        </div>
                                                                        <div className="price-box">
                                                                            <strong>{Number(item.정가).toLocaleString('ko-KR')}원</strong>
                                                                            <em>{Number(item.판매가).toLocaleString('ko-KR')}원</em>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        :
                                                        <div className="num-count-box"> 
                                                            <div className="row1">
                                                                <span>{state.지금본상품.상품명}</span>                                                                
                                                            </div>    
                                                            <div className="row2">
                                                                <div className="button-box">
                                                                    <button onClick={(e)=>onClickDecrement(e, {상품번호: state.지금본상품.상품번호, 상품명: state.지금본상품.상품명})}>-</button>
                                                                    <span>{list.상품선택.length > 0 ? list.상품선택[0].수량 : 1}</span>
                                                                    <button onClick={(e)=>onClickIncrement(e, {상품번호: state.지금본상품.상품번호, 상품명: state.지금본상품.상품명})}>+</button>
                                                                </div>
                                                                <div className="price-box">
                                                                    <strong>{state.지금본상품.정가.toLocaleString('ko-KR')}원</strong>
                                                                    <em>{Number(Math.round(state.지금본상품.정가*(1-state.지금본상품.할인율))).toLocaleString('ko-KR')}원</em>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                    }
                                                    </div>                                                    
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row3 row">
                                    <div className="gap">
                                        <em>총 상품금액 :</em><strong>{Number(sum).toLocaleString('ko-KR')}</strong><span>원</span>
                                    </div>
                                </div>
                                <div className="row4 row">
                                    <div className="gap">
                                        <button><img src="./images/sub/product_view/icon_heart.svg" alt="" /></button>
                                        <button><img src="./images/sub/product_view/icon_bell.svg" alt="" /></button>
                                        <button onClick={onClickCartAppend}>장바구니 담기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                
            </section>
        </main>
    );
}