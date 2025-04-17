# 카카오 주소 검색 API 리액트 쿠키 사용

[1] 리액트 쿠키 => 패키지 설치
```bash
    npm i react-cookie
```
- package.json 확인하기
```JSON
  :
  "react-cookie": "^7.2.2",
  :
```
[2] 쿠키 저장 하기 
1. 컴포넌트 : PostcodeComponent.jsx 
2. 임포트  리액트 쿠키 훅 {useCookies}
```JS
    import {useCookies} from 'react-cookie'
```
3. useCookies 선언
```JS
    const [cookie, setCookie] = useCookies();
```

4. setCookie 이용 쿠키 저장(설정)
```JS
    let date = new Date();
    date.setDate(date.getDate() + 1);

    setCookie(쿠키이름=값; path=/; expires=date);
    setCookie(쿠키이름, 값, {path='/', expires: date});

- 쿠키 이름 지정하기
- 쿠키 값({}) 지정하기
    const name = 'KAKAO_ADDRESS_API_MOONJONG'
    const value = {
        key: 'moonjong_0326',
        우편번호: state.우편번호,
        주소1: state.주소1,
        주소2: state.주소2
    }
    ※ {} Object({}address) 저장시 반드시 문자열로 변환 저장한다.
    // 문법 형식
    // setCookie(쿠키이름, 값, {path='/', expires: date});
    =>
    setCookie(쿠키이름, JSON.stringify(값), {path='/', expires: date});
```

5. 쿠키 가져오기 
- 최상위 컴포넌트에서 가져오기 구현  WrapComponent.jsx
- 리액트 쿠키 사용하기(useCookies()) 
- 리덕스 리듀서 상태관리 변경(useDispatch()) 
- 리덕스 리듀서 상태관리 주소 변경 액션 메서드 가져오기(setAddress()) 

1) import { useCookies } from "react-cookie";
   const [cookie, setCookie] = useCookies();

2) import { useDispatch } from "react-redux";
   const dispatch = useDispatch();

3) import { setAddress } from "../store/address";
   dispatch(setAddress(데이터))


- useCookies 선언
```JS
    const [cookie, setCookie] = useCookies();

    console.log( cookie );

    // 조건문 구현
    if(){

    }



    // 쿠키 감시자
    useEffect(()=>{

        // 2. 쿠키 가져오기 확인
        // 새로 고침시 데이터 계속 유지한다.
        
        // 1단계 쿠키 전체 모든 쿠키 가져오기
        // console.log( '회원 가입폼 cookie 확인하기' );
        // console.log( cookie );

        // 2단계 쿠키 저장시 사용한 이름 KAKAO_ADDRESS_API_MOONJONG 이용
        // 쿠키이름(name) => 값(value) 데이터 가져오기
        // 3단계 쿠키 값 key값을 비교 키(key)가 맞다면 
        
        // 데이터 가져오기
        // console.log( cookie['KAKAO_ADDRESS_API_MOONJONG'] );
        // => {key: 'moonjong_0326', 우편번호: '06760', 주소1: '서울 서초구 남부순환로 2124  (방배동)', 주소2: '논현동 375 서초빌딩 1303호'

        // 키들(keys) 이름만 배열로 출력       
        // console.log( Object.keys(cookie['KAKAO_ADDRESS_API_MOONJONG']) );
        // => ['key', '우편번호', '주소1', '주소2']

        // console.log( cookie['KAKAO_ADDRESS_API_MOONJONG'].key );
        // console.log( cookie['KAKAO_ADDRESS_API_MOONJONG'].우편번호 );
        // console.log( cookie['KAKAO_ADDRESS_API_MOONJONG'].주소1 );
        // console.log( cookie['KAKAO_ADDRESS_API_MOONJONG'].주소2 );


        if(cookie['KAKAO_ADDRESS_API_MOONJONG'].key==='moonjong_0326'){
            setState({
                ...state,
                우편번호: cookie['KAKAO_ADDRESS_API_MOONJONG'].우편번호,
                주소1: cookie['KAKAO_ADDRESS_API_MOONJONG'].주소1,
                주소2: cookie['KAKAO_ADDRESS_API_MOONJONG'].주소2
            })
        }


    }, []);



```



