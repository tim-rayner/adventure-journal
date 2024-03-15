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
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0.2);

  // useEffect(() => {
  //   fetch(HEX_DATA)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCountries(data);

  //       if (labelsData.length > 0) return;
  //       const labels = countryLabelData.map((feat: any) => ({
  //         lat: feat.latitude,
  //         lng: feat.latitude,
  //         label: feat.name,
  //       }));
  //       //@ts-ignore
  //       setLabelsData(labels);
  //     });
  // }, []);

  useEffect(() => {
    // load data
    fetch(HEX_DATA)
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  useEffect(() => {
    //@ts-ignore
    globeEl.current.controls().autoRotate = autoRotate;
    //@ts-ignore
    globeEl.current.controls().autoRotateSpeed = autoRotateSpeed;

    const MAP_CENTER = { lat: 0, lng: 0, altitude: 4 };
    //@ts-ignore
    globeEl.current.pointOfView(MAP_CENTER, 0);
  }, [globeEl]);

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat: any) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );

  const renderCapColor = (d: object) => {
    //@ts-ignore
    return MockVisitedCountries.includes(d.ISO_A2)
      ? "steelblue"
      : "rgba(220,20,60, 0.45)";
  };

  return (
    <Globe
      className="globe"
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      polygonsData={countries.features}
      polygonAltitude={(d) => (d === hoverD ? 0.05 : 0.01)}
      polygonCapColor={
        //@ts-ignore
        ({ properties: d }) => renderCapColor(d)
      }
      polygonSideColor={() => "rgba(0, 100, 0, 0.25)"}
      polygonStrokeColor={() => "rgba(0, 100, 0, 0.15)"}
      //@ts-ignore
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN}</b> 
      `}
      //@ts-ignore
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      hexPolygonResolution={3} //values higher than 3 makes it buggy
      hexPolygonMargin={0.62}
      hexPolygonColor={useCallback(() => "#1b66b1", [])}
    />
  );
}
