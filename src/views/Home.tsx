//@ts-nocheck

import Map from "../components/map/Map";
import Legend from "../components/Legend";
import Toolbox from "../components/toolbox/Toolbox";
import UserMenu from "../components/toolbox/option-menu/UserMenu";
import { useEffect, useState } from "react";
import OptionSettings from "../components/toolbox/option-settings/OptionSettings";
import OptionSocial from "../components/toolbox/option-social/OptionSocial";
import OptionLayer from "../components/toolbox/option-layer/OptionLayer";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
//Stores
import { updatedGlobeAutoRotate } from "../components/map/mapSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const globeState = useSelector((state) => state.map?.globe);

  const toolBoxState = useSelector((state) => state.map?.toolBox);

  const [globeAutoRotate, setGlobeAutoRotate] = useState<boolean>(
    globeState.globeAutoRotate
  );

  const [optionMenuVisible, setOptionMenuVisible] = useState<boolean>(
    toolBoxState.menuOpen
  );

  const [optionSocialVisible, setOptionSocialVisible] = useState<boolean>(
    toolBoxState.socialOpen
  );

  const [optionLayerVisible, setOptionLayerVisible] = useState<boolean>(
    toolBoxState.layerOpen
  );

  const [optionSettingsVisible, setOptionSettingsVisible] = useState<boolean>(
    toolBoxState.settingsOpen
  );

  //add event listener to change globe rotate toggle when the user presses the spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        dispatch(updatedGlobeAutoRotate(!globeAutoRotate));
        setGlobeAutoRotate(!globeAutoRotate);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [globeAutoRotate]);

  useEffect(() => {
    setGlobeAutoRotate(globeState.globeAutoRotate);
  }, [globeState.globeAutoRotate]);

  //update when store updates using useEffect
  useEffect(() => {
    setOptionMenuVisible(toolBoxState.menuOpen);
    setOptionSocialVisible(toolBoxState.socialOpen);
    setOptionLayerVisible(toolBoxState.layerOpen);
    setOptionSettingsVisible(toolBoxState.settingsOpen);
  }, [toolBoxState]);

  return (
    <div className="home flex flex-col relative text-white bg-[#282c34] min-h-[100vh]">
      <div className="flex justify-center"></div>
      <Map />
      <Legend />
      <Toolbox />
      <UserMenu visible={optionMenuVisible} />
      <OptionSocial visible={optionSocialVisible} />
      <OptionLayer visible={optionLayerVisible} />
      <OptionSettings visible={optionSettingsVisible} />
      <div className="largeOnly absolute bottom-0 right-0 p-6 text-xl opacity-60 flex justify-center items-center w-full ">
        <p>
          Press <SpaceBarIcon className="-mb-2" /> to{" "}
          {globeAutoRotate ? "pause" : "start"} globe rotation
        </p>
      </div>
    </div>
  );
}
