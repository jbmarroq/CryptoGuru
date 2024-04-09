// import Slider from "@mui/material/Slider";
// import Box from "@mui/material/Box";

// import useSWR from "swr";
// // import { mutate } from "swr";
// // import Stack from "@mui/material/Stack";
// import { LineChart } from "@mui/x-charts/LineChart";

// import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
// import { useState } from "react";

// const minDistance = 2;
// // const days = 365;

// const endDate = new Date(); // Today's date
// const startDate = new Date(new Date().setDate(endDate.getDate() - 365)); //date 365 days ago

// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   return date.toLocaleDateString(); // Adjust the format as needed
// };

// export function SliderChart() {
//   const [value, setValue] = useState([startDate.getTime(), endDate.getTime()]); // Value for Slider

//   const aud = "aud";
//   const fetcher = (...args) =>
//     fetch(...args, {
//       method: "GET",
//       headers: {
//         "x-cg-demo-api-key": GECKO_API_KEY,
//       },
//     }).then((res) => res.json());

//   const URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=365`;

//   const { data: coinHistory, error, isLoading } = useSWR(URL, fetcher);

//   //   console.log("CoinHistory : ", coinHistory);
//   //   console.log(error);

//   const handleChange = (event, newValue, activeThumb) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (newValue[1] - newValue[0] < minDistance) {
//       if (activeThumb === 0) {
//         const clamped = Math.min(
//           newValue[0],
//           endDate.getTime() - minDistance * 24 * 60 * 60 * 1000
//         ); // Ensure the minimum distance from the end date
//         setValue([clamped, clamped + minDistance * 24 * 60 * 60 * 1000]);
//       } else {
//         const clamped = Math.max(
//           newValue[1],
//           startDate.getTime() + minDistance * 24 * 60 * 60 * 1000
//         ); // Ensure the minimum distance from the start date
//         setValue([clamped - minDistance, clamped]);
//       }
//     } else {
//       setValue(newValue);
//     }
//   };
//   if (error) return <div>Failed to load coinHistorys</div>;
//   if (isLoading) return <div>Loading...</div>;

//   const filteredData = coinHistory.prices.filter((price) => {
//     const priceDate = new Date(price[0]);
//     return priceDate >= new Date(value[0]) && priceDate <= new Date(value[1]);
//   });

//   return (
//     <Box sx={{ width: "90%", padding: "20px" }}>
//       {/* <ScatterChart
//         xAxis={[
//           {
//             label: "x",
//             min: value[0],
//             max: value[1],
//           },
//         ]}
//         series={[{ data }]}
//         height={300}
//         margin={{ top: 10 }}
//       /> */}
//       <LineChart
//         xAxis={[
//           {
//             data: filteredData.map((price) => price[0]),
//             scaleType: "time",
//             valueFormatter: (date) => formatDate(date),
//           },
//         ]} // Convert timestamps to formatted date strings
//         series={[
//           {
//             id: "Bitcoin",
//             label: "price AU$",
//             data: filteredData.map((price) => price[1]),
//             showMark: false,
//             area: false,
//           },
//         ]}
//         height={400}
//         margin={{ top: 5, right: 25, bottom: 80, left: 100 }}
//       />
//       <Slider
//         value={value}
//         onChange={handleChange}
//         // valueLabelDisplay="auto"
//         min={startDate.getTime()}
//         max={endDate.getTime()}
//         // sx={{ mt: 2 }}
//       />
//     </Box>
//   );
// }

// export function SliderChart() {
//   const [value, setValue] = useState([startDate.getTime(), endDate.getTime()]); // Data Values for Slider

//   const aud = "aud";
//   const fetcher = (...args) =>
//     fetch(...args, {
//       method: "GET",
//       headers: {
//         "x-cg-demo-api-key": GECKO_API_KEY,
//       },
//     }).then((res) => res.json());

//   const URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=365`;

//   const { data: coinHistory, error, isLoading } = useSWR(URL, fetcher);

//   //   console.log("CoinHistory : ", coinHistory);
//   //   console.log(error);

//   const handleChange = (event, newValue, activeThumb) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (newValue[1] - newValue[0] < minDistance) {
//       if (activeThumb === 0) {
//         const clamped = Math.min(
//           newValue[0],
//           endDate.getTime() - minDistance * 24 * 60 * 60 * 1000
//         ); // Ensure the minimum distance from the end date
//         setValue([clamped, clamped + minDistance * 24 * 60 * 60 * 1000]);
//       } else {
//         const clamped = Math.max(
//           newValue[1],
//           startDate.getTime() + minDistance * 24 * 60 * 60 * 1000
//         ); // Ensure the minimum distance from the start date
//         setValue([clamped - minDistance, clamped]);
//       }
//     } else {
//       setValue(newValue);
//     }
//   };

//   if (error) return <div>Failed to load coinHistory</div>;
//   if (isLoading) return <div>Loading...</div>;

//   const filteredData = coinHistory.prices.filter((price) => {
//     const priceDate = new Date(price[0]);
//     return priceDate >= new Date(value[0]) && priceDate <= new Date(value[1]);
//   });

//   return (
//     <Box sx={{ width: "90%", padding: "20px" }}>
//       <LineChart
//         sx={{
//           //change left yAxis label styles
//           "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
//             strokeWidth: "0.4",
//             fill: "#EEBC1D",
//           },
//           // change all labels fontFamily shown on both xAxis and yAxis
//           "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
//             fontFamily: "Roboto",
//           },
//           // change bottom label styles
//           "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
//             strokeWidth: "0.5",
//             fill: "#EEBC1D",
//           },
//           // bottomAxis Line Styles
//           "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
//             stroke: "#EEBC1D",
//             strokeWidth: 0.4,
//           },
//           // leftAxis Line Styles
//           "& .MuiChartsAxis-left .MuiChartsAxis-line": {
//             stroke: "#EEBC1D",
//             strokeWidth: 0.4,
//           },
//         }}
//         xAxis={[
//           {
//             data: filteredData.map((price) => price[0]),
//             scaleType: "time",
//             valueFormatter: (date) => formatDate(date),
//           },
//         ]} // Convert timestamps to formatted date strings
//         series={[
//           {
//             id: "Bitcoin",
//             label: "price AU$",
//             data: filteredData.map((price) => price[1]),
//             showMark: false,
//             area: false,
//             // borderColor: "#EEBC1D",
//           },
//         ]}
//         height={400}
//         margin={{ top: 5, right: 25, bottom: 80, left: 100 }}
//         // options={{
//         //   elements: {
//         //     point: {
//         //       radius: 3,
//         //     },
//         //   },
//         // }}
//       />
//       <Slider
//         value={value}
//         onChange={handleChange}
//         // valueLabelDisplay="auto"
//         min={startDate.getTime()}
//         max={endDate.getTime()}
//         size="small"
//         color="secondary"
//       />
//     </Box>
//   );
// }

// export function MinMaxExample() {
//   const [value, setValue] = useState([startDate.getTime(), endDate.getTime()]); // Value for Slider
//   const [days, setDays] = useState(365);
//   const [allCoinHistory, setAllCoinHistory] = useState(null);
//   const aud = "aud";
//   const fetcher = (Url, days = ``) =>
//     fetch(`${Url}${days}`, {
//       method: "GET",
//       headers: {
//         "x-cg-demo-api-key": GECKO_API_KEY,
//       },
//     }).then((res) => res.json());

//   const Url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=${days}`;

//   const {
//     data: coinHistory,
//     error,
//     isLoading,
//   } = useSWR([Url, days], fetcher, {
//     onSuccess: (data) => {
//       setAllCoinHistory(data);
//     },
//   });

//   //   console.log("CoinHistory : ", coinHistory);
//   //   console.log(error);

//   const handleChange = (event, newValue, activeThumb) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (newValue[1] - newValue[0] < minDistance) {
//       if (activeThumb === 0) {
//         const clamped = Math.min(
//           newValue[0],
//           endDate.getTime() - minDistance * 24 * 60 * 60 * 1000
//         ); // Ensure the minimum distance from the end date
//         setValue([clamped, clamped + minDistance * 24 * 60 * 60 * 1000]);
//       } else {
//         const clamped = Math.max(
//           newValue[1],
//           startDate.getTime() + minDistance * 24 * 60 * 60 * 1000
//         ); // Ensure the minimum distance from the start date
//         setValue([clamped - minDistance, clamped]);
//       }
//     } else {
//       setValue(newValue);
//       const timeDiff = newValue[1] - newValue[0];
//       const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//       if (daysDiff <= 1) {
//         setDays(1);
//         mutate(
//           `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=1`,
//           {
//             optimisticData: getCoinHistoryForDays(allCoinHistory.prices, value),
//             revalidate: false,
//           }
//         );
//         console.log("data:", coinHistory);
//       } else if (daysDiff <= 90) {
//         setDays(daysDiff);
//         mutate(
//           `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=${daysDiff}`,
//           {
//             optimisticData: getCoinHistoryForDays(allCoinHistory.prices, value),
//             revalidate: false,
//           }
//         );
//         console.log("data:", coinHistory);
//       } else {
//         return;
//       }
//     }
//   };
//   if (error) return <div>Failed to load coinHistorys</div>;
//   if (isLoading) return <div>Loading...</div>;

//   const filteredData = coinHistory.prices.filter((price) => {
//     const priceDate = new Date(price[0]);
//     return priceDate >= new Date(value[0]) && priceDate <= new Date(value[1]);
//   });

//   return (
//     <Box sx={{ width: "100%", maxWidth: 800 }}>
//       {/* <ScatterChart
//         xAxis={[
//           {
//             label: "x",
//             min: value[0],
//             max: value[1],
//           },
//         ]}
//         series={[{ data }]}
//         height={300}
//         margin={{ top: 10 }}
//       /> */}
//       <LineChart
//         xAxis={[
//           {
//             data: filteredData.map((price) => price[0]),
//             scaleType: "time",
//             valueFormatter: (date) => formatDate(date),
//           },
//         ]} // Convert timestamps to formatted date strings
//         series={[
//           {
//             id: "Bitcoin",
//             label: "price AU$",
//             data: filteredData.map((price) => price[1]),
//             showMark: false,
//             area: false,
//           },
//         ]}
//         height={400}
//       />
//       <Slider
//         value={value}
//         onChange={handleChange}
//         // valueLabelDisplay="auto"
//         min={startDate.getTime()}
//         max={endDate.getTime()}
//         // sx={{ mt: 2 }}
//       />
//     </Box>
//   );
// }

// Helper function to get the coin history for the selected days
// function getCoinHistoryForDays(allCoinHistory, value) {
//   return allCoinHistory.filter((price) => {
//     const priceDate = new Date(price[0]);
//     return priceDate >= new Date(value[0]) && priceDate <= new Date(value[1]);
//   });
// }
// export function MinMaxExample2() {
//   const [value, setValue] = useState([startDate.getTime(), endDate.getTime()]); // Value for Slider
//   //   const [timeseries, setTimeseries] = useState([]);
//   const aud = "aud";

//   const fetcher = (...args) =>
//     fetch(...args, {
//       method: "GET",
//       headers: {
//         "x-cg-demo-api-key": GECKO_API_KEY,
//       },
//     }).then((res) => res.json());

//   const getUrl = (days) =>
//     `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=${days}`;

//   const {
//     data: coinHistory,
//     error,
//     isLoading,
//     mutate,
//   } = useSWR(getUrl(365), fetcher, {
//     revalidateOnFocus: false, // Disable revalidation on focus, as we're handling it manually
//   });

//   const handleChange = (event, newValue, activeThumb) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (newValue[1] - newValue[0] < minDistance) {
//       if (activeThumb === 0) {
//         const clamped = Math.min(
//           newValue[0],
//           endDate.getTime() - minDistance * 24 * 60 * 60 * 1000
//         );
//         setValue([clamped, clamped + minDistance * 24 * 60 * 60 * 1000]);
//       } else {
//         const clamped = Math.max(
//           newValue[1],
//           startDate.getTime() + minDistance * 24 * 60 * 60 * 1000
//         );
//         setValue([clamped - minDistance, clamped]);
//       }
//     } else {
//       setValue(newValue);
//       const timeDiff = newValue[1] - newValue[0];
//       const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//       if (daysDiff <= 1) {
//         mutate(getUrl(1), {
//           optimisticData: [...filteredData],
//           revalidate: false,
//         });
//       } else if (daysDiff <= 90) {
//         mutate(getUrl(daysDiff), {
//           optimisticData: [...filteredData],
//           revalidate: false,
//         });
//       } else {
//         mutate(getUrl(daysDiff), {
//           optimisticData: [...filteredData],
//           revalidate: false,
//         });
//       }
//     }
//   };

//   if (error) return <div>Failed to load coinHistorys</div>;
//   if (!coinHistory) return <div>Loading...</div>;

//   const filteredData = coinHistory.prices.filter((price) => {
//     const priceDate = new Date(price[0]);
//     return priceDate >= new Date(value[0]) && priceDate <= new Date(value[1]);
//   });
//   //   setTimeseries(filteredData);

//   return (
//     <Box sx={{ width: "100%", maxWidth: 800 }}>
//       <LineChart
//         xAxis={[
//           {
//             data: filteredData.map((price) => price[0]),
//             scaleType: "time",
//             label: "date",
//             valueFormatter: (date) => formatDate(date),
//           },
//         ]}
//         series={[
//           {
//             id: "Bitcoin",
//             label: "price AU$",
//             data: filteredData.map((price) => price[1]),
//             showMark: false,
//           },
//         ]}
//         height={400}
//       />
//       <Slider
//         value={value}
//         onChange={handleChange}
//         min={startDate.getTime()}
//         max={endDate.getTime()}
//       />
//     </Box>
//   );
// }
