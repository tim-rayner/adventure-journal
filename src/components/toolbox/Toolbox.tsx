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

export default function Toolbox() {
  const items: MenuItem[] = [
    {
      label: "Upload",
      icon: () => <FontAwesomeIcon icon={faGear} />,
      command: () => {
        //router.push("/fileupload");
      },
    },
    {
      label: "Update",
      icon: () => <FontAwesomeIcon icon={faLayerGroup} />,
      command: () => {
        // toast.current.show({
        //   severity: "success",
        //   summary: "Update",
        //   detail: "Data Updated",
        // });
      },
    },
    {
      label: "Delete",
      icon: () => <FontAwesomeIcon icon={faUserGroup} />,
      command: () => {
        // toast.current.show({
        //   severity: "error",
        //   summary: "Delete",
        //   detail: "Data Deleted",
        // });
      },
    },

    {
      label: "Add",
      icon: () => <FontAwesomeIcon icon={faList} />,
      // command: () => {
      //   toast.current.show({
      //     severity: "info",
      //     summary: "Add",
      //     detail: "Data Added",
      //   });
      // },
    },
  ];

  return (
    <div className="toolbox-wrapper p-6 absolute bottom-[2.5vh] left-1/2 md:left-[5.5vw] -translate-x-1/2 z-50 ">
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
