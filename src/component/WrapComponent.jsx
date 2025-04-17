import React, { useEffect } from "react"
import TopModalComponent from "./wrap/TopModalComponent"
import HeaderComponent from "./wrap/HeaderComponent"
import MainComponent from "./wrap/MainComponent"
import FooterComponent from "./wrap/FooterComponent"
import QuickComponent from "./wrap/QuickComponent"
// import GoTopComponent from "./wrap/GoTopComponent"
// import MainModal1Component from "./wrap/MainModal1Component"
import Sub1Component from "./wrap/sub/Sub1Component"
import Sub2Component from "./wrap/sub/Sub2Component"
import Sub3Component from "./wrap/sub/Sub3Component"
import Sub4Component from "./wrap/sub/Sub4Component"
import Sub5SignupComponent from "./wrap/sub/Sub5SignupComponent"
import Sub6LoginComponent from "./wrap/sub/Sub6LoginComponent"
import Sub7BoardComponent from "./wrap/sub/Sub7BoardComponent"
import { Routes, Route, HashRouter } from "react-router-dom"
import Not404PageComponent from "./wrap/Not404PageComponent"
import PostcodeComponent from "./wrap/PostcodeComponent"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { setAddress } from "../store/address"
import ProductViewComponent from "./wrap/sub/ProductViewComponent"
import CartComponent from "./wrap/sub/CartComponent";
import SignInIdSearchComponent from "./wrap/sub/SignInIdSearchComponent";
import SignInPwSearchComponent from "./wrap/sub/SignInPwSearchComponent";

export default function WrapComponent(){
    
    const [cookie, setCookie] = useCookies();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        카카오주소검색: false,
        우편번호:'',
        주소1:'',
        주소2:''
    });
    
    const kakaoModalOpen=()=>{
        setState({
            ...state,
            카카오주소검색: true
        })
    }

    const kakaoModalClose=()=>{
        setState({
            ...state,
            카카오주소검색: false
        })
    }

    // 쿠키 감시자
    useEffect(()=>{        
        setTimeout(()=>{
            // 쿠키 가져오기 확인
            // 새로고침시 데이터 계속 유지
            // console.log(cookie['KAKAO_ADDRESS_API_SHHH']);
            // 쿠키 없다면
            if(Object.keys(cookie).length===0) return;
    
            // 예외처리 트라이 캣치 : 오류가 없으면 실행
            // 예외처리 트라이 캣치 : 오류가 있으면 리턴
            try{
                if(cookie['KAKAO_ADDRESS_API_SHHH'].key==='shhh_128'){
                    const obj = {
                        우편번호: cookie['KAKAO_ADDRESS_API_SHHH'].우편번호,
                        주소1: cookie['KAKAO_ADDRESS_API_SHHH'].주소1,
                        주소2: cookie['KAKAO_ADDRESS_API_SHHH'].주소2
                    }
                    // 리듀서 저장 디스패치
                    dispatch(setAddress(obj));
                    // 저장완료 후 0.1초 후에 회원관리폼에서 
                    // 리듀서 저장 내용가져오기
                }
            }
            catch(err){
                return;
            }
        }, 100)
    },[cookie, dispatch]);

    return(
        <div id="wrap">
            <HashRouter>
                <TopModalComponent />
                <Routes>
                    <Route path="/" element={<HeaderComponent kakaoModalOpen={kakaoModalOpen} />}>
                        <Route index element={<MainComponent />} />
                        <Route path="/main" element={<MainComponent />} />
                        <Route path="/sub1" element={<Sub1Component />} />
                        <Route path="/sub2" element={<Sub2Component />} />
                        <Route path="/sub3" element={<Sub3Component />} />
                        <Route path="/sub4" element={<Sub4Component />} />
                        <Route path="/sub5_signup" element={<Sub5SignupComponent kakaoModalOpen={kakaoModalOpen} />} />
                        <Route path="/sub6_login" element={<Sub6LoginComponent />} />
                        <Route path="/sub7_board" element={<Sub7BoardComponent />} />
                        <Route path="/product-view" element={<ProductViewComponent />} />
                        <Route path="/cart"  element={<CartComponent />} />
                        <Route path="/id-search"  element={<SignInIdSearchComponent />} />
                        <Route path="/pw-search"  element={<SignInPwSearchComponent />} />
                        <Route path="/*" element={<Not404PageComponent />} />
                    </Route>
                </Routes>

                <FooterComponent />
                <QuickComponent />
                {/* <GoTopComponent />
                <MainModal1Component /> */}
                {
                    state.카카오주소검색 && <PostcodeComponent kakaoModalClose={kakaoModalClose} />
                }
            </HashRouter>
        </div>
    )
}