<?php 

    // 
    $DB_SERVER ='localhost';
    $DB_USER_NAME = 'DB_USERNAME';
    $DB_USER_PW = 'DB_PASSWORD';
    $DB_NAME = 'DB_NAME';
    // 데이터베이스 연결
    $conn = mysqli_connect($DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME);

    // 연결 실패 확인
    // 연결 실패 확인
    if (!$conn) {
        die('데이터베이스 연결에 실패했습니다.');
    }
    
    mysqli_set_charset($conn, 'utf8');

?>