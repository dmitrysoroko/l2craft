"use client";

import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import _ from "lodash";

import {
  ArcElement,
  BarElement,
  Chart,
  LineElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip,
  ChartOptions,
  ChartData,
} from "chart.js";
import { ReactChart } from "chartjs-react";

import "chartjs-adapter-moment";
import NivoLine from "./NivoLine";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip,
);

function prepareChartOptions(title: string) {
  const result: ChartOptions<"bar"> = {
    // spanGaps: 1000 * 60 * 60 * 24 * 2, // 2 days
    // responsive: true,
    // interaction: {
    //   mode: 'nearest',
    // },
    // maintainAspectRatio: false,
    // tension: 0.4,
    parsing: {
      xAxisKey: "time",
      yAxisKey: "value",
    },
    scales: {
      x: {
        type: "time",
        time: {
          // unit: 'day',
        },
        ticks: {
          stepSize: 10,
          autoSkip: false,
          maxRotation: 0,
          major: {
            enabled: true,
          },
        },

        // ticks: {
        //   source: 'data'
        // },
        // min: '2021-11-07 00:00:00',
      },
      // y: {
      //   type: "linear",
      //   position: "left"
      // }
    },
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };
  return result;
}

const getDefaultChartData = (data: any, data2: any) => ({
  // labels: data.map(el => moment(el.time).format('DD.MM HH:mm')),
  // labels: data.map(el => el.time),
  datasets: [
    {
      backgroundColor: "red",
      borderColor: "red",
      label: "Sell",
      // lineTension: 1,
      data: data.map((el: any) => ({ value: el.min, time: el.time })),
    },
    {
      backgroundColor: "blue",
      borderColor: "blue",
      label: "Buy",
      // lineTension: 1,
      data: data2.map((el: any) => ({ value: el.max, time: el.time })),
    },
  ],
});

function prepareChartData(chartData: ChartData<"line", number[], string>) {
  const result = _.cloneDeep(chartData);

  return result;
}

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function ChartComponent() {
  const [fromDate, setFromDate] = useState(
    convertToDateTimeLocalString(new Date(new Date().getTime() - 86400000)),
  );
  const [toDate, setToDate] = useState(
    convertToDateTimeLocalString(new Date(new Date().getTime() + 86400000)),
  );
  const [name, setName] = useState("Gold Coin");
  const [chartData, setChartData] = useState<any>([]);
  const [chartData2, setChartData2] = useState<any>([]);
  const [itemList, setItemList] = useState<any>([]);

  const [type, setType] = useState(1);

  const getData = () => {
    fetch("/api/test", {
      method: "post",
      body: JSON.stringify({
        fromDate: moment(fromDate).utcOffset(3).format(),
        toDate: moment(toDate).utcOffset(3).format(),
        name,
      }),
    }).then(async response => {
      const data = await response.json();

      const sellData = data.filter((el: any) => el.type === 1); // sell
      const buyData = data.filter((el: any) => el.type === 2); // buy

      const sellResult = sellData.reduce(
        (accumulator: any, currentValue: any) => {
          const existIndex = accumulator.findIndex(
            (el: any) => el.time === currentValue.time,
          );

          if (existIndex === -1) {
            accumulator.push({
              time: currentValue.time,
              prices: [currentValue.price],
              min: currentValue.price,
              max: currentValue.price,
            });
          } else {
            accumulator[existIndex].prices.push(currentValue.price);
            accumulator[existIndex].min = Math.min(
              ...accumulator[existIndex].prices,
            );
            accumulator[existIndex].max = Math.max(
              ...accumulator[existIndex].prices,
            );
          }
          return accumulator;
        },
        [],
      );

      const avgSell =
        sellResult.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.min,
          0,
        ) / sellResult.length;

      const buyResult = buyData.reduce(
        (accumulator: any, currentValue: any) => {
          const existIndex = accumulator.findIndex(
            (el: any) => el.time === currentValue.time,
          );

          if (existIndex === -1) {
            accumulator.push({
              time: currentValue.time,
              prices: [currentValue.price],
              min: currentValue.price,
              max: currentValue.price,
            });
          } else {
            accumulator[existIndex].prices.push(currentValue.price);
            accumulator[existIndex].min = Math.min(
              ...accumulator[existIndex].prices,
            );
            accumulator[existIndex].max = Math.max(
              ...accumulator[existIndex].prices,
            );
          }
          return accumulator;
        },
        [],
      );

      const avgBuy =
        buyResult.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.max,
          0,
        ) / buyResult.length;

      console.log("result1.length ", sellResult.length);
      console.log("result2.length ", buyResult.length);

      console.log("avgSell ", avgSell);
      console.log("avgBuy ", avgBuy);

      const filteredSellResult =
        sellResult.length > 100
          ? sellResult.filter((el: any, idx: any) => {
              const nearElement = sellResult[idx + 1] || sellResult[idx - 1];
              return (
                el.min / nearElement.min < 5 &&
                el.min / nearElement.min > 0.2 &&
                idx % Math.round(sellResult.length / 100) === 0
              );
            })
          : sellResult;

      const filteredBuyResult =
        buyResult.length > 100
          ? buyResult.filter((el: any, idx: any) => {
              const nearElement = buyResult[idx + 1] || buyResult[idx - 1];
              return (
                el.max / nearElement.max < 5 &&
                el.max / nearElement.max > 0.2 &&
                idx % Math.round(buyResult.length / 100) === 0
              );
            })
          : buyResult;

      setChartData(filteredSellResult);

      setChartData2(filteredBuyResult);
    });
  };

  console.log("chartData.length ", chartData.length);
  console.log("chartData2.length ", chartData2.length);

  const nivoData = useMemo(
    () => [
      {
        id: "sell",
        data: chartData.map((el: any) => ({ x: el.time, y: el.min })),
      },
      {
        id: "buy",
        data: chartData2.map((el: any) => ({ x: el.time, y: el.max })),
      },
    ],
    [chartData, chartData2],
  );

  const nivoDataBar = useMemo(
    () => [
      {
        id: "buy",
        data: chartData2.map((el: any) => ({ x: el.time, y: el.max })),
      },
      {
        id: "sell",
        data: chartData.map((el: any) => ({ x: el.time, y: el.min })),
      },
    ],
    [chartData, chartData2],
  );

  useEffect(() => {
    getData();
  }, [name, fromDate, toDate]);

  useEffect(() => {
    fetch("/api/test").then(async response => {
      const data = await response.json();
      setItemList(data);
    });
  }, []);

  return (
    <>
      <label htmlFor="fromDate">from: </label>

      <input
        type="datetime-local"
        id="fromDate"
        value={fromDate}
        onChange={e => setFromDate(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="toDate">to: </label>

      <input
        type="datetime-local"
        id="toDate"
        value={toDate}
        onChange={e => setToDate(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="name">name: </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br />
      <br />

      <label>
        Name:
        <select value={name} onChange={e => setName(e.target.value)}>
          {itemList.map((item: any) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <br />
      <br />

      <label>
        Type:
        <select
          name="select"
          value={type}
          onChange={e => setType(Number(e.target.value))}
        >
          <option value={1}>Sell</option>
          <option value={2}>Buy</option>
          <option value={3}>Craft</option>
        </select>
      </label>

      <br />
      <br />

      <button onClick={() => getData()}>get data</button>

      <div style={{ position: "relative", height: "40vh", width: "100vw" }}>
        <ReactChart
          id="chart"
          type="line"
          data={prepareChartData(getDefaultChartData(chartData, chartData2))}
          options={prepareChartOptions("Buggy Chart")}
          height={100}
        />
      </div>
      <div style={{ position: "relative", height: "40vh", width: "100vw" }}>
        {(chartData.length || chartData2.length) && (
          <NivoLine data={nivoData} />
        )}
      </div>
    </>
  );
}
