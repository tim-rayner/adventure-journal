import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

import { InputSwitch } from "primereact/inputswitch";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleLayer,
  toggleDarkMode,
  toggleExplorationMode,
  toggleShowExplorationPercentage,
  toggleShowCities,
  toggleMapImg,
} from "../../map/mapSlice";

export default function OptionLayer({ visible }: { visible: boolean }) {
  const globeState = useSelector(
    //@ts-ignore
    (state) => state.map?.globe
  );

  const dispatch = useDispatch();

  const [darkModeChecked, setDarkModeChecked] = useState(globeState.darkMode);
  const [explorationChecked, setExplorationChecked] = useState(
    globeState.explorationMode
  );
  const [explorationPercentageChecked, setExplorationPercentageChecked] =
    useState(globeState.showExplorationPercentage);
  const [showCitiesChecked, setShowCitiesChecked] = useState(
    globeState.showCities
  );
  const [mapImageChecked, setMapImageChecked] = useState(globeState.showMapImg);
  useState(false);

  const handleDarkModeToggle = (e: any) => {
    setDarkModeChecked(e);
    dispatch(toggleDarkMode(e));
  };

  const handleExplorationModeToggle = (e: any) => {
    setExplorationChecked(e);
    dispatch(toggleExplorationMode(e));
  };

  const handleExplorationPercentageToggle = (e: any) => {
    setExplorationPercentageChecked(e);
    dispatch(toggleShowExplorationPercentage(e));
  };

  const handleShowCitiesToggle = (e: any) => {
    setShowCitiesChecked(e);
    dispatch(toggleShowCities(e));
  };

  const handleMapImageToggle = (e: any) => {
    setMapImageChecked(e);
    dispatch(toggleMapImg(e));
  };

  const onClose = () => {
    dispatch(toggleLayer("layerOpen"));
  };

  return (
    <Dialog
      header="Layers"
      visible={visible}
      className="userMenuDialog"
      // @ts-ignore
      onHide={() => onClose()}
      draggable={false}
    >
      <div className="flex pt-4 w-full flex-col gap-7">
        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">
            Dark Globe {darkModeChecked}
          </label>
          <InputSwitch
            checked={darkModeChecked}
            onChange={(e) => handleDarkModeToggle(e.value)}
            className="flex-col mr-auto"
          />
        </div>

        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">
            Exploration Mode {explorationChecked}
          </label>
          <InputSwitch
            checked={explorationChecked}
            onChange={(e) => handleExplorationModeToggle(e.value)}
            className="flex-col mr-auto"
            disabled={true}
          />
          <label className="opacity-65"> coming soon</label>
        </div>

        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">
            Exploration Percentage
          </label>
          <InputSwitch
            checked={explorationPercentageChecked}
            onChange={(e) => handleExplorationPercentageToggle(e.value)}
            className="flex-col mr-auto"
            disabled={true}
          />
          <label className="opacity-65"> coming soon</label>
        </div>

        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">Show Cities</label>
          <InputSwitch
            checked={showCitiesChecked}
            onChange={(e) => handleShowCitiesToggle(e.value)}
            className="flex-col mr-auto"
            disabled={true}
          />
          <label className="opacity-65"> coming soon</label>
        </div>

        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">Map Image</label>
          <InputSwitch
            checked={mapImageChecked}
            onChange={(e) => handleMapImageToggle(e.value)}
            className="flex-col mr-auto"
            disabled={true}
          />
          <label className="opacity-65"> coming soon</label>
        </div>
      </div>
    </Dialog>
  );
}
