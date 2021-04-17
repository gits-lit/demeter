import { Link } from "react-router-dom";

import './style.scss';

import logo from 'assets/logo.svg';
import map from 'assets/map.svg';
import saved from 'assets/saved.svg';
import statistics from 'assets/statistics.svg';

const SideBar = () => {
  return (
    <nav className="side-bar">
      <Link className="logo" to="/">
        <img src={logo} />
      </Link>
      <div className="icons">
        <div className="icon">
          <img src={map} />
          <p>Map</p>
        </div>
        <div className="icon">
          <img src={saved} />
          <p>Saved</p>
        </div>
        <div className="icon">
          <img src={statistics} />
          <p>Statistics</p>
        </div>
      </div>
    </nav>
  )
}

export default SideBar;