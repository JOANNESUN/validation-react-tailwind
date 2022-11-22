import React from "react";
import "./Footer.css";
import badCat from "./assets/bad-cat.gif";

const Footer = () => (
  <div className="footer">
    <h5 className="block text-xs font-medium text-gray-700">
      Built By Joanne Sun with ❤︎{" "}
    </h5>
    <img src={badCat} width={"6%"} alt="bot" />
  </div>
);

export default Footer;
