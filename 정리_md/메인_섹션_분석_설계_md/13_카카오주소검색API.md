# 카카오주소검색 API

1. 설치
```BASH
    npm i react-daum-postcode
```

2. 주소검색 컴포넌트 만들기
PostcodeComponent.jsx

3. 최상위 컴포넌트에 등록



# 도로명주소, 지번주소, 우편번호 사용법
```JS
    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
    var addr = ''; // 주소 변수
    var extraAddr = ''; // 참고항목 변수

    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
    } else { // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
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
        document.getElementById("sample2_extraAddress").value = extraAddr;

    } else {
        document.getElementById("sample2_extraAddress").value = '';
    }
```


1. address.js 만들고

2. index.js에서 불러오기
    const store = configureStore({
        reducer: {
            viewProduct,
            address
        }
    });

3. sub5Component에서 리듀서 데이터 가져오기
    const address = useSelector((state)=>state.address);

4. PostcodeComponent에서 
    import { setAddress } from '../../store/address';
    
5. PostcodeComponent에서 
    const dispatch = useDispatch();


# 카카오주소 리액트 쿠키 사용
1. 리액트 쿠키 => 패키지 설치
```JS
    npm i react-cookie
```

2. 쿠키 저장하기 
- PostcodeComponent.jsx에서
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
    date.setDate(date.getDate()+1);

    setCookie(쿠키이름=값;path=/; expires=date);
    setCookie(쿠키이름, 값, {path='/', expires:date});

- 쿠키 이름 지정하기
- 쿠키 값({}) 지정하기
    const name = 'KAKAO_ADDRESS_APPI_SHHH'
    const value = {
        key: 'shhh_128',
        우편번호: state.우편번호,
        주소1: state.주소1,
        주소2: state.주소2
    }
    // {} Object({}address)저장시 반드시 문자열로 변환저장
    setCookie(쿠키이름, JSON.stringify(value), {path='/', expires:date});
```

5. 쿠키 가져오기
- useCookies 선언
```JS
    const [cookie, setCookie] = useCookies();
```

# sub5
// 1. 리덕스 리듀서에 있는 상태변수 주소 가져오기
// 새로고침시 데이터 지워진다
// setState({
//     ...state,
//     우편번호: address.우편번호,
//     주소1: address.주소1,
//     주소2: address.주소2
// })

// 2-1. 쿠키 전체 모든 쿠키 가져오기
console.log('회원가입폼 cookie 확인');
console.log(cookie);

// 2-2. 쿠키 저장시 사용한 이름 KAKAO_ADDRESS_API_SHHH 이용
// 쿠키이름 => 값 데이터 가져오기
console.log(cookie.KAKAO_ADDRESS_API_SHHH);

//2-3. 쿠키 값 비교 키 맞으면 데이터 가져오기