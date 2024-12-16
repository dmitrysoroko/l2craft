import { ResponsiveLineCanvas, ResponsiveLine } from "@nivo/line";

import moment from "moment";

const NivoLine = ({ data /* see data tab */ }: any) => (
  <ResponsiveLine
    data={data}
    enableSlices={"x"}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: "time",
      // format: "native",
      format: "%Y-%m-%dT%H:%M:%S.%L%Z",
      precision: "minute",
      useUTC: false,
    }}
    // xFormat="time:%Y-%m-%dT%H:%M:%S.%L%Z"
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      //   stacked: true,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      // format: "%m-%d",
      tickValues: "every 1 day",
      tickSize: 10,
      format: tick => moment(tick).format("DD.MM.YY"),
      tickPadding: 10,
      //   tickRotation: 90,
      legend: "Time",
      legendOffset: 36,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Price",
      legendOffset: -40,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    pointSize={5}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    //   pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    //   useMesh={true}
    sliceTooltip={({ slice }) => {
      return (
        <div
          style={{
            background: "white",
            padding: "9px 12px",
            border: "1px solid #ccc",
          }}
        >
          {slice.points.map(point => (
            <div key={point.id} style={{ display: "flex" }}>
              <div
                style={{
                  background: point.serieColor,
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}
              >
                {point.serieId}
              </div>
              <span>
                {point.data.y as any} {point.data.x.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }}
  />
);

export default NivoLine;
