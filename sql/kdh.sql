# 주문 관리 테이블: 주문 기본 정보 저장
CREATE TABLE order_manage
(
    seq         INT AUTO_INCREMENT NOT NULL,
    order_no    VARCHAR(255)       NULL UNIQUE,
    order_date  datetime           NULL,
    total_price INT                NULL,
    status      VARCHAR(255)       NULL,
    track_no    VARCHAR(255)       NULL,
    member_seq  INT                NULL,
    del_yn      VARCHAR(255)       NULL,
    CONSTRAINT pk_order_manage PRIMARY KEY (seq)
);

ALTER TABLE order_manage
    ADD CONSTRAINT FK_ORDER_MANAGE_ON_MEMBER_SEQ FOREIGN KEY (member_seq) REFERENCES member (seq);

-- 반품 신청 테이블: 반품 관련 요청 정보 저장
CREATE TABLE return_request
(
    seq            INT AUTO_INCREMENT PRIMARY KEY,
    order_no       VARCHAR(100) NULL,
    product_no     VARCHAR(100) NULL,
    reason         VARCHAR(255) NULL,
    customer_name  VARCHAR(255) NULL,
    phone_number   VARCHAR(255) NULL,
    created_at     DATETIME     NULL,
    order_item_seq INT,
    CONSTRAINT fk_return_order FOREIGN KEY (order_no) REFERENCES order_manage (order_no),
    CONSTRAINT fk_return_item FOREIGN KEY (order_item_seq) REFERENCES order_items (seq)
);

-- 주문 상품 테이블: 주문별 상품 내역 저장
CREATE TABLE order_items
(
    seq        INT AUTO_INCREMENT NOT NULL,
    quantity   INT                NULL,
    order_no   VARCHAR(255)       NULL,
    product_no VARCHAR(20)        NULL,
    CONSTRAINT pk_order_items PRIMARY KEY (seq)
);

ALTER TABLE order_items
    ADD CONSTRAINT FK_ORDER_ITEMS_ON_ORDER_NO FOREIGN KEY (order_no) REFERENCES order_manage (order_no);

ALTER TABLE order_items
    ADD CONSTRAINT FK_ORDER_ITEMS_ON_PRODUCT_NO FOREIGN KEY (product_no) REFERENCES prj4.product (product_no);

INSERT INTO member (member_no, auth, member_id, password, name, email, birth_date,
                    phone, addr, addr_detail, post_code)
VALUES ('M001', 'user', 'testuser', 'testpw', '테스트유저', 'test@example.com', '1995-01-01',
        '010-1234-5678', '서울시 강남구', '역삼동 123', '06236');

INSERT INTO product (product_no, category, brand, name, standard, stock, price, note, state)
VALUES ('PROD901', '스킨케어', '토닥토닥', '테스트 상품', '500ml', 100, 15000, '테스트용 상품입니다', '판매중');

-- 정상 주문
INSERT INTO order_manage (order_no, order_date, total_price, status, track_no, member_seq, del_yn)
VALUES ('ORD008', '2025-01-01', 30000, '배송중', 'T1234527890', 1, 'N');

-- 삭제된 주문
INSERT INTO order_manage (order_no, order_date, total_price, status, track_no, member_seq, del_yn)
VALUES ('ORD002', NOW(), 15000, '배송완료', 'T0000000001', 1, 'Y');

-- ORD001: 정상 주문
INSERT INTO order_items (quantity, order_no, product_no)
VALUES (2, 'ORD007', 'PROD001');

-- ORD002: 삭제된 주문
INSERT INTO order_items (quantity, order_no, product_no)
VALUES (1, 'ORD002', 'PROD001');

CREATE TABLE receive
(
    seq              INT AUTO_INCREMENT NOT NULL,
    order_manage_seq INT                NULL,
    received_at      datetime           NULL,
    received_by      VARCHAR(255)       NULL,
    memo             VARCHAR(255)       NULL,
    CONSTRAINT pk_receive PRIMARY KEY (seq)
);

ALTER TABLE receive
    ADD CONSTRAINT FK_RECEIVE_ON_ORDER_MANAGE_SEQ FOREIGN KEY (order_manage_seq) REFERENCES order_manage (seq);