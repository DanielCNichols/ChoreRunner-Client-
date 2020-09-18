import React, { useState, useEffect } from 'react';
import ApiService from '../../services/api-service.js';
import s from './MemberDashRoute.module.css';
import Leaderboard from '../../components/LeaderBoard/LeaderBoard';
import PlayerStats from '../../components/PlayerStats/PlayerStats';

export default function MemberDashRoute() {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiService.getMemberStatus()
      .then(({ assignedTasks, completedTasks, userStats, rankings }) => {
        setAssignedTasks(assignedTasks);
        setCompletedTasks(completedTasks);
        setUserStats(userStats);
        setRankings(rankings);
      })
      .catch(error => setError(error));
  }, []);

  function updateTasks(id) {
    let newTasks = [...assignedTasks];
    let index = newTasks.findIndex(task => task.id === id);
    newTasks[index].status = 'completed';

    setAssignedTasks(newTasks);
  }

  async function handleCompleted(id) {
    try {
      await ApiService.completeTask(id);
      updateTasks(id);
    } catch (error) {
      setError(error);
    }
  }

  function TaskItem({ task: { id, title, points, status } }) {
    return (
      <li className={s.taskItem}>
        <div className={s.taskName}>
          <p>{title}</p>
        </div>
        <div className={s.points}>
          <span>{points} EXP</span>
        </div>
        <div className={s.taskControl}>
          {status === 'assigned' ? (
            <button
              className="arcadeButton"
              onClick={() => {
                handleCompleted(id);
              }}
            >
              Clear!
            </button>
          ) : (
            <p className={s.waiting}>Awaiting Approval!</p>
          )}
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

          {!assignedTasks.length && !completedTasks.length && (
            <p className={s.taskAlert}>You don't have any chores to do!</p>
          )}
          {assignedTasks.length ? (
            <ul>
              {assignedTasks.map(task => {
                return <TaskItem key={task.id} task={task} />;
              })}
            </ul>
          ) : null}

          {completedTasks.length ? (
            <ul>
              {completedTasks.map(task => {
                return <TaskItem key={task.id} task={task} />;
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
