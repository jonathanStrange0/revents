import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const mapStateToProps = (state) => ({
  data: state.data,
  events: state.events,
});

const actions = {
  incrementCounter,
  decrementCounter,
};

class TestComponent extends Component {
  state = { latlng: { lat: 59.95, lng: 30.33 } };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.setState({ latlng: latLng }))
      .catch((error) => console.error("Error", error));
  };

  render() {
    const { events, data, incrementCounter, decrementCounter } = this.props;
    console.log(events);

    return (
      <div>
        <h1>Test Component</h1>
        <h3>The Answer Is: {data}</h3>
        <Button onClick={incrementCounter} positive content='Increment' />
        <Button onClick={decrementCounter} negative content='Decrement' />
        <br />
        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap key = {this.state.latlng.lng} latlng={this.state.latlng} />
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(TestComponent);
