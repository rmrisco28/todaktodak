#회원관리 테스트 테이블1
CREATE TABLE member2
(
    seq         INT          NOT NULL AUTO_INCREMENT,
    member_id   VARCHAR(120) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    name        VARCHAR(50)  NOT NULL,
    email       VARCHAR(255) NOT NULL,
    birth_dt    DATE         NOT NULL,
    phone       VARCHAR(15)  NOT NULL,
    addr        VARCHAR(255) NOT NULL,
    addr_detail VARCHAR(255) NOT NULL,
    post_code   VARCHAR(10)  NOT NULL,
    insert_dttm DATETIME     NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_member PRIMARY KEY (seq)
);

DROP TABLE member2;

#회원관리 임시 테이블
CREATE TABLE member
(
    seq         INT AUTO_INCREMENT NOT NULL,
    member_no   VARCHAR(20)        NOT NULL UNIQUE,
    auth        VARCHAR(20),
    member_id   VARCHAR(120)       NOT NULL UNIQUE,
    password    VARCHAR(255)       NOT NULL,
    name        VARCHAR(50)        NOT NULL,
    email       VARCHAR(255)       NOT NULL,
    birth_date  DATE               NOT NULL,
    phone       VARCHAR(15)        NOT NULL,
    addr        VARCHAR(255)       NOT NULL,
    addr_detail VARCHAR(255)       NOT NULL,
    post_code   VARCHAR(10)        NOT NULL,
    insert_dttm DATETIME           NOT NULL DEFAULT NOW(),
    update_dttm DATETIME           NOT NULL DEFAULT NOW(),
    state       VARCHAR(10)        NOT NULL DEFAULT '사용',
    use_yn      BOOLEAN            NOT NULL DEFAULT TRUE,
    del_yn      BOOLEAN            NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_member PRIMARY KEY (seq)
);

ALTER TABLE member
    MODIFY state VARCHAR(10);

ALTER TABLE member
    MODIFY state VARCHAR(10) DEFAULT 'use';

desc member;

SELECT member_no
FROM member
WHERE seq = 1;
