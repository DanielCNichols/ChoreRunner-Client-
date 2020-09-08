import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import HouseholdContext from '../../contexts/HouseHoldContext';
import EditHouseholdInput from '../EditHouseholdInput/EditHouseholdInput';
import ApiService from '../../services/api-service.js';
import AddMembers from '../AddMembers/AddMembers';
import './ParentDashboard.css';
import Modal from '../Modal/Modal';
import AddHouseHoldForm from '../AddHouseHoldForm/AddHouseHoldForm';
import ProgressBar from '../ProgressBar/ProgressBar';

export default class ParentDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      household: [],
      editingHousehold: false,
      id: null,
      members: {},
      submitFeedback: '',
      addMember: false,
      addHouse: false,
    };
  }

  static contextType = HouseholdContext;
  static defaultProps = {
    households: [],
  };

  componentDidMount() {
    ApiService.getHouseholds()
      .then(res => {
        console.log(res);
        this.context.setHouseholds(res);
      })
      .catch(error =>
        this.setState({
          error: error,
        })
      );

    ApiService.getMembersAndHouseholds()
      .then(res => {
        this.setState({ members: res });
      })
      .catch(error =>
        this.setState({
          error: error,
        })
      );
  }

  //Boolean check for if there are households
  hasHouseholds = () => this.context.households.length !== 0;

  //Returns appropriate feedback if the user has no households.
  renderUserFeedback() {
    return (
      <>
        <p>1. Click the "Add Group" button to create groups</p>
        <p>2. Add members to your groups with the "Add Member" button</p>
        <p>
          3. Manage your group's tasks by clicking <span>'See Group'</span>{' '}
        </p>
      </>
    );
  }

  handleRenderAfterAddMember = res => {
    if (this.state.members[res.household_id]) {
      let members = this.state.members;
      members[res.household_id].members = [
        ...members[res.household_id].members,
        { name: res.name, id: res.id },
      ];
      this.setState({
        members: members,
      });
    } else {
      let members = this.state.members;
      members[res.household_id] = {
        household_id: res.household_id,
        members: [{ name: res.name, id: res.id }],
      };
      this.setState({
        members: members,
      });
    }
  };

  //HOUSEHOLD METHODS
  handleCancelEdit = () => {
    this.setState({
      editingHousehold: false,
    });
  };

  toggleAddHouse = () => {
    this.setState({
      addHouse: !this.state.addHouse,
    });
  };

  toggleAddMember = () => {
    this.setState({
      addMember: !this.state.addMember,
    });
  };

  handleHouseholdSubmit = e => {
    e.preventDefault();
    let name = e.target.householdName.value;
    ApiService.postHousehold(name)
      .then(res => {
        //Set form feedback to show successful household add and clear add input.
        this.context.addHousehold(res);
        clearInterval();
        this.toggleAddHouse();
        this.render();
      })
      .catch(error => {
        //Set form feedback to error on failure
        this.setState({ submitFeedback: error });
      });
  };

  //Toggles whether or not to show the household form.
  toggleEditHousehold = () => {
    this.setState({ editingHousehold: !this.state.editingHousehold });
  };

  renderHouseholds = () => {
    const { households, deleteHousehold } = this.context;

    return households.map(household => {
      return (
        // When the edit button is clicked, this will render as an overlay.
        <div key={household.id} className="house_card">
          {this.state.editingHousehold && household.id === this.state.editId ? (
            <Modal>
              <EditHouseholdInput
                name={household.name}
                edit={this.state.editingHousehold}
                handleEditHouseholdName={this.handleEditHouseholdName}
                handleCancel={this.toggleEditHousehold}
                id={household.id}
              />
            </Modal>
          ) : null}

          <h3>{household.name}</h3>

          <div className="house_card_controls">
            <button
              onClick={() =>
                this.setState({ editingHousehold: true, editId: household.id })
              }
            >
              <FontAwesomeIcon
                className="pen-icon"
                icon={faPencilAlt}
                size="1x"
                color=" #b1b1b1"
              />
            </button>
            <button
              className="delete-household"
              onClick={event => deleteHousehold(event, household.id)}
            >
              {' '}
              <FontAwesomeIcon
                className="trash-icon"
                icon={faTrashAlt}
                size="1x"
                color=" #b1b1b1"
              />{' '}
            </button>
          </div>

          <hr className="rule" />

          <h4>Members</h4>

          {/* Render the names */}
          {this.state.members && this.state.members[household.id] ? (
            <ul className="card-members">
              <ProgressBar></ProgressBar>
              {this.state.members[household.id].members.map(member => {
                return <li key={member.id}>{member.name}</li>;
              })}
            </ul>
          ) : (
            <ul className="card-empty">
              <li>This group has no members </li>
            </ul>
          )}

          <div className="house_card_link">
            <Link to={`/household/${household.id}`}>
              See Group{' '}
              <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
            </Link>
          </div>
        </div>
      );
    });
  };

  render() {
    const { addMember, addHouse } = this.state;
    return (
      <section className="parent_dashboard">
        <div className="parent_dashboard-feedback">
          <h3>Get Started!</h3>
          {this.renderUserFeedback()}
        </div>

        {addMember ? (
          <Modal>
            <AddMembers
              handleCancel={this.toggleAddMember}
              handleRenderUpdate={this.handleRenderAfterAddMember}
            />
          </Modal>
        ) : null}
        {addHouse ? (
          <Modal>
            <AddHouseHoldForm
              handleHouseSubmit={this.handleHouseholdSubmit}
              handleCancel={this.toggleAddHouse}
              feedback={this.state.submitFeedback}
            ></AddHouseHoldForm>
          </Modal>
        ) : null}
        <div className="dash-buttons">
          <button onClick={this.toggleAddMember}>Add Member</button>
          <button onClick={this.toggleAddHouse}>Add Group</button>
        </div>

        <div className="household_buttons">{this.renderHouseholds()}</div>
      </section>
    );
  }
}
