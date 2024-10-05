import React from "react";
import { useEffect, useState } from "react";
import api from "../../utils/form/api";
import { Table, Tag } from "antd";

export default function SumaryRoom() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    api
      .getSumaryRoom()
      .then((res) => {
        setData(res.data.body);
        console.log(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projects",
      render: (projects) => (
        <>
          {projects.map((project, index) => (
            <span key={index}>
              {project.projectName}
              <br />
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Room",
      dataIndex: "roomExam",
    },
    {
      title: "Time",
      dataIndex: "projects",
      render: (projects) => (
        <>
          {projects.map((project, index) => (
            <span key={index}>
              <Tag color="purple">{project.start_in_time}</Tag>
              <br />
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Referees",
      dataIndex: "referees",
      render: (referees) => (
        <>
          {referees.map((referee, index) => (
            <span key={index}>
              {referee.nameLecturer} 
              <br />
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Referees",
      dataIndex: "referees",
      render: (referees) => (
        <>
          {referees.map((referee, index) => (
            <span key={index}>
                 <Tag color="blue">{referee.roleLecturer}</Tag>
              <br />
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "dateExam",
      render: (dateExam) => new Date(dateExam).toLocaleDateString(),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <h1>
        <Table columns={columns} dataSource={data} rowKey="_id" onChange={onChange} />
      </h1>
    </div>
  );
}
