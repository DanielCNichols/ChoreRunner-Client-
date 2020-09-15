import React, { useState, useEffect } from 'react';
import HouseholdContext from '../../contexts/HouseHoldContext';
import ApiService from '../../services/api-service.js';
import s from './MemberDashRoute.module.css';
import Leaderboard from '../../components/LeaderBoard/LeaderBoard';
import Badge from '../../components/Badge/Badge';

export default function MemberDashRoute() {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiService.getMemberStatus()
      .then(({ assignedTasks, userStats, rankings }) => {
        setAssignedTasks(assignedTasks);
        setUserStats(userStats);
        setRankings(rankings);
      })
      .catch(error => setError(error));
  }, []);

  async function handleCompleted(id) {
    try {
      await ApiService.completeTask(id);
      let newTasks = assignedTasks.filter(task => task.id !== id);
      setAssignedTasks(newTasks);
    } catch (error) {
      setError(error);
    }
  }

  function TaskItem({ task: { id, title, points } }) {
    return (
      <li key={id}>
        <div className={s.taskName}>
          <p>{title}</p>
        </div>
        <div className={s.points}>
          <span>{points} EXP</span>
        </div>
        <div className={s.taskControl}>
          <button
            onClick={() => {
              handleCompleted(id);
            }}
          >
            Clear!
          </button>
        </div>
      </li>
    );
  }

  return (
    <section className={s.memberDashboard}>
      <div className={s.memberDashWrapper}>
        <header>
          <h2 className="videoGameTitles">{userStats.name}'s Profile</h2>
        </header>
        <Leaderboard rankings={rankings} />
        <Badge userStats={userStats} />
        <div className={s.choresContainer}>
          <h2>Chore-llenges</h2>
          {assignedTasks.length ? (
            <ul>
              {assignedTasks.map(task => {
                return <TaskItem task={task} />;
              })}
            </ul>
          ) : (
            <p className={s.taskAlert}>You don't have any chores to do!</p>
          )}
        </div>
      </div>
    </section>
  );
}
