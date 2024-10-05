import React from 'react';
import { useEffect, useState } from 'react';
import { navigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import api from './module/utils/form/api';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data , setData] = useState([]);
  const fetchData = () => {
    api.getHomePage()
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
    {data}
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
