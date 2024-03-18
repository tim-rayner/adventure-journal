import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { toggleLayer } from "../../map/mapSlice";

export default function OptionSocial({ visible }: { visible: boolean }) {
  const dispatch = useDispatch();

  const [friendCode, setFriendCode] = useState<string>("");

  const onClose = () => {
    dispatch(toggleLayer("socialOpen"));
  };

  return (
    <Dialog
      header="Social"
      visible={visible}
      style={{ width: "50vw" }}
      // @ts-ignore
      onHide={() => onClose()}
      draggable={false}
    >
      <div className="w-full flex flex-col">
        <p className="m-0">
          Connect with a friends exploration map, and compare your progress with
          theirs, or team up and explore the world together.
        </p>
        <div className="flex w-2/3 m-auto">
          <InputText
            value={friendCode}
            onChange={(e) => setFriendCode(e.target.value)}
            className=" my-12 mr-0"
            placeholder="e.g. X12PNW456W"
          />
          <Button label="Explore" className="h-fit my-auto" />
        </div>
      </div>
    </Dialog>
  );
}
