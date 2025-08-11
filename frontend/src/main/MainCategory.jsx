import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/main_category.css";

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
              <div
                className="card-bg"
                style={{
                  backgroundImage: `url("../assets/sample/sample.jpg")`,
                }}
              ></div>
              <div className="card-overlay"></div>
              <div className="card-body">
                <p className="mb-1 fw-bold">
                  {item.collection || "Collection"}
                </p>
                <h4 className="fw-bolder">{item.name}</h4>
                <span className="small">See products &gt;</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
