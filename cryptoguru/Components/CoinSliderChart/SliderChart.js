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
    if (startIndex >= 2136) {
      setDays(1);
    } else if (startIndex >= 275) {
      setDays(90);
    }
  };

  // const chartData = historicalData?.map((priceData, index) => ({
  //   date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
  //   price: priceData[1],
  //   marketCaps: coinHistory.market_caps[index][1],
  //   totalVolumes: coinHistory.total_volumes[index][1], //using the same index as priceData. Since all three arrays (price, marketCaps, and totalVolumes) are of the same length, using the same index ensures that we're accessing data that corresponds to the same timestamp.
  // }));

  const chartData = coinHistory.prices.map((priceData, index) => ({
    date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
    price: priceData[1],
    marketCaps: coinHistory.market_caps[index][1],
    totalVolumes: coinHistory.total_volumes[index][1], //using the same index as priceData. Since all three arrays (price, marketCaps, and totalVolumes) are of the same length, using the same index ensures that we're accessing data that corresponds to the same timestamp.
  }));

  const dataDisplayed = [...chartData];

  console.log("chartdata:", chartData);
  return (
    <div>
      <h1>A demo of synchronized AreaCharts</h1>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={dataDisplayed}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip labelStyle={{ color: "black" }} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="#8884d8"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <p>Maybe some other content</p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={dataDisplayed}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          {/* domain={[0, "auto"]} */}
          <Tooltip labelStyle={{ color: "black" }} />

          <Line
            type="monotone"
            dataKey="marketCaps"
            stroke="#82ca9d"
            fill="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={dataDisplayed}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip labelStyle={{ color: "black" }} />
          <Area
            type="monotone"
            dataKey="totalVolumes"
            stroke="#82ca9d"
            fill="#82ca9d"
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
