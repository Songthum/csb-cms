import React from 'react';
import { useEffect, useState } from 'react';
import { navigate } from 'react-router-dom';
import api from '../../utils/form/api';
import getExamePage from '../../utils/form/api';

export default function ExamManage() {
  const [data , setData] = useState([]);
  const fetchData = () => {
    api.getExamePage()
    .then((res) => {
      console.log(res);
      setData(res.data.body);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    fetchData();
  },[]);


  return (
    <>
    {JSON.stringify(data)}
    </>
  );
}

