import { Dialog } from "primereact/dialog";
import { COUNTRIES_DATA } from "../../../data/countries_data";
import { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";

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

  useEffect(() => {
    if (visitedCountries?.length) {
      setCountries(
        COUNTRIES_DATA.map((country) => ({
          ...country,
          checked: visitedCountries.includes(country.country),
        }))
      );
    }
  }, []);

  const handleCheckboxChange = (countryName: string, countryCode?: string) => {
    const countryCodeSelected =
      CountryCode[countryName as keyof typeof CountryCode];

    if (visitedCountries.includes(countryCodeSelected)) {
      setVisitedCountries(
        // @ts-ignore
        visitedCountries.filter((country) => country !== countryCodeSelected)
      );

      dispatch(
        updateVisitedCountries(
          // @ts-ignore
          visitedCountries.filter((country) => country !== countryCodeSelected)
        )
      );
    } else {
      setVisitedCountries([...visitedCountries, countryCodeSelected]);
      dispatch(
        updateVisitedCountries([...visitedCountries, countryCodeSelected])
      );
    }

    setCountries(
      countries.map((country) =>
        country.name === countryName
          ? // @ts-ignore
            { ...country, checked: !country.checked }
          : country
      )
    );
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
        <p> </p>
        <h3 className="text-lg font-bold">Countries</h3>
        <ul className="m-0">
          {countries.map((country) => (
            <li key={country.country} className="flex items-center">
              <Checkbox
                // @ts-ignore
                checked={country.checked}
                className="mr-2"
                onChange={() =>
                  handleCheckboxChange(country.name, country.country)
                }
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
