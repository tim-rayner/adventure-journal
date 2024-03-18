import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Slider } from "primereact/slider";
import { Checkbox } from "primereact/checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLayer,
  updatedGlobeSpeed,
  updatedGlobeAutoRotate,
} from "../../map/mapSlice";

export default function OptionSettings({ visible }: { visible: boolean }) {
  const dispatch = useDispatch();

  //@ts-ignore
  const globeState = useSelector((state) => state.map?.globe);

  const [globeSpeedSlider, setGlobeSpeedSlider] = useState(
    globeState.globeSpeed
  );
  const [globeAutoRotate, setGlobeAutoRotate] = useState(
    globeState.globeAutoRotate
  );

  const onClose = () => {
    dispatch(toggleLayer("settingsOpen"));
  };

  const onGlobeSpeedChange = (e: any) => {
    dispatch(updatedGlobeSpeed(e));
    setGlobeSpeedSlider(e); // Update local state
  };

  const onGlobeAutoRotateChange = (e: any) => {
    dispatch(updatedGlobeAutoRotate(e));
    setGlobeAutoRotate(e); // Update local state
  };

  useEffect(() => {
    setGlobeSpeedSlider(globeState.globeSpeed);
    setGlobeAutoRotate(globeState.globeAutoRotate);
  }, [globeState.globeSpeed, globeState.globeAutoRotate]);

  return (
    <Dialog
      header="Settings"
      visible={visible}
      className="userMenuDialog"
      // @ts-ignore
      onHide={() => onClose()}
      draggable={false}
    >
      <div className="flex pt-4 w-full flex-col gap-7">
        <div className="input-field w-full flex">
          <label className="font-bold flex-col w-1/2 m-auto ">
            Globe Speed
          </label>
          <Slider
            //@ts-ignore
            value={globeSpeedSlider}
            //@ts-ignore
            onChange={(e) => onGlobeSpeedChange(e.value)}
            className="w-full flex-col m-auto"
          />
        </div>

        <div className="input-field w-full flex ">
          <label className="font-bold flex-col w-1/2 m-auto text-left">
            Globe Auto Rotate
          </label>
          <Checkbox
            onChange={(e) => onGlobeAutoRotateChange(e.checked ? true : false)}
            checked={globeAutoRotate}
            className="w-full m-auto"
          ></Checkbox>
        </div>
      </div>
    </Dialog>
  );
}
