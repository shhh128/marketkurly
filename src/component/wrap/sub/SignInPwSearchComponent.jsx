import React from 'react';
import './scss/signin_id_search.scss';

export default function SignInPwSearchComponent () {
    
    // 타이머 상태관리 변수
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);


    const [isTab, setIsTab] = React.useState(true);
    const [isBtn, setIsBtn] = React.useState(false);
    const [isBtn2, setIsBtn2] = React.useState(false);

    
    // 휴대폰 인증 : 아이디 휴대폰 입력상자
    const [userId, setUserId] = React.useState('');
    const [userHp, setUserHp] = React.useState('');

    // 이메일 인증 : 아이디 이메일 입력상자
    const [userId2, setUserId2] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');   
    
    // 발급된인증키
    const [hpAuth, setHpAuth] = React.useState('');
    
    // 인증키 사용자입력상자 
    const [userHpAuth, setUserHpAuth] = React.useState('');
    const [isAuth, setIsAuth] = React.useState(false);
    const [isConfirmModal, setIsConfirmModal] = React.useState(false);

    // 휴대폰 인증 useRef
    const userIdRef =  React.useRef();
    const userHpRef   =  React.useRef();

    // 휴대폰 인증 useRef
    const userId2Ref =  React.useRef();
    const userEmailRef =  React.useRef();

    ////////////////////////////////////////////////////////////////////////


    // 타이머 동작 3분 카운트
    React.useEffect(()=>{
        let setId = 0;
        let startTime = 0;
        let nowTime = 0;
        let endTime = 0;
        let now = new Date();

        const timerCount=()=>{
            startTime = new Date(now);  // 클릭싯점 스타트
            nowTime = new Date();
            
            startTime.setMinutes(startTime.getMinutes()+3);
            endTime = startTime - nowTime;  // 1/1000 초단위로 변환  .getTime()

            if(nowTime >= startTime){ // 시작시간보다 현재 시간이 이상이면 종료 타임
                clearInterval(setId);
                setMinutes(0);
                setSeconds(0);
            }
            else {
                setMinutes( Math.floor(endTime/(60*1000)%60) );
                setSeconds( Math.floor(endTime/(1000)%60) );
            }

        }
       
        // 인증번호 발송하고 그리고
        // 모달창을 닫으면 타이머 동작
        if(isAuth===true && isConfirmModal===false){
            setId = setInterval(timerCount, 1000);
        }
        
    },[isAuth, isConfirmModal]);


    // 이름 입력상자
    const onChangeId=(e)=>{
        setUserId(e.target.value);
    }
    // 휴대폰 입력상자
    const onChangeHp=(e)=>{
        // 휴대폰 번호 입력 형식 지정 저장하기
        setUserHp( e.target.value );
    }


    // 이름 입력상자
    const onChangeId2=(e)=>{
        setUserId2(e.target.value);
    }
    // 이메일 입력상자
    const onChangeEmail=(e)=>{
        setUserEmail(e.target.value);
    }    


    // 휴대폰 인증 입력상자
    const onChangeHpAuth=(e)=>{
        setUserHpAuth(e.target.value);
    }

    // 탭메뉴 버튼 클릭 이벤트
    const onClickTabBtn=(e, value)=>{
        e.preventDefault();

        if( value==="휴대폰" ){
            setIsTab(true); 
        }
        else {
            setIsTab(false);
        }
    }
    React.useEffect(()=>{
        (userId!=='' && userHp!=='') ? setIsBtn(true) : setIsBtn(false);
        (userId2!=='' && userEmail!=='') ? setIsBtn2(true) : setIsBtn2(false);
    },[userId, userHp, userId2, userEmail]);


    // 휴대폰 인증번호 받기 버튼 클릭 이벤트
    // 이메일 인증번호 받기 버튼 클릭 이벤트
    const onClickHpAuth=(e)=>{
        e.preventDefault();
        setIsAuth(true);
        // 인증번호 발송 7자리
        let authNum = Math.floor(Math.random()*(9000000+1000000));
        // 발급된인증키저장
        setHpAuth(authNum);        
        alert(`인증번호가 발송되었습니다. 3분안에 인증번호를 입력해주세요.${authNum}`);
    }
    
    // 아이콘 삭제 버튼 클릭 이벤트
    const onClickIconDel=(e, value)=>{
        e.preventDefault();
        switch(value){
            case "userId":
                setUserId('');
                userIdRef.current.focus();
                return;
            case "userId2":
                setUserId2('');
                userId2Ref.current.focus();
                return 
            case "userHp":
                setUserHp('');
                userHpRef.current.focus();
                return 
            case "userEmail":
                setUserEmail('');
                userEmailRef.current.focus();
                return;
            default:
                return;
        }
    }

    return (
        <main id='signInPwSearch' className='signInSearch'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>비밀번호 찾기</h2>
                    </div>
                    <div className="content">
                        <form autoComplete='off'>
                            <ul>
                                <li>
                                    <button onClick={(e)=>onClickTabBtn(e, '휴대폰')} className={isTab?'on':''}>휴대폰 인증</button>
                                    <button onClick={(e)=>onClickTabBtn(e, "이메일")} className={isTab?'':'on'}>이메일 인증</button>
                                </li>
                               { 
                                isTab ?
                                    (
                                        <>
                                            <li><label htmlFor="userId">아이디</label></li>
                                            <li>
                                                <input 
                                                    onChange={onChangeId}
                                                    type="text" 
                                                    name='user_id' 
                                                    id='userId' 
                                                    value={userId} 
                                                    placeholder='아이디를 입력해 주세요'
                                                    ref={userIdRef} 
                                                />
                                                {userId!=='' && <a onClick={(e)=>onClickIconDel(e, 'userId')} href="!#"><img src="./images/sub/sign_in/icon_del.svg" alt="" /></a>}
                                            </li>
                                            <li><label htmlFor="userHp">휴대폰</label></li>
                                            <li>
                                                <input 
                                                    onChange={onChangeHp}
                                                    type="text" 
                                                    name='user_hp' 
                                                    id='userHp' 
                                                    value={userHp} 
                                                    placeholder='휴대폰 번호를 입력해 주세요'
                                                    ref={userHpRef}     
                                                />
                                                {userHp!=='' && <a onClick={(e)=>onClickIconDel(e, 'userHp')}  href="!#"><img src="./images/sub/sign_in/icon_del.svg" alt="" /></a>}
                                            </li>
                                            <li>                                                
                                            </li>                                                
                                        {
                                            isAuth && (<>
                                                <li><label htmlFor="userHp">인증번호</label></li>
                                                <li>
                                                        <input 
                                                            onChange={onChangeHpAuth}
                                                            type="text" 
                                                            name='user_hp_auth' 
                                                            id='userHp' 
                                                            value={userHpAuth} 
                                                            placeholder='인증번호 7자리'
                                                        />
                                                        <button onClick={onClickHpAuth}>재발송</button>
                                                        <span>
                                                            <em>{minutes<10 ? `0${minutes}`:minutes}</em>
                                                            <i>:</i>
                                                            <em>{seconds<10 ? `0${seconds}`:seconds}</em>
                                                        </span>
                                                </li>
                                            </>)
                                        }
                                            <li className='hp-btn'>
                                            {
                                                !isAuth ?
                                                    (
                                                        <button onClick={onClickHpAuth} className={isBtn?'on':''}>인증번호 받기</button>
                                                    )
                                                    :
                                                    (
                                                        <button className={isBtn?'on':''}>확인</button>
                                                    )
                                            }
                                            </li>      
                                        </>
                                    )
                                    :    
                                    (
                                        <>
                                            <li><label htmlFor="userId2">아이디</label></li>
                                            <li>
                                                <input 
                                                    onChange={onChangeId2}
                                                    type="text" 
                                                    name='user_id2' 
                                                    id='userId2' 
                                                    value={userId2} 
                                                    placeholder='이름을 입력해 주세요' 
                                                    ref={userId2Ref} 
                                                />
                                                {userId2!=='' && <a onClick={(e)=>onClickIconDel(e, 'userName2')}   href="!#"><img src="./images/sub/sign_in/icon_del.svg" alt="" /></a>}
                                            </li>
                                            <li><label htmlFor="userEmail">이메일</label></li>
                                            <li>
                                                <input 
                                                    onChange={onChangeEmail}
                                                    type="email" 
                                                    name='user_email' 
                                                    id='userEmail' 
                                                    value={userEmail} 
                                                    placeholder='이메일을 입력해 주세요'
                                                    ref={userEmailRef}
                                                />                                                
                                                {userEmail!=='' && <a onClick={(e)=>onClickIconDel(e, 'userEmail')} href="!#"><img src="./images/sub/sign_in/icon_del.svg" alt="" /></a>}
                                            </li>
                                            <li></li>
                                            <li className='email-btn'><button className={isBtn2?'on':''}>확인</button></li>      
                                        </>
                                    )
                                }
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};