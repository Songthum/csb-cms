import React, { useState } from "react";
import { Form, Select, Button, Typography, Row, Col, DatePicker, Input } from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function RoomManagement() {
  const [form] = Form.useForm();
  const [refereeCount, setRefereeCount] = useState(1); // จำนวน referee ที่ต้องการ
  const [projectCount, setProjectCount] = useState(1); // จำนวนโครงงานที่ต้องการ
  const [referees, setReferees] = useState([{ name: "", role: "" }]); // รายชื่อ referee
  const [headReferee, setHeadReferee] = useState(""); // ค่าของประธานกรรมการ
  const [projects, setProjects] = useState([{ name: "", time: "" }]); // รายชื่อโครงงาน

  const handleSubmit = (values) => {
    console.log("ห้องสอบ:", values.examRoom);
    console.log("ชื่อการสอบ:", values.examName);
    console.log("วันที่สอบ:", values.examDate ? values.examDate.format('YYYY-MM-DD') : "");
    console.log("referees:", referees);
    console.log("projects:", projects);
    // ส่งข้อมูลไปยัง backend หรือ API ที่นี่
  };

  const handleRefereeCountChange = (e) => {
    const count = Number(e.target.value);
    setRefereeCount(count);

    // สร้างอาเรย์ของ referees ตามจำนวนที่กรอก
    const newReferees = Array.from({ length: count }, () => ({ name: "", role: "" }));
    setReferees(newReferees);
  };

  const handleProjectCountChange = (e) => {
    const count = Number(e.target.value);
    setProjectCount(count);

    // สร้างอาเรย์ของ projects ตามจำนวนที่กรอก
    const newProjects = Array.from({ length: count }, () => ({ name: "", time: "" }));
    setProjects(newProjects);
  };

  const handleRefereeChange = (index, field, value) => {
    const newReferees = [...referees];
    newReferees[index][field] = value;

    // ถ้าเลือกประธานกรรมการให้ตั้งค่าหมายเลขประธานกรรมการ
    if (field === "role" && value === "head") {
      setHeadReferee(newReferees[index].name);
    }

    setReferees(newReferees);
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  // ฟังก์ชันเพื่อสร้างตัวเลือกเวลาทุก 15 นาที
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 16; hour++) { // ตั้งแต่ 9:00 ถึง 18:00
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push(<Option key={time} value={time}>{time}</Option>);
      }
    }
    return times;
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>แบบฟอร์มจัดห้องสอบ</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          examRoom: "",
          examName: "",
          examDate: null,
        }}
      >
        <Row gutter={16}>
          {/* ช่องห้องสอบ */}
          <Col span={8}>
            <Form.Item
              label="ห้องสอบ (Exam Room)"
              name="examRoom"
              rules={[{ required: true, message: "กรุณาเลือกห้องสอบ" }]}
            >
              <Select placeholder="เลือกห้องสอบ">
                <Option value="room101">617</Option>
                <Option value="room102">618/1</Option>
                <Option value="room103">618/2</Option>
                <Option value="room104">619</Option>
                <Option value="room105">621</Option>
                <Option value="room106">623</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* ชื่อการสอบ */}
          <Col span={8}>
            <Form.Item
              label="ชื่อการสอบ (Exam Name)"
              name="examName"
              rules={[{ required: true, message: "กรุณาเลือกชื่อการสอบ" }]}
            >
              <Select placeholder="เลือกชื่อการสอบ">
                <Option value="CSB01">สอบข้อหัว</Option>
                <Option value="CSB02">สอบก้าวหน้า</Option>
                <Option value="CSB03">สอบป้องกัน</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* วันที่สอบ */}
          <Col span={8}>
            <Form.Item
              label="วันที่สอบ (Exam Date)"
              name="examDate"
              rules={[{ required: true, message: "กรุณาเลือกวันที่สอบ" }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="เลือกวันที่สอบ"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* จำนวน referee */}
        <Form.Item
          label="จำนวนกรรมการสอบ"
        >
          <Input
            type="number"
            min={1}
            value={refereeCount}
            onChange={handleRefereeCountChange}
            placeholder="กรอกจำนวนกรรมการสอบ"
          />
        </Form.Item>

        {/* แสดงฟิลด์สำหรับ Referee */}
        {Array.from({ length: refereeCount }).map((_, index) => (
          <Row gutter={16} key={index}>
            <Col span={12}>
              <Form.Item
                label={`ชื่อกรรมการสอบ ${index + 1}`}
                rules={[{ required: true, message: "กรุณาเลือกชื่อกรรมการสอบ" }]}
              >
                <Select
                  placeholder="เลือกชื่อกรรมการสอบ"
                  onChange={(value) => handleRefereeChange(index, 'name', value)}
                >
                  <Option value="referee1">อาจารย์สมชาย</Option>
                  <Option value="referee2">อาจารย์สมหญิง</Option>
                  <Option value="referee3">อาจารย์รัตนา</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={`ตำแหน่ง (Role) ${index + 1}`}
                rules={[{ required: true, message: "กรุณาเลือกตำแหน่ง" }]}
              >
                <Select
                  placeholder="เลือกตำแหน่ง"
                  onChange={(value) => {
                    handleRefereeChange(index, 'role', value);
                    // ถ้าคุณเลือกประธานกรรมการ ต้องตั้งค่าชื่อกรรมการเป็นผู้ที่เป็นประธาน
                    if (value === "head") {
                      // ตรวจสอบว่าได้เลือกกรรมการคนอื่นเป็นประธานไหม
                      if (headReferee && headReferee !== referees[index].name) {
                        alert("กรรมการคนนี้ถูกเลือกเป็นประธานแล้ว");
                        return;
                      }
                      setHeadReferee(referees[index].name);
                    } else {
                      // ถ้าไม่ใช่ประธาน ให้ลบกรรมการออกจากประธาน
                      if (headReferee === referees[index].name) {
                        setHeadReferee("");
                      }
                    }
                  }}
                  disabled={headReferee && headReferee !== referees[index].name}
                >
                  <Option value="head">ประธานกรรมการ</Option>
                  <Option value="sub">กรรมการ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ))}

        {/* จำนวนโครงงาน */}
        <Form.Item
          label="จำนวนโครงงาน"
        >
          <Input
            type="number"
            min={1}
            value={projectCount}
            onChange={handleProjectCountChange}
            placeholder="กรอกจำนวนโครงงาน"
          />
        </Form.Item>

        {/* แสดงฟิลด์สำหรับโครงงาน */}
        {Array.from({ length: projectCount }).map((_, index) => (
          <Row gutter={16} key={index}>
            <Col span={12}>
              <Form.Item
                label={`ชื่อโครงงาน ${index + 1}`}
                rules={[{ required: true, message: "กรุณาเลือกชื่อโครงงาน" }]}
              >
                <Select
                  placeholder="เลือกชื่อโครงงาน"
                  onChange={(value) => handleProjectChange(index, 'name', value)}
                >
                  <Option value="project1">โครงงาน 1</Option>
                  <Option value="project2">โครงงาน 2</Option>
                  <Option value="project3">โครงงาน 3</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={`เวลา (Time) ${index + 1}`}
                rules={[{ required: true, message: "กรุณาเลือกเวลา" }]}
              >
                <Select
                  placeholder="เลือกเวลา"
                  onChange={(value) => handleProjectChange(index, 'time', value)}
                >
                  {generateTimeOptions()}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">ส่งข้อมูล</Button>
        </Form.Item>
      </Form>
    </div>
  );
}