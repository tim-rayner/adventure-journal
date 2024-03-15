const legendData = [
  {
    label: "Visited",
    color: "steelblue",
  },
  {
    label: "Not Visited",
    color: "red",
  },
];

export default function Legend() {
  return (
    <div className="legend-wrapper">
      <div className="legend">
        {legendData.map((item, i) => (
          <div key={i} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="legend-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
