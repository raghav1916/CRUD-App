import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link, useParams } from "react-router-dom";
//import users from "./users";
import axios from "axios";
import Popup from "reactjs-popup";
import GroupEdit from "./GroupEdit";

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = { groups: [], isLoading: true };
    //this.remove = this.remove.bind(this);
  
  }

  componentDidMount() {
    //this.setState({isLoading: true});
    axios
      .get("https://damp-dawn-51391.herokuapp.com/api/groups")
      .then((response) => {
        const groups = response.data;
        this.setState({ groups, isLoading: false });
        //fetch('api/groups')
        //.then(response => response.json())
        //.then(data => this.setState({groups: data, isLoading: false}));
      });
  }
  async remove(id) {
    await axios
      .delete(`https://damp-dawn-51391.herokuapp.com/api/group/1`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        let updatedGroups = [...this.state.groups].filter((i) => i.id !== id);
        this.setState({ groups: updatedGroups });
      });
  }

  render() {
    //const {groups, isLoading} = this.state;

    //if (isLoading) {
    // return <p>Loading...</p>;
    //}

    const usersList = this.state.groups.map((group) => {
      const address = `${group.address || ""} ${group.city || ""} ${
        group.stateOrProvince || ""
      } ${group.country || ""} ${group.postalcode || ""}`;
      return (
        <tr key={group.id}>
          <td style={{ whiteSpace: "nowrap" }}>{group.name}</td>
          <td>{address}</td>
          <td>
            {group.events.map((event) => {
              return (
                <div key={event.id}>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(new Date(event.date))}
                  : {event.title}: {event.description}: {event.attendees}
                </div>
              );
            })}
          </td>
          <td>
            <ButtonGroup>
              <Popup
                modal
                trigger={
                  <Button size="sm" color="primary">
                    Edit
                  </Button>
                }
              >
                <GroupEdit id={group.id} />
              </Popup>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(group.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Popup
              modal
              trigger={
                <Button
                  size="success"
                  color="primary"
                >
                  Add Group
                </Button>
              }
            >
              <GroupEdit />
            </Popup>
          </div>
          <h3>My JUG Tour</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Location</th>
                <th>Events</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{usersList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default GroupList;
