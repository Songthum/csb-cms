import React, { useState, useEffect } from "react";
import api from "../../utils/form/api";
import { Form, Select, Button, Typography, Row, Col, DatePicker, Input } from "antd";

const { Title } = Typography;
const { Option } = Select;

function App() {
  const [form] = Form.useForm();
  const [refereeCount, setRefereeCount] = useState(1);
  const [projectCount, setProjectCount] = useState(1);
  const [referees, setReferees] = useState([{ keyLecturer: "", nameLecturer: "", roleLecturer: "" }]);
  const [projects, setProjects] = useState([{ projectId: "", projectName: "", start_in_time: "" }]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [data, setData] = useState([]);
  const refereeNames = [
    {
      keyLecturer: "TTR",
      nameLecturer: "อ.ธนาธร",
    },
    {
      keyLecturer: "MOODENG",
      nameLecturer: "อ.มุดเด่น",
    },
    {
      keyLecturer: "YOMRACH",
      nameLecturer: "อ.ยมราช",
    }
  ];
  const projectTimes = [
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
  ];

  // Fetch project data and map _id to projectId
  useEffect(() => {
    api.getAllProject()
      .then((res) => {
        const projectData = res.data.body.map(({ _id, projectName, start_in_time }) => ({
          projectId: _id,
          projectName,
          start_in_time,
        }));
        setData(projectData);
        setProjects([{ projectId: "", projectName: "", start_in_time: "" }]); 
      })
      .catch(console.error);
  }, []);

  const handleSubmit = (values) => {
    const body = {
      roomExam: values.examRoom,
      nameExam: values.examName,
      dateExam: values.examDate ? values.examDate.format("YYYY-MM-DD") : "",
      referees,
      projects,
    };
    api.createRoomManagement(body)
      .then((res) => {
        form.resetFields();
        setReferees([{ keyLecturer: "", nameLecturer: "", roleLecturer: "" }]);
        setProjects([{ projectId: "", projectName: "", start_in_time: "" }]);
        setIsSubmitDisabled(true);
      })
      .catch(console.error);
  };

  const checkFormValidity = () => {
    const values = form.getFieldsValue();
    const allFieldsFilled = values.examRoom && values.examName && values.examDate &&
      referees.every(({ nameLecturer, roleLecturer }) => nameLecturer && roleLecturer) &&
      projects.every(({ projectId, start_in_time }) => projectId && start_in_time);

    setIsSubmitDisabled(!allFieldsFilled);
  };

  useEffect(() => {
    checkFormValidity();
  }, [form, referees, projects]);

  const handleDynamicFieldChange = (setState, fieldIndex, fieldName, value) => {
    setState((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[fieldIndex][fieldName] = value;
      return updatedFields;
    });
  };

  const handleLecturerChange = (index, keyLecturer) => {
    const selectedLecturer = refereeNames.find((referee) => referee.keyLecturer === keyLecturer);
    if (selectedLecturer) {
      handleDynamicFieldChange(setReferees, index, "keyLecturer", keyLecturer);
      handleDynamicFieldChange(setReferees, index, "nameLecturer", selectedLecturer.nameLecturer);
    }
  };

  const handleProjectNameChange = (index, projectName) => {
    const selectedProject = data.find((project) => project.projectName === projectName);
    handleDynamicFieldChange(setProjects, index, "projectName", projectName);
    if (selectedProject) {
      handleDynamicFieldChange(setProjects, index, "projectId", selectedProject.projectId);
    }
  };

  const handleCountChange = (setState, setCount, value, limit, fieldTemplate) => {
    const count = Math.min(Number(value), limit);
    const newFields = Array.from({ length: count }, (_, index) => ({
      ...fieldTemplate,
      ...(setState[index] || {})
    }));
    setState(newFields);
    setCount(count);
  };

  const filteredOptions = (options, selected, currentIndex) =>
    options.filter((option) => !selected.includes(option) || selected[currentIndex] === option);

  return (
    <div style={{ maxWidth: "90%", margin: "auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>แบบฟอร์มจัดห้องสอบ</Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ examRoom: "", examName: "", examDate: null }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="ห้องสอบ (Exam Room)" name="examRoom" rules={[{ required: true, message: "กรุณาเลือกห้องสอบ" }]}>
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
          <Col span={8}>
            <Form.Item label="ชื่อการสอบ (Exam Name)" name="examName" rules={[{ required: true, message: "กรุณาเลือกชื่อการสอบ" }]}>
              <Select placeholder="เลือกชื่อการสอบ">
                <Option value="CSB01">สอบข้อหัว</Option>
                <Option value="CSB02">สอบก้าวหน้า</Option>
                <Option value="CSB03">สอบป้องกัน</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="วันที่สอบ (Exam Date)" name="examDate" rules={[{ required: true, message: "กรุณาเลือกวันที่สอบ" }]}>
              <DatePicker format="YYYY-MM-DD" placeholder="เลือกวันที่สอบ" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="จำนวนกรรมการสอบ">
          <Input
            type="number"
            min={1}
            value={refereeCount}
            onChange={(e) =>
              handleCountChange(
                setReferees,
                setRefereeCount,
                e.target.value,
                5,
                { keyLecturer: "", nameLecturer: "", roleLecturer: "" }
              )
            }
            placeholder="กรอกจำนวนกรรมการสอบ"
          />
        </Form.Item>

        {referees.map((_, index) => (
          <Row gutter={16} key={index}>
            <Col span={12}>
              <Form.Item
                label="ชื่อกรรมการสอบ"
                rules={[{ required: true, message: "กรุณาเลือกชื่อกรรมการสอบ" }]}
              >
                <Select
                  placeholder="เลือกชื่อกรรมการสอบ"
                  value={referees[index].keyLecturer}
                  onChange={(value) => handleLecturerChange(index, value)}
                >
                  {refereeNames.map(({ keyLecturer, nameLecturer }) => (
                    <Option key={keyLecturer} value={keyLecturer}>
                      {nameLecturer}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ตำแหน่ง (Role)"
                rules={[{ required: true, message: "กรุณาเลือกตำแหน่ง" }]}
              >
                <Select
                  placeholder="เลือกตำแหน่ง"
                  value={referees[index].roleLecturer}
                  onChange={(value) =>
                    handleDynamicFieldChange(setReferees, index, "roleLecturer", value)
                  }
                >
                  <Option value="main">ประธานกรรมการ</Option>
                  <Option value="sub">กรรมการ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ))}

        <Form.Item label="จำนวนโครงงาน">
          <Input
            type="number"
            min={1}
            value={projectCount}
            onChange={(e) =>
              handleCountChange(
                setProjects,
                setProjectCount,
                e.target.value,
                20,
                { projectId: "", projectName: "", start_in_time: "" }
              )
            }
            placeholder="กรอกจำนวนโครงงาน"
          />
        </Form.Item>

        {projects.map((_, index) => (
          <Row gutter={16} key={index}>
            <Col span={12}>
              <Form.Item
                label="ชื่อโครงงาน"
                rules={[{ required: true, message: "กรุณาเลือกชื่อโครงงาน" }]}
              >
                <Select
                  placeholder="เลือกชื่อโครงงาน"
                  value={projects[index].projectName}
                  onChange={(value) => handleProjectNameChange(index, value)}
                >
                  {filteredOptions(
                    data.map(({ projectName }) => projectName),
                    projects.map(({ projectName }) => projectName),
                    index
                  ).map((projectName, idx) => (
                    <Option key={idx} value={projectName}>
                      {projectName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="เวลา (Time)"
                rules={[{ required: true, message: "กรุณาเลือกเวลา" }]}
              >
                <Select
                  placeholder="เลือกเวลา"
                  value={projects[index].start_in_time}
                  onChange={(value) =>
                    handleDynamicFieldChange(setProjects, index, "start_in_time", value)
                  }
                >
                  {filteredOptions(
                    projectTimes,
                    projects.map(({ start_in_time }) => start_in_time),
                    index
                  ).map((time, idx) => (
                    <Option key={idx} value={time}>
                      {time}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ))}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            disabled={isSubmitDisabled}
          >
            ส่งข้อมูล
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
