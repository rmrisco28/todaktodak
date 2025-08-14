import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/main_category.css";
import { FcNext, FcPrevious } from "react-icons/fc";

// 커스텀 좌우 화살표
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <FcNext />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <FcPrevious />
    </div>
  );
}

export function MainCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/category/formSelect`).then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  if (!categoryList || categoryList.length === 0) {
    return <Spinner />;
  }

  // react-slick 설정
  const settings = {
    dots: false,
    infinite: categoryList.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992, // lg 미만
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576, // sm 미만
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (categoryList.length === 0) {
    return null; // 데이터 없을 때 렌더링 방지
  }

  return (
    <div className="mt-4">
      <Slider {...settings}>
        {categoryList.map((item) => (
          <div key={item.seq} className="px-2">
            <div
              className="category-card"
              onClick={() => navigate("/sale/list?c=" + item.seq)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-bg">
                <img src={item.path} alt={item.name}></img>
              </div>
              <div className="card-overlay"></div>
              <div className="card-body">
                <h3 className="fw-bolder">{item.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
