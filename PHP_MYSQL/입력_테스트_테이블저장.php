<?

    $DB_SERVER = 'localhost';
    $DB_USER_NAME = 'j8926267';
    $DB_USER_PW = 'jungsh120!';
    $DB_NAME = 'j8926267';

    $conn = mysqli_connect($DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME);
    mysqli_set_charset($conn, 'utf8');

    if($conn===false){
        echo "데이터베이스 접속 실패";
    }
    else {
        echo "데이터베이스 접속 성공";
    }

    $user_id = "j8926267";
    $user_pw = "jungsh120.";
    $user_name = "jungsh120.";
    $user_email = "j8926267@naver.com";
    $user_hp = "01063943041";
    $user_gender = "여자";
    $user_birth = "2000-12-18";
    $user_add = "친구초대 추천인 아이디";
    $user_add_id = "shhh";
    $user_service = "이용약관 동의(필수),개인정보 수집∙이용 동의(필수),본인은 만 14세 이상입니다.(필수)";
    
    $sql = "INSERT INTO kurly_signup_table (user_id, user_pw, user_name, user_email, user_hp, user_gender, user_birth, user_add, user_add_id, user_service) 
            VALUE ('$user_id', '$user_pw', '$user_name', '$user_email', '$user_hp', '$user_gender', '$user_birth', '$user_add', '$user_add_id', '$user_service')";

    $result = mysqli_query($conn, $sql);

    if($result===true){
        echo "테이블 저장 성공!";
    }
    else{
        echo "테이블 저장 실패!";
    }
?>