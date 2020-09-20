import config from '../config';
import TokenService from './token-service';

//!good
const ApiService = {
  postHousehold(name) {
    return fetch(`${config.API_ENDPOINT}/households`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ name }),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //!good
  //parent dash page
  getHouseholds() {
    return fetch(`${config.API_ENDPOINT}/households`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //good
  deleteHousehold(id) {
    return fetch(`${config.API_ENDPOINT}/households/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null));
  },

  //good
  editHouseholdName(id, updateHousehold) {
    return fetch(`${config.API_ENDPOINT}/households/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updateHousehold),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //Refactor this to return all things members and their tasks.
  //householdPage
  //good
  getMembers(household_id) {
    return fetch(`${config.API_ENDPOINT}/households/${household_id}/status`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //good
  addMember(newMember) {
    return fetch(`${config.API_ENDPOINT}/members`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newMember),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //good
  editMember(updatedMember) {
    return fetch(`${config.API_ENDPOINT}/members/${updatedMember.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updatedMember),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //good
  deleteMember(member_id) {
    return fetch(`${config.API_ENDPOINT}/members/${member_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      // body: JSON.stringify({ member_id: `${member_id}` }),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : undefined
    );
  },

  //!For the member dashboard
  //!KEEP THIS ONE
  //good
  getMemberStatus(member_id) {
    return fetch(`${config.API_ENDPOINT}/members/${member_id}/status`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //good
  parentApproveTask(task) {
    return fetch(`${config.API_ENDPOINT}/tasks/${task.id}/approve`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(task),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //good
  parentRejectTask(taskId) {
    return fetch(`${config.API_ENDPOINT}/tasks/${taskId}/reject`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      // body: JSON.stringify(task),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  addTask(newTask) {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newTask),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //!Update this to access the /tasks/:taskId
  updateTask(updated) {
    return fetch(`${config.API_ENDPOINT}/tasks/${updated.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updated),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  deleteTask(taskId) {
    return fetch(`${config.API_ENDPOINT}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    });
  },

  //good

  completeTask(id) {
    return fetch(`${config.API_ENDPOINT}/tasks/${id}/complete`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null));
  },

  //good
  resetScores(household_id) {
    return fetch(`${config.API_ENDPOINT}/households/${household_id}/scores`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      // body: JSON.stringify({ household_id }),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
};

export default ApiService;
