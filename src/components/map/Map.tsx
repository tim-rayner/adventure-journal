import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import * as THREE from "three";

//@ts-ignore
import HEX_DATA from "../map/countriesx.geojson";
//@ts-ignore
import Globe from "react-globe.gl";

const MockVisitedCountries = ["GB", "GR", "ES", "NL", "US", "BG", "TR"];

export default function Map() {
  const { useState, useEffect, useMemo } = React;

  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0.4);

  const [globeWidth, setGlobeWidth] = useState(window.innerWidth);
  const [globeHeight, setGlobeHeight] = useState(window.innerHeight);

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
    globeEl.current.controls().autoRotate = autoRotate;
    //@ts-ignore
    globeEl.current.controls().autoRotateSpeed = autoRotateSpeed;
  }, [autoRotate, autoRotateSpeed]);

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
    if (d === null) {
      setAutoRotate(true);
    } else {
      setAutoRotate(false);
    }

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
