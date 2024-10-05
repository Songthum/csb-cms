

import React, { useState, useEffect } from "react";
import { Form, Select, Button, Typography, Row, Col, DatePicker, Input } from "antd";

const { Title } = Typography;
const { Option } = Select;

function App() {
  const [form] = Form.useForm();
  const [refereeCount, setRefereeCount] = useState(); // จำนวน referee ที่ต้องการ
  const [projectCount, setProjectCount] = useState(); // จำนวนโครงงานที่ต้องการ
  const [referees, setReferees] = useState([{ name: "", role: "" }]); // รายชื่อ referee
  const [projects, setProjects] = useState([{ name: "", time: "" }]); // รายชื่อโครงงาน
  const refereeNames = ["อาจารย์สมชาย", "อาจารย์สมหญิง", "อาจารย์รัตนา"]; // รายชื่ออาจารย์ทั้งหมด
  const projectNames = ["โครงงาน 1", "โครงงาน 2", "โครงงาน 3"]; // รายชื่อโครงงานทั้งหมด
  const projectTimes = ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
    "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45",]; // เวลาที่เลือกได้
  const [refereeRole, setRefereeRole] = useState([]);
  const [HeadReferee, setHeadReferee] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleSubmit = (values) => {
    console.log("ห้องสอบ:", values.examRoom);
    console.log("ชื่อการสอบ:", values.examName);
    console.log("วันที่สอบ:", values.examDate ? values.examDate.format('YYYY-MM-DD') : "");
    console.log("referees:", referees);
    console.log("projects:", projects);
    // ส่งข้อมูลไปยัง backend หรือ API ที่นี่
  };

  const checkFormValidity = () => {
    const values = form.getFieldsValue();
    const allFieldsFilled =
      values.examRoom &&
      values.examName &&
      values.examDate &&
      referees.every(referee => referee.name && referee.role) &&
      projects.every(project => project.name && project.time);

    setIsSubmitDisabled(!allFieldsFilled);
  };

  const handleProjectCountChange = (e) => {
    const count = Math.min(Number(e.target.value), 20); // จำกัดจำนวนโครงงานไม่ให้เกิน 20
    setProjectCount(count);
    const newProjects = Array.from({ length: count }, () => ({ name: "", time: "" }));
    setProjects(newProjects);
  };

  const getFilteredRefereeNames = (currentIndex) => {
    const selectedNames = referees.map((ref) => ref.name);
    return refereeNames.filter((name) => !selectedNames.includes(name) || referees[currentIndex].name === name);
  };

  const getFilteredProjectNames = (currentIndex) => {
    const selectedNames = projects.map((proj) => proj.name);
    return projectNames.filter((name) => !selectedNames.includes(name) || projects[currentIndex].name === name);
  };

  const getFilteredProjectTimes = (currentIndex) => {
    const selectedTimes = projects.map((proj) => proj.time);
    return projectTimes.filter((time) => !selectedTimes.includes(time) || projects[currentIndex].time === time);
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;

    // ตรวจสอบไม่ให้เลือกชื่อโครงงานหรือเวลาเดียวกัน
    if (field === 'name') {
      // ถ้าชื่อโครงงานถูกเปลี่ยน จะต้องตรวจสอบเวลา
      const timeSelected = newProjects[index].time;
      newProjects.forEach((project, idx) => {
        if (idx !== index && project.name === value) {
          project.time = ""; // ถ้าเลือกชื่อเดียวกันให้ล้างเวลา
        }
      });
    } else if (field === 'time') {
      // ถ้าเวลาโดนเปลี่ยนจะต้องตรวจสอบชื่อ
      const nameSelected = newProjects[index].name;
      newProjects.forEach((project, idx) => {
        if (idx !== index && project.time === value) {
          project.name = ""; // ถ้าเวลาเดียวกันให้ล้างชื่อ
        }
      });
    }

    setProjects(newProjects);
  };

  const handleRefereeCountChange = (e) => {
    const count = Math.min(Number(e.target.value), 5); // จำกัดจำนวนกรรมการไม่ให้เกิน 5
    setRefereeCount(count);
    const newReferees = Array.from({ length: count }, () => ({ name: "", role: "" }));
    setReferees(newReferees);
    // setRefereeRole([]);
  };

  const handleRefereeChange = (index, field, value) => {
    const newReferees = [...referees];
    newReferees[index][field] = value;
    setReferees(newReferees);
    console.log(newReferees)
  };

  // useEffect เพื่อเช็คความถูกต้องของฟอร์มทุกครั้งที่มีการเปลี่ยนแปลง
  useEffect(() => {
    checkFormValidity();
  }, [form, referees, projects]);

  return (
    <div style={{ maxWidth: "90%", margin: "auto", padding: "20px" }}>
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

        {/* จำนวนกรรมการสอบ */}
        <Form.Item label="จำนวนกรรมการสอบ">
          <Input
            type="number"
            min={1}
            value={refereeCount}
            onChange={handleRefereeCountChange}
            placeholder="กรอกจำนวนกรรมการสอบ"
          />
        </Form.Item>

        {/* แสดงฟิลด์สำหรับกรรมการสอบ */}
        {Array.from({ length: refereeCount }).map((_, index) => (
          <Row gutter={16} key={index}>
            <Col span={12}>
              <Form.Item
                label="ชื่อกรรมการสอบ"
                rules={[{ required: true, message: "กรุณาเลือกชื่อกรรมการสอบ" }]}>

                <Select
                  placeholder="เลือกชื่อกรรมการสอบ"
                  onChange={(value) => handleRefereeChange(index, 'name', value)}
                  value={referees[index].name}
                >
                  {getFilteredRefereeNames(index).map((name) => (
                    <Option key={name} value={name}>
                      {name}
                    </Option>
                  ))}
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
                    handleRefereeChange(index, "role", value);
                    setHeadReferee(referees[index].name);
                    if (value === "main") {
                      setRefereeRole(value);
                    }
                  }}
                  // value={referees[index].role}
                >
                  {refereeRole.length === 0 && (
                    <Option value="main">ประธานกรรมการ</Option>
                  )}
                  <Option value="sub">กรรมการ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ))}

        {/* จำนวนโครงงาน */}
        <Form.Item label="จำนวนโครงงาน">
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
                  value={projects[index].name}
                >
                  {getFilteredProjectNames(index).map((name) => (
                    <Option key={name} value={name}>
                      {name}
                    </Option>
                  ))}
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
                  value={projects[index].time}
                >
                  {getFilteredProjectTimes(index).map((time) => (
                    <Option key={time} value={time}>
                      {time}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ))}

        {/* ปุ่มส่งข้อมูล */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            disabled={isSubmitDisabled} // ใช้สถานะ disabled ที่เรากำหนด
          >
            ส่งข้อมูล
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
