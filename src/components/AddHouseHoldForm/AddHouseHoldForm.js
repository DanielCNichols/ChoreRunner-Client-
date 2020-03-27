import React,{Component} from 'react'
import './AddHouseHoldForm.css'


export default class AddHouseHoldForm extends Component {

    render() {
        const {handleHouseSubmit, feedback, handleCancel} = this.props;
        return (
            <form
            className="add-household-form"
            onSubmit={handleHouseSubmit}
          >
              <fieldset>
                  <legend>Add a Group</legend>
            <label className="add-house-label" htmlFor="householdName">
              {' '}
              Group Name
            </label>
            <input
              name="householdName"
              type="text"
              required
              ref={input => (this.householdName = input)}
              ></input>
            <button className="submitHH" type="submit">
              Create new group
            </button>
            <button type="button" onClick={handleCancel}>Cancel</button>

            {/*Shows success feedback when household submitted successfully*/}
            {feedback ? (
                <div className="household-add-form-feedback">
                {feedback}
              </div>
            ) : null}
        </fieldset>
          </form>
        )
    }
}