//@ts-nocheck
import { Dialog } from "primereact/dialog";
import COUNTRIES_DATA from "../../../data/countries_data_2.json";
import { useEffect, useState } from "react";

import { MultiSelect } from "primereact/multiselect";

//Stores
import { useSelector, useDispatch } from "react-redux";
import { toggleLayer, updateVisitedCountries } from "../../map/mapSlice";
import GoogleAuth from "../../auth/GoogleAuth";

export default function UserMenu({ visible }: { visible: boolean }) {
  const dispatch = useDispatch();

  const globeStateCountries = useSelector(
    (state) => state.map?.visitedCountries
  );

  const [countries, setCountries] = useState(COUNTRIES_DATA);
  const [visitedCountries, setVisitedCountries] = useState(globeStateCountries);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCheckboxChange = (country: string) => {
    setVisitedCountries(country);
    dispatch(updateVisitedCountries(country));
  };

  const onClose = () => {
    dispatch(toggleLayer("menuOpen"));
  };

  return (
    <Dialog
      header="User Menu"
      visible={visible}
      className="userMenuDialog"
      onHide={() => onClose()}
      draggable={false}
      position={viewportWidth < 768 ? "top" : "center"}
    >
      <div className="user-menu-wrapper">
        <h3 className="text-lg font-bold">Countries</h3>
        <div className="dropdown-wrapper">
          <MultiSelect
            value={visitedCountries}
            onChange={(e) => handleCheckboxChange(e.value)}
            options={countries}
            optionLabel="name"
            filter
            placeholder="Select Countries"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
        <div className="dropdown-divider"></div>
      </div>
      <div className="auth-wrapper">
        <GoogleAuth />
      </div>
    </Dialog>
  );
}
