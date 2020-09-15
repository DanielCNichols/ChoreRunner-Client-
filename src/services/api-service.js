import config from '../config';
import TokenService from './token-service';

const ApiService = {
  addHouseholdMember(householdId, newMember) {
    return fetch(`${config.API_ENDPOINT}/households/${householdId}/members`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newMember),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  postHousehold(householdName) {
    let name = householdName;
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

  deleteHousehold(id) {
    return fetch(`${config.API_ENDPOINT}/households/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : undefined
    );
  },

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

  addMember(newMember, householdId) {
    return fetch(`${config.API_ENDPOINT}/households/${householdId}/members`, {
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

  editMember(updatedMember, householdId, memberId) {
    return fetch(
      `${config.API_ENDPOINT}/households/${householdId}/members/${memberId}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(updatedMember),
      }
    ).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  deleteMember(member_id, householdId) {
    return fetch(`${config.API_ENDPOINT}/households/${householdId}/members`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ member_id: `${member_id}` }),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : undefined
    );
  },

  getMembersAndHouseholds() {
    return fetch(`${config.API_ENDPOINT}/households/members`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //!For the member dashboard
  //!KEEP THIS ONE
  getMemberStatus() {
    return fetch(
      `${config.API_ENDPOINT}/households/householdId/members/memberId/tasks`,
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    ).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //!Is for the leaderboard
  getMemberScores(household_id) {
    return fetch(`${config.API_ENDPOINT}/households/household/scores`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //Refactor this to return all things members and their tasks.
  getMembers(household_id) {
    return fetch(`${config.API_ENDPOINT}/households/${household_id}/members`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getTasksForAll(household_id) {
    return fetch(`${config.API_ENDPOINT}/households/${household_id}/tasks`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getTasksToApprove(householdId) {
    return fetch(
      `${config.API_ENDPOINT}/households/${householdId}/tasks/status?status=completed`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    ).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  parentUpdateTaskStatus(taskId, householdId, newStatus, points, member_id) {
    let data = { newStatus, points, member_id };
    return fetch(
      `${config.API_ENDPOINT}/households/${householdId}/tasks/status/${taskId}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(data),
      }
    ).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  addTask(id, newTask) {
    return fetch(`${config.API_ENDPOINT}/households/${id}/tasks`, {
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

  completeTask(id) {
    return fetch(
      `${config.API_ENDPOINT}/households/householdId/members/memberId/tasks`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({ taskId: id }),
      }
    ).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //!Pulling this into the dashboard getTasks
  getBadge() {
    return fetch(`${config.API_ENDPOINT}/members`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

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

  updateTask(household_id, reqBody) {
    return fetch(`${config.API_ENDPOINT}/households/${household_id}/tasks`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(reqBody),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  deleteTask(householdId, taskId) {
    return fetch(
      `${config.API_ENDPOINT}/households/${householdId}/tasks/${taskId}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    );
  },

  resetScores(household_id) {
    return fetch(`${config.API_ENDPOINT}/households/household/scores`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ household_id }),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
};

export default ApiService;
