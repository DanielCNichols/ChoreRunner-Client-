import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import './Badge.css';
import images from '../../ImgAssets/index';

export default function Badge({
  userStats: { level_id, name, total_score, badge, toNextLevel },
}) {
  return (
    <section className="levelInfo-grid">
      <h3>Runner Stats</h3>
      <div className="badge">
        <img src={images[badge]} alt="Badge.png" />
        <p>Level {level_id}</p>
      </div>
      <div className="status">
        <h3>{name}</h3>
        <p>
          Total EXP: <span>{total_score}</span>
        </p>
        <p>
          EXP to next level: <span>{toNextLevel}</span>
        </p>
      </div>
    </section>
  );
}

// export default class Badge extends Component {
//   state = {
//     levelInfo: {},
//   };

//   componentDidMount() {
//     ApiService.getBadge().then(res => {
//       console.log('badge', res);
//       this.setState({ levelInfo: res });
//     });
//   }

//   // Badge refactor into grid starts here

//   renderGridBadge() {
//     const { levelInfo } = this.state;

//   render() {
//     if (this.state.levelInfo.badge) {
//       return this.renderGridBadge();
//     }
//     const { levelInfo } = this.state;
//     return (
//       <>{!!levelInfo.badge ? this.renderGridBadge() : <p> LOADING... </p>}</>
//     );
//   }
// }
