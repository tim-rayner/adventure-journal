import { Dialog } from "primereact/dialog";

export default function OptionSocial({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: (visible: boolean) => void;
}) {
  return (
    <Dialog
      header="Social"
      visible={visible}
      style={{ width: "50vw" }}
      // @ts-ignore
      onHide={() => onToggle(false)}
      draggable={false}
    >
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Dialog>
  );
}
