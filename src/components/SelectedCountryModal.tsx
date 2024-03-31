//@ts-nocheck

import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSelectedCountryModal,
  updateVisitedCountries,
} from "./map/mapSlice";
import { InputSwitch } from "primereact/inputswitch";

export default function SelectedCountryModal({
  visible,
}: {
  visible: boolean;
}) {
  const dispatch = useDispatch();

  const selectedCountryState = useSelector(
    (state) => state.map?.selectedCountry?.properties
  );

  const selectedCountryCoords = useSelector(
    (state) => state.map?.selectedCountry?.coordinates
  );

  const vistedCountriesState = useSelector(
    (state) => state.map.visitedCountries
  );

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visitedCountries, setVisitedCountries] =
    useState(vistedCountriesState);
  const [checked, setChecked] = useState(false);

  const onClose = () => {
    dispatch(toggleSelectedCountryModal(false));
  };

  //update selected country
  useEffect(() => {
    if (selectedCountryState) {
      setSelectedCountry({
        code: selectedCountryState.ISO_A2,
        latitude: selectedCountryCoords[0],
        longitude: selectedCountryCoords[1],
        name: selectedCountryState.NAME,
      });
    }
  }, [selectedCountryState]);

  //update visited countries
  useEffect(() => {
    if (vistedCountriesState) {
      setVisitedCountries(vistedCountriesState);
    }
  }, [vistedCountriesState]);

  //update checked
  useEffect(() => {
    if (selectedCountry) {
      //does selected country exist in visited countries
      const exists = visitedCountries.some(
        (country) => country.country === selectedCountry.code
      );

      exists ? setChecked(true) : setChecked(false);
    }
  }, [visitedCountries]);

  //selectedCountryCoords

  useEffect(() => {
    if (selectedCountry) {
      if (checked) {
        //add to visited countries
        dispatch(
          updateVisitedCountries([
            ...visitedCountries,
            {
              country: selectedCountry.code,
              latitude: selectedCountry.latitude,
              longitude: selectedCountry.longitude,
              name: selectedCountry.name,
            },
          ])
        );
      } else {
        //remove from visited countries
        const filteredCountries = visitedCountries.filter(
          (country) => country.country !== selectedCountry.code
        );

        dispatch(updateVisitedCountries(filteredCountries));
      }
    }
  }, [checked]);

  return (
    <Dialog
      header={selectedCountry?.name}
      visible={visible}
      className="userMenuDialog"
      onHide={() => onClose()}
      draggable={false}
      position={viewportWidth < 768 ? "top" : "center"}
    >
      <div className="selected-country-wrapper">
        <label> Visited </label>
        <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
      </div>
    </Dialog>
  );
}
