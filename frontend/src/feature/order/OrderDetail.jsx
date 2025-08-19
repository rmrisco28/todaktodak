import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Button,
  Spinner,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  ListGroup,
  ListGroupItem,
  Image,
  Modal,
  FormSelect,
} from "react-bootstrap";
import { toast } from "react-toastify";

import data from "../../json/stateOrder.json";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

// 주문 상태값 목록
const stateList = [];
data.orderStateList.map((i) =>
  stateList.push({ id: i.id, code: i.code, kor: i.kor }),
);

export function OrderDetail() {
  const { isAdmin } = useContext(AuthenticationContext);
  const [order, setOrder] = useState(null);
  const { seq } = useParams();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [state, setState] = useState("");
  const [request, setRequest] = useState("");
  const [deliveryCompany, setDeliveryCompany] = useState("");
  const [tracking, setTracking] = useState("");
  const [deliveryList, setDeliveryList] = useState([]);

  useEffect(() => {
    axios.get(`/api/delivery/formSelect`).then((res) => {
      setDeliveryList(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/order/detail/${seq}`)
      .then((res) => {
        setOrder(res.data);
        setRequest(res.data.request);
        setDeliveryCompany(res.data.deliveryCompany);
        setTracking(res.data.tracking);
      })
      .catch((err) => {
        toast("해당 주문 정보가 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!order) {
    return <Spinner />;
  }

  let validate = true;
  if (
    state === null
    // TODO [@MINKI] state의 값에 따라 필요한 validate 확인
  ) {
    validate = false;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);

    axios
      .putForm(`/api/order/modify/${seq}`, {
        state: order.state,
        request: order.request,
        deliveryCode: order.deliveryCode,
        deliveryCompany: order.deliveryCompany,
        tracking: order.tracking,
      })
      .then((res) => {
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate(`/order/${seq}`);
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("주문 수정 시 오류가 발생하였습니다.", { type: "warning" });
        }
      })
      .finally(() => {
        setModalShow(false);
        setIsProcessing(false);
        navigate(`/order/admin/list`);
      });
  }

  return (
    <>
      <>
        <div className="container-fluid py-3" style={{ background: "#f8f9fa" }}>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="row g-4">
                {/* 왼쪽: 주문 상세 정보 */}
                <div className="col-12 col-lg-7">
                  <div
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: "15px" }}
                  >
                    <div className="card-body p-4">
                      <h3 className="fw-bold mb-4" style={{ color: "#212529" }}>
                        {order.seq}번 주문 상세 정보
                      </h3>

                      {/* 주문 기본 정보 섹션 */}
                      <div className="mb-4">
                        <h5
                          className="fw-semibold mb-3"
                          style={{ color: "#495057" }}
                        >
                          주문 기본 정보
                        </h5>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            주문번호
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            style={{
                              borderRadius: "10px",
                              padding: "12px 16px",
                              fontSize: "0.95rem",
                              backgroundColor: "#f1f1f1",
                            }}
                            value={order.orderNo}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            주문일시
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            style={{
                              borderRadius: "10px",
                              padding: "12px 16px",
                              fontSize: "0.95rem",
                              backgroundColor: "#f1f1f1",
                            }}
                            value={order.insertDttm}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            대여기간
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            style={{
                              borderRadius: "10px",
                              padding: "12px 16px",
                              fontSize: "0.95rem",
                              backgroundColor: "#f1f1f1",
                            }}
                            value={order.rentalPeriod}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            주문상태
                          </label>
                          {isAdmin() ? (
                            <select
                              className="form-select bg-white"
                              style={{
                                borderRadius: "10px",
                                padding: "12px 16px",
                                fontSize: "0.95rem",
                                border: "2px solid #dee2e6",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#495057";
                                e.target.style.boxShadow =
                                  "0 0 0 0.2rem rgba(73, 80, 87, 0.15)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "#dee2e6";
                                e.target.style.boxShadow = "none";
                              }}
                              onChange={(e) =>
                                setOrder({ ...order, state: e.target.value })
                              }
                            >
                              {stateList.map((item) => (
                                <option
                                  value={item.code}
                                  key={item.id}
                                  selected={item.code === order.state}
                                >
                                  {item.kor}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              className="form-control border-0"
                              style={{
                                borderRadius: "10px",
                                padding: "12px 16px",
                                fontSize: "0.95rem",
                                backgroundColor: "#f1f1f1",
                              }}
                              value={
                                stateList.find(
                                  (item) => item.code === order.state,
                                )?.kor || ""
                              }
                              readOnly
                            />
                          )}
                        </div>
                      </div>

                      {/* 배송 정보 섹션 */}
                      <div className="mb-4">
                        <h5
                          className="fw-semibold mb-3"
                          style={{ color: "#495057" }}
                        >
                          배송 정보
                        </h5>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            수령인
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            style={{
                              borderRadius: "10px",
                              padding: "12px 16px",
                              fontSize: "0.95rem",
                              backgroundColor: "#f1f1f1",
                            }}
                            value={order.recipient}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            연락처
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            style={{
                              borderRadius: "10px",
                              padding: "12px 16px",
                              fontSize: "0.95rem",
                              backgroundColor: "#f1f1f1",
                            }}
                            value={order.phone}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            우편번호
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            style={{
                              borderRadius: "10px",
                              padding: "12px 16px",
                              fontSize: "0.95rem",
                              backgroundColor: "#f1f1f1",
                            }}
                            value={order.post}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            주소
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            style={{
                              borderRadius: "10px",
                              padding: "12px 16px",
                              fontSize: "0.95rem",
                              backgroundColor: "#f1f1f1",
                            }}
                            value={order.addr}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            상세주소
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            style={{
                              borderRadius: "10px",
                              padding: "12px 16px",
                              fontSize: "0.95rem",
                              backgroundColor: "#f1f1f1",
                            }}
                            value={order.addrDetail}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label fw-medium"
                            style={{ color: "#343a40" }}
                          >
                            배송 요청사항
                          </label>
                          {isAdmin() ? (
                            <input
                              type="text"
                              className="form-control bg-white"
                              style={{
                                borderRadius: "10px",
                                padding: "12px 16px",
                                fontSize: "0.95rem",
                                border: "2px solid #dee2e6",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#495057";
                                e.target.style.boxShadow =
                                  "0 0 0 0.2rem rgba(73, 80, 87, 0.15)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "#dee2e6";
                                e.target.style.boxShadow = "none";
                              }}
                              value={order.request}
                              onChange={(e) =>
                                setOrder({ ...order, request: e.target.value })
                              }
                            />
                          ) : (
                            <input
                              type="text"
                              className="form-control border-0"
                              style={{
                                borderRadius: "10px",
                                padding: "12px 16px",
                                fontSize: "0.95rem",
                                backgroundColor: "#f1f1f1",
                              }}
                              value={order.request}
                              readOnly
                            />
                          )}
                        </div>
                      </div>

                      {/* 배송 관리 섹션 (관리자용) */}
                      {isAdmin() && (
                        <div className="mb-4">
                          <h5
                            className="fw-semibold mb-3"
                            style={{ color: "#495057" }}
                          >
                            배송 관리
                          </h5>

                          <div className="mb-3">
                            <label
                              className="form-label fw-medium"
                              style={{ color: "#343a40" }}
                            >
                              배송업체
                            </label>
                            <select
                              className="form-select bg-white"
                              style={{
                                borderRadius: "10px",
                                padding: "12px 16px",
                                fontSize: "0.95rem",
                                border: "2px solid #dee2e6",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#495057";
                                e.target.style.boxShadow =
                                  "0 0 0 0.2rem rgba(73, 80, 87, 0.15)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "#dee2e6";
                                e.target.style.boxShadow = "none";
                              }}
                              onChange={(e) =>
                                setOrder({
                                  ...order,
                                  deliveryCode: e.target.value,
                                  deliveryCompany: e.target.selectedOptions.item(0).innerText,
                                })
                              }
                            >
                              <option>배송업체 선택</option>
                              {deliveryList.map((item) => (
                                <option
                                  value={item.code}
                                  key={item.seq}
                                  selected={item.name === order.deliveryCompany}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              className="form-label fw-medium"
                              style={{ color: "#343a40" }}
                            >
                              운송장번호
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white"
                              style={{
                                borderRadius: "10px",
                                padding: "12px 16px",
                                fontSize: "0.95rem",
                                border: "2px solid #dee2e6",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#495057";
                                e.target.style.boxShadow =
                                  "0 0 0 0.2rem rgba(73, 80, 87, 0.15)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "#dee2e6";
                                e.target.style.boxShadow = "none";
                              }}
                              value={order.tracking}
                              onChange={(e) =>
                                setOrder({ ...order, tracking: e.target.value })
                              }
                            />
                          </div>

                          <button
                            className="btn btn-dark fw-bold px-4"
                            style={{
                              borderRadius: "12px",
                              padding: "12px 24px",
                              fontSize: "0.95rem",
                            }}
                            onClick={() => setModalShow(true)}
                            disabled={isProcessing || !validate}
                          >
                            {isProcessing ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                처리중...
                              </>
                            ) : (
                              "주문 상태 변경"
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 오른쪽: 주문 요약 */}
                <div className="col-12 col-lg-5">
                  <div
                    className="card border-0 shadow-sm mb-4"
                    style={{ borderRadius: "15px" }}
                  >
                    <div className="card-body p-4">
                      <h4 className="fw-bold mb-4" style={{ color: "#212529" }}>
                        주문 상품 정보
                      </h4>

                      {/* 상품 이미지 및 정보 */}
                      <div
                        className="d-flex gap-3 mb-4 p-3 bg-light"
                        style={{ borderRadius: "12px" }}
                      >
                        <img
                          src={order.image.path}
                          alt={order.saleTitle}
                          className="rounded"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="flex-grow-1">
                          <h6
                            className="fw-semibold mb-2"
                            style={{ fontSize: "0.95rem" }}
                          >
                            {order.saleTitle}
                          </h6>
                          <p
                            className="text-muted mb-1"
                            style={{ fontSize: "0.85rem" }}
                          >
                            수량: {order.orderCount}개
                          </p>
                          <p
                            className="fw-bold mb-0"
                            style={{ color: "#212529" }}
                          >
                            {order.prodPrice.toLocaleString()}원
                          </p>
                        </div>
                      </div>

                      {/* 금액 상세 */}
                      <div className="border-top pt-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{ color: "#6c757d" }}>상품 금액</span>
                          <span>{order.totProdPrice.toLocaleString()}원</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                          <span style={{ color: "#6c757d" }}>배송비</span>
                          <span>
                            {order.deliveryFee > 0
                              ? `${order.deliveryFee.toLocaleString()}원`
                              : "무료배송"}
                          </span>
                        </div>

                        <hr className="my-3" />

                        <div className="d-flex justify-content-between mb-4">
                          <span
                            className="fw-bold"
                            style={{ fontSize: "1.1rem", color: "#212529" }}
                          >
                            총 결제 완료된 금액
                          </span>
                          <span
                            className="fw-bold"
                            style={{ fontSize: "1.2rem", color: "#212529" }}
                          >
                            {order.totalPrice.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 배송업체 정보 (일반 사용자용) */}
                  {!isAdmin() && (
                    <div
                      className="card border-0 shadow-sm"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body p-4">
                        <h5
                          className="fw-bold mb-3"
                          style={{ color: "#212529" }}
                        >
                          배송 정보
                        </h5>

                        <div className="mb-3">
                          <span
                            className="fw-medium text-muted d-block mb-1"
                            style={{ fontSize: "0.875rem" }}
                          >
                            배송업체
                          </span>
                          <span style={{ color: "#4a5568" }}>
                            {order.deliveryCompany || "배송업체 미정"}
                          </span>
                        </div>

                        <div className="mb-0">
                          <span
                            className="fw-medium text-muted d-block mb-1"
                            style={{ fontSize: "0.875rem" }}
                          >
                            운송장번호
                          </span>
                          <span style={{ color: "#4a5568" }}>
                            {order.tracking || "운송장번호 미등록"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 모달 */}
        <div
          className={`modal fade ${modalShow ? "show d-block" : ""}`}
          style={{
            backgroundColor: modalShow ? "rgba(0,0,0,0.5)" : "transparent",
          }}
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{ borderRadius: "15px", border: "none" }}
            >
              <div className="modal-header border-0">
                <h5
                  className="modal-title fw-bold"
                  style={{ color: "#212529" }}
                >
                  상태값 변경 확인
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalShow(false)}
                ></button>
              </div>
              <div className="modal-body">
                {order.seq}번 주문의 상태를 수정하시겠습니까?
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  style={{ borderRadius: "10px", fontWeight: "500" }}
                  onClick={() => setModalShow(false)}
                >
                  취소
                </button>
                <button
                  className="btn btn-dark"
                  style={{ borderRadius: "10px", fontWeight: "500" }}
                  disabled={isProcessing}
                  onClick={handleSaveButtonClick}
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      처리중...
                    </>
                  ) : (
                    "수정"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
