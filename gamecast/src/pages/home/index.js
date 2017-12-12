import React, { Component } from 'react';
import './index.css';

class Index extends Component {
  constructor(){
    super();
    this.view = "test";
  }
  render() {
    return (
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <div className="jumbotron">
              <h1>Hello, world!</h1>
              <p className="lead">
                This is a simple hero unit, a simple jumbotron-style component calling extra attention to featured content or information.
              </p>
              <p>It uses utility classes for typography and spacing to space content out within the larger container</p>
              <p className="lead">
                <a className="btn btn-primary btn-lg" href="#!" role="button">Some action</a>
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <div className="jumbotron">
              <h1>Hello, world!</h1>
              <p className="lead">
                This is a simple hero unit, a simple jumbotron-style component calling extra attention to featured content or information.
              </p>
              <p>It uses utility classes for typography and spacing to space content out within the larger container</p>
              <p className="lead">
                <a className="btn btn-primary btn-lg" href="#!" role="button">Some action</a>
              </p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Index;
