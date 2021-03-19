import React, {Component} from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
  , InfoWindow
} from "react-google-maps";

const ChinaClicktest = e => {
    alert('test')
}

const MyMapComponent  = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 20, lng: 150.644 }}
      defaultOptions={{
        scrollwheel: true,
        zoomControl: true
      }}
    >
      {/* 중국 */}
      {props.isMarkerShown && <Marker position={{ lat: 34.804898, lng: 103.609984 }} onClick={ChinaClicktest}>
                    {/* <InfoWindow
                        options={{ disableAutoPan: true }}
                        key={ `dd` }
                        content={ `ddd` } /> */}
                    </Marker>}
      {/* 한국 */}
      {props.isMarkerShown && <Marker position={{ lat: 37.548386, lng: 127.011051 }} />}
      {/* 일본 */}
      {props.isMarkerShown && <Marker position={{ lat: 36.249799, lng: 138.113635 }} />}
      {/* 러시아 */}
      {props.isMarkerShown && <Marker position={{ lat: 61.224146, lng: 98.856103 }} />}
      {/* 캐나다 */}
      {props.isMarkerShown && <Marker position={{ lat: 58.7941794, lng:-108.1286025 }} />}
      {/* 미국 */}
      {props.isMarkerShown && <Marker position={{ lat: 39.104909, lng:-101.400543 }} />}
     

    </GoogleMap>
  ))
);

class GMapMarker extends Component {
  render(){
    return (
      <MyMapComponent 
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDWSGbhP7YZktqs3jNvIOagj-ixCOleDY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `80vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        isMarkerShown
      />
    );
  }
}

export default GMapMarker;