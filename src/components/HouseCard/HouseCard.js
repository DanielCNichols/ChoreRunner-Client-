import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import s from './HouseCard.module.css';

export default function HouseCard({ house }) {
  return (
    <div className={s.houseCard}>
      <div className={s.cardHeader}>
        <header>
          <h4>{house.name}</h4>
        </header>
      </div>

      {/* This will be display: grid */}

      {house.members.length ? (
        <div className={s.cardBody}>
          <p>Name</p>
          <p>Level</p>
          <p>Exp</p>

          <ul className={s.membersList}>
            {house.members.map(member => {
              return (
                <li key={member.id} className={s.memberDetails}>
                  <p>{member.name}</p>
                  <p>{member.level_id}</p>
                  <div className={s.progressBarContainer}>
                    <ProgressBar
                      progressPercent={
                        (member.level_id * 10 - member.total_score - 10) * 10
                      }
                      progressPoints={
                        member.level_id * 10 - member.total_score - 10
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>You have not added any members to this household</p>
      )}
    </div>
  );
}
