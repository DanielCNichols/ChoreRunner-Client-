import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import './Badge.css';
import images from '../../ImgAssets/index';

export default class Badge extends Component {
  state = {
    levelInfo: {},
  };

  componentDidMount() {
    ApiService.getBadge().then(res => {
      this.setState({ levelInfo: res });
    });
  }

  // Badge refactor into grid starts here

  renderGridBadge() {
    const {levelInfo} = this.state;
    
    return (
      <section className="levelInfo-grid">
        <h3>Runner Stats</h3>
        <div className="badge">
          <img src = {images[levelInfo.badge]} alt="Badge.png"/>
          <p>Level {levelInfo.level_id}</p>
        </div>
        <div className="status">
          <h3>{levelInfo.name}</h3>
          <p>Total EXP: <span>{levelInfo.total_score}</span></p>
          <p>EXP to next level: <span>{levelInfo.nextLevel}</span></p>
        </div>
      </section>
    )
  }


  render() {
    if (this.state.levelInfo.badge) {
      return this.renderGridBadge();
    }
    const { levelInfo } = this.state;
    return <>{!!levelInfo.badge ? this.renderGridBadge() : <p> LOADING... </p>}</>;
  }
}
