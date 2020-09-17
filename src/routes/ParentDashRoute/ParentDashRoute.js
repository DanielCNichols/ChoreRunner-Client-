import React, { Component, useState, useContext, useEffect } from 'react';
import ApiService from '../../services/api-service.js';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import AddHouseHoldForm from '../../components/AddHouseHoldForm/AddHouseHoldForm';
import s from './ParentDashRoute.module.css';
import Modal from '../../components/Modal/Modal';

import HouseCard from '../../components/HouseCard/HouseCard';

export default function ParentDashRoute(props) {
  const [households, setHouseholds] = useState([]);
  const [houseAdd, setHouseAdd] = useState(false);
  const [editHouse, setEditHouse] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiService.getHouseholds()
      .then(res => {
        console.log(res);
        setHouseholds(res);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const UserPrompt = () => {
    return (
      <>
        <div className={s.parentDashboardFeedback}>
          <h3 className="videoGameTitles">Get Started!</h3>
          <ol>
            <li>1. Click the "Add" button to create groups</li>
            <li>2. Add members to your groups with the "Add Member" button</li>
            <li>3. Manage your group's tasks by clicking "Manage Tasks"</li>
          </ol>
        </div>
      </>
    );
  };

  const toggleAddHouse = () => {
    setHouseAdd(!houseAdd);
  };

  const toggleEditHouse = () => {
    setEditHouse(!editHouse);
  };
  //handleAdd
  const handleAddHousehold = newHousehold => {
    setHouseholds([newHousehold, ...households]);
  };

  //handleDelete
  const handleDeleteHousehold = id => {
    let updated = households.filter(house => {
      return house.id !== id;
    });

    setHouseholds(updated);
  };

  //HandleEdit
  const handleEditHousehold = updated => {
    let idx = households.findIndex(house => house.id === updated.id);

    let newHouseholds = [...households];

    newHouseholds[idx].name = updated.name;
    setHouseholds(newHouseholds);
  };

  const handleAddMembers = member => {
    let index = households.findIndex(house => (house.id = member.household_id));

    let newHouseholds = [...households];

    newHouseholds[index].members.push(member);
    setHouseholds(newHouseholds);
  };

  const deleteMember = (memberId, householdId) => {
    let household = households.findIndex(house => house.id === householdId);

    let newHouseholds = [...households];

    let newMembers = newHouseholds[household].members.filter(
      member => member.id !== memberId
    );

    newHouseholds[household].members = newMembers;

    setHouseholds(newHouseholds);
  };

  function getIndex(id, list) {
    return list.findIndex(member => member.id === id);
  }

  function handleEditMember({ name, household_id, id }) {
    let newHouseholds = [...households];
    let householdIdx = getIndex(household_id, newHouseholds);
    let memberIdx = getIndex(id, newHouseholds[householdIdx].members);
    newHouseholds[householdIdx].members[memberIdx].name = name;
    setHouseholds(newHouseholds);
  }

  return (
    <section className={s.parentDashboard}>
      <header>
        <h3 className="videoGameTitles">Your Groups</h3>
      </header>
      {/* !I think we can refactor this and just put the add member button in the card! */}
      <div className={s.addControls}>
        <button className="arcadeButton" onClick={() => toggleAddHouse()}>
          Add Group
        </button>
      </div>

      <FloatingButton
        className={s.floatingButton}
        onClick={() => toggleAddHouse()}
      ></FloatingButton>
      <div className={s.formContainer}>
        {houseAdd && (
          <Modal titleText="Add Group Form">
            <AddHouseHoldForm
              handleAdd={handleAddHousehold}
              toggleAdd={toggleAddHouse}
            />
          </Modal>
        )}
      </div>
      {!households.length && !houseAdd ? (
        <UserPrompt />
      ) : (
        households.map(house => {
          return (
            <HouseCard
              key={house.id}
              house={house}
              editing={editHouse}
              toggleEdit={toggleEditHouse}
              handleEdit={handleEditHousehold}
              handleEditMember={handleEditMember}
              handleDelete={handleDeleteHousehold}
              handleAddMembers={handleAddMembers}
              deleteMember={deleteMember}
            />
          );
        })
      )}
    </section>
  );
}
