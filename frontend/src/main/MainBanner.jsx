import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../css/main_banner.css";

import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { HiViewList } from "react-icons/hi";
import axios from "axios";
import { Link } from "react-router";

export function MainBanner() {
  const swiperRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    axios.get("/api/banner/slide").then((res) => {
      setBanners(res.data);
    });
  }, []);

  const handleThumbnailClick = (index) => {
    swiperRef.current.slideToLoop(index);
    setShowModal(false);
  };

  return (
    <div
      className="fullwidth-banner-container"
      style={{ position: "relative" }}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setCurrentIndex(swiper.realIndex + 1);
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex + 1);
        }}
        slidesPerView={1}
        style={{ width: "100%", height: "28vw" }}
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <Link to={banner.link} key={idx}>
              <img
                src={banner.path}
                alt={banner.title}
                className="fullwidth-banner-image"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 페이지 번호 + 전체보기 버튼 */}
      <div className="banner-bottom-ui">
        <div className="banner-page-indicator">
          {currentIndex} / {banners.length}
        </div>
        <button
          className="btn-spot-all"
          onClick={() => setShowModal(true)}
          aria-label="전체보기"
        >
          <HiViewList size={20} />
        </button>
      </div>

      {/* 전체보기 모달 */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>전체보기</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scroll">
          {banners.map((banner, idx) => (
            <div
              key={idx}
              className="thumbnail-wrapper"
              onClick={() => handleThumbnailClick(idx)}
            >
              <img
                src={banner.path}
                alt={banner.title}
                className="thumbnail-img"
              />
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}
