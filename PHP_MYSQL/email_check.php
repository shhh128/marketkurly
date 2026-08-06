<?php
    
    require_once __DIR__ . '/db.php';

    // 리액트 폼 데이터 전송 받기
    $user_email  = $_POST['user_email'];
    
    $sql = "SELECT user_email FROM kurly_signup_table WHERE user_email='$user_email'";
    $result = mysqli_query($conn, $sql);

    if( mysqli_num_rows($result) > 0 ){
        echo 1;
    }
    else {
        echo 0;
    }

?>