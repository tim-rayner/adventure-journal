import Map from "../components/map/Map";
import Legend from "../components/Legend";
import Toolbox from "../components/toolbox/Toolbox";
import UserMenu from "../components/toolbox/option-menu/UserMenu";
import { useEffect, useState } from "react";
import OptionSettings from "../components/toolbox/option-settings/OptionSettings";
import OptionSocial from "../components/toolbox/option-social/OptionSocial";
import OptionLayer from "../components/toolbox/option-layer/OptionLayer";

//Stores
import { toggleLayer } from "../components/map/mapSlice";
import { useSelector } from "react-redux";

export default function Home() {
  //@ts-ignore
  const toolBoxState = useSelector((state) => state.map?.toolBox);

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

  //update when store updates using useEffect
  useEffect(() => {
    setOptionMenuVisible(toolBoxState.menuOpen);
    setOptionSocialVisible(toolBoxState.socialOpen);
    setOptionLayerVisible(toolBoxState.layerOpen);
    setOptionSettingsVisible(toolBoxState.settingsOpen);
  }, [toolBoxState]);

  return (
    <div className="home flex flex-col relative text-white bg-[#282c34] min-h-[100vh]">
      <Legend />
      <Map />
      <Toolbox />
      <UserMenu visible={optionMenuVisible} />
      <OptionSocial visible={optionSocialVisible} />
      <OptionLayer visible={optionLayerVisible} />
      <OptionSettings visible={optionSettingsVisible} />
    </div>
  );
}
