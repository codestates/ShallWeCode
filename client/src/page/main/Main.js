import React from 'react';
import Banner from '../../component/banner/Banner';
import Filter from '../../component/filter/Filter';
import Navbar from '../../component/navbar/Navbar';
import "./Main.css"


function Main(props) {
  return (
    <div>
      <Navbar />
      <Banner />
      <Filter />
    </div>
  );
}

export default Main;