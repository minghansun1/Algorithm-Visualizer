import React from "react";
import { Link } from "react-router-dom";
import PublicNavBar from "../components/PublicNavBar"
import "../styles/Home.css"

function Home() {
    

    return (
        <div>
          <PublicNavBar />
            <div className="container">
              <div className="left-section">
                <Link to="/arrays" className="array-button">
                  <array-button>Visualize Array Algorithms</array-button>
                </Link>
              </div>
              <div className="right-section">
                <Link to="/graphs" className="graph-button">
                  <graph-button>Visualize Graph Algorithms</graph-button>
                </Link>
              </div>
            </div>
        </div>
      );
}

export default Home;