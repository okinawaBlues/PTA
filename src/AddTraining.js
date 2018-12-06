import React, { Component } from "react";
import SkyLight from "react-skylight";

class AddTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      duration: "",
      activity: "",
      customers: [],
      customer: ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let newTraining = {
      date: this.state.current.date,
      duration: this.state.duration,
      activity: this.state.activity,
      customer: this.state.customer
    };
    this.props.addTraining(newTraining);
    this.props.loadTrainings();
    this.refs.simpleDialog.hide();
  }

  render() {
    const addTrainingDialogWindow = {
      width: "70%",
      height: "450px",
      marginTop: "-300px",
      marginLeft: "-35%"
    };
    return (
      <div>
        <SkyLight
          dialogStyles={addTrainingDialogWindow}
          hideOnOverlayClicked
          ref="simpleDialog"
        >
          <div className="card" style={{ width: "95%" }}>
            <div className="card-body">
              <h5 className="card-title">New Training</h5>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="date"
                    className="form-control"
                    name="date"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="duration"
                    className="form-control"
                    name="duration"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="activity"
                    className="form-control"
                    name="activity"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="firstname"
                    className="form-control"
                    name="firstname"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="lastname"
                    className="form-control"
                    name="lastname"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </SkyLight>
        <div className="col-md-2">
          <button
            style={{ margin: "10px" }}
            className="btn btn-primary"
            onClick={() => this.refs.simpleDialog.show()}
          >
            New Training
          </button>
        </div>
      </div>
    );
  }

}

export default AddTraining;