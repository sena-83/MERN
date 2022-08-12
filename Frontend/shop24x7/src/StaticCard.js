import * as React from "react";
import "./App.css";

import card1 from "./img/card1.png";
import card2 from "./img/card2.png";
import card3 from "./img/card3.png";

function StaticCard() {
  return (
    <div className="container">
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="mt-3 card">
              <img src={card1} className="card-img-top" alt="..." />
            </div>
          </div>
          <div className="col">
            <div className="mt-3 card">
              <img src={card2} className="card-img-top" alt="..." />
            </div>
          </div>
          <div className="col">
            <div className="mt-3 card">
              <img src={card3} className="card-img-top" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaticCard;
