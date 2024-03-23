//@ts-nocheck
import React, { useRef, useCallback } from "react";

//@ts-ignore
import HEX_DATA from "../map/countriesx.geojson";

import Globe from "react-globe.gl";

//Stores
import { useDispatch, useSelector } from "react-redux";
import { updatedGlobeAutoRotate } from "./mapSlice";

export default function Map() {
  const globeState = useSelector((state) => state.map?.globe);

  const visitedCountries = useSelector(
    (state) => state.map?.visitedCountryCodes
  );
  const dispatch = useDispatch();

  const { useState, useEffect } = React;

  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [localVisitedCountries, setLocalVisitedCountries] =
    useState(visitedCountries);
  const [globeWidth, setGlobeWidth] = useState(window.innerWidth);
  const [globeHeight, setGlobeHeight] = useState(window.innerHeight);

  const [mapImg, setMapImg] = useState(
    globeState.darkMode ? "earth-night.jpg" : "earth-day.jpg"
  );
  const [showMapImg, setShowMapImg] = useState(globeState.showMapImg);

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
    globeEl.current.controls().autoRotate = globeState.globeAutoRotate;

    globeEl.current.controls().autoRotateSpeed = globeState.globeSpeed;
  }, [globeState.globeAutoRotate, globeState.globeSpeed]);

  //reset globe attributes on store change
  useEffect(() => {
    console.log("something changed");

    globeEl.current.controls().autoRotate = globeState.globeAutoRotate;

    globeEl.current.controls().autoRotateSpeed = globeState.globeSpeed;

    setMapImg(globeState.darkMode ? "earth-night.jpg" : "earth-day.jpg");

    setShowMapImg(globeState.showMapImg);
  }, [
    globeState.globeAutoRotate,
    globeState.globeSpeed,
    globeState.darkMode,
    globeState.explorationMode,
    globeState.showExplorationPercentage,
    globeState.showCities,
    globeState.showMapImg,
  ]);

  //reset selected countries on store change
  useEffect(() => {
    setLocalVisitedCountries(visitedCountries);
  }, [visitedCountries]);

  //Functions

  const renderCapColor = (d: object) => {
    return localVisitedCountries.includes(d.ISO_A2)
      ? "rgba(65, 245, 135, 0.65)"
      : "rgba(220,20,60, 0.55)";
  };

  const renderSideColor = (d: object) => {
    return localVisitedCountries.includes(d.ISO_A2)
      ? "rgba(65, 245, 135, 0.75)"
      : "rgba(220,20,60, 0.75)";
  };

  /**@TODO if autorotate has been toggled in settings, ignore this functionality */
  const onHexHover = (d: object) => {
    dispatch(updatedGlobeAutoRotate(d === null));

    setHoverD(d);
  };

  return (
    <Globe
      height={globeHeight}
      width={globeWidth}
      ref={globeEl}
      globeImageUrl={
        showMapImg ? `//unpkg.com/three-globe/example/img/${mapImg}` : null
      }
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      polygonsData={countries.features}
      polygonAltitude={(d) => (d === hoverD ? 0.09 : 0.01)}
      polygonCapColor={({ properties: d }) => renderCapColor(d)}
      polygonSideColor={({ properties: d }) => renderSideColor(d)}
      polygonStrokeColor={({ properties: d }) => renderSideColor(d)}
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN}</b> 
      `}
      onPolygonHover={(d) => onHexHover(d)}
      polygonsTransitionDuration={300}
      hexPolygonResolution={3} //values higher than 3 makes it buggy
      hexPolygonMargin={0}
      hexPolygonColor={useCallback(() => "#1b66b1", [])}
    />
  );
}
