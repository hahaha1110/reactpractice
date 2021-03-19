import React, {Component} from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent  = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      defaultOptions={{
        scrollwheel: true,
        zoomControl: true
      }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -20.397, lng: 150.644 }} />}
    </GoogleMap>
  ))
);

class GMap2 extends Component {
  render(){
    return (
      <MyMapComponent 
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDWSGbhP7YZktqs3jNvIOagj-ixCOleDY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `50vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        isMarkerShown
      />
    );
  }
}

export default GMap2;