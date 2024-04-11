import useSWR from "swr";
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
} from "recharts";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // Adjust the format as needed
};

export function SyncChart() {
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

  const URL = `https://api.coingecko.com/api/v3/coins/${CoinID}/market_chart?vs_currency=${aud}&days=365`;

  const { data: coinHistory, error } = useSWR(URL, fetcher);

  console.log("CoinHistory : ", coinHistory);
  // console.log(error);
  if (error) return <div>Failed to load coinHistorys</div>;
  if (!coinHistory) return <div>Loading...</div>;

  // Extracting data for the charts
  // const chartData = coinHistory.prices.map((priceData) => ({
  //   date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
  //   price: priceData[1], //
  //   // total_volumes: priceData[3],
  // }));
  const chartData = coinHistory.prices.map((priceData, index) => ({
    date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
    price: priceData[1],
    marketCaps: coinHistory.market_caps[index][1],
    totalVolumes: coinHistory.total_volumes[index][1], //using the same index as priceData. Since all three arrays (price, marketCaps, and totalVolumes) are of the same length, using the same index ensures that we're accessing data that corresponds to the same timestamp.
  }));

  console.log("chartdata:", chartData);
  return (
    <div style={{ width: "100%" }}>
      <h1>A demo of synchronized AreaCharts</h1>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={chartData}
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
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>

      <p>Maybe some other content</p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={chartData}
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
          <Tooltip />
          <Line
            type="monotone"
            dataKey="marketCaps"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
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
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalVolumes"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Brush dataKey="date" height={30} stroke="red" gap={1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
