import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigator extends Component {
  render() {
    return (
      <div>
        <nav>
          <div>
                <Link className="nav-link" to="/"> Customers  </Link>
                <Link className="nav-link" to="/trainings"> Trainings  </Link>
                <Link className="nav-link" to="/calendar"> Calendar </Link>
                <Link className="nav-link" to="/about"> About </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigator;