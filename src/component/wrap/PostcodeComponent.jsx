import React, { useState } from 'react';
import Postcode from 'react-daum-postcode';
import './scss/PostcodeComponent.scss';
import { setAddress } from '../../store/address';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

export default function PostcodeComponent({kakaoModalClose}) {
    
    // 쿠키 선언
    const [cookie, setCookie] = useCookies();

    const dispatch = useDispatch();

    const [state, setState] = useState({
        카카오주소검색API: true,
        우편번호: '',
        주소1: '',
        주소2: ''
    });

    // 카카오 주소검색 함수
    const onCompletePostCode=(data)=>{
        
        let 주소1 = '';
        var addrR = ''; // 주소 변수
        var addrJ = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addrR = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addrJ = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            주소1 = `${addrR} ${extraAddr}`;
        }   
        else {
            주소1 = addrJ;
        }

        setState({
            ...state,
            우편번호: data.zonecode,
            주소1: 주소1,
            카카오주소검색API: false
        });
    }

    const onClickApiModalOpen=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            카카오주소검색API: true
        })
    }

    // 주소2 저장
    const onChangeAddr2Input=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }

    const onClickModalClose=(e)=>{
        e.preventDefault();
        kakaoModalClose();
    }

    // 주소 저장 버튼 클릭이벤트
    const onSubmitAddressSave=(e)=>{
        e.preventDefault();

        if(state.주소1==='' || state.주소2==='') {
            alert('주소1, 주소2 모두 입력하세요!');
            return;
        }
        else {
            // 리덕스에 payload 저장
            // payload 생성
            const obj = {
                우편번호: state.우편번호,
                주소1: state.주소1,
                주소2: state.주소2
            }
            // 디스패치=> 리듀서에 저장
            dispatch(setAddress(obj));
            // 카카오 검색 컴포넌트 닫기
            kakaoModalClose();

            // 쿠키저장
            // 쿠키 4요소 : name, value, path, expires
            const name = 'KAKAO_ADDRESS_API_SHHH'
            const value = {
                key: 'shhh_128',
                우편번호: state.우편번호,
                주소1: state.주소1,
                주소2: state.주소2
            }

            // 만료기한(expires)
            let date = new Date();
            date.setDate(date.getDate()+1);

            // 쿠키 설정
            setCookie(name, JSON.stringify(value), {path:'/', expires: date});

            // 저장 확인
            // name => KAKAO_ADDRESS_API_SHHH
            // value => %7B%22key%22%3A%22shhh_128%22%2C%22%EC%9A%B0%ED%8E%B8%EB%B2%88%ED%98%B8%22%3A%2208212%22%2C%22%EC%A3%BC%EC%86%8C1%22%3A%22%EC%84%9C%EC%9A%B8%20%EA%B5%AC%EB%A1%9C%EA%B5%AC%20%EA%B2%BD%EC%9D%B8%EB%A1%9C%20577%20%20(%EC%8B%A0%EB%8F%84%EB%A6%BC%EB%8F%99)%22%2C%22%EC%A3%BC%EC%86%8C2%22%3A%22104%22%7D

            // 쿠키 가져오기
            // 쿠키 이름, 쿠키 값 key 미리 숙지 메모해둬야함
            // key: 'shhh_128',
            // 1. 회원가입폼
            // 2. 헤더 배송지
        }      
    }

    return (
        <div id='postcode'>
            <div className="container">
                <div className="title">
                    <strong><img src="./images/favicon-32x32.png" alt="" /></strong>
                    <h2>컬리 - 마켓컬리/뷰티컬리</h2>
                    <button onClick={onClickModalClose}>×</button>
                </div>
                <div className="content">
                    {/* 주소 입력 받는 폼 */}
                    <ul className='addr-form'>
                        <li>
                            <h2>
                                <strong>샛별배송</strong><span>지역입니다.</span>
                            </h2>
                            <p>
                                매일 새벽, 문 앞까지 신선함을 전해드려요.
                            </p>
                        </li>
                        <li>
                            <form onSubmit={onSubmitAddressSave}>
                                <div className="row row1">
                                    <input 
                                        type="text" 
                                        id='addr1' 
                                        name='addr1' 
                                        value={state.주소1} 
                                        disabled={true}
                                    />
                                    <button onClick={onClickApiModalOpen}>재검색</button>
                                </div>
                                <div className="row row2">
                                    <input 
                                        type="text" 
                                        id='addr2' 
                                        name='addr2' 
                                        onChange={onChangeAddr2Input}
                                        value={state.주소2}
                                    />                                
                                </div>
                                <div className="row row3">
                                    <p>
                                        ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.<br />
                                        로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                                    </p>
                                </div>
                                <div className="row row4">
                                    <button type='submit'>저장</button>
                                </div>
                            </form>
                        </li>
                        <li>
                            <p>
                                일부 관공서, 학교, 병원, 시장, 공단지역, 산간지역, 백화점 등은 현장 상황에 따라 샛별배송이 불가능할 수 있습니다.
                            </p>
                        </li>
                    </ul>
                    {/* 주소검색 API */}
                {
                    state.카카오주소검색API &&
                    <Postcode
                        style={{height: '100%'}}
                        className='address-search-api'
                        onComplete={onCompletePostCode}    
                    />
                }
                </div>
            </div>
        </div>
    );
}