import useSWR from "swr";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  // Legend,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mutate } from "swr";

// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   return date.toLocaleDateString(); // Adjust the format as needed
// };
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
// const CustomYAxisTick = ({ x, y, payload }) => {
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={0}
//         dy={16}
//         textAnchor="end"
//         fill="#666"
//         transform="rotate(-45)"
//       >
//         {payload.value.toLocaleString("en", {
//           notation: "compact",
//           compactDisplay: "short",
//         })}{" "}
//         {/* Change the format as needed */}
//       </text>
//     </g>
//   );
// };

// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

export function SyncChart() {
  const [days, setDays] = useState(365);
  // const [historicalData, setHistoricalData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [didUpdateChartData, setDidUpdateChartData] = useState(false);
  const [didUpdateAgain, setDidUpdateAgain] = useState(false);

  const router = useRouter();
  const { CoinID } = router.query;
  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/${CoinID}/market_chart?vs_currency=${aud}&days=${days}`;

  const { data: coinHistory, error } = useSWR(URL, fetcher);

  // useEffect(() => {
  //   // Update historical data when new data is fetched
  //   console.log("Fetching data...");
  //   if (coinHistory) {
  //     console.log("Updating historicalData...");
  //     setHistoricalData((prevData) => [...prevData, ...coinHistory.prices]);
  //   }
  // }, [coinHistory]);

  console.log("CoinHistory : ", coinHistory);
  // console.log(error);
  useEffect(() => {
    if (coinHistory && coinHistory.prices) {
      setChartData((prevData) =>
        [
          ...prevData,
          ...coinHistory?.prices.map((priceData, index) => ({
            date: formatDate(priceData[0]),
            price: priceData[1],
            marketCaps: coinHistory.market_caps[index][1],
            totalVolumes: coinHistory.total_volumes[index][1],
          })),
        ].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    }
  }, [coinHistory]);

  if (error) return <div>Failed to load coinHistorys</div>;
  if (!coinHistory) return <div>Loading...</div>;
  // if (
  //   !coinHistory ||
  //   !Array.isArray(historicalData) ||
  //   historicalData.length === 0
  // )
  //   return <div>Loading...</div>;

  const handleBrushChange = (value) => {
    const { startIndex, endIndex } = value;

    console.log("currentIndex", startIndex);
    console.log("endIndex", endIndex);
    if (startIndex >= 2136 && !didUpdateAgain) {
      setDays(1);
      mutate(
        URL,
        (prevData) => {
          const newData = prevData.prices.map((priceData, index) => ({
            date: formatDate(priceData[0]),
            price: priceData[1],
            marketCaps: prevData.market_caps[index][1],
            totalVolumes: prevData.total_volumes[index][1],
          }));
          setDidUpdateAgain(true);
          return [...chartData, ...newData];
        },
        false
      ); // Don't revalidate the data
    } else if (startIndex >= 275 && !didUpdateChartData) {
      setDays(90);
      mutate(
        URL,
        (prevData) => {
          const newData = prevData.prices.map((priceData, index) => ({
            date: formatDate(priceData[0]),
            price: priceData[1],
            marketCaps: prevData.market_caps[index][1],
            totalVolumes: prevData.total_volumes[index][1],
          }));
          console.log("NewDATA : ", newData);
          setDidUpdateChartData(true);
          return [...chartData, ...newData];
        },
        false
      );
    }
  };

  // const chartData = historicalData?.map((priceData, index) => ({
  //   date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
  //   price: priceData[1],
  //   marketCaps: coinHistory.market_caps[index][1],
  //   totalVolumes: coinHistory.total_volumes[index][1], //using the same index as priceData. Since all three arrays (price, marketCaps, and totalVolumes) are of the same length, using the same index ensures that we're accessing data that corresponds to the same timestamp.
  // }));

  // const chartData = [
  //   ...coinHistory.prices.map((priceData, index) => ({
  //     date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
  //     price: priceData[1],
  //     marketCaps: coinHistory.market_caps[index][1],
  //     totalVolumes: coinHistory.total_volumes[index][1], //using the same index as priceData. Since all three arrays (price, marketCaps, and totalVolumes) are of the same length, using the same index ensures that we're accessing data that corresponds to the same timestamp.
  //   })),
  // ];

  // const dataDisplayed = [...chartData];
  console.log("DisplayedData:", chartData);
  return (
    <div
      style={{ border: "1px solid pink", padding: "10px", borderRadius: "5px" }}
    >
      <h1 style={{ color: "goldenrod" }}>Price (AU$)</h1>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("en", {
                notation: "compact",
              })
            }
          />
          <Tooltip
            labelStyle={{
              color: "black",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="greenyellow"
            fill="#8884d8"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <h1 style={{ color: "goldenrod" }}>Market Caps (AU$)</h1>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("en", {
                notation: "compact",
                compactDisplay: "short",
              })
            }
          />
          {/* domain={[0, "auto"]} */}
          <Tooltip labelStyle={{ color: "black" }} />

          <Line
            type="monotone"
            dataKey="marketCaps"
            stroke="cyan"
            fill="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <h1 style={{ color: "goldenrod" }}>Total Volume (AU$)</h1>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("en", {
                notation: "compact",
                compactDisplay: "short",
              })
            }
          />
          <Tooltip labelStyle={{ color: "black" }} />
          <Area
            type="monotone"
            dataKey="totalVolumes"
            stroke="magenta"
            fill="purple"
          />
          <Brush
            dataKey="date"
            height={30}
            stroke="red"
            gap={1}
            // x={value}
            onChange={(brush) => handleBrushChange(brush)}
            // onChange={handleSliderChange}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
