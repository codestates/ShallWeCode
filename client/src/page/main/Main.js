import React from 'react';
import Banner from '../../component/banner/Banner';
import Filter from '../../component/filter/Filter';
import Navbar from '../../component/navbar/Navbar';
import SelectBtn from '../../component/selectBtn/SelectBtn';
import Thumbnail from '../../component/thumbnail/Thumbnail';
import "./Main.css"


function Main(props) {
  return (
    <div className="basicBackground">
      <Navbar />
      <Banner />
      <SelectBtn />
      <Filter />
      <Thumbnail />
    </div>
  );
}

export default Main;