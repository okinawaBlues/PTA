import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import swal from "@sweetalert/with-react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

class TrainingsList extends Component {
  constructor(props) {
    super(props);
    this.state = { gettrainings: [] };
  }

  componentDidMount = () => {
    this.loadTrainings();
  };

  loadTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          gettrainings: responseData
        });
      });
  };

  deleteTraining = trainingID => {
    swal("", "Would you proceed to delete this training?", "warning") &&
      confirmAlert({
        title: "",
        message: "This training will be deleted permanently. Are you sure?",
        // based on the new documentation
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              fetch(
                "https://customerrest.herokuapp.com/api/trainings/" +
                  trainingID,
                { method: "DELETE" }
              )
                .then(res => this.loadTrainings())
                .catch(err => console.error(err));
              swal(
                "Success!",
                "This training has been deleted successfully",
                "success"
              );
            }
          },
          {
            label: "Cancel"
          }
        ]
      });
  };

  render() {
    // better naming convention & format?
    const columnsDisplayed = [
      {
        Header: "Trainings Information",
        columns: [
          {
            Header: "First Name",
            accessor: "customer.firstname",
            width: 200
          },
          {
            Header: "Last Name",
            accessor: "customer.lastname",
            width: 200
          },
          {
            Header: "ID",
            accessor: "customer.id",
            width: 50
          },
          {
            Header: "Date",
            filterable: false,
            accessor: "date",
            // Cell: React Table supports a flexible renderer, the specific one renders a standard cell.
            Cell: row => {
              return (
                <div>
                  {/* consider that we are using React Table, original keyword is a row-level prop,  */}
                  {/* that receives the original data from the API */}
                  {moment(row.original.date).format("YYYY-M-D")}
                </div>
              );
            }
          },
          {
            Header: "Duration",
            accessor: "duration"
          },
          {
            Header: "Activity",
            accessor: "activity"
          },
          // accessor id as we are fetching the unique id for every customer in order to delete their trainings
          // retrieved from gettrainings API
          {
            id: "button",
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "id",
            Cell: ({ value }) => (
              <Tooltip
                title="Delete this customer's training"
              >
                <IconButton
                  size="small"
                  aria-label="Delete this customer's training"
                  onClick={() => { this.deleteTraining(value); }}
                >
                <DeleteIcon/>
                </IconButton>
               </Tooltip> 
            )
          }
        ]
        
      }
    ];
    return (
      <div className="container">
        <ReactTable
          defaultPageSize={18}
          filterable={true}
          data={this.state.gettrainings}
          // added a SubComponent props,that adds an expansion level to all root-level rows:
          columns={columnsDisplayed}
          style={{ width: "90%", margin: "auto" }}
        />
      </div>
    );
  }
}

export default TrainingsList;
