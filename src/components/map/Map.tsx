import React, { useRef, useCallback } from "react";

//@ts-ignore
import HEX_DATA from "../map/countriesx.geojson";
//@ts-ignore
import Globe from "react-globe.gl";

//Stores
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDarkMode,
  toggleMapImg,
  updatedGlobeAutoRotate,
} from "./mapSlice";

export default function Map() {
  //@ts-ignore
  const globeState = useSelector((state) => state.map?.globe);

  const visitedCountries = useSelector(
    //@ts-ignore
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
    //@ts-ignore
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

  //reset globe attributes on store change
  useEffect(() => {
    console.log("something changed");
    //@ts-ignore
    globeEl.current.controls().autoRotate = globeState.globeAutoRotate;
    //@ts-ignore
    globeEl.current.controls().autoRotateSpeed = globeState.globeSpeed;

    setMapImg(globeState.darkMode ? "earth-night.jpg" : "earth-day.jpg");

    setShowMapImg(globeState.showMapImg);

    //@ts-ignore
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
    //@ts-ignore
    return localVisitedCountries.includes(d.ISO_A2)
      ? "rgba(65, 245, 135, 0.65)"
      : "rgba(220,20,60, 0.55)";
  };

  const renderSideColor = (d: object) => {
    //@ts-ignore
    return localVisitedCountries.includes(d.ISO_A2)
      ? "rgba(70,130,180, 0.75)"
      : "rgba(220,20,60, 0.75)";
  };

  /**@TODO if autorotate has been toggled in settings, ignore this functionality */
  const onHexHover = (d: object) => {
    dispatch(updatedGlobeAutoRotate(d === null));
    //@ts-ignore
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
