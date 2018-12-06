import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from "./AddCustomer";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SkyLight from "react-skylight";
// since the default date+time picker is not working in all browsers
// the implementation of the following one assisted greatly on the registration of trainings
import DateTimePicker from "react-datetime-picker";
import swal from '@sweetalert/with-react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      trainings: [],
      date: "",
      duration: "",
      activity: "",
      customer: ""
    };
    this.showDialog = React.createRef();
  }

  componentDidMount() {
    this.loadCustomers();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateTimeChange = (date) => {
    this.setState({ date: new Date(date) });
  };

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          customers: responseData.content
        });
      });
  };

  addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    })
      .then(res => this.loadCustomers())
      .catch(err => console.error(err));
      swal("Success!", "This customer has been registered successfully" , "success");

  };

  deleteCustomer = (links) => {
    swal("", "Would you proceed to delete this customer?", "warning") && confirmAlert({
      title: "",
      message: "This customer will be removed permanently. Do you confirm this action?",  
      // based on the new documentation of confirm alert component, only buttons attribute is required
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(links, { method: "DELETE" })
              .then(res => this.loadCustomers())
              .catch(err => console.error(err));
              swal("Deleted!", "The customer you have chosen has been deleted successfully.", "success");
          },
          
        },
        {
          label: "Cancel"
        }
      ]
    });
  };

// method to set the customers URL into a state, which will be used in the addTraining()
// *** in order to access the customers URL, path is : links[0].href / links[1].href which goes to the columns' accessor***
  settingTheValueofTheCustomerURL = (customer) => {
    this.setState({ customer: customer})
    this.showDialog.current.show();
  }

  addTraining = () => {
    const newTraining = {
       date: this.state.date, 
       duration: this.state.duration, 
       activity: this.state.activity, 
       customer: this.state.customer 
      };
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTraining)
    });
    this.showDialog.current.hide();
    swal("Success!", "A new training has been registered to this customer." , "success");
  };

  render() {
    const addTrainingDialog = {
      width: '30%',
      height: '30%',
      marginLeft: '-15%',
    }

    const columnsDisplayed = [
      {
        Header: "Customers Information",
        columns: [
          {
            Header: "First Name",
            accessor: "firstname"
          },
          {
            Header: "Last Name",
            accessor: "lastname"
          },
          {
            Header: "Street Address",
            accessor: "streetaddress"
          },
          {
            Header: "Post Code",
            accessor: "postcode"
          },
          {
            Header: "City",
            accessor: "city"
          },
          {
            Header: "Email",
            accessor: "email"
          },
          {
            Header: "Phone Number",
            accessor: "phone"
          },
          {
            id: "button",
            sortable: false,
            filterable: false,
            width: 110,
            accessor: "links[0].href",
            Cell: ({ value }) => (
              <Tooltip
                title="Add new training"
                placement="bottom-end">
                <IconButton
                  size="small"
                  color="secondary"
                  aria-label="Add new training" 
                  onClick={()=>{ this.settingTheValueofTheCustomerURL(value); } }>
                <SaveIcon/>
                </IconButton>
              </Tooltip>
            )
          },
          {
            id: "button",
            sortable: false,
            filterable: false,
            width: 110,
            accessor: "links[0].href",
            Cell: ({ value }) => (
              <Tooltip 
                title="Delete this Customer"
                placement="bottom-end">
                <IconButton
                  size="small"
                  aria-label="Delete this customer" 
                  onClick={()=>{ this.deleteCustomer(value); } }>
                <DeleteIcon/>
                </IconButton>
              </Tooltip>
            )
          }
        ]
      }
    ];
    return (
      <div>
        <div>
          <AddCustomer 
            addCustomer={this.addCustomer} 
            loadCustomers={this.loadCustomers}
          />
        </div>
        <ReactTable 
          defaultPageSize={15} 
          filterable={true} 
          data={this.state.customers} 
          columns={columnsDisplayed} 
          className="-striped -highlight"
          style={{"width": "90%","margin": "auto"}}
        />
         <SkyLight 
            dialogStyles={addTrainingDialog} 
            hideOnOverlayClicked 
            ref={this.showDialog}
         >
          <div style={{ width: "100%", marginTop: -10 }}>
            <div>
              <h5> New Training </h5>
                <div>
                <DateTimePicker
                  required={true}
                  onChange={this.handleDateTimeChange}
                  value={this.state.date}
                />
                </div>
                <br/>
                <div>
                  <input 
                    type="number" 
                    placeholder="duration (minutes)" 
                    className="form-control" 
                    name="duration" 
                    onChange={this.handleChange} 
                  />
                </div>
                <br/>
                <div>
                  <TextField
                    type="text" 
                    placeholder="activity" 
                    className="form-control" 
                    name="activity" 
                    onChange={this.handleChange} 
                  />
                </div>
                <br/>
                <div>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary" 
                    onClick={this.addTraining}
                    style={{ margin: 10 }}> Save
                  <SaveIcon/>
                  </Button>
                </div>
            </div>
          </div>
        </SkyLight>
      </div>
    );
  }
}

export default CustomerList;