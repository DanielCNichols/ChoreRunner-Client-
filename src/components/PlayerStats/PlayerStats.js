import React from 'react';
import s from './PlayerStats.module.css';
import images from '../../ImgAssets/index';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function PlayerStats({
  userStats: { level_id, name, total_score, badge, pointsToNextLevel },
}) {
  return (
    <section className={s.levelInfoGrid}>
      <h3 className="videoGameTitles">{name}'s Stats</h3>
      <div className={s.badge}>
        <div className={s.imageContainer}>
          <img src={images[badge]} alt="Badge.png" />
        </div>
        <p>Level {level_id}</p>
      </div>
      <div className={s.status}>
        <h3>Experience</h3>
        <div className={s.progressBarContainer}>
          <ProgressBar progressPoints={pointsToNextLevel} />
        </div>
        <p>
          Total EXP: <span>{total_score}</span>
        </p>
        <p>
          EXP to next level: <span>{pointsToNextLevel}</span>
        </p>
      </div>
    </section>
  );
}
