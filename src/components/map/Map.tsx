import React, { useRef, useCallback } from "react";
import * as THREE from "three";

//@ts-ignore
import HEX_DATA from "../map/countriesx.geojson";
//@ts-ignore
import Globe from "react-globe.gl";

//Stores
import { useSelector } from "react-redux";

const MockVisitedCountries = ["GB", "GR", "ES", "NL", "US", "BG", "TR"];

export default function Map() {
  //@ts-ignore
  const globeState = useSelector((state) => state.map?.globe);

  const { useState, useEffect } = React;

  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [autoRotate, setAutoRotate] = useState(globeState.globeAutoRotate);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(globeState.globeSpeed);

  const [globeWidth, setGlobeWidth] = useState(window.innerWidth);
  const [globeHeight, setGlobeHeight] = useState(window.innerHeight);

  //load Hex data
  useEffect(() => {
    // load data
    fetch(HEX_DATA)
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  // set initial camera position
  useEffect(() => {
    const MAP_CENTER = { lat: 0, lng: 0, altitude: 4 };
    //@ts-ignore
    globeEl.current.pointOfView(MAP_CENTER, 0);
  }, [globeEl]);

  // handle window resize
  useEffect(() => {
    const handleResize = () => {
      setGlobeHeight(window.innerHeight);
      setGlobeWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // reset autoRotate on interaction
  useEffect(() => {
    //@ts-ignore
    globeEl.current.controls().autoRotate = globeState.globeAutoRotate;
    //@ts-ignore
    globeEl.current.controls().autoRotateSpeed = globeState.globeSpeed;
  }, [globeState.globeAutoRotate, globeState.globeSpeed]);

  //Functions

  const renderCapColor = (d: object) => {
    //@ts-ignore
    return MockVisitedCountries.includes(d.ISO_A2)
      ? "steelblue"
      : "rgba(220,20,60, 0.55)";
  };

  const renderSideColor = (d: object) => {
    //@ts-ignore
    return MockVisitedCountries.includes(d.ISO_A2)
      ? "rgba(70,130,180, 0.75)"
      : "rgba(220,20,60, 0.75)";
  };

  const onHexHover = (d: object) => {
    setAutoRotate(d === null);
    //@ts-ignore
    setHoverD(d);
  };

  return (
    <Globe
      height={globeHeight}
      width={globeWidth}
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      polygonsData={countries.features}
      polygonAltitude={(d) => (d === hoverD ? 0.06 : 0.01)}
      polygonCapColor={
        //@ts-ignore
        ({ properties: d }) => renderCapColor(d)
      }
      //@ts-ignore
      polygonSideColor={({ properties: d }) => renderSideColor(d)}
      //@ts-ignore
      polygonStrokeColor={({ properties: d }) => renderSideColor(d)}
      //@ts-ignore
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN}</b> 
      `}
      //@ts-ignore
      onPolygonHover={(d) => onHexHover(d)}
      polygonsTransitionDuration={300}
      hexPolygonResolution={3} //values higher than 3 makes it buggy
      hexPolygonMargin={0}
      hexPolygonColor={useCallback(() => "#1b66b1", [])}
    />
  );
}
