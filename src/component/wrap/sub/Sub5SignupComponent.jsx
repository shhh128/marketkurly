import React, { useEffect, useRef, useState } from 'react';
import './scss/Sub5SignupComponent.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import InputComponent from './use_custom_component/InputComponent';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

export default function Sub5SignupComponent({kakaoModalOpen}) {

    // 회원가입 되면 메인페이지로 이동
    const navigate = useNavigate();
    // 리듀서 데이터 가져오기
    const address = useSelector((state)=>state.address);
    const refEmail = useRef();
    const [state, setState]= useState({
        아이디:'',
        아이디_가이드텍스트:'',
        아이디유효성검사:null,
        아이디중복검사:null,
        비밀번호1:'',
        비밀번호1_가이드텍스트:'',
        비밀번호2:'',
        비밀번호2_가이드텍스트:'',        
        비밀번호유효성검사:null,
        이름:'',
        이름_가이드텍스트:'',
        이름유효성검사:null,
        이메일1:'',
        이메일2:'',
        이메일리스트: false,
        이메일_가이드텍스트:'',
        이메일입력불가: true,  // 입력상자 입력 유무
        이메일회사리스트: [],
        이메일유효성검사:null,
        이메일중복검사:null,
        휴대폰:'',
        휴대폰_가이드텍스트:'',
        휴대폰인증번호발급:null,
        휴대폰인증번호입력:null,
        휴대폰유효성검사:null,
        주소유효성검사:null,
        성별:'선택안함',
        생년: '',
        생월: '',
        생일: '',
        생년월일_가이드텍스트:'',
        추가입력사항:'',
        추천인아이디:'',
        이용약관: [
            '이용약관 동의(필수)',
            '개인정보 수집∙이용 동의(필수)',
            '개인정보 수집∙이용 동의(선택)',
            '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
            'SMS',
            '이메일',
            '본인은 만 14세 이상입니다.(필수)'
        ],
        이용약관동의: [],
        이용약관동의유효성검사:null
    });

    // 주소 상태관리
    const [delivery, setDelivery] = useState({
        우편번호:'',
        주소1:'',
        주소2:''
    });

    // 감시자
    useEffect(()=>{
        setTimeout(()=>{
            setDelivery({
                우편번호: address.우편번호,
                주소1: address.주소1,
                주소2: address.주소2
            })
        }, 10)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    useEffect(()=>{
        let 주소유효성검사 = null;
        if(delivery.주소1!=='' && delivery.주소2!==''){
            주소유효성검사 = true;
        }   
        else {
            주소유효성검사 = false;
        }     
        setState({
            ...state,
            주소유효성검사: 주소유효성검사
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delivery.주소1, delivery.주소2]);

    const axiosApi=()=>{
        axios({
            url: './data/sub/sub5.json',
            method: 'GET'
        })
        .then((res)=>{
            setState({
                ...state,
                이메일회사리스트: res.data.이메일회사리스트
            })
        })
        .catch((err)=>{
            console.log( err );
        });
    }

    useEffect(()=>{
        axiosApi();       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 1. 아이디 입력 
    // - 입력제한조건 => 정규표현식
    //   1) 6자 이상 16자 이하
    //   2) 영문 필수(1자이상 +) 숫자 선택(0자이상 *) 조합
    // - 가이드텍스트 : "6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합"
    // + 1자이상
    // * 0자이상
    // ? 1자
    // . 문자
    // {6,}  6자이상 범위
    // {6,16} 6자 ~ 16자 범위
    // 전체 g 시작 ^ 과 끝 $ 모든문자 검사
    const onChangeUserId=(e)=>{
        let regExp1 = /^(.){6,16}$/g;        // 6자 이상 16자 이하
        let regExp2 = /^[A-Za-z]+[0-9]*$/g;  // 영문 필수 숫자 선택
        let 아이디 = e.target.value;
        let 아이디_가이드텍스트 = '';
        let 아이디유효성검사 = null;
        let 아이디중복검사 = null;

        if(regExp1.test(아이디)===false || regExp2.test(아이디)===false){
            아이디_가이드텍스트 = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
            아이디유효성검사=false;
            아이디중복검사=false;
        }
        else {
            아이디_가이드텍스트 = ''; // 없어도됨
            아이디유효성검사=true;
            아이디중복검사=true;
        }
        
        setState({
            ...state,
            아이디: 아이디,
            아이디_가이드텍스트: 아이디_가이드텍스트,
            아이디유효성검사: 아이디유효성검사,
            아이디중복검사: 아이디중복검사
        })
    }
    
    // 2. 비밀번호(userPw)
    // - 자료형: 문자열 String
    // - 상태변수: 비밀번호1
    // - 상태변수: 비밀번호1_가이드텍스트
    // - 가이드텍스트1 : "최소 10자 이상 입력"
    // - 가이드텍스트2 : "동일한 숫자 3개 이상 연속 사용 불가"
    // - 가이드텍스트3 : "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
    // - 입력제한조건 
    //   1) 10자 이상 16자이하
    //   2) 공백제외  [^부정]  [긍정]
    //   3) 동일한 숫자[digit] 3개 이상 연속 사용 불가
    //   4) 영문+숫자 조합
    //   5) 영문+특수문자 조합
    //   6) 숫자+특수문자 조합
    // - 입력상자 입력 이벤트
    // - 입력제한조건 정규표현식
    // \\
    // \]
    // (?=.*[])+  반드시 포함
    // [0-9] 숫자
    // [\d]  숫자
    // /(\d)\1\1/g; 소괄호 사용
    const onChangeUserPw1=(e)=>{
        const regExp1 = /^(.){10,16}$/g;  // 10자 이상 16자 이하
        const regExp2 = /(\d)\1\1/g;     // 동일한 숫자 3개 이상 연속 사용 불가
        // const regExp2 = /([0-9])\1\1/g;
        const regExp3 = /^[\s]$/g;        // 공백 제외
        const regExp4 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()-_=+[\]{}\\|;:'",.<>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()-_=+[\]{}\\|;:'",.<>/?])+)/g;  // 영문, 숫자, 특수문자 중 2개 이상 조합
        let 비밀번호1 = e.target.value;
        let 비밀번호1_가이드텍스트 = '';
        let 비밀번호유효성검사 = null;

        if(regExp1.test(비밀번호1)===false){
            비밀번호1_가이드텍스트 = '최소 10자 이상 입력';
            비밀번호유효성검사 = false;
        }
        else if(regExp2.test(비밀번호1)===true){
            비밀번호1_가이드텍스트 = '동일한 숫자 3개 이상 연속 사용 불가';
            비밀번호유효성검사 = false;
        }
        else if(regExp3.test(비밀번호1)===true || regExp4.test(비밀번호1)===false){
            비밀번호1_가이드텍스트 = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            비밀번호유효성검사 = false;
        }
        else {
            비밀번호1_가이드텍스트 = ''; // 없어도됨
            비밀번호유효성검사 = true;
        }
        setState({
            ...state,
            비밀번호1: 비밀번호1,
            비밀번호1_가이드텍스트: 비밀번호1_가이드텍스트,
            비밀번호유효성검사: 비밀번호유효성검사
        })
    }

    // 3. 비밀번호(userPw) 확인
    // 동일한 비밀번호를 입력
    const onChangeUserPw2=(e)=>{
        let 비밀번호2 = e.target.value;
        let 비밀번호2_가이드텍스트 = '';
        let 비밀번호유효성검사 = null;

        if(state.비밀번호1 === 비밀번호2){
            비밀번호2_가이드텍스트 = '';
            비밀번호유효성검사 = true;
        }
        else{
            비밀번호2_가이드텍스트 = '동일한 비밀번호를 입력';
            비밀번호유효성검사 = false;
        }
        setState({
            ...state,
            비밀번호2: 비밀번호2,
            비밀번호2_가이드텍스트: 비밀번호2_가이드텍스트,
            비밀번호유효성검사: 비밀번호유효성검사
        })
    }

    // 4. 이름
    // 1자 ~ 21자 제한
    // 특수문자 입력과 동시에 삭제 한다. 정규표현식
    // [`~!#$%^&*()-_=+\\|[{\]}'";:/?.>,<]
    // "이름을 입력해 주세요."
    const onChangeUserName=(e)=>{
        let 이름 = '';
        let 이름_가이드텍스트 = '';
        let regExp = /[`~!#$%^&*()-_=+\\|[{\]}'";:/?.>,<]/g;
        let 이름유효성검사 = null;

        // 특수문자 입력시 삭제
        이름 = e.target.value.replace(regExp, '');
        if(이름===''){
            이름_가이드텍스트 = '이름을 입력해 주세요.';
            이름유효성검사 = false;
        }
        else {
            이름_가이드텍스트 = '';
            이름유효성검사 = true;
        }
        setState({
            ...state,
            이름: 이름,
            이름_가이드텍스트: 이름_가이드텍스트,
            이름유효성검사: 이름유효성검사
        })
    }


    // 5. 이메일
    // moonseonjong => 사용불가능 @ 좌측  @ ( ) \ , ; : " 공백
    // @ 
    // naver.com => 사용가능 . ~
    // "사용 가능한 이메일 입니다."
    // "이메일 형식으로 입력해 주세요."

    // 이메일 리스트 토글버튼 
    const onClickListBtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            이메일리스트: !state.이메일리스트
        });
    }

    // 이메일1 회사 선택 이벤트
    const onChangeUserEmail1=(e)=>{
        let 이메일1 = e.target.value;
        let 이메일_가이드텍스트 = '';
        const regExp1 = /[@()\\,;:"]/g;  // true이면 안되고
        // const regExp2 = /[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g;  // false 안되고
        const regExp2 = /[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+[\]{}|'.<>/?]/g;
        let 이메일유효성검사 = null;
        let 이메일중복검사 = null;

        if(state.이메일2==='' || regExp1.test(e.target.value)===true || regExp2.test(e.target.value)===false){
            이메일_가이드텍스트 = '이메일 형식으로 입력해 주세요.';
            이메일유효성검사 = false;
            이메일중복검사 = false;
        }
        else {
            이메일_가이드텍스트 = '사용 가능한 이메일 입니다.';
            이메일유효성검사 = true;
            이메일중복검사 = true;
        }

        setState({
            ...state,
            이메일1: 이메일1,
            이메일_가이드텍스트: 이메일_가이드텍스트,
            이메일유효성검사: 이메일유효성검사,
            이메일중복검사: 이메일중복검사
        })
    }

    // 이메일2 직접 입력 이벤트
    const onChangeUserEmail2=(e)=>{
        let 이메일2 = e.target.value;
        let 이메일_가이드텍스트 = '';
        const regExp = /[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ~.]/g;
        let 이메일유효성검사 = null;
        let 이메일중복검사 = null;

        if(regExp.test(e.target.value)===false){
            이메일_가이드텍스트 = '이메일 형식으로 입력해 주세요.';
            이메일유효성검사 = false;
            이메일중복검사 = false;
        }
        else {
            이메일_가이드텍스트 = '사용 가능한 이메일 입니다.';
            이메일유효성검사 = true;
            이메일중복검사 = true;
        }

        setState({
            ...state,
            이메일2: 이메일2,
            이메일_가이드텍스트: 이메일_가이드텍스트,
            이메일유효성검사: 이메일유효성검사,
            이메일중복검사: 이메일중복검사
        })
    }

    // 이메일1 이메일2
    useEffect(()=>{
        // 정규표현식
        let 이메일_가이드텍스트='';
        let 이메일유효성검사 = null;
        let 이메일중복검사 = null;
        if(state.이메일1!=='' && state.이메일2!==''){
            이메일_가이드텍스트 = '사용 가능한 이메일 입니다.';
            이메일유효성검사 = true;
            이메일중복검사 = true;
        }
        else {
            이메일_가이드텍스트 = '이메일 형식으로 입력해 주세요.';
            이메일유효성검사 = false;
            이메일중복검사 = false;
        }
        setState({
            ...state,
            이메일_가이드텍스트: 이메일_가이드텍스트,
            이메일유효성검사: 이메일유효성검사,
            이메일중복검사: 이메일중복검사
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.이메일1, state.이메일2]);

    // 이메일2 회사 선택 이벤트
    const onClickEmailCompany=(e, 이메일회사)=>{
        e.preventDefault();
        let 이메일2 = '';
        let 이메일입력불가 = true;

        if(이메일회사==='직접 입력'){
            이메일2 = '';
            이메일입력불가 = false; // 입력상자 사용가능
        }
        else{
            이메일2 = 이메일회사;
            이메일입력불가 = true; // 입력상자 사용뷸가
        }

        setState({
            ...state,
            이메일2: 이메일2,
            이메일리스트: false,
            이메일입력불가: 이메일입력불가
        })
    }

    // 이메일입력불가 감시자
    useEffect(()=>{
       refEmail.current.focus();  // 커서 입력 대기상태
    },[state.이메일입력불가]);

    // 6. 휴대폰 입력
    const onChangeUserHp=(e)=>{
        let 휴대폰 = '';
        const regExp = /[^0-9]/g;

        휴대폰 = e.target.value.replace(regExp, '');

        setState({
            ...state,
            휴대폰: 휴대폰
        })
    }

    // 휴대폰 인증번호 받기
    // 6자리 난수(random)
    // 휴대폰번호 검증 정규표현식
    // 인증번호 발급
    // 전송(경고창 띄우기) 모달창
    const onClickHpAuthen=(e)=>{
        e.preventDefault();
        const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
        let 휴대폰_가이드텍스트='';
        let 휴대폰인증번호발급='';
        let 휴대폰 = state.휴대폰;

        if(regExp.test(휴대폰)===false){
            휴대폰인증번호발급='';
            휴대폰_가이드텍스트='휴대폰 번호를 입력해 주세요.';
        }
        else {
            // 휴대폰 인증번호 발급            
            휴대폰인증번호발급 = Math.floor(Math.random() * 900000 + 100000);
            휴대폰_가이드텍스트='';
        }
        // console.log(휴대폰인증번호발급)
        
        setState({
            ...state,
            휴대폰인증번호발급: 휴대폰인증번호발급,
            휴대폰_가이드텍스트: 휴대폰_가이드텍스트
        })
        alert("휴대폰인증번호발급 " + 휴대폰인증번호발급);
    }

    // 인증번호입력번호 & 발급번호 비교
    const onChangeUserHpAuthen=(e)=>{
        setState({
            ...state,
            휴대폰인증번호입력: e.target.value
        })
    }

    // 인증번호 확인 비교
    const onClickHpAuthenCheck=(e)=>{
        let 휴대폰유효성검사 = null;
        if(state.휴대폰인증번호발급===Number(state.휴대폰인증번호입력)){
            alert('인증에 성공했습니다.');
            휴대폰유효성검사 = true;
        }
        else {
            alert('인증에 실패했습니다.');
            휴대폰유효성검사 = true;
        }
        setState({
            ...state,
            휴대폰유효성검사: 휴대폰유효성검사
        })
    }

    // 7. 주소
    // npm i react-daum-postcode
    const onClickKakaoApiOpen=(e)=>{
        e.preventDefault();
        kakaoModalOpen();
    }

    // 주소 입력상자
    const onChangeUserAddress1=(e)=>{
        setDelivery({
            ...delivery,
            주소1: e.target.value
        });
    }

    const onChangeUserAddress2=(e)=>{
        setDelivery({
            ...delivery,
            주소2: e.target.value
        });
    }

    // 8. 성별
    const onChangeUserGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        })
    }

    // 9. 생년월일
    // 생년
    const onChangeUserYear=(e)=>{
        const regExp = /[^0-9]/g;
        let 생년=''
        생년 = e.target.value.replace(regExp, '');

        setState({
            ...state,
            생년: 생년
        })
    }

    // 생월
    const onChangeUserMonth=(e)=>{
        const regExp = /[^0-9]/g;
        let 생월=''
        생월 = e.target.value.replace(regExp, '');

        setState({
            ...state,
            생월: 생월
        })
    }

    // 생일
    const onChangeUserDate=(e)=>{
        const regExp = /[^0-9]/g;
        let 생일=''
        생일 = e.target.value.replace(regExp, '');

        setState({
            ...state,
            생일: 생일
        })
    }

    // 감시자
    useEffect(()=>{
        let 생년월일_가이드텍스트='';

        // 생년 생월 생일 모두 빈칸이 아니면 가이드텍스트 없음
        if(state.생년==='' && state.생월==='' && state.생일===''){
            생년월일_가이드텍스트='';
        }        
        else{
            // 1. 생년
            // - 생년월일이 미래로 입력 되었습니다. => 현재 년도 초과
            // - 생년월일을 다시 확인해주세요. => 100살 초과
            // - 만 14세 미만은 가입이 불가합니다. => 미성년자
            if(Number(state.생년) > new Date().getFullYear()){
                생년월일_가이드텍스트='생년월일이 미래로 입력 되었습니다.';
            }
            else if(Number(state.생년) < (new Date().getFullYear()-100)){
                생년월일_가이드텍스트='생년월일을 다시 확인해주세요.';
            }
            else if(Number(state.생년) >= (new Date().getFullYear()-14)){
                생년월일_가이드텍스트='만 14세 미만은 가입이 불가합니다.';
            }
            else {
                // 2. 생월
                // - 태어난 월을 정확하게 입력해주세요. => 1 ~ 12월
                if(Number(state.생월) < 1 || Number(state.생월) > 12){
                    생년월일_가이드텍스트='태어난 월을 정확하게 입력해주세요.';
                }
                else {
                    // 3. 생일
                    // - 태어난 일을 정확하게 입력해주세요. => 1 ~ 31일
                    if(Number(state.생일) < 1 || Number(state.생일) > 31){
                        생년월일_가이드텍스트='태어난 일을 정확하게 입력해주세요.';
                    }
                    else {
                        생년월일_가이드텍스트='';
                    }
                }
            }

            
        }

        setState({
            ...state,
            생년월일_가이드텍스트: 생년월일_가이드텍스트
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.생년, state.생월, state.생일]); // 얘네 바뀌면

    // 10. 추가입력 사항
    const onChangeUserAdd=(e)=>{
        setState({
            ...state,
            추가입력사항: e.target.value
        })
    }

    // 추천인 아이디
    const onChangeUserAddId=(e)=>{
        setState({
            ...state,
            추천인아이디: e.target.value
        })
    }

    // 추천인 아이디 확인
    const onClickUserAddId=(e)=>{
        e.preventDefault();

        const formData = new FormData();   
        formData.append('user_id', state.추천인아이디)

        axios({
                url: '/marketkurly/id_check.php',
                method:'POST',
                data: formData
        })
        .then((res)=>{
            console.log( Number(res.data) )
            if(Number(res.data)===1){
                alert('존재하는 아이디 입니다.\n친구초대 이벤트에 참여 가능해요.');
            }
            else{
                alert('존재하지 않는 아이디 입니다.');
            }

        })
        .catch((err)=>{
            console.log( err );
        })
    }

    // 11. 이용약관동의
    // 이용약관동의 전체 체크
    const onChangeUserCheckAll=(e)=>{
        let imsi = []
        if(e.target.checked){
            imsi = state.이용약관
        }
        else{
            imsi = []
        }
        setState({
            ...state,
            이용약관동의: imsi
        })
    }

    // 이용약관동의 개별 체크
    const onChangeServiceCheckEvent=(e)=>{
        // 이용약관동의 배열안에 체크된 값을 저장한다
        // 체크해제되면 이용약관동의 배열안에 값을 삭제한다
        let imsi = state.이용약관동의;
        if(e.target.checked){ // 전개연산자
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                if(imsi.includes('SMS')===false && imsi.includes('이메일')===false){
                    imsi = [...imsi, e.target.value, 'SMS', '이메일']
                }
                else if(imsi.includes('SMS')===true && imsi.includes('이메일')===false){
                    imsi = [...imsi, e.target.value, '이메일']
                }
                else if(imsi.includes('SMS')===false && imsi.includes('이메일')===true){
                    imsi = [...imsi, e.target.value, 'SMS']
                }
            }
            else if(e.target.value==='SMS'){
                if(imsi.includes('이메일')===true){
                    imsi = [...imsi, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']
                }
                else{
                    imsi = [...imsi, e.target.value]
                }
            }
            else if(e.target.value==='이메일'){
                if(imsi.includes('SMS')===true){
                    imsi = [...imsi, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']
                }
                else{
                    imsi = [...imsi, e.target.value]
                }
            }
            else{
                imsi = [...imsi, e.target.value]
            }
        }
        else{ // 필터 체크해제된것만 제외하고 재배열 처리
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                imsi = imsi.filter((item)=>item!==e.target.value);
                imsi = imsi.filter((item)=>item!=='SMS');
                imsi = imsi.filter((item)=>item!=='이메일');
            }
            else if(e.target.value==='SMS'){
                imsi = imsi.filter((item)=>item!==e.target.value);
                imsi = imsi.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
            }
            else if(e.target.value==='이메일'){
                imsi = imsi.filter((item)=>item!==e.target.value);
                imsi = imsi.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
            }
            else{
                imsi = imsi.filter((item)=>item!==e.target.value);
            }
        }

        setState({
            ...state,
            이용약관동의: imsi
        })
    }

    // 이용약관동의 유효성검사
    useEffect(()=>{
        let cnt = 0;
        state.이용약관동의.map((item)=>{
            if(item.includes('필수')){
               cnt++;
            }
        });
        setState({
            ...state,
            이용약관동의유효성검사: cnt>=3?true:false
        })
    },[state.이용약관동의]);

    const onSubmitSignup=(e)=>{
        e.preventDefault(); 
        if(state.아이디유효성검사!==true){
            alert('아이디를 입력하세요');
        }
        else if(state.아이디중복검사!==true){
            alert('아이디 중복확인을 해주세요');
        }
        else if(state.비밀번호유효성검사!==true){
            alert('비밀번호를 입력해주세요');
        }
        else if(state.이름유효성검사!==true){
            alert('이름을 입력해주세요');
        }
        else if(state.이메일유효성검사!==true){
            alert('이메일을 입력해주세요');
        }
        else if(state.이메일중복검사!==true){
            alert('이메일 중복확인을 해주세요');
        }
        else if(state.휴대폰유효성검사!==true){
            alert('휴대폰 번호를 인증해주세요');
        }
        else if(state.주소유효성검사!==true){
            alert('주소를 입력해주세요');
        }
        else if(state.이용약관동의유효성검사!==true){
            alert('이용약관동의를 해주세요');
        }
        else {

            // 1. 비밀번호 암호화 저장
            // 1-1 imort CryptoJS from 'crypto-js';
            // 1-2 암호화
            // const 비밀번호_암호화 = CryptoJS.AES.encrypt(비밀번호문자열.개인키암호);
            const 비밀번호_암호화된것 = CryptoJS.AES.encrypt(state.비밀번호1, 'shhh128');
            console.log('비밀번호_암호화된것', 비밀번호_암호화된것);
            console.log('비밀번호_암호화된것',비밀번호_암호화된것.toString()); // 문자열로 변경

            // 2. 비밀번호 복호화 확인
            // 2-1 복호화
            const 비밀번호_복호화된것 = CryptoJS.AES.decrypt(비밀번호_암호화된것, 'shhh128');
            console.log('비밀번호_복호화된것', 비밀번호_복호화된것);

            // 2-2 복호화 => 완전한 문자 데이터로 인코딩 변환
            console.log('비밀번호_복호화된것', 비밀번호_복호화된것.toString(CryptoJS.enc.Utf8));
            

            let formData = new FormData();
            formData.append('user_id', state.아이디);
            formData.append('user_pw', CryptoJS.AES.encrypt(state.비밀번호1, 'shhh128').toString());
            formData.append('user_name', state.이름);
            formData.append('user_email', `${state.이메일1}@${state.이메일2}`);
            formData.append('user_hp', state.휴대폰);
            formData.append('user_gender', state.성별);
            formData.append('user_birth', `${state.생년}-${state.생월.padStart(2, '0')}-${state.생일.padStart(2, '0')}`);
            formData.append('user_add', state.추가입력사항);
            formData.append('user_add_id', state.추천인아이디);
            formData.append('user_service', state.이용약관동의.map((item)=>item)); // [] 배열을 문자열로 저장

            axios({
                url:'/marketkurly/insert_signup.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(Number(res.data)===1){
                    alert(`${state.이름}님 회원가입을 축하드립니다.`);
                    navigate('/main');
                }
                else{
                    alert('회원가입정보를 확인하고 다시 시도해주세요.');
                }
            })
            .catch((err)=>{
                console.log(err);
            });
            
        }
    }

    return (
        <main id='sub5' className='sub'>
            <div className="container">
                <div className="title">
                    <h2>회원가입</h2>
                    <p><i>*</i><span>필수입력사항</span></p>
                </div>
                <div className="content">
                    <form onSubmit={onSubmitSignup} autoComplete='off'>
                        <ul>
                            <li>
                                <div>
                                    <label htmlFor="userId">
                                        <span>아이디</span>
                                        <i>*</i>
                                    </label>
                                    {/* InputComponent.jsx 커스텀컴포넌트 */}
                                    <InputComponent 
                                        maxLength={16}
                                        type="text" 
                                        id='userId' 
                                        name='userId'
                                        placeholder='아이디를 입력해주세요'
                                        onChange={onChangeUserId}
                                        value={state.아이디}
                                        autoComplete='off'
                                    />
                                {  
                                    state.아이디_가이드텍스트.length > 0 &&
                                    <div className='guide-text'>
                                        <p>{state.아이디_가이드텍스트}</p>
                                    </div>
                                }
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="userPw1">
                                        <span>비밀번호</span>
                                        <i>*</i>
                                    </label>
                                    <InputComponent                                 
                                        maxLength={16}
                                        type="password" 
                                        id='userPw1' 
                                        name='userPw1'
                                        placeholder='비밀번호를 입력해주세요' 
                                        onChange={onChangeUserPw1}
                                        value={state.비밀번호1}
                                        autoComplete='off'
                                    />
                                {
                                    state.비밀번호1_가이드텍스트.length > 0 &&
                                    <div className='guide-text'>
                                        <p>{state.비밀번호1_가이드텍스트}</p>
                                    </div>
                                }
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="userPw2">
                                        <span>비밀번호확인</span>
                                        <i>*</i>
                                    </label>
                                    <InputComponent                                     
                                        maxLength={16}
                                        type="password" 
                                        id='userPw2' 
                                        name='userPw2' 
                                        placeholder='비밀번호를 한번 더 입력해주세요' 
                                        onChange={onChangeUserPw2}
                                        value={state.비밀번호2}
                                        autoComplete='off'
                                    />
                                    <div className='guide-text'>
                                        <p>{state.비밀번호2_가이드텍스트}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="userName">
                                        <span>이름</span>
                                        <i>*</i>
                                    </label>
                                    <InputComponent                                     
                                        type="text" 
                                        id='userName' 
                                        name='userName'                                     
                                        placeholder='이름을 입력해주세요' 
                                        onChange={onChangeUserName}
                                        value={state.이름}
                                        autoComplete='off'
                                    />
                                    <div className='guide-text'>
                                        <p>{state.이름_가이드텍스트}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="userEmail">
                                        <span>이메일</span>
                                        <i>*</i>
                                    </label>
                                    <div className="email-box">
                                        <InputComponent                                         
                                            type="text"
                                            id='userEmail1' 
                                            name='userEmail1'                                     
                                            placeholder='예: marketkurly' 
                                            value={state.이메일1} 
                                            onChange={onChangeUserEmail1}
                                        />
                                        <i>@</i>
                                        {/* useRef는 제외 */}
                                        <input
                                            type="email" 
                                            id='userEmail2' 
                                            name='userEmail2'                                   
                                            placeholder='선택하기'   
                                            value={state.이메일2} 
                                            disabled={state.이메일입력불가}
                                            onChange={onChangeUserEmail2}
                                            ref={refEmail}
                                        />
                                        <div className={`list-box${state.이메일리스트?' on':''}`}>
                                            {
                                                state.이메일회사리스트.map((item)=>
                                                    <button  
                                                        key={item.코드번호}
                                                        data-key={item.코드번호}
                                                        onClick={(e)=>onClickEmailCompany(e, item.이메일회사)}
                                                    >
                                                        {item.이메일회사}
                                                    </button>
                                                )                                            
                                            }
                                        </div>

                                        {/* 이메일목록 버튼 */}
                                        <div className="list-btn-box">
                                            <button
                                                onClick={onClickListBtn}
                                            >
                                                <img src="./images/sub/sub5/icon_select_arrow_down.svg" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='guide-text'>
                                        <p>{state.이메일_가이드텍스트}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="userHp">
                                        <span>휴대폰</span>
                                        <i>*</i>
                                    </label>
                                    <InputComponent 
                                        maxLength={11}
                                        type="text" 
                                        id='userHp' 
                                        name='userHp' 
                                        placeholder='숫자만 입력해주세요.' 
                                        onChange={onChangeUserHp}
                                        value={state.휴대폰}
                                    />
                                    <button 
                                        className={state.휴대폰===''?'off':''}
                                        onClick={onClickHpAuthen}
                                    >인증번호 받기</button>
                                    <div className='guide-text'>
                                        <p>{state.휴대폰_가이드텍스트}</p>
                                    </div>
                                </div>
                            </li>
                        {
                            state.휴대폰인증번호발급!==null &&
                            <li>
                                <div>
                                    <InputComponent 
                                        maxLength={11}
                                        type="text" 
                                        id='userHpAuthen' 
                                        name='userHpAuthen' 
                                        placeholder='인증번호를 입력해주세요.' 
                                        onChange={onChangeUserHpAuthen}
                                        value={state.휴대폰인증번호입력}
                                    />
                                    <button 
                                        className={state.휴대폰인증번호입력===''?'off':''}
                                        onClick={onClickHpAuthenCheck}
                                    >인증번호 확인</button>
                                </div>
                            </li>
                        }
                        {
                            delivery.주소1==='' &&
                            <li className='address0'>
                                <div>
                                    <label>
                                        <span>주소</span>
                                        <i>*</i>
                                    </label>
                                    <InputComponent 
                                        id='addressSearch'
                                        type="button"   
                                        value='주소 검색'
                                        onClick={onClickKakaoApiOpen}
                                    />                                
                                    <div className='info-text'>
                                        <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                    </div>
                                </div>
                            </li>
                        }
                        {
                            delivery.주소1!=='' &&
                            <>
                                <li className='address1'>
                                    <div>
                                        <label htmlFor="userAddress1">
                                            <span>주소</span>
                                            <i>*</i>
                                        </label>
                                        <InputComponent 
                                            type="text" 
                                            id='userAddress1' 
                                            name='userAddress1' 
                                            placeholder='주소를 입력해주세요' 
                                            onChange={onChangeUserAddress1}
                                            value={delivery.주소1}
                                            disabled={true}
                                        />
                                        <button onClick={onClickKakaoApiOpen}>재검색</button>
                                        {/* <div className='guide-text'>
                                            <p>주소를 입력해 주세요.</p>
                                        </div> */}
                                    </div>
                                </li>
                                <li className='address2'>
                                    <div>
                                        <InputComponent 
                                            type="text" 
                                            id='userAddress2' 
                                            name='userAddress2' 
                                            placeholder='나머지 주소를 입력해주세요' 
                                            onChange={onChangeUserAddress2}
                                            value={delivery.주소2}
                                        />
                                        <div className='info-text'>
                                            <p>샛별배송</p>
                                            <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                        </div>
                                    </div>
                                </li>
                            </>
                        }
                            <li>
                                <div>
                                    <label htmlFor="userNone">
                                        <span>성별</span>                                    
                                    </label>
                                    <div className='radio-box'>
                                        <label>
                                            <InputComponent 
                                                type="radio" 
                                                id='userMale' 
                                                name='userGender'
                                                value="남자"
                                                checked={state.성별.includes('남자')}
                                                onChange={onChangeUserGender}
                                            />
                                            <strong>남자</strong>
                                        </label>
                                        <label>
                                            <InputComponent 
                                                type="radio" 
                                                id='userFeMale' 
                                                name='userGender'
                                                value="여자"
                                                checked={state.성별.includes('여자')}
                                                onChange={onChangeUserGender}
                                            />
                                            <strong>여자</strong>
                                        </label>
                                        <label>
                                            <InputComponent 
                                                type="radio" 
                                                id='userNone' 
                                                name='userGender'
                                                value="선택안함"
                                                checked={state.성별.includes('선택안함')}
                                                onChange={onChangeUserGender}
                                            />
                                            <strong>선택안함</strong>
                                        </label>
                                    </div>  
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="userBirth">
                                        <span>생년월일</span>                                    
                                    </label>
                                    <div className='birth-box'>
                                        <ul>
                                            <li>
                                                <InputComponent 
                                                    type="text" 
                                                    id='userYear' 
                                                    name='userYear' 
                                                    placeholder='YYYY'
                                                    maxLength={4}
                                                    onChange={onChangeUserYear}
                                                    value={state.생년}
                                                />
                                            </li>
                                            <li><i>/</i></li>
                                            <li>
                                                <InputComponent 
                                                    type="text" 
                                                    id='userMonth' 
                                                    name='userMonth'
                                                    placeholder='MM' 
                                                    maxLength={2}
                                                    onChange={onChangeUserMonth}
                                                    value={state.생월}
                                                />
                                            </li>
                                            <li><i>/</i></li>
                                            <li>
                                                <InputComponent 
                                                    type="text" 
                                                    id='userDate' 
                                                    name='userDate' 
                                                    placeholder='DD' 
                                                    maxLength={2}
                                                    onChange={onChangeUserDate}
                                                    value={state.생일}
                                                />
                                            </li>
                                        </ul>
                                    </div>  
                                    <div className='guide-text'>
                                        <p>{state.생년월일_가이드텍스트}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="userAdd">
                                        <span>추가입력 사항</span>
                                    </label>
                                    <div className='radio-box'>
                                        <label>
                                            <InputComponent 
                                                type="radio" 
                                                id='userAdd' 
                                                name='userAdd'
                                                value="친구초대 추천인 아이디"
                                                onChange={onChangeUserAdd}
                                                checked={state.추가입력사항.includes('친구초대 추천인 아이디')}
                                            />
                                            <strong>친구초대 추천인 아이디</strong>
                                        </label>
                                    </div>
                                </div>
                            </li>
                            {
                                state.추가입력사항.includes('친구초대 추천인 아이디') &&
                                <li>
                                    <div>
                                        <InputComponent 
                                            type="text" 
                                            id='userAddId' 
                                            name='userAddId' 
                                            placeholder='추천인 아이디 입력' 
                                            onChange={onChangeUserAddId}
                                            value={state.추천인아이디}
                                        />
                                        <button onClick={onClickUserAddId}>아이디 확인</button>
                                        <div className='info-text add'>
                                            <p>
                                                가입 후 7일 이내 첫 주문 배송완료 시, 친구초대 적립금이 지급됩니다.<br />
                                                ID 입력시, 대소문자 및 띄어쓰기에 유의 부탁드립니다.<br />
                                                가입 이후는 수정이 불가능합니다.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            }
                            <li>
                                <hr />
                            </li>
                            <li className='checkbox'>
                                <div className='checkbox'>
                                    <label>
                                        <span>이용약관동의</span>
                                        <i>*</i>
                                    </label>
                                    <div className='check-box'>
                                        <label>
                                            <InputComponent 
                                                type="checkbox" 
                                                id='userCheckAll' 
                                                name='userCheckAll' 
                                                value={'전체 동의합니다.'}    
                                                onChange={onChangeUserCheckAll}
                                                checked={state.이용약관동의.length===7}
                                            />
                                            <span>전체 동의합니다.</span>
                                        </label>
                                    </div>
                                    <div className='info-text check'>
                                        <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='checkbox'>
                                    <div className='check-box'>
                                        <label>
                                            <InputComponent 
                                                type="checkbox" 
                                                id='userCheck1' 
                                                name='userCheck1' 
                                                value={'이용약관 동의(필수)'}
                                                checked={state.이용약관동의.includes('이용약관 동의(필수)')}
                                                onChange={onChangeServiceCheckEvent}
                                            />
                                            <span>이용약관 동의</span>
                                        </label>
                                        <span>(필수)</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='checkbox'>
                                    <div className='check-box'>
                                        <label>
                                            <InputComponent 
                                                type="checkbox" 
                                                id='userCheck2' 
                                                name='userCheck2' 
                                                value={'개인정보 수집∙이용 동의(필수)'}
                                                checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}
                                                onChange={onChangeServiceCheckEvent}
                                            />
                                            <span>개인정보 수집∙이용 동의</span>
                                        </label>
                                        <span>(필수)</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='checkbox'>
                                    <div className='check-box'>
                                        <label>
                                            <InputComponent 
                                                type="checkbox" 
                                                id='userCheck3' 
                                                name='userCheck3' 
                                                value={'개인정보 수집∙이용 동의(선택)'}
                                                checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}
                                                onChange={onChangeServiceCheckEvent}
                                            />
                                            <span>개인정보 수집∙이용 동의</span>
                                        </label>
                                        <span>(선택)</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='checkbox'>
                                    <div className='check-box'>
                                        <label>
                                            <InputComponent 
                                                type="checkbox" 
                                                id='userCheck4' 
                                                name='userCheck4' 
                                                value={'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'}
                                                checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}
                                                onChange={onChangeServiceCheckEvent}
                                            />
                                            <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                                        </label>
                                        <span>(선택)</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='checkbox'>
                                    <div className='check-box sms'>
                                        <label>
                                            <InputComponent 
                                                type="checkbox" 
                                                id='userCheck5' 
                                                name='userCheck5' 
                                                value={'SMS'}
                                                checked={state.이용약관동의.includes('SMS')}
                                                onChange={onChangeServiceCheckEvent}
                                            />
                                            <span>SMS</span>
                                        </label>
                                        <label>
                                            <InputComponent 
                                                type="checkbox" 
                                                id='userCheck6' 
                                                name='userCheck6' 
                                                value={'이메일'}  
                                                checked={state.이용약관동의.includes('이메일')}
                                                onChange={onChangeServiceCheckEvent}
                                            />
                                            <span>이메일</span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='checkbox'>
                                    <div className='check-box'>
                                        <label>
                                            <InputComponent 
                                                type="checkbox" 
                                                id='userCheck7' 
                                                name='userCheck7' 
                                                value={'본인은 만 14세 이상입니다.(필수)'}
                                                checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                                onChange={onChangeServiceCheckEvent}
                                            />
                                            <span>본인은 만 14세 이상입니다.</span>
                                        </label>
                                        <span>(필수)</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="submit-box">
                            <button type='submit'>가입하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}