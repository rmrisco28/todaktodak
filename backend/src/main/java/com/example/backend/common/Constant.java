package com.example.backend.common;

public class Constant {

    /**
     * 주문 상태값 상수 정의
     */
    public static final String ORDER_STATE_PAYMENT_READY = "P.RDY";     //* 결제 대기
    public static final String ORDER_STATE_PAYMENT_COMPLETED = "P.CPLT";     //* 결제 완료
    public static final String ORDER_STATE_DELIVERY_READY = "D.RDY";     //* 배송 대기
    public static final String ORDER_STATE_DELIVERY_PROGRESS = "D.PRG";     //* 배송 중
    public static final String ORDER_STATE_DELIVERY_COMPLETED = "D.CPLT";     //* 배송 완료
    public static final String ORDER_STATE_RECEIVED_COMPLETED = "RV.CPLT";     //* 수령 완료
    public static final String ORDER_STATE_RETURN_REQUEST = "RT.REQ";     //* 반송 요청
    public static final String ORDER_STATE_RETURN_PROGRESS = "RT.PRG";     //* 반송 진행
    public static final String ORDER_STATE_RETURN_COMPLETED = "RT.CPLT";     //* 반송 완료
    public static final String ORDER_STATE_CANCEL_REQUEST = "C.REQ";     //* 취소 요청
    public static final String ORDER_STATE_CANCEL_COMPLETED = "C.CPLT";     //* 취소 완료

    public static final String RENTAL_STATE_RENTAL_COMPLETED = "R.RSRC"; // *렌탈 완료
    public static final String RENTAL_STATE_RENTAL_CANCELED = "R.RCAN"; // 렌탈 취소
    public static final String RENTAL_STATE_RENTAL_REFUNDED = "R.RREF"; // 렌탈 환불
    public static final String RENTAL_STATE_RENTAL_REJECTED = "R.RREJ"; // 렌탈 거부
    public static final String RENTAL_STATE_RENTAL_PENDING = "R.RPND"; // 렌탈 보류

    public static final String RETURN_STATE_RETURN_REQUEST = "RE.RSRR"; // 반납 요청
    public static final String RETURN_STATE_RETURN_COMPLETED = "RE.RSCN"; // 반납 완료


}
