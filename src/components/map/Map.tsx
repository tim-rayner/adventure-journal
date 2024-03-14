import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import * as THREE from "three";
//@ts-ignore
import { COUNTRIES_DATA } from "../../data/countries_data";
//@ts-ignore
import HEX_DATA from "../map/countries.geojson";
//@ts-ignore
import Globe from "react-globe.gl";

export default function Map() {
  const { useState, useEffect, useMemo } = React;

  const [countries, setCountries] = useState({ features: [] });
  const [labelsData, setLabelsData] = useState([]);
  const [hoverD, setHoverD] = useState();

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

  //@ts-ignore
  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat: any) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );

  colorScale.domain([0, maxVal]);

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      lineHoverPrecision={0}
      polygonsData={countries.features}
      labelsData={labelsData}
      //@ts-ignore
      labelText={(d) => d.text}
      labelSize={1.6}
      labelColor={useCallback(() => "white", [])}
      labelAltitude={0.15}
      polygonAltitude={(d) => (d === hoverD ? 0.05 : 0.01)}
      polygonCapColor={
        (d) => (d === hoverD ? "steelblue" : "steelblue") //colorScale(getVal(d))
      }
      polygonSideColor={() => "rgba(0, 100, 0, 0.35)"}
      polygonStrokeColor={() => "rgba(0, 100, 0, 0.15)"}
      //@ts-ignore
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
        Population: <i>${d.POP_EST}</i>
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
