import React from "react";
import { Link } from "react-router-dom";
import camera from "../../assets/camera.svg";
import logo from "../../assets/logo.svg";
import "./styles.css";

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="Instagram" />
        </Link>
        <Link to="/new">
          <img src={camera} alt="Enviar post" />
        </Link>
      </div>
    </header>
  );
}
