select now();
SELECT VERSION();

# 회원관리
CREATE TABLE member
(
    seq         INT          NOT NULL,
    member_no   VARCHAR(20)  NOT NULL UNIQUE,
    auth        VARCHAR(20),
    member_id   VARCHAR(120) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    name        VARCHAR(50)  NOT NULL,
    email       VARCHAR(255) NOT NULL,
    birth_dt    DATETIME     NOT NULL,
    phone       VARCHAR(15)  NOT NULL,
    addr        VARCHAR(255) NOT NULL,
    addr_detail VARCHAR(255) NOT NULL,
    postal      VARCHAR(10)  NOT NULL,
    insert_dttm DATETIME     NOT NULL DEFAULT NOW(),
    update_dttm DATETIME     NOT NULL DEFAULT NOW(),
    state       VARCHAR(10)  NOT NULL,
    use_yn      BOOLEAN      NOT NULL DEFAULT TRUE,
    del_yn      BOOLEAN      NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_member PRIMARY KEY (seq)
);
# DESC member;

# 상품관리 (내부 상품 재고 및 상태 관리)
CREATE TABLE product
(
    seq          INT          NOT NULL,
    product_no   VARCHAR(20)  NOT NULL UNIQUE,
    category_top VARCHAR(50)  NOT NULL,
    category_mid VARCHAR(50)  NOT NULL,
    category_sub VARCHAR(50)  NOT NULL,
    brand        VARCHAR(100) NOT NULL,
    name         VARCHAR(50)  NOT NULL,
    standard     VARCHAR(255) NOT NULL,
    stock        INT          NOT NULL,
    price        INT          NOT NULL,
    note         VARCHAR(255),
    insert_dttm  DATETIME     NOT NULL DEFAULT NOW(),
    update_dttm  DATETIME     NOT NULL DEFAULT NOW(),
    state        VARCHAR(10)  NOT NULL,
    use_yn       BOOLEAN      NOT NULL DEFAULT TRUE,
    del_yn       BOOLEAN      NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_product PRIMARY KEY (seq)
);
# DESC product;

# 판매상품 (상품 노출 관리)
CREATE TABLE sale
(
    seq          INT          NOT NULL,
    sale_no      VARCHAR(20)  NOT NULL UNIQUE,
    product_no   VARCHAR(20)  NOT NULL,
    category_top VARCHAR(20)  NOT NULL,
    category_mid VARCHAR(20)  NOT NULL,
    category_sub VARCHAR(20)  NOT NULL,
    title        VARCHAR(255) NOT NULL,
    quantity     INT          NOT NULL,
    price        INT          NOT NULL,
    delivery_fee INT          NOT NULL,
    content      VARCHAR(10000),
    view         INT          NOT NULL,
    insert_dttm  DATETIME     NOT NULL DEFAULT NOW(),
    update_dttm  DATETIME     NOT NULL DEFAULT NOW(),
    use_yn       BOOLEAN      NOT NULL DEFAULT TRUE,
    del_yn       BOOLEAN      NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_sale PRIMARY KEY (seq),
    FOREIGN KEY (product_no) REFERENCES product (product_no)
);
# DESC sale;

# 배송업체 관리
CREATE TABLE delivery
(
    seq         INT         NOT NULL,
    delivery_no VARCHAR(20) NOT NULL UNIQUE,
    name        VARCHAR(50) NOT NULL,
    tel         VARCHAR(15) NOT NULL,
    insert_dttm DATETIME    NOT NULL DEFAULT NOW(),
    update_dttm DATETIME    NOT NULL DEFAULT NOW(),
    state       VARCHAR(10) NOT NULL,
    use_yn      BOOLEAN     NOT NULL DEFAULT TRUE,
    del_yn      BOOLEAN     NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_delivery PRIMARY KEY (seq)
);
# DESC delivery;

# 주문관리
CREATE TABLE order_manage
(
    seq              INT         NOT NULL,
    order_no         VARCHAR(20) NOT NULL UNIQUE,
    sale_no          VARCHAR(20) NOT NULL,
    product_no       VARCHAR(20) NOT NULL,
    delivery_no      VARCHAR(20) NOT NULL,
    name             VARCHAR(50) NOT NULL,
    order_option     VARCHAR(255),
    count            INT         NOT NULL,
    days             INT         NOT NULL,
    reserv_dt        DATE        NOT NULL,
    delivery_fee     INT         NOT NULL,
    total_prod_price INT         NOT NULL,
    total_price      INT         NOT NULL,
    track_no         VARCHAR(50),
    state            VARCHAR(10) NOT NULL,
    insert_dttm      DATETIME    NOT NULL DEFAULT NOW(),
    update_dttm      DATETIME    NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_order_manage PRIMARY KEY (seq),
    FOREIGN KEY (sale_no) REFERENCES sale (sale_no),
    FOREIGN KEY (product_no) REFERENCES product (product_no),
    FOREIGN KEY (delivery_no) REFERENCES delivery (delivery_no)
);
# DESC order_manage;

# 반납내역
CREATE TABLE return_order
(
    seq         INT          NOT NULL,
    return_no   VARCHAR(20)  NOT NULL UNIQUE,
    sale_no     VARCHAR(20)  NOT NULL,
    product_no  VARCHAR(20)  NOT NULL,
    order_no    VARCHAR(20)  NOT NULL,
    addr        VARCHAR(255) NOT NULL,
    addr_detail VARCHAR(255) NOT NULL,
    postal      VARCHAR(10)  NOT NULL,
    name        VARCHAR(50)  NOT NULL,
    phone       VARCHAR(15)  NOT NULL,
    content     VARCHAR(255),
    state       VARCHAR(10)  NOT NULL,
    insert_dttm DATETIME     NOT NULL DEFAULT NOW(),
    update_dttm DATETIME     NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_return_order PRIMARY KEY (seq),
    FOREIGN KEY (sale_no) REFERENCES sale (sale_no),
    FOREIGN KEY (product_no) REFERENCES product (product_no),
    FOREIGN KEY (order_no) REFERENCES order_manage (order_no)
);
# DESC return_order;

# 문의게시판
CREATE TABLE contact
(
    seq         INT            NOT NULL,
    contact_no  VARCHAR(20)    NOT NULL UNIQUE,
    member_no   VARCHAR(20)    NOT NULL,
    title       VARCHAR(255)   NOT NULL,
    name        VARCHAR(50)    NOT NULL,
    content     VARCHAR(10000) NOT NULL,
    view        INT            NOT NULL,
    insert_dttm DATETIME       NOT NULL DEFAULT NOW(),
    update_dttm DATETIME       NOT NULL DEFAULT NOW(),
    use_yn      BOOLEAN        NOT NULL DEFAULT TRUE,
    del_yn      BOOLEAN        NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_contact PRIMARY KEY (seq),
    FOREIGN KEY (member_no) REFERENCES member (member_no)
);
# DESC contact;

# 문의답변
CREATE TABLE reply
(
    seq         INT            NOT NULL,
    reply_no    VARCHAR(20)    NOT NULL UNIQUE,
    contact_no  VARCHAR(20)    NOT NULL,
#     title       VARCHAR(255)   NOT NULL,
#     name        VARCHAR(50)    NOT NULL,
    content     VARCHAR(10000) NOT NULL,
    insert_dttm DATETIME       NOT NULL DEFAULT NOW(),
    update_dttm DATETIME       NOT NULL DEFAULT NOW(),
    use_yn      BOOLEAN        NOT NULL DEFAULT TRUE,
    del_yn      BOOLEAN        NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_reply PRIMARY KEY (seq),
    FOREIGN KEY (contact_no) REFERENCES contact (contact_no)
);
# DESC reply;

# 대여관리
CREATE TABLE rental
(
    seq         INT         NOT NULL,
    rental_no   VARCHAR(20) NOT NULL UNIQUE,
    order_no    VARCHAR(20) NOT NULL,
    product_no  VARCHAR(20) NOT NULL,
    member_no   VARCHAR(20) NOT NULL,
    insert_dttm DATETIME    NOT NULL DEFAULT NOW(),
    update_dttm DATETIME    NOT NULL DEFAULT NOW(),
    state       VARCHAR(10) NOT NULL,
    use_yn      BOOLEAN     NOT NULL DEFAULT TRUE,
    del_yn      BOOLEAN     NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_rental PRIMARY KEY (seq),
    FOREIGN KEY (order_no) REFERENCES order_manage (order_no),
    FOREIGN KEY (product_no) REFERENCES product (product_no),
    FOREIGN KEY (member_no) REFERENCES member (member_no)
);
# DESC rental;