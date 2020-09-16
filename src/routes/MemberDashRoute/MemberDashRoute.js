import React, { useState, useEffect } from 'react';
import HouseholdContext from '../../contexts/HouseHoldContext';
import ApiService from '../../services/api-service.js';
import s from './MemberDashRoute.module.css';
import Leaderboard from '../../components/LeaderBoard/LeaderBoard';
import PlayerStats from '../../components/Badge/PlayerStats';

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

  function updateTasks(id) {
    let newTasks = assignedTasks.filter(task => {
      return task.id !== id;
    });
    setAssignedTasks(newTasks);
  }
  async function handleCompleted(id) {
    console.log('running');
    console.log('id', id);
    try {
      await ApiService.completeTask(id);
      updateTasks(id);
    } catch (error) {
      setError(error);
    }
  }

  function TaskItem({ task: { id, title, points } }) {
    return (
      <li className={s.taskItem}>
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
        <PlayerStats userStats={userStats} />
        <div className={s.choresContainer}>
          <h2>Chore-llenges</h2>
          {assignedTasks.length ? (
            <ul>
              {assignedTasks.map(task => {
                return <TaskItem key={task.id} task={task} />;
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
