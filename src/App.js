import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingsList from "./components/TrainingsList";
import Calendar from "./components/Calendar";
import Navigator from "./components/Navigator";
import About from "./components/About";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <h2>Personal Trainer PTA</h2>
        <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route exact path="/" component={CustomerList} />
              <Route path="/trainings" component={TrainingsList} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/about" component={About} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
