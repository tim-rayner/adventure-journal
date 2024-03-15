import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faPen,
  faGear,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

function ToolboxItem({ icon }: { icon: any }) {
  return (
    <div className="toolbox-content-item bg-white text-black rounded-full h-[50px] w-[50px] flex cursor-pointer my-6 hover:bg-slate-300">
      <FontAwesomeIcon icon={icon} className="m-auto  text-xl" />
    </div>
  );
}

function ToolboxContent() {
  return (
    <div className="toolbox-content text-black rounded-lg z-50   h-fit">
      <ToolboxItem icon={faList} />
      <ToolboxItem icon={faPen} />
      <ToolboxItem icon={faGear} />
    </div>
  );
}

export default function Toolbox() {
  const toolboxRef = useRef(null);

  const [toolboxOpen, setToolboxOpen] = useState(false);

  const toolBoxContent = toolboxOpen ? <ToolboxContent /> : null;

  useEffect(() => {
    function handleClickOutside(event: Event) {
      // @ts-ignore
      if (toolboxRef.current && !toolboxRef.current.contains(event.target)) {
        setToolboxOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    /**@EXPLAIN - return a cleanup to remove the event listener, following best practices.*/
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toolboxRef]);

  return (
    <div
      ref={toolboxRef}
      className="toolbox-wrapper  p-6 absolute bottom-[2.5vh] left-1/2 md:left-[5.5vw] -translate-x-1/2 z-50 "
    >
      {toolBoxContent}
      <div
        className="toolbox bg-white text-black rounded-full h-[50px] w-[50px] flex cursor-pointer"
        onClick={() => setToolboxOpen(!toolboxOpen)}
      >
        <FontAwesomeIcon
          icon={toolboxOpen ? faXmark : faBars}
          className="m-auto  text-xl"
        />
      </div>
    </div>
  );
}
