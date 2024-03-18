import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faGear,
  faList,
  faUserGroup,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

import { SpeedDial } from "primereact/speeddial";

import { MenuItem } from "primereact/menuitem";

//Stores
import { toggleLayer } from "../../components/map/mapSlice";
import { useDispatch } from "react-redux";

export default function Toolbox() {
  const dispatch = useDispatch();

  const items: MenuItem[] = [
    {
      label: "Settings",
      icon: () => <FontAwesomeIcon icon={faGear} />,
      command: () => {
        dispatch(toggleLayer("settingsOpen"));
      },
    },
    {
      label: "Map Layers",
      icon: () => <FontAwesomeIcon icon={faLayerGroup} />,
      command: () => {
        dispatch(toggleLayer("layerOpen"));
      },
    },
    {
      label: "Social",
      icon: () => <FontAwesomeIcon icon={faUserGroup} />,
      command: () => {
        dispatch(toggleLayer("socialOpen"));
      },
    },

    {
      label: "Menu",
      icon: () => <FontAwesomeIcon icon={faList} />,
      command: () => {
        dispatch(toggleLayer("menuOpen"));
      },
    },
  ];

  return (
    <div className="toolbox-wrapper p-6 absolute bottom-[2.5vh] left-1/2 md:left-[1.5vw] -translate-x-1/2 z-50 ">
      <div
        style={{ position: "relative", height: "200px" }}
        className="largeOnly"
      >
        <SpeedDial
          model={items}
          radius={80}
          type="semi-circle"
          direction="right"
          style={{ top: "calc(50% - 2rem)", left: 0 }}
          showIcon={() => <FontAwesomeIcon icon={faBars} />}
          hideIcon={() => <FontAwesomeIcon icon={faXmark} />}
        />
      </div>

      {/* //mobile */}
      <div
        style={{ position: "relative", height: "200px" }}
        className="mobilefeature"
      >
        <SpeedDial
          model={items}
          radius={80}
          type="semi-circle"
          direction="up"
          style={{ top: "calc(50% - 2rem)", left: "calc(50% - 2rem)" }}
          showIcon={() => <FontAwesomeIcon icon={faBars} />}
          hideIcon={() => <FontAwesomeIcon icon={faXmark} />}
        />
      </div>
    </div>
  );
}
