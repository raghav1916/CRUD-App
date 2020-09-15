import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GroupList from "./GroupList";
import GroupEdit from "./GroupEdit";

class App extends Component {
  //constructor(props) {
  //super(props);
  //this.state = {
  //isLoading: true,
  //groups: []
  //groups: [
  //{ id: 1, name: "Denver JUG" },
  //{ id: 2, name: "Utah JUG" },
  //{ id: 3, name: "Seattle JUG" },
  //{ id: 4, name: "Richmond JUG" }
  //]
  //};
  //}

  //async componentDidMount() {
  //const response = await fetch('/api/groups');
  //const body = await response.json();
  //this.setState({ groups: body, isLoading: false });
  //}

  render() {
    //const {groups, isLoading} = this.state;

    //if (isLoading) {
    //return <p>Loading...</p>;
    //}

    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/groups" exact={true} component={GroupList} />
          <Route path="/groups" exact={true} component={GroupEdit} />
        </Switch>
      </Router>
    );
  }
  //<div className="App">
  // <header className="App-header">
  // <img src={logo} className="App-logo" alt="logo" />
  //<div className="App-intro">
  // <h2>JUG List</h2>
  //{this.state.groups.map(
  // group =>
  // <div key={group.id}>
  //{
  // <h4>{group.name}</h4>
  //}
  //</div>
  //)}
  //</div>
  //</header>
  //</div>
  //);
  //}
  //}
}
export default App;
