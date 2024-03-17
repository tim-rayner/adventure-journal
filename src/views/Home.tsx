import Map from "../components/map/Map";
import Legend from "../components/Legend";
import Toolbox from "../components/toolbox/Toolbox";
import UserMenu from "../components/toolbox/option-menu/UserMenu";
import { useState } from "react";
import OptionSettings from "../components/toolbox/option-settings/OptionSettings";
import OptionSocial from "../components/toolbox/option-social/OptionSocial";
import OptionLayer from "../components/toolbox/option-layer/OptionLayer";

export default function Home() {
  const [optionMenuVisible, setOptionMenuVisible] = useState<boolean>(false);

  const [optionSocialVisible, setOptionSocialVisible] = useState<boolean>(true);

  const [optionLayerVisible, setOptionLayerVisible] = useState<boolean>(false);

  const [optionSettingsVisible, setOptionSettinsgsVisible] =
    useState<boolean>(false);

  return (
    <div className="home flex flex-col relative text-white bg-[#282c34] min-h-[100vh]">
      <Legend />
      <Map />
      <Toolbox />
      <UserMenu
        visible={optionMenuVisible}
        // @ts-ignore
        onToggle={setOptionMenuVisible}
      />
      <OptionSocial
        visible={optionSocialVisible}
        // @ts-ignore
        onToggle={setOptionSocialVisible}
      />
      <OptionLayer
        visible={optionLayerVisible}
        // @ts-ignore
        onToggle={setOptionLayerVisible}
      />
      <OptionSettings
        visible={optionSettingsVisible}
        // @ts-ignore
        onToggle={setOptionSettinsgsVisible}
      />
    </div>
  );
}
