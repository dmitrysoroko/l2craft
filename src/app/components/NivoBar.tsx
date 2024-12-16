import { ResponsiveBarCanvas } from "@nivo/bar";

const MyResponsiveBarCanvas = ({ data /* see data tab */ }: any) => (
  <ResponsiveBarCanvas
    data={data}
    keys={["sell", "buy"]}
    indexBy="time"
    margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
    pixelRatio={1}
    padding={0.15}
    innerPadding={0}
    minValue="auto"
    maxValue="auto"
    groupMode="grouped"
    layout="vertical"
    reverse={false}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "red_blue" }}
    colorBy="id"
    borderWidth={0}
    borderRadius={0}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: 36,
      truncateTickAt: 0,
    }}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 36,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "food",
      legendPosition: "middle",
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    enableGridX={true}
    enableGridY={false}
    enableLabel={true}
    enableTotals={false}
    totalsOffset={10}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    // labelPosition="middle"
    // labelOffset={0}
    isInteractive={true}
    legends={[]}
  />
);
