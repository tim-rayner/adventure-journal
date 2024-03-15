import React, { useRef, useEffect } from "react";

import Map from "../components/map/Map";
import Legend from "../components/Legend";

export default function Home() {
  return (
    <div className="home">
      <Legend />
      <Map />
    </div>
  );
}
