import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export function MemberModify() {
  const [member, setMember] = useState(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  useEffect(() => {
    axios
      .get(`/api/member?seq=${params.get("seq")}`)
      .then((res) => {
        console.log("success");
        setMember(res.data);

        // 서버에서 받은 birthDate 분리
        if (res.data.birthDate) {
          const [y, m, d] = res.data.birthDate.split("-");
          setBirthYear(y);
          setBirthMonth(m);
          setBirthDay(d);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("always");
      });
  }, [params]);

  if (!member) {
    return <Spinner />;
  }

  function handleModifyButtonClick() {
    const modifiedMember = { ...member };

    if (newPassword.trim() !== "") {
      modifiedMember.password = newPassword;
    }

    if (birthYear && birthMonth && birthDay) {
      modifiedMember.birthDate = `${birthYear}-${birthMonth}-${birthDay}`;
    }

    axios
      .put(`/api/member/${params.get("seq")}/modify`, modifiedMember)
      .then((res) => {
        console.log("success");
        setMember(res.data);
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate(`/member?seq=${params.get("seq")}`);
      })
      .catch((err) => {
        console.log(err);
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        console.log("always");
      });
  }

  const handleSearchButtonClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") extraAddress += data.bname;
          if (data.buildingName !== "")
            extraAddress +=
              (extraAddress !== "" ? ", " : "") + data.buildingName;
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setMember((prev) => ({
          ...prev,
          postCode: data.zonecode,
          addr: fullAddress,
        }));
      },
    }).open();
  };

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <h3 className="mb-4">회원 정보 수정</h3>
        <div>
          <FormGroup as={Row} controlId="memberNo" className="mb-4">
            <FormLabel column lg={3}>
              고객 번호
            </FormLabel>
            <Col lg={7}>
              <FormControl value={member.memberNo} readOnly={true} />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="memberId" className="mb-4">
            <FormLabel column lg={3}>
              아이디
            </FormLabel>
            <Col lg={7}>
              <FormControl
                value={member.memberId}
                onChange={(e) =>
                  setMember({ ...member, memberId: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="password" className="mb-4">
            <FormLabel column lg={3}>
              비밀번호
            </FormLabel>
            <Col lg={7} className="text-center">
              <FormControl
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="name" className="mb-4">
            <FormLabel column sm={3}>
              이름
            </FormLabel>
            <Col sm={7}>
              <FormControl
                value={member.name}
                onChange={(e) => setMember({ ...member, name: e.target.value })}
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="email" className="mb-4">
            <FormLabel column sm={3}>
              이메일
            </FormLabel>
            <Col sm={7}>
              <FormControl
                value={member.email}
                onChange={(e) =>
                  setMember({ ...member, email: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="birthDate" className="mb-4">
            <FormLabel column sm={3}>
              생년월일
            </FormLabel>
            <Col sm={9} className="d-flex" style={{ gap: "10px" }}>
              <FormControl
                as="select"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                style={{ width: "100px" }}
              >
                <option value="">년도</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const y = new Date().getFullYear() - i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </FormControl>
              <FormControl
                as="select"
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                style={{ width: "70px" }}
              >
                <option value="">월</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </FormControl>
              <FormControl
                as="select"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                style={{ width: "70px" }}
              >
                <option value="">일</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="phone" className="mb-4">
            <FormLabel column sm={3}>
              연락처
            </FormLabel>
            <Col sm={7}>
              <FormControl
                value={member.phone}
                onChange={(e) =>
                  setMember({ ...member, phone: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="postCode" className="mb-4">
            <FormLabel column sm={3}>
              우편번호
            </FormLabel>
            <Col sm={7}>
              <div className="d-flex" style={{ gap: "10px" }}>
                <FormControl
                  value={member.postCode}
                  readOnly={true}
                  placeholder="우편번호"
                />
                <Button
                  variant="outline-dark"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={handleSearchButtonClick}
                >
                  검색
                </Button>
              </div>
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="address" className="mb-2">
            <FormLabel column sm={3}>
              주소
            </FormLabel>
            <Col md={9}>
              <FormControl value={member.addr} readOnly={true} />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="addressDetail" className="mb-4">
            <FormLabel column sm={3}></FormLabel>
            <Col sm={9}>
              <FormControl
                value={member.addrDetail || ""}
                onChange={(e) =>
                  setMember({ ...member, addrDetail: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="state" className="mb-3">
            <FormLabel column sm={3}>
              회원 상태
            </FormLabel>
            <Col sm={7}>
              <FormControl
                value={member.state}
                onChange={(e) =>
                  setMember({ ...member, state: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="useYn" className="mb-3">
            <FormLabel column sm={3}>
              사용여부
            </FormLabel>
            <Col sm={7}>
              <FormControl
                value={member.useYn}
                onChange={(e) =>
                  setMember({ ...member, useYn: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <FormGroup as={Row} controlId="delYn" className="mb-3">
            <FormLabel column sm={3}>
              삭제여부
            </FormLabel>
            <Col sm={7}>
              <FormControl
                value={member.delYn}
                onChange={(e) =>
                  setMember({ ...member, delYn: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        <div>
          <Button
            className="me-2"
            variant="outline-dark"
            onClick={(e) => navigate(-1)}
          >
            취소
          </Button>
          <Button variant="outline-primary" onClick={handleModifyButtonClick}>
            수정
          </Button>
        </div>
      </Col>
    </Row>
  );
}
