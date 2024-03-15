import Map from "../components/map/Map";
import Legend from "../components/Legend";
import Toolbox from "../components/toolbox/Toolbox";

export default function Home() {
  return (
    <div className="home flex flex-col relative text-white bg-[#282c34] min-h-[100vh]">
      <Legend />
      <Map />
      <Toolbox />
    </div>
  );
}
