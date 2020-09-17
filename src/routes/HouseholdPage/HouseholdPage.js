import React, { useState, useEffect } from 'react';
import AddTask from '../../components/AddTask/AddTaskForm';
import ApiService from '../../services/api-service';
import MembersCard from '../../components/MembersCard/MembersCard';
import s from './HouseholdPage.module.css';
import Modal from '../../components/Modal/Modal';

import FloatingButton from '../../components/FloatingButton/FloatingButton';

export default function HouseHoldPage(props) {
  const [addTask, setAddTask] = useState(false);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let household_id = props.match.params.id;
    ApiService.getMembers(household_id)
      .then(members => {
        console.log(members);
        setMembers(members);
      })
      .catch(error => {
        setError(error);
      });
  }, [props]);

  //Helpers

  const toggleAddTasks = () => {
    setAddTask(!addTask);
  };

  const handleAddTask = task => {
    let { member_id } = task;

    let newMembers = [...members];
    let memberIdx = getIndex(member_id, newMembers);

    newMembers[memberIdx].assignedTasks = [
      ...newMembers[memberIdx].assignedTasks,
      task,
    ];

    setMembers(newMembers);
  };

  function getIndex(id, list) {
    return list.findIndex(member => member.id === id);
  }

  function resetAllScores() {
    let updatedMembers = [...members];

    updatedMembers.forEach(member => {
      member.total_score = 0;
      member.level_id = 1;
      member.pointsToNextLevel = 10;
    });

    setMembers(updatedMembers);
  }

  /* Handlers */

  const handleResetScores = async () => {
    try {
      if (
        window.confirm(
          'Are you sure you want to reset all scores? This action cannot be undone.'
        )
      ) {
        let household_id = props.match.params.id;
        await ApiService.resetScores(household_id);
        resetAllScores();
      }
    } catch (error) {
      setError(error);
    }
  };

  //Approve task

  const handleTaskApproved = (
    newScore,
    toNextLevel,
    level_id,
    id,
    member_id
  ) => {
    let updatedMembers = [...members];
    let memberIdx = getIndex(member_id, updatedMembers);

    let newTasks = updatedMembers[memberIdx].completedTasks.filter(
      task => task.id !== id
    );

    updatedMembers[memberIdx].completedTasks = newTasks;

    updatedMembers[memberIdx].total_score = newScore;

    updatedMembers[memberIdx].pointsToNextLevel = toNextLevel;

    if (level_id) {
      updatedMembers[memberIdx].level_id = level_id;
    }

    setMembers(updatedMembers);
  };

  //reject task

  const handleTaskRejection = task => {
    let { id, member_id } = task;
    let updatedMembers = [...members];

    let memberIdx = getIndex(member_id, updatedMembers);

    //Move from "completed" to "assigned".

    updatedMembers[memberIdx].completedTasks = updatedMembers[
      memberIdx
    ].completedTasks.filter(task => task.id !== id);

    updatedMembers[memberIdx].assignedTasks.push({
      ...task,
      status: 'assigned',
    });

    setMembers(updatedMembers);
  };

  //edit Task

  const handleEditTask = updatedTask => {
    let { id, member_id } = updatedTask;
    let updatedMembers = [...members];

    let memberIdx = getIndex(member_id, updatedMembers);
    let taskIdx = getIndex(id, updatedMembers[memberIdx].assignedTasks);

    updatedMembers[memberIdx].assignedTasks[taskIdx] = { ...updatedTask };

    setMembers(updatedMembers);
  };

  //Delete Task

  const handleDeleteTask = (id, member_id) => {
    let updatedMembers = [...members];

    let memberIdx = getIndex(member_id, updatedMembers);

    updatedMembers[memberIdx].assignedTasks = updatedMembers[
      memberIdx
    ].assignedTasks.filter(task => task.id !== id);

    setMembers(updatedMembers);
  };

  return (
    <section className={s.householdPage}>
      <h3>Group Page</h3>
      <div className={s.dashButtons}>
        <FloatingButton id={s.FloatingButton} onClick={toggleAddTasks} />
        <button
          id={s.addButton}
          onClick={toggleAddTasks}
          className="arcadeButton"
        >
          <p>Add Task</p>
        </button>
        <button onClick={handleResetScores} className="arcadeButton">
          <p>Reset all scores</p>
        </button>
      </div>
      {addTask && (
        <Modal titleText="Add Task Form">
          <AddTask
            householdId={props.match.params.id}
            members={members}
            addTask={handleAddTask}
            toggleAdd={toggleAddTasks}
          />
        </Modal>
      )}

      <section className={s.membersList}>
        {members.map(member => {
          return (
            <MembersCard
              rejectTask={handleTaskRejection}
              approveTask={handleTaskApproved}
              deleteTask={handleDeleteTask}
              editTask={handleEditTask}
              key={member.id}
              member={member}
            />
          );
        })}
      </section>
    </section>
  );
}
