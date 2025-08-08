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


}
