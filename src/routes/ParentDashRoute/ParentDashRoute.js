import React, { Component, useState, useContext, useEffect } from 'react';
import ApiService from '../../services/api-service.js';
import '../../components/ParentDashboard/ParentDashboard.css';
import AddHouseHoldForm from '../../components/AddHouseHoldForm/AddHouseHoldForm';
import s from './ParentDashRoute.module.css';

import HouseCard from '../../components/HouseCard/HouseCard';

export default function ParentDashRoute(props) {
  const [households, setHouseholds] = useState([]);
  const [houseAdd, setHouseAdd] = useState(false);
  const [memberAdd, setMemberAdd] = useState(false);
  const [editHouse, setEditHouse] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiService.getHouseholds()
      .then(res => {
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
          <h3>Get Started!</h3>

          <p>1. Click the "Add Group" button to create groups</p>
          <p>2. Add members to your groups with the "Add Member" button</p>
          <p>
            3. Manage your group's tasks by clicking <span>'Manage tasks'</span>{' '}
          </p>
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

  return (
    <section className={s.parentDashboard}>
      <header>
        <h3>Your Groups</h3>
      </header>

      {/* !I think we can refactor this and just put the add member button in the card! */}
      <div className={s.addControls}>
        <button className="arcadeButton" onClick={() => toggleAddHouse()}>
          Add Group
        </button>
      </div>

      <div className={s.formContainer}>
        {houseAdd && (
          <AddHouseHoldForm
            handleCancel={toggleAddHouse}
            handleAdd={handleAddHousehold}
            toggleAdd={toggleAddHouse}
          />
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
