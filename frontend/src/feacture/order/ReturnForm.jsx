import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function ReturnForm() {
  const { id } = useParams();
  const [returnInfo, setReturninfo] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/return/${id}`)
      .then((res) => {
        setReturninfo(res.data);
      })
      .catch((err) => {
        console.error("데이터 조회 실패", err);
      });
  }, [id]);

  if (!returnInfo) return <p>Loading...</p>;

  return (
    <div>
      <h2>상품반납</h2>
      <div>
        <p>신청자명: {returnInfo.name}</p>
        <p>연락처: {returnInfo.phone}</p>
        <p>이메일: {returnInfo.email}</p>
        <p>주소: {returnInfo.address}</p>
        <p>기타 알림사항: {returnInfo.note}</p>
        <p>반납 신청일: {returnInfo.returnDate}</p>
        <br />
        <p>상품명 </p>
        <p>품번 </p>
        <p>대여일/반납일 </p>
        <p>상품이미지 </p>
        <p>렌탈기간 </p>
      </div>
      <div>절차</div>
    </div>
  );
}
