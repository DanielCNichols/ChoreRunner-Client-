import React from 'react';
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
  return (
    <div className={s.memberCard}>
      <header>
        <h3>{member.name}</h3>
        <p>level: {member.level_id}</p>
        <div className={s.progressBarContainer}>
          <ProgressBar progressPoints={member.pointsToNextLevel} />
        </div>
      </header>

      <div className={s.cardBody}>
        <h4 className="videoGameTitles">Completed Tasks</h4>

        <ul className={s.completed}>
          {member.completedTasks.map(task => {
            return (
              <Task
                key={task.id}
                approveTask={approveTask}
                rejectTask={rejectTask}
                task={task}
              />
            );
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
                deleteTask={deleteTask}
              />
            );
          })}
        </ul>

        {!member.assignedTasks.length && <p>{member.name} has no tasks.</p>}
      </div>
    </div>
  );
}
