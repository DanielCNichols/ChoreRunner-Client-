import React, { useState } from 'react';
import EditMember from '../EditMember/EditMember';
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

// export default class MembersCard extends React.Component {
//   state = {
//     assignedTasks: [],
//     completedTasks: [],
//     editingMember: false,
//     error: null,
//   };

//   toggleTaskForm = () => {
//     this.setState({ editingTask: !this.state.editingTask });
//   };

//   toggleMemberForm = () => {
//     this.setState({ editingMember: !this.state.editingMember });
//   };

//   render() {
//     const {
//       member,
//       householdId,
//       editMember,
//       editTask,
//       tasks,
//       approveTask,
//       rejectTask,
//       deleteMember,
//       deleteTask,
//     } = this.props;

//     const { editingMember, assignedTasks, completedTasks } = this.state;

//     return (
//       <div className="memberCard">
//         <h3>{member.name}</h3>
//         <p className="score">Score: {member.total_score}</p>

//         {editingMember ? (
//           <Modal>
//             <EditMember
//               householdId={householdId}
//               editMember={editMember}
//               handleCancel={this.toggleMemberForm}
//               member={member}
//               toggleForm={this.toggleMemberForm}
//             ></EditMember>
//           </Modal>
//         ) : null}
//         {/* Put each task as its own component.  */}
//         <div className="task-container">
//           <hr className="member-rule"></hr>
//           <ul>
//             <h4>Assigned Tasks</h4>
//             {member.assignedTasks.map(task => {
//               return (
//                 <Task
//                   deleteTask={deleteTask}
//                   editTask={editTask}
//                   key={task.id}
//                   householdId={householdId}
//                   task={task}
//                 />
//               );
//             })}
//           </ul>
//           <ul>
//             <h4>Completed</h4>
//             {member.completedTasks.length ? (
//               member.completedTasks.map(task => {
//                 return (
//                   <Task
//                     key={task.id}
//                     rejectTask={rejectTask}
//                     approveTask={approveTask}
//                     householdId={householdId}
//                     task={task}
//                   />
//                 );
//               })
//             ) : (
//               <li>
//                 <p>No tasks completed</p>
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="memberCard-button-container">
//           <button onClick={this.toggleMemberForm}>Edit</button>
//           <button
//             onClick={() => {
//               deleteMember(member.id);
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
