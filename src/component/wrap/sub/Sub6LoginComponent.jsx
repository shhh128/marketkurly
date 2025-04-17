import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './scss/Sub6LoginComponent.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginAction } from '../../../store/login';

export default function Sub6LoginComponent () {
   
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 상태변수
    const [state, setState] = useState({
        아이디:'',
        비밀번호: ''
    });

    // 아이디 입력
    const onChangeUserId=(e)=>{
        setState({
            ...state,
            아이디: e.target.value
        })
    }

    // 비밀번호 입력
    const onChangeUserPw=(e)=>{
        setState({
            ...state,
            비밀번호: e.target.value
        })
    }

    // 리액트 폼 데이터 전송 받기 => 실전
    // $user_id  = $_POST['user_id'];;     // 아이디
    // $user_pw  = $_POST['user_pw'];;     // 비밀번호
    const onClickLogin=(e)=>{
        e.preventDefault();
        if(state.아이디===''){
            alert('아이디를 입력하세요!');
        }
        else if(state.비밀번호===''){
            alert('비밀번호를 입력하세요!');
        }
        else {            
            // axios post 방식
            // shhhh178
            // jungsh120@
            let formData = new FormData();
            formData.append('user_id', state.아이디);
            formData.append('user_pw', state.비밀번호);

            axios({
                url: '/marketkurly/login.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                // console.log('axios 전송 성공!');
                
                // console.log( res.data );
                // console.log( res.아이디 );
                // console.log( res.이름 );
                // console.log( res.휴대폰 );
                // 로그인 만료일 1일 설정
                if(state.아이디===res.data.아이디){
                    let expires = new Date();
                    expires.setDate(expires.getDate() + 1);
    
                    const obj = {
                        userId: res.data.아이디,
                        exp: expires.getTime()
                    }
                    // 스토리지 또는 쿠키
                    localStorage.setItem('LOGIN_INFO', JSON.stringify(obj));
    
                    // 리덕스 상태관리 로그인 정보 저장되면 즉시 => 헤더에서 받는다
                    // login.js
                    dispatch(setLoginAction(obj));
                    navigate('/main');
                }
                else {
                    alert('아이디와 비밀번호를 확인해주세요.');
                }
            })
            .catch((err)=>{
                console.log('axios 전송 실패!');
            });

        }        
    }

    return (
        <main id='signIn'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>로그인</h2>
                    </div>
                    <div className="content">
                        <form autoComplete='off'>
                            <ul>
                                <li>
                                    <input                                     
                                        type="text" 
                                        name='user_id' 
                                        id='userId' 
                                        placeholder='아이디를 입력해주세요' 
                                        onChange={onChangeUserId}
                                        value={state.아이디}
                                    />
                                </li>
                                <li>
                                    <input 
                                        type="password" 
                                        name='user_pw' 
                                        id='userPw' 
                                        placeholder='비밀번호를 입력해주세요'
                                        onChange={onChangeUserPw}
                                        value={state.비밀번호} 
                                    />
                                </li>
                                <li>
                                    <span>
                                        <Link to="/id-search">아이디 찾기</Link>
                                        <i>|</i>
                                        <Link to="/pw-search">비밀번호 찾기</Link>
                                    </span>
                                </li>
                                <li><button onClick={onClickLogin}>로그인</button></li>
                                <li><Link to="/sub5_signup">회원가입</Link></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}