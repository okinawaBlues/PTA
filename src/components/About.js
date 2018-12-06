import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron, Container } from "reactstrap";

class About extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Container>
            <p className="lead">
              This is an attempt to complete a front end project assignment in
              the course of Front End Development. I have tried to utilize
              properly the data provided from a certain number of APIs and with
              the assistance of React JS and a few important components, I was
              able to create a functional Personal Trainer Application that
              displays a list of customers, their registered trainings and a
              calendar tab with the additional details. Along these
              functionalities the app offers to a user the ability to add a new
              entry as a customer, add new trainings to his/her schedule. Also,
              deletion functionalities for both users and their respective
              registered trainings.
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default About;
