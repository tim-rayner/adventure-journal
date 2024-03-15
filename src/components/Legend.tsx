const legendData = [
  {
    label: "Visited",
    color: "steelblue",
  },
  {
    label: "Not Visited",
    color: "rgba(220,20,60, 0.75)",
  },
];

export default function Legend() {
  return (
    <div className="legend-wrapper absolute top-0 left-0 w-fit z-50">
      <div className="legend flex flex-col text-white p-10 pr-16 text-xl">
        {legendData.map((item, i) => (
          <div key={i} className="legend-item flex flex-row m-2">
            <div
              className="legend-color w-[20px] h-[20px] border border-white my-auto mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="legend-label my-auto">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
