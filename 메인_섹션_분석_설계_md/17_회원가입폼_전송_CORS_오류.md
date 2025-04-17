보내는 URL 주소
http://localhost:3002/sub5_signup

전송받는 URL 주소
http://j8926267.dothome.co.kr/shindorim_kurly/insert_signup.php

# 주소 다른 경우 CORS 에러 회피

# package.json에
프록시 서버
"proxy" : "http://j8926267.dothome.co.kr"


# 비밀번호
- 길이 16 => 250
- 암호화 저장
```BASH
    npm i crypto-js
```

# CryptoJs 비밀번호 암호화 테스팅

# CryptoJs 비밀번호 복호화 테스팅

# 로그인 구현 JWT 제이슨 웹토큰 암호화