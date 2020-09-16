import React from 'react';
import s from './PlayerStats.module.css';
import images from '../../ImgAssets/index';

export default function Badge({
  userStats: { level_id, name, total_score, badge, toNextLevel },
}) {
  return (
    <section className={s.levelInfoGrid}>
      <h3>Runner Stats</h3>
      <div className={s.badge}>
        <img src={images[badge]} alt="Badge.png" />
        <p>Level {level_id}</p>
      </div>
      <div className={s.status}>
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
