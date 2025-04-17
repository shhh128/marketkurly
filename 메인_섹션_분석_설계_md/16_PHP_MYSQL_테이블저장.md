1. 입력 테스트 PHP

입력_테스트_테이블저장.php
insert_signup_table.php

DB서버 localhost
DB사용자이름 j8926267
DB사용자비밀번호 jungsh120!
DB이름 j8926267

닷홈 배포 폴더
shindorim_kurly

http://j8926267.dothome.co.kr/shindorim_kurly/입력_테스트_테이블저장.php

// AXIOS API POST 방식 전송

// 닷홈 접속
// j8926267
// jungsh120!

// 관리자 페이지 데이터베이스
// j8926267.dothome.co.kr/myadmin

// kurly_signup_table

// DB 12개 속성
// 전송 데이터 정리
// idx INT(정수) AUTO_INCREMENT 자동증가번호 인덱스번호
// 아이디 user_id 16 문자열 VAR
// 비밀번호1 user_pw 16 VAR
// 이름 user_name 30 VAR
// 이메일1 이메일2 user_email 250
// 휴대폰 user_hp 11
// 성별 user_gender 10
// 생년-생월-생일 user_birth 10
// 추가입력사항 user_add 100
// 추천인아이디 user_add_id 16
// 이용약관동의 user_service 500
// 가입일자 지금 날짜 자동저장 user_signup_date 타임스탬프

// 전송
// user_id
// user_pw
// user_name
// user_email
// user_hp
// user_gender
// user_birth
// user_add
// user_add_id
// user_service