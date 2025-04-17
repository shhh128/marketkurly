<?

    $DB_SERVER = 'localhost';
    $DB_USER_NAME = 'j8926267';
    $DB_USER_PW = 'jungsh120!';
    $DB_NAME = 'j8926267';

    $conn = mysqli_connect($DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME);
    mysqli_set_charset($conn, 'utf8');

    $user_id = $_POST['user_id'];
    $user_pw = $_POST['user_pw'];
    $user_name = $_POST['user_name'];
    $user_email = $_POST['user_email'];
    $user_hp = $_POST['user_hp'];
    $user_gender = $_POST['user_gender'];
    $user_birth = $_POST['user_birth'];
    $user_add = $_POST['user_add'];
    $user_add_id = $_POST['user_add_id'];
    $user_service = $_POST['user_service'];
    
    $sql = "INSERT INTO kurly_signup_table (user_id, user_pw, user_name, user_email, user_hp, user_gender, user_birth, user_add, user_add_id, user_service) 
            VALUE ('$user_id', '$user_pw', '$user_name', '$user_email', '$user_hp', '$user_gender', '$user_birth', '$user_add', '$user_add_id', '$user_service')";

    $result = mysqli_query($conn, $sql);

    if($result===true){
        echo 1; // 성공 응답
    }
    else {
        echo 0; // 실패 응답
    }
?>