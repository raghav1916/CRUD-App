import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
} from "reactstrap";
//import AppNavbar from "./AppNavbar";
import Axios from "axios";
import Popup from "reactjs-popup";
import ReactDOM from "react-dom";
import GroupList from "./GroupList";

class GroupEdit extends Component {
  // emptyItem = {
  //   name: "",
  //   address: "",
  //   city: "",
  //   stateOrProvince: "",
  //   country: "",
  //   postalCode: "",
  // };
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      address: "",
      city: "",
      stateOrProvince: "",
      country: "",
      postalCode: "",
      isOpen: true,
    };
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    //console.log(this.state.edit);
    if (this.props.id) {
      const url = `https://damp-dawn-51391.herokuapp.com/api/group/${this.props.id}`;
      //console.log(this.props.match.params.id);
      const fetchData = await Axios.get(url);
      this.setState({ id: fetchData.data.id });
      this.setState({ name: fetchData.data.name });
      this.setState({ address: fetchData.data.address });
      this.setState({ city: fetchData.data.city });
      this.setState({ stateOrProvince: fetchData.data.stateOrProvince });
      this.setState({ country: fetchData.data.country });
      this.setState({ postalCode: fetchData.data.postalCode });
      // console.log(this.state.item);
      // this.forceUpdate();
    }
  }
  selectCountry(val) {
    this.setState({ country: val });
  }

  selectCity(val) {
    this.setState({ city: val });
  }

  // handleChange(event) {
  // const target = event.target;
  // const value = target.value;
  //const name = target.name;
  //let item = { ...this.state.item };
  //item[name] = value;
  //this.setState({ item });
  // }

  async handleSubmit(event) {
    event.preventDefault();
    //const { item } = this.state;
    var payload = {
      id: this.props.id,
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      stateOrProvince: this.state.stateOrProvince,
      country: this.state.country,
      postalCode: this.state.postalCode,
      user: this.state.user,
      events: this.state.events,
    };

    if (this.props.id) {
      await Axios.put(
        `https://damp-dawn-51391.herokuapp.com/api/group/${this.props.id}`,
        payload
      ).then(function (response) {
        console.log(response);
      });
      //this.props.history.push("/groups");
    } else {
      await Axios.post(
        `https://damp-dawn-51391.herokuapp.com/api/group`,
        payload
      ).then(function (response) {
        console.log(response);
        //this.setState({ item, isLoading: false });
        //body: JSON.stringify(item),
      });
      //this.props.history.push("/groups");
      // this.setState({ isOpen: false });
    }
    //ReactDOM.unmountComponentAtNode(Container);
    window.location.reload();
  }
  handleClose = () => {
    window.location.reload();
  };

  render() {
    const title = <h2>{this.state.id ? "Edit Group" : "Add Group"}</h2>;

    return (
      <div>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name || ""}
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                onChange={(e) => this.setState({ address: e.target.value })}
                value={this.state.address}
                autoComplete="address-level1"
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                onChange={(e) => this.setState({ city: e.target.value })}
                value={this.state.city || ""}
                autoComplete="address-level1"
              />
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="stateOrProvince">State/Province</Label>
                <Input
                  type="text"
                  name="country"
                  id="country"
                  onChange={(e) => this.setState({ country: e.target.value })}
                  value={this.state.country || ""}
                  autoComplete="address-level1"
                />
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="country">Country</Label>
                <Input
                  type="text"
                  name="stateOrProvince"
                  id="stateOrProvince"
                  onChange={(e) =>
                    this.setState({ stateOrProvince: e.target.value })
                  }
                  value={this.state.stateOrProvince || ""}
                  autoComplete="address-level1"
                />
              </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <Label for="country">Postal Code</Label>
                <Input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  onChange={(e) =>
                    this.setState({ postalCode: e.target.value })
                  }
                  value={this.state.postalCode || ""}
                  autoComplete="address-level1"
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
export default withRouter(GroupEdit);
