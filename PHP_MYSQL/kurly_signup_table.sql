-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 25-01-24 17:17
-- 서버 버전: 8.0.36
-- PHP 버전: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `j8926267`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `kurly_signup_table`
--

CREATE TABLE `kurly_signup_table` (
  `idx` int NOT NULL COMMENT '자동 증가 번호',
  `user_id` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '아이디',
  `user_pw` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '비밀번호',
  `user_name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이름',
  `user_email` varchar(250) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이메일',
  `user_hp` varchar(11) COLLATE utf8mb4_general_ci NOT NULL COMMENT '휴대폰',
  `user_gender` varchar(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '성별',
  `user_birth` varchar(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '생년월일',
  `user_add` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '추가입력사항',
  `user_add_id` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '추천인아이디',
  `user_service` varchar(500) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이용약관동의',
  `user_signup_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '가입일자'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='마켓컬리 회원가입 테이블';

--
-- 덤프된 테이블의 인덱스
--


-- user_id, user_pw, user_name, user_email, user_hp, user_gender, user_birth, user_add, user_add_id, user_service
-- '$user_id', '$user_pw', '$user_name', '$user_email', '$user_hp', '$user_gender', '$user_birth', '$user_add', '$user_add_id', '$user_service'


--
-- 테이블의 인덱스 `kurly_signup_table`
--
ALTER TABLE `kurly_signup_table`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `kurly_signup_table`
--
ALTER TABLE `kurly_signup_table`
  MODIFY `idx` int NOT NULL AUTO_INCREMENT COMMENT '자동 증가 번호';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
