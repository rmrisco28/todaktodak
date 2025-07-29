# 주문 관리 테이블: 주문 기본 정보 저장
CREATE TABLE order_manage
(
    seq             INT AUTO_INCREMENT PRIMARY KEY,
    order_no        VARCHAR(255),
    order_date      DATETIME,
    total_price     INT,
    status          VARCHAR(50),
    tracking_number VARCHAR(255),
    member_id       INT,
    FOREIGN KEY (member_id) REFERENCES member (seq)
);

ALTER TABLE order_manage
    ADD CONSTRAINT FK_ORDERMANAGE_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (seq);

-- 반품 신청 테이블: 반품 관련 요청 정보 저장
CREATE TABLE return_request
(
    id            INT AUTO_INCREMENT NOT NULL,
    order_number  VARCHAR(255)          NULL,
    product_code  VARCHAR(255)          NULL,
    reason        VARCHAR(255)          NULL,
    customer_name VARCHAR(255)          NULL,
    phone_number  VARCHAR(255)          NULL,
    created_at    datetime              NULL,
    CONSTRAINT pk_return_request PRIMARY KEY (id)
);

ALTER TABLE return_request ADD COLUMN order_item_id INT;

ALTER TABLE return_request
    ADD FOREIGN KEY (order_item_id) REFERENCES order_items(seq);

-- 주문 상품 테이블: 주문별 상품 내역 저장
CREATE TABLE order_items
(
    seq        INT AUTO_INCREMENT NOT NULL,
    quantity   INT                   NOT NULL,
    order_id   INT                   NULL,
    product_id INT                   NULL,
    CONSTRAINT pk_order_items PRIMARY KEY (seq)
);

ALTER TABLE order_items
    ADD CONSTRAINT FK_ORDER_ITEMS_ON_ORDER FOREIGN KEY (order_id) REFERENCES order_manage (seq);

ALTER TABLE order_items
    ADD CONSTRAINT FK_ORDER_ITEMS_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES prj4.product (seq);