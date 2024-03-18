import { Dialog } from "primereact/dialog";
import COUNTRIES_DATA from "../../../data/countries_data_2.json";
import { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { MultiSelect } from "primereact/multiselect";
//Types
import { CountryCode } from "../../../types/countries";
//Stores
import { useSelector, useDispatch } from "react-redux";
import { toggleLayer, updateVisitedCountries } from "../../map/mapSlice";

export default function UserMenu({ visible }: { visible: boolean }) {
  const dispatch = useDispatch();

  const globeStateCountries = useSelector(
    //@ts-ignore
    (state) => state.map?.visitedCountries
  );

  const [countries, setCountries] = useState(COUNTRIES_DATA);
  const [visitedCountries, setVisitedCountries] = useState(globeStateCountries);

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
    </Dialog>
  );
}
