import React, { Component } from "react";
import SkyLight from "react-skylight";
// import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
// import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    };
    this.addModal = React.createRef();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // save customer, load customers and close new customer modal
  handleSubmit = event => {
    event.preventDefault();
    const newCustomer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.addCustomer(newCustomer);
    this.props.loadCustomers();
    // this.refs.simpleDialog.hide();
    this.addModal.current.hide();
  };

  render() {
    const addCustomerDialogWindow = {};

    return (
      <div>
        <SkyLight
          // dialogStyles={addCustomerDialogWindow}
          hideOnOverlayClicked
          // ref="simpleDialog"
          ref={this.addModal}
        >
          <div>
            <h5> New Customer </h5>
            <div>
              <TextField
                type="text"
                placeholder="firstname"
                name="firstname"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                type="text"
                placeholder="lastname"
                name="lastname"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                type="text"
                placeholder="streetaddress"
                name="streetaddress"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                type="text"
                placeholder="postcode"
                name="postcode"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                type="text"
                placeholder="city"
                name="city"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                type="text"
                placeholder="email"
                name="email"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                type="text"
                placeholder="phone"
                name="phone"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                style={{ margin: 10 }}
              >
                Save
                <SaveIcon />
              </Button>
            </div>
          </div>
        </SkyLight>
        <div style={{ width: 1400, margin: "auto" }}>
          <Button
            size="small"
            aria-label="Save new customer"
            variant="contained"
            color="secondary"
            style={{ marginTop: "-5%", float: "left" }}
            onClick={() => this.addModal.current.show()}
          >
            {/* onClick={()=>this.refs.simpleDialog.show()}> */}
            <AddIcon />
            Add customer
          </Button>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
