<?php
    
    // db.php에서 닷홈 접속 정보 불러오기
    require_once __DIR__ . '/db.php';

    // 리액트 폼 데이터 전송 받기 => 실전
    $user_id  = $_POST['user_id'];     // 아이디
    $user_pw  = $_POST['user_pw'];     // 비밀번호
    
    // 응답 메시지에 아이디, 이름, 휴대폰 데이터를 받음
    // 아이디로 회원 정보와 해시된 비밀번호 조회
    $sql = "SELECT user_id, user_pw, user_name, user_hp 
            FROM kurly_signup_table 
            WHERE user_id='$user_id'";
    $result = mysqli_query($conn, $sql);

    if( mysqli_num_rows($result) > 0 ){
        $item = mysqli_fetch_array($result);
        // echo 1;
        // echo "<h1>로그인 성공</h1>";
        // echo '아이디: ' .$item['user_id']. '<br>';
        // echo '이름: '   .$item['user_name']. '<br>';
        // echo '휴대폰: ' .$item['user_hp']. '<br>';
        // echo '{"아이디":"' .$item['user_id']. '", "이름":"' .$item['user_name']. '", "휴대폰":"' .$item['user_hp']. '"}';

        // 입력한 비밀번호와 DB의 해시값 확인
        if (password_verify($user_pw, $item['user_pw'])) {
            echo '{"아이디":"' .$item['user_id']. '", "이름":"' .$item['user_name']. '", "휴대폰":"' .$item['user_hp']. '"}';
        }
        else {
            echo "<h1>로그인 실패</h1>";
            echo "<h2>아이디 비밀번호 확인해 주세요!</h2>";
        }
    }
    else {
        // echo 0;
        echo "<h1>로그인 실패</h1>";
        echo "<h2>아이디 비밀번호 확인해 주세요!</h2>";
    }

?>