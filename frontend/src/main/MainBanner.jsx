import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../css/MainBanner.css";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { HiViewList } from "react-icons/hi";
import axios from "axios";

export function MainBanner() {
  const swiperRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get("/api/banner/slide").then((res) => {
      setBanners(res.data);
    });
  }, []);

  const handleThumbnailClick = (index) => {
    swiperRef.current.slideToLoop(index);
    setShowModal(false);
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", () => {
        setActiveIndex(swiperRef.current.realIndex);
      });
    }
  }, []);

  return (
    <div className="mainSpotSliderArea billboard position-relative">
      <Swiper
        modules={[Pagination, Navigation]}
        loop={true}
        pagination={{
          el: ".swiper-pagination.spot-pagination.swiper-pagination-custom",
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}">${index + 1}</span>`,
        }}
        navigation
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <a href={banner.link}>
              <img
                className="d-block w-100"
                src={banner.path}
                alt={banner.title}
                style={{ maxHeight: "600px", objectFit: "cover" }}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 페이지네이션 */}
      <div className="spotControls">
        <div className="swiper-pagination spot-pagination swiper-pagination-custom" />
        <div className="btnSpotAll">
          {/* 배너 전체보기 */}
          <button type="button" onClick={() => setShowModal(true)}>
            <HiViewList />
          </button>
        </div>
      </div>

      {/* 썸네일 모달 */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        className="thumbnail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>전체 슬라이드 보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {banners.map((banner, idx) => (
              <img
                key={idx}
                src={banner.path}
                alt={banner.title}
                className={`thumbnail-image ${
                  activeIndex === idx ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(idx)}
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
