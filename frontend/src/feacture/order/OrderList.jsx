import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    orderNo: "",
    orderOption: "",
    orderDate: "",
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/order/list");
      setOrders(response.data);
    } catch (error) {
      console.error("주문 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/order/save", form);
      alert("주문이 저장되었습니다.");
      setForm({ orderNo: "", orderOption: "", orderDate: "" });
      fetchOrders();
    } catch (error) {
      console.error("주문 저장 실패:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">주문 관리</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-2">
          <label className="block">주문번호:</label>
          <input
            type="text"
            name="orderNo"
            value={form.orderNo}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block">옵션:</label>
          <input
            type="text"
            name="orderOption"
            value={form.orderOption}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">주문일자:</label>
          <input
            type="datetime-local"
            name="orderDate"
            value={form.orderDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          주문 저장
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">주문 목록</h2>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">SEQ</th>
            <th className="border px-4 py-2">주문번호</th>
            <th className="border px-4 py-2">옵션</th>
            <th className="border px-4 py-2">주문일자</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.seq}>
              <td className="border px-4 py-2">{order.seq}</td>
              <td className="border px-4 py-2">{order.orderNo}</td>
              <td className="border px-4 py-2">{order.orderOption}</td>
              <td className="border px-4 py-2">{order.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
