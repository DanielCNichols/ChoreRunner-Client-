import React, { Component, useState, useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import HouseholdContext from '../../contexts/HouseHoldContext';
// import EditHouseholdInput from '../../components/EditHouseholdInput/EditHouseholdInput';
import ApiService from '../../services/api-service.js';
import AddMembers from '../../components/AddMembers/AddMembers';
import '../../components/ParentDashboard/ParentDashboard.css';
import Modal from '../../components/Modal/Modal';
import AddHouseHoldForm from '../../components/AddHouseHoldForm/AddHouseHoldForm';
import s from './ParentDashRoute.module.css';
import FloatingButton from '../../components/FloatingButton/FloatingButton';

import HouseCard from '../../components/HouseCard/HouseCard';

export default function ParentDashRoute(props) {
  const [households, setHouseholds] = useState(null);
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
        <div className="parent_dashboard-feedback">
          <h3>Get Started!</h3>

          <p>1. Click the "Add Group" button to create groups</p>
          <p>2. Add members to your groups with the "Add Member" button</p>
          <p>
            3. Manage your group's tasks by clicking <span>'See Group'</span>{' '}
          </p>
        </div>
      </>
    );
  };

  const toggleAddHouse = () => {
    if (memberAdd) {
      setMemberAdd(!memberAdd);
    }
    setHouseAdd(!houseAdd);
  };

  const toggleAddMember = () => {
    if (houseAdd) {
      setHouseAdd(!houseAdd);
    }

    setMemberAdd(!memberAdd);
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

  return (
    <section className={s.parentDashboard}>
      <header>
        <h3>Your Groups</h3>
      </header>

      <div className={s.addControls}>
        {households && (
          <button onClick={() => toggleAddMember()} className="arcadeButton">
            Add Member
          </button>
        )}
        <button className="arcadeButton" onClick={() => toggleAddHouse()}>
          Add Household
        </button>
      </div>

      <div className={s.formContainer}>
        {houseAdd && !memberAdd && (
          <AddHouseHoldForm
            handleCancel={toggleAddHouse}
            handleAdd={handleAddHousehold}
          />
        )}
        {!houseAdd && memberAdd && (
          <AddMembers
            households={households}
            handleCancel={toggleAddMember}
            handleAdd={handleAddMembers}
          />
        )}
      </div>

      {!households ? (
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
            />
          );
        })
      )}
    </section>
  );
}
