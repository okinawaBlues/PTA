import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gettrainings: [],
      gettrainings_BigCalendar_Format: []
    };
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
        this.populateFixedLengthEventsArray();
      });
  };

  populateFixedLengthEventsArray = () => {
    let fixedLengthEventsArray = [];
    for (var i = 0; i < this.state.gettrainings.length; i++) {
      // in case the API has registered trainings assigned to no customers (human error)
      // this condition is required to avoid error in loading
      if (this.state.gettrainings[i].customer != null) {
      fixedLengthEventsArray[i] = {
        // using template literal placeholder to display string properly
        title: `Training activity: ${this.state.gettrainings[i].activity} ||
                Customer: ${this.state.gettrainings[i].customer.firstname} ${this.state.gettrainings[i].customer.lastname}`,
        start: new Date(this.state.gettrainings[i].date),
        // multiplied by 60k so the format to be displayed in hours
        end: new Date(this.state.gettrainings[i].date + this.state.gettrainings[i].duration * 60000),
        allDay: false
      };
    }
      // merging abstract array of objects with the fixed array
      this.setState({
        gettrainings_BigCalendar_Format: fixedLengthEventsArray
      });
    }
  };

  render() {
    return (
      <div>
        <BigCalendar
          style={{ height: 500, width: 1000, marginTop: 20, marginBottom: "auto", marginLeft: "auto", marginRight: "auto"}}
          localizer={localizer}
          events={this.state.gettrainings_BigCalendar_Format}
          startAccessor="start"
          endAccessor="end"
          // for visibility reasons default agenda view is removed
          views={["month", "day", "week"]}
        />
      </div>
    );
  }
}

export default Calendar;
