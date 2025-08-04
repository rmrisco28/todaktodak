import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../css/MainBanner.css";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";

export function MainBanner() {
  const swiperRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const slideImages = [
    {
      src: "https://img.makeshop.co.kr/4/29457/202508/fd83412ccde7470499c17380e2674163.jpg",
      alt: "이벤트 배너 1",
      link: "/sale/list",
    },
    {
      src: "https://img.makeshop.co.kr/4/29457/202508/8e610b64c196e7246e631221ae592993.jpg",
      alt: "이벤트 배너 2",
      link: "/sale/list",
    },
    {
      src: "https://img.makeshop.co.kr/4/29457/202508/eea1b4599305f52bde334df23808e50b.jpg",
      alt: "이벤트 배너 3",
      link: "/sale/list",
    },
  ];

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
        {slideImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <a href={slide.link}>
              <img
                className="d-block w-100"
                src={slide.src}
                alt={slide.alt}
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
            전체보기
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
            {slideImages.map((slide, idx) => (
              <img
                key={idx}
                src={slide.src}
                alt={slide.alt}
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
