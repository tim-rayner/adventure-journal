import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

import { InputSwitch } from "primereact/inputswitch";
import { useDispatch } from "react-redux";
import { toggleLayer } from "../../map/mapSlice";
export default function OptionLayer({ visible }: { visible: boolean }) {
  const dispatch = useDispatch();

  const [darkModeChecked, setDarkModeChecked] = useState(true);
  const [explorationChecked, setExplorationChecked] = useState(true);
  const [explorationPercentageChecked, setExplorationPercentageChecked] =
    useState(false);
  const [showCitiesChecked, setShowCitiesChecked] = useState(false);
  const [mapImageChecked, setMapImageChecked] = useState(true);
  useState(false);

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
          <label className="font-semibold flex-col w-2/3">Dark Globe</label>
          <InputSwitch
            checked={darkModeChecked}
            onChange={(e) => setDarkModeChecked(e.value)}
            className="flex-col mr-auto"
          />
        </div>

        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">
            Exploration Mode
          </label>
          <InputSwitch
            checked={explorationChecked}
            onChange={(e) => setExplorationChecked(e.value)}
            className="flex-col mr-auto"
          />
        </div>

        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">
            Exploration Percentage
          </label>
          <InputSwitch
            checked={explorationPercentageChecked}
            onChange={(e) => setExplorationPercentageChecked(e.value)}
            className="flex-col mr-auto"
          />
        </div>

        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">Show Cities</label>
          <InputSwitch
            checked={showCitiesChecked}
            onChange={(e) => setShowCitiesChecked(e.value)}
            className="flex-col mr-auto"
          />
        </div>

        <div className="input-field w-full flex">
          <label className="font-semibold flex-col w-2/3">Map Image</label>
          <InputSwitch
            checked={mapImageChecked}
            onChange={(e) => setMapImageChecked(e.value)}
            className="flex-col mr-auto"
          />
        </div>
      </div>
    </Dialog>
  );
}
