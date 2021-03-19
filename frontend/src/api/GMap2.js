import React, {Component} from "react";
import {
  default as canUseDOM,
} from "can-use-dom";
import {default as raf} from "raf";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle, 
  InfoWindow
} from "react-google-maps";
// 현재위치 구글맵
const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure("Your browser doesn't support geolocation.");
    },
  }
);


const MyMapComponent  = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={props.defaultZoom}
      // defaultCenter={{ lat: -34.397, lng: 150.644 }}
      defaultOptions={{
        scrollwheel: true,
        zoomControl: true
      }}
      containerProps = {props.containerProps}
      center={props.center}
    >
      {/* {props.isMarkerShown && <Marker position={{ lat: -20.397, lng: 150.644 }} />} */}
      {props.contents1}
      {/* {props.contents2} */}
    </GoogleMap>
  ))
);

class GMap2 extends Component {
  state = {
    center: null,
    content: null,
    radius: 6000,
  }

  componentDidMount () {
    geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        content: "Location found using HTML5.",
      });

      const tick = () => {
        this.setState({ radius: Math.max(this.state.radius - 20, 0) });

        if (this.state.radius > 200) {
          raf(tick);
        }
      };
      raf(tick);

    }, (reason) => {
      this.setState({
        center: {
          lat: 60,
          lng: 105
        },
        content: `Error: The Geolocation service failed (${ reason }).`
      });
    });
  }


  render(){
    const {center, content, radius} = this.state;
    let contents = [];

    if (center) {
      contents = contents.concat([
        (<InfoWindow key="info" position={center} content={content} />),
        (<Circle key="circle" center={center} radius={radius} options={{
            fillColor: "red",
            fillOpacity: 0.20,
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWeight: 1,
          }} />),
      ]);
    }
    console.log("contents==========================="+contents[0]);
    return (
      
      <MyMapComponent 
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDWSGbhP7YZktqs3jNvIOagj-ixCOleDY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `50vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={12}
        containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        center={center}
        contents1={contents[1]}
        // contents2={contents[1]}
        >
        {/* {contents} */}
      </MyMapComponent>

      
    );
  }
}

export default GMap2;