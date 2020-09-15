import React from 'react';
import s from './LeaderBoard.module.css';

export default function LeaderBoard({ rankings }) {
  function Standing({ rank, player: { id, name, total_score } }) {
    return (
      <li key={id} className={s.standing}>
        {rank > 2 ? <div className={s.rank}>{`${rank + 1}`}</div> : null}
        <div className={s.name_col}>
          <span>{name}</span>
        </div>
        <div className={s.score_col}>
          <span className={s.score}>{total_score}</span>
        </div>
      </li>
    );
  }

  return (
    <section className={s.leaderBoard}>
      <h3>Leaderboard</h3>
      <div className={s.leaderBoardGrid}>
        <p>Rank</p>
        <p>Member Name</p>
        <p>Score</p>
      </div>
      <ul className={s.rankings}>
        {rankings.map((player, idx) => {
          return <Standing key={player.id} player={player} rank={idx} />;
        })}
      </ul>
    </section>
  );
}
