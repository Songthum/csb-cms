import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/form/api";

export default function AddMemberSpacialProject() {
    
  const fetchData = async () => {
    api
      .getStudent()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Add Member Spacial Project</h1>
    </div>
  );
}
