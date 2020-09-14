import React, { useState } from 'react';
import Task from '../Task/Task';
import s from './MembersCard.module.css';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

export default function MembersCard({
  rejectTask,
  approveTask,
  deleteTask,
  editTask,
  member,
}) {
  function formatPoints() {
    let goal = member.level_id * 10;

    let num = (goal - member.total_score) % 10;

    if (num === 0) {
      return num;
    } else {
      return Math.abs(num - 10);
    }
  }

  let progressPoints = formatPoints();
  return (
    <div className={s.memberCard}>
      <header>
        <h3>{member.name}</h3>
        <p>level: {member.level_id}</p>
        <div className={s.progressBarContainer}>
          <ProgressBar
            progressPercent={(progressPoints / 10) * 100}
            progressPoints={progressPoints}
          />
        </div>
      </header>

      <div className={s.cardBody}>
        <h4 className="videoGameTitles">Completed Tasks</h4>

        <ul className={s.completed}>
          {member.completedTasks.map(task => {
            return <Task key={task.id} task={task} editTask={editTask} />;
          })}
        </ul>

        {!member.completedTasks.length && (
          <p>{member.name} has not completed any tasks... yet!</p>
        )}

        <h4 className="videoGameTitles">Assigned Tasks</h4>
        <ul className={s.assigned}>
          {member.assignedTasks.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                editTask={editTask}
                approveTask={approveTask}
                deleteTask={deleteTask}
                rejectTask={rejectTask}
              />
            );
          })}
        </ul>

        {!member.assignedTasks.length && <p>{member.name} has no tasks.</p>}
      </div>
    </div>
  );
}
