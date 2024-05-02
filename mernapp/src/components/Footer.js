import React from "react";
import "./footer.css";
import { FaInstagram, FaLinkedin, FaGoogle } from "react-icons/fa";
// import "@fortawesome/fontawesome-free/css/all.min.css";

const footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h3>Go Food</h3>
        <p>
          Made with <span class="heart">&#10084;</span> by Inder
        </p>
        <ul className="socials">
          <li>
            <a href="#">
              <FaGoogle size={30} color="#DB4437" />
            </a>
          </li>
          
          <li>
            <a target="_blank" href="https://www.instagram.com/inder___24/">
              <FaInstagram size={30} color="#C13584" />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/inderdeep-singh-6b1a16223/">
              <FaLinkedin size={30} color="#0077B5" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy; <a href="#">Go Food</a>{" "}
        </p>
        <div className="footer-menu">
          <ul className="f-menu">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default footer;
