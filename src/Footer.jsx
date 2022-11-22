import React from "react";
import "./Footer.css";
import badCat from "./assets/bad-cat.gif";

const Footer = () => (
  <div className="footer">
    <h5>Built By Joanne Sun with ❤︎ </h5> 
    <img src={badCat} width={"6%"} alt="bot" />
  </div>
);

export default Footer;
