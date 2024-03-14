import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
//@ts-ignore
import countriesJSON from "../map/countries.geojson";
//@ts-ignore
import Globe from "react-globe.gl";

export default function Home() {
  const { useEffect, useRef } = React;

  const globeEl = useRef();

  useEffect(() => {
    const globe = globeEl.current;

    // Auto-rotate
    //@ts-ignore
    globe.controls().autoRotate = true;
    //@ts-ignore
    globe.controls().autoRotateSpeed = 0.35;
  }, []);

  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    console.log(countriesJSON);
    // load data
    fetch(countriesJSON)
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  return (
    <div className="home">
      <Globe
        ref={globeEl}
        animateIn={true}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonUseDots={true}
        hexPolygonColor={() =>
          `#${Math.round(Math.random() * Math.pow(2, 24))
            .toString(16)
            .padStart(6, "0")}`
        }
        // @ts-ignore
        hexPolygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        Population: <i>${d.POP_EST}</i>
      `}
      />
    </div>
  );
}
