import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import ModalComp from '../ModalComp';
import { useDispatch } from 'react-redux';
import 'styled-components/macro';
import { Heading } from '@chakra-ui/react';
import { setSourceAndDestinationInputs } from '../weather.slice';
mapboxgl.accessToken =
  'pk.eyJ1IjoiaWFtd2FzZWVtIiwiYSI6ImNsM3gxN2RxbjAwcGEzaXBqbjJvam0wbWwifQ.qoWy-EsS-Q5EWoemHwEk4Q';

export default function MapComponent() {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(74.769205);
  const [lat, setLat] = useState(20.869971);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      interactive: false,
    });
    // console.log(directions);
    // directions.getOrigin((e) => console.log(e));
    map.addControl(directions, 'top-left');
    map.on('sourcedata', () => {
      let sourceInput = directions.getOrigin();
      let destInput = directions.getDestination();
      let payload = { sourceInput, destInput };
      dispatch(setSourceAndDestinationInputs(payload));
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={`
          padding: 5px 0;
          margin: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Heading>Route Suggestion System</Heading>
        <ModalComp />
      </div>

      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
}
