# 리액트 CRA 마켓컬리 프로젝트 시작

1. 프로젝트 생성 
   프로젝트 이름: market_kurly
```BASH
    
    npx create-react-app market_kurly
    
    ls -la
    
    cd market_kurly

    ls -la

    npm start

    npm i sass;
    npm i sass-loader;

    npm i react-router-dom

```

2 사이트맵 기획 및 분석 설계

메인페이지 - 마켓컬리 인트로페이지 -  /main

서브페이지1 - 신상품   - /sub1
서브페이지1-필터-탭메뉴-1 - 인기신상랭킹
서브페이지1-필터-탭메뉴-2 - 입점특가
서브페이지1-필터-탭메뉴-3 - 요즘간식
서브페이지1-필터-탭메뉴-4 - 간편한끼
서브페이지1-필터-탭메뉴-5 - 주방리링
서브페이지1-필터-탭메뉴-6 - 뷰티
서브페이지1-필터-탭메뉴-7 - 팬션잡화

서브페이지2 - 베스트 - /sub2
서브페이지2-필터-탭메뉴-1 - TOP300
서브페이지2-필터-탭메뉴-2 - 간편식사
서브페이지2-필터-탭메뉴-3 - 신선코너
서브페이지2-필터-탭메뉴-4 - 컬리정육점
서브페이지2-필터-탭메뉴-5 - 컬리에만있는
서브페이지2-필터-탭메뉴-6 - 인기급상승
서브페이지2-필터-탭메뉴-7 - 생활필수품
서브페이지2-필터-탭메뉴-8 - 직원추천상품

서브페이지3 - 알뜰쇼핑 - /sub3
서브페이지3-필터-탭메뉴-1 - 알뜰쇼핑
서브페이지3-필터-탭메뉴-2 - 반값세일
서브페이지3-필터-탭메뉴-3 - 신선&정육
서브페이지3-필터-탭메뉴-4 - 만원의행복
서브페이지3-필터-탭메뉴-5 - 정보기초특가

서브페이지4 - 특가혜택 - /sub4

서브페이지5 - 회원가입 - /sub5_signup

서브페이지6 - 회원(USER) 로그인 - /sub6_login
서브페이지6-1 - 회원(USER) 아이디찾기 - sub6_1_id_search
서브페이지6-2 - 회원(USER) 비밀번호찾기 - sub6_2_pw_search
서브페이지6-3 - 회원(USER) 비밀번호재설정 - sub6_3_pw_reset

서브페이지7 - 고객센터(보드 Board) - /sub7_board
서브페이지7-1 - 공지사항[글쓰기,글수정, 글삭제,글보기 권한(관리자) / 글보기만(회원)] - sub7_1_notice
서브페이지7-2 - 자주하는질문[글쓰기,글수정, 글삭제,글보기 권한(관리자) / 글보기만(회원)] - sub7_2_faq
서브페이지7-3 - 1:1문의[글쓰기,글수정, 글삭제,글보기 권한(관리자, 회원)] - sub7_3_one_confirm
서브페이지7-4 - 대량주문문의[글쓰기,글수정, 글삭제,글보기 권한(관리자, 기업회원 사업자등록증)] - sub7_4_max_confirm

서브페이지8 - 퀵메뉴
서브페이지9 - GoTOP
서브페이지10 - 최근본상품 - sub10_view_product
서브페이지11 - 상품상세페이지 - sub11_detail_product_page
서브페이지12 - 장바구니 - sub12_cart
서브페이지13 - 카카오주소검색API - sub13_cacao_address_api
서브페이지14 - 배송지 - sub14_address
서브페이지15 - 찜상품 - sub14_jjim_product

서브페이지16 - 관리자(ADMIN) 로그인 - sub16_admin_login
서브페이지16-1 - 관리자(ADMIN) 아이디찾기 - sub16_1_admin_id_search
서브페이지16-2 - 관리자(ADMIN) 비밀번호찾기 - sub16_2_admin_pw_search
서브페이지16-3 - 관리자(ADMIN) 비밀번호재설정 - sub16_3_admin_pw_reset


4. 프로젝트 컴포넌트 분석 설계
[src]
    index.js
    [component]
        WrapComponent.jsx
        [wrap]
            TopModalComponent.jsx
            HeaderComponent.jsx
            MainComponent.jsx
            [main]
                Sectioon1Component.jsx
                Sectioon2Component.jsx
                Sectioon3Component.jsx
                Sectioon4Component.jsx
                Sectioon5Component.jsx
                Sectioon6Component.jsx
                Sectioon7Component.jsx
                Sectioon8Component.jsx
                Sectioon9Component.jsx
            [sub]
                Sub1Component.jsx
                Sub2Component.jsx
                Sub3Component.jsx
                Sub4Component.jsx
                Sub5SignupComponent.jsx
                Sub6LoginComponent.jsx
                  Sub61IdSearchComponent.jsx
                  sub62PwSearchComponent.jsx
                  sub63PwResetComponent.jsx
                Sub7BoardComponent.jsx
                  Sub71NoticeComponent.jsx
                  Sub72FaqComponent.jsx
                  Sub73OneConfirmComponent.jsx
                  Sub74MaxConfirmComponent.jsx
                  Sub10ViewProductComponent.jsx                
                  Sub11DetailProductPageComponent.jsx
                  Sub12CartComponent.jsx
                  Sub13KakaoAddressApiComponent.jsx               
                  Sub14AddressComponent.jsx
                  sub15JjimProductComponent.jsx
                  Sub16AdminLoginComponent.jsx
                  Sub161AdminIdSearchComponent.jsx
                  Sub162AdminPwSearchComponent.jsx
                  Sub163AdminPwResetComponent.jsx
                  Sub17SearchComponent.jsx
            FooterComponent.jsx
            QuickComponent.jsx
            GoTopComponent.jsx
            MainModal1Component.jsx
            



5. 컴포넌트별 너비 높이 색상 글자크기등
- TopModalComponent.jsx  TopModalComponent.scss
  container
  너비 1050px
  높이 42px
  배경색: rgba(95,0, 128, 1);

- HeaderComponent.jsx HeaderComponent.scss
  container
  너비 1050px
  높이 156px
  1행  높이 36  
  2행  높이 64
  3행  높이 56

  .row1 : 우측정렬   
  .row2 : 3칸
    .left-box   너비 325 높이 48 왼쪽
    .center-box 너비 400 높이 48  중앙
    .right-box  너비 325 높이 48 오른쪽
  .row3
    .left-box   너비 225 높이 56 왼쪽
    .center-box 너비 600 높이 56  중앙
    .right-box  너비 225 높이 56 오른쪽



# 서브페이지
[wrap]
  [sub]
    Sub1Component.jsx
    Sub2Component.jsx
    Sub3Component.jsx
    Sub4Component.jsx
    Sub5SignupComponent.jsx
    Sub6LoginComponent.jsx
    Sub7BoardComponent.jsx


# 리액트 라우터 돔 설치
npm i react-router-dom

# WrapCommponent 
브라우저라우터 > 라우츠 > 라우트 네비게이션 > 라우트 설정
```JS
<BrowserRouter>
   <Routes>
      <Route path="/" element={<HeaderComponent />}>     
          <Route index         element={메인}  />
          <Route paht='/main'  element={메인}  />
          <Route paht='/sub3'  element={서브1}  />
          <Route paht='/sub3'  element={서브2}  />
          <Route paht='/sub3'  element={서브3}  />
          <Route paht='/sub4'  element={서브4}  />
          :
      </Route>
   </Routes>
</BrowserRouter>

```
# HeaderComponent
타겟 설정 <아울렛 />
a 링크 => Link
href => to


http://localhost:80/kurly/
http://127.0.0.1:80/kurly/
