import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Modal,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function BannerModify() {
  const [banner, setBanner] = useState(null);

  const [image, setImage] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { seq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/banner/detail/${seq}`)
      .then((res) => {
        setBanner(res.data);
      })
      .catch((err) => {
        toast("해당 배너는 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!banner) {
    return <Spinner />;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);
    // console.log(product);
    axios
      .putForm(`/api/banner/modify/${seq}`, {
        // ...banner,
        title: banner.title,
        link: banner.link,
        useYn: banner.useYn,
        image: image,
      })
      .then((res) => {
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate(`/banner/list`);
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("배너 수정 시 오류가 발생하였습니다.", { type: "warning" });
        }
      })
      .finally(() => {
        console.log("always");
        setModalShow(false);
        setIsProcessing(false);
      });
  }

  if (!banner) {
    return <Spinner />;
  }

  let validate = true;
  if (banner.title.trim() === "" || banner.link.trim() === "") {
    validate = false;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">메인 배너 수정</h2>
        <div>
          <FormGroup className="mb-3" controlId="formTitle">
            <FormLabel>배너 제목</FormLabel>
            <FormControl
              value={banner.title}
              onChange={(e) => setBanner({ ...banner, title: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formLink">
            <FormLabel>배너 링크</FormLabel>
            <FormControl
              value={banner.link}
              onChange={(e) => setBanner({ ...banner, link: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>

        <div>
          <FormGroup className="mb-3" controlId="formUseYn">
            <FormLabel>배너 사용여부</FormLabel>
            <FormControl
              type="checkbox"
              value={banner.useYn}
              onChange={(e) => setBanner({ ...banner, useYn: e.target.value })}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          {/*  저장된 이미지 */}
          <Stack direction="horizontal" gap={3}>
            <div>
              <Image fluid src={banner.path} />
            </div>
          </Stack>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formImages">
            <FormLabel>배너 이미지 변경</FormLabel>
            <FormControl
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files)}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          <Button
            className="me-2"
            onClick={() => navigate(-1)}
            variant="outline-secondary"
          >
            취소
          </Button>
          <Button
            onClick={() => setModalShow(true)}
            disabled={isProcessing || !validate}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "수정"}
          </Button>
        </div>
      </Col>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>배너 수정 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>{banner.seq} 번 배너를 수정하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button
            disabled={isProcessing}
            variant="primary"
            onClick={handleSaveButtonClick}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "수정"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
