import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Slider } from "primereact/slider";
import { Checkbox } from "primereact/checkbox";
import { useDispatch } from "react-redux";
import { toggleLayer } from "../../map/mapSlice";

export default function OptionSettings({ visible }: { visible: boolean }) {
  const dispatch = useDispatch();

  const [globeSpeedSlider, setGlobeSpeedSlider] = useState(0);
  const [globeAutoRotate, setGlobeAutoRotate] = useState(true);

  const onClose = () => {
    dispatch(toggleLayer("settingsOpen"));
  };

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
            onChange={(e) => setGlobeSpeedSlider(e.value)}
            className="w-full flex-col m-auto"
          />
        </div>

        <div className="input-field w-full flex ">
          <label className="font-bold flex-col w-1/2 m-auto text-left">
            Globe Auto Rotate
          </label>
          <Checkbox
            onChange={(e) => setGlobeAutoRotate(e.checked ? true : false)}
            checked={globeAutoRotate}
            className="w-full m-auto"
          ></Checkbox>
        </div>
      </div>
    </Dialog>
  );
}
