import { Dialog } from "primereact/dialog";
import { COUNTRIES_DATA } from "../../../data/countries_data";
import { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faXmark,
  faPen,
  faGear,
  faList,
  faUserGroup,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const MockVisitedCountries = ["GB", "GR", "ES", "NL", "US", "BG", "TR"];

export default function UserMenu({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: (visible: boolean) => void;
}) {
  const [countries, setCountries] = useState(COUNTRIES_DATA);
  const [visitedCountries, setVisitedCountries] =
    useState(MockVisitedCountries);

  useEffect(() => {
    setCountries(
      COUNTRIES_DATA.map((country) => ({
        ...country,
        checked: visitedCountries.includes(country.country),
      }))
    );
  }, []);

  const handleCheckboxChange = (countryName: string) => {
    setCountries(
      countries.map((country) =>
        country.name === countryName
          ? // @ts-ignore
            { ...country, checked: !country.checked }
          : country
      )
    );
  };

  return (
    <Dialog
      header="User Menu"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => onToggle(false)}
      draggable={false}
    >
      <div className="user-menu-wrapper">
        <p> </p>
        <h3 className="text-lg font-bold">Countries</h3>
        <ul className="m-0">
          {countries.map((country) => (
            <li key={country.country} className="flex items-center">
              <Checkbox
                // @ts-ignore
                checked={country.checked}
                className="mr-2"
                onChange={() => handleCheckboxChange(country.name)}
              />
              <span>{country.name}</span>
              <span className="text-xs">({country.country})</span>
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
}
