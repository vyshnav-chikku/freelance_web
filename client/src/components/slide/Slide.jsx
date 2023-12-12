import React, { useEffect, useState } from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";
import axios from "axios";
import CatCard from "../catCard/CatCard";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {


  const [data, setdata] = useState(
    [
      {
        id:1
      },
      {
        id:2
      },{
        id:3
      },{
        id:4
      },
    ]
  )

  
  const getData = async ()=>{
    try {
      const res = await axios.get("http://localhost:8800/api/getusers");
      console.log(res.data);
      setdata(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    console.log("get data",data);
  }, [])

  const sumesh=[
    {
      id:1
    },
    {
      id:2
    },{
      id:3
    },{
      id:4
    },
  ]


  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>

          {data&& data.map(element=>
            
        <CatCard card={element}/>
          )}
    
        </Slider>

      </div>
    </div>
  );
};

export default Slide;
