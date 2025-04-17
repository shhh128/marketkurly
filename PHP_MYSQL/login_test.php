<?

    // j8926267.dothome.co.kr/shindorim_kurly/login_test.php

    // 데이터베이스 권한 설정정
    $DB_SERVER ='localhost';
    $DB_USER_NAME = 'j8926267';
    $DB_USER_PW = 'jungsh120!';
    $DB_NAME = 'j8926267';

    $conn = mysqli_connect($DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME);
    mysqli_set_charset($conn, 'utf8');

    // 리액트 폼 데이터 전송 받기 => 실전
    // 테스트 용 => 직접 해당 아이디, 비밀번호 입력 후 점검
    $user_id  = 'shhhh178';     // 아이디
    $user_pw  = 'jungsh120@'; // 비밀번호
    
    // 응답 메시지에는 데이터를 뭣뭣 받을래?
    // 아이디, 이름 휴대폰 받을래!
    // 아이디, 이름 휴대폰, 주소 누락 추가!
    $sql = "SELECT user_id, user_name, user_hp 
            FROM kurly_signup_table 
            WHERE user_id='$user_id' AND  user_pw='$user_pw'";
    $result = mysqli_query($conn, $sql);

    if( mysqli_num_rows($result) > 0 ){
        $item = mysqli_fetch_array($result);
        // echo 1;
        echo "<h1>로그인 성공</h1>";
        echo '아이디: ' .$item['user_id']. '<br>';
        echo '이름: '   .$item['user_name']. '<br>';
        echo '휴대폰: ' .$item['user_hp']. '<br>';
    }
    else {
        // echo 0;
        echo "<h1>로그인 실패</h1>";
        echo "<h2>아이디 비밀번호 확인해 주세요!</h2>";
    }

?>