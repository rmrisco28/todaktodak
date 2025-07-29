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

SELECT om.seq AS order_seq,
       om.order_no,
       om.order_date,
       om.total_price,
       om.status,
       om.track_no,
       m.seq  AS member_seq,
       p.name AS product_name
FROM order_manage om
         JOIN
     member m ON om.member_seq = m.seq
         JOIN
     order_items oi ON oi.order_no = om.order_no
         JOIN
     product p ON oi.product_no = p.product_no
WHERE om.member_seq = 1
ORDER BY om.order_date DESC;

INSERT INTO order_manage (order_no, order_date, total_price, status, track_no, member_seq)
VALUES ('ORD001', NOW(), 30000, '배송중', 'T1234567890', 1);

INSERT INTO product (product_no, category, brand, name, standard, stock, price, note, state)
VALUES ('PROD001', '스킨케어', '토닥토닥', '테스트 상품', '500ml', 100, 15000, '테스트용 상품입니다', '판매중');
INSERT INTO order_items (quantity, order_no, product_no)
VALUES (2, 'ORD001', 'PROD001');