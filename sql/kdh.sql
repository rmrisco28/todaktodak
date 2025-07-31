-- ✅ 주문 관리 테이블: 주문 기본 정보 저장
CREATE TABLE order_manage
(
    seq         INT AUTO_INCREMENT NOT NULL,     -- 기본 키 (자동 증가)
    order_no    VARCHAR(255) NULL UNIQUE,        -- 주문 번호 (고유값)
    order_date  DATETIME NULL,                   -- 주문 일자
    total_price INT NULL,                        -- 주문 총액
    status      VARCHAR(255) NULL,               -- 주문 상태 (예: 배송중, 완료 등)
    track_no    VARCHAR(255) NULL,               -- 운송장 번호
    member_seq  INT NULL,                        -- 주문자 회원 번호 (member 테이블 참조)
    del_yn      VARCHAR(255) NULL,               -- 삭제 여부 (Y/N)
    CONSTRAINT pk_order_manage PRIMARY KEY (seq) -- 기본 키 제약조건
);

-- 🔗 member 테이블과 외래키 연결 (member.seq를 참조)
ALTER TABLE order_manage
    ADD CONSTRAINT FK_ORDER_MANAGE_ON_MEMBER_SEQ
        FOREIGN KEY (member_seq) REFERENCES member (seq);

-- ✅ 반품 신청 테이블: 반품 요청 기록 저장
CREATE TABLE return_request
(
    seq            INT AUTO_INCREMENT PRIMARY KEY,                 -- 기본 키
    order_no       VARCHAR(100) NULL,                              -- 주문 번호 (order_manage 참조)
    product_no     VARCHAR(100) NULL,                              -- 상품 번호
    reason         VARCHAR(255) NULL,                              -- 반품 사유
    customer_name  VARCHAR(255) NULL,                              -- 고객명
    phone_number   VARCHAR(255) NULL,                              -- 고객 전화번호
    created_at     DATETIME NULL,                                  -- 반품 신청 일자
    order_item_seq INT,                                            -- 주문상품 항목 번호 (order_items 참조)
    CONSTRAINT fk_return_order
        FOREIGN KEY (order_no) REFERENCES order_manage (order_no), -- 주문번호 외래키
    CONSTRAINT fk_return_item
        FOREIGN KEY (order_item_seq) REFERENCES order_items (seq)  -- 주문상품 외래키
);

-- ✅ 주문 상품 테이블: 각 주문에 포함된 개별 상품 저장
CREATE TABLE order_items
(
    seq        INT AUTO_INCREMENT NOT NULL, -- 기본 키
    quantity   INT NULL,                    -- 수량
    order_no   VARCHAR(255) NULL,           -- 주문 번호 (order_manage 참조)
    product_no VARCHAR(20) NULL,            -- 상품 번호 (product 테이블 참조)
    CONSTRAINT pk_order_items PRIMARY KEY (seq)
);

-- 🔗 주문 번호와 연결
ALTER TABLE order_items
    ADD CONSTRAINT FK_ORDER_ITEMS_ON_ORDER_NO
        FOREIGN KEY (order_no) REFERENCES order_manage (order_no);

-- 🔗 상품 번호와 연결 (외래키 지정 시 스키마명 `prj4` 사용)
ALTER TABLE order_items
    ADD CONSTRAINT FK_ORDER_ITEMS_ON_PRODUCT_NO
        FOREIGN KEY (product_no) REFERENCES prj4.product (product_no);

-- ✅ 회원 및 상품 테스트 데이터 삽입
INSERT INTO member (member_no, auth, member_id, password, name, email, birth_date,
                    phone, addr, addr_detail, post_code)
VALUES ('M001', 'user', 'testuser', 'testpw', '테스트유저', 'test@example.com', '1995-01-01',
        '010-1234-5678', '서울시 강남구', '역삼동 123', '06236');

INSERT INTO product (product_no, category, brand, name, standard, stock, price, note, state)
VALUES ('PROD901', '스킨케어', '토닥토닥', '테스트 상품', '500ml', 100, 15000, '테스트용 상품입니다', '판매중');

-- ✅ 주문 데이터 삽입
-- 정상 주문
INSERT INTO order_manage (order_no, order_date, total_price, status, track_no, member_seq, del_yn)
VALUES ('ORD008', '2025-01-01', 30000, '배송중', 'T1234527890', 1, 'N');

-- 삭제된 주문
INSERT INTO order_manage (order_no, order_date, total_price, status, track_no, member_seq, del_yn)
VALUES ('ORD002', NOW(), 15000, '배송완료', 'T0000000001', 1, 'Y');

-- ✅ 주문 상품 데이터 삽입
-- 정상 주문의 상품 내역
INSERT INTO order_items (quantity, order_no, product_no)
VALUES (2, 'ORD007', 'PROD001');

-- 삭제된 주문의 상품 내역
INSERT INTO order_items (quantity, order_no, product_no)
VALUES (1, 'ORD002', 'PROD001');

-- ✅ 수령 처리 테이블: 수령 완료 기록 저장
CREATE TABLE receive
(
    seq              INT AUTO_INCREMENT NOT NULL, -- 기본 키
    order_manage_seq INT NULL,                    -- 주문 관리 테이블 seq 참조
    received_at      DATETIME NULL,               -- 수령 일시
    received_by      VARCHAR(255) NULL,           -- 수령자 (member_no)
    memo             VARCHAR(255) NULL,           -- 메모
    CONSTRAINT pk_receive PRIMARY KEY (seq)
);

-- 🔗 주문 관리 테이블과 외래키 연결
ALTER TABLE receive
    ADD CONSTRAINT FK_RECEIVE_ON_ORDER_MANAGE_SEQ
        FOREIGN KEY (order_manage_seq) REFERENCES order_manage (seq);

-- ================================
-- 프로젝트에 끝까지 함께하지 못해 죄송합니다.
-- 주말에 큰형에게 조언을 들으려 했으나 마땅치않았고
-- 결국 네가 할 수 있는건 없다. 네가 필요한건 답안지에 쓸 답뿐이다.
-- 그냥 gpt한테 물어보고 그걸 그대로 받아적어라
-- 네가 지금 팀원들의 인생에서 가장 중요한 때를 망치는 거나 다름 없다. 라는 말을 듣게 되었습니다.
-- 때문에 저는 팀원들에게도 같이 수업을 듣는 다른 사람들에게도 부끄러워졌습니다.
-- 이젠 더이상 gpt로 해결할 수 없게되면서 제가 할수있는게 더이상 없다고 느껴졌습니다.
-- 제가 작성한 SQL과 코드가 여러분의 진행에 방해되지 않기를 바랍니다.
-- 부족한 부분이 많았지만, 함께했던 시간 감사했습니다.
-- 남은 개발 잘 마무리하시길 진심으로 응원합니다.
-- - 권도훈 드림
-- ================================