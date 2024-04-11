// import { CandlestickChartExample } from "@/Components/CandleStickChart/CandleStickChart";
import { SyncChart } from "@/Components/CoinSliderChart/SliderChart";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import { Typography, Grid, Container, Card } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
// import Link from "next/link";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function cleanText(text) {
  // Remove HTML tags
  const cleanedText = text.replace(/<[^>]+>/g, "");
  // Replace special characters
  const cleanedTextWithoutSpecialChars = cleanedText.replace(/&[^\s]*;/g, "");
  // Trim excess whitespace
  const finalText = cleanedTextWithoutSpecialChars.trim();
  return finalText;
}

export default function CoinDetails() {
  const router = useRouter();
  const { CoinID } = router.query;
  console.log("router query", router.query);

  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/${CoinID}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;

  const { data: coinInfo, error } = useSWR(CoinID ? URL : null, fetcher);
  console.log("coin Details:", coinInfo);

  if (!coinInfo && !error) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;

  // Extract release year from the query parameter
  //   const releaseYear = router.query.releaseYear; //
  //   const coin = coinInfo;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <img
          src={coinInfo?.image.large}
          alt={coinInfo?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3">{coinInfo?.name}</Typography>
        <Typography variant="subtitle1">
          Genesis Date: {coinInfo?.genesis_date}
        </Typography>
        <div>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {numberWithCommas(coinInfo?.market_data.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              AU${" "}
              {numberWithCommas(
                coinInfo?.market_data.current_price.aud.toFixed(2)
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Market Cap:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              AU${" "}
              {numberWithCommas(
                coinInfo?.market_data.market_cap.aud.toFixed(2)
              )}
              M
            </Typography>
          </span>
        </div>
        <Typography variant="subtitle1">
          {cleanText(coinInfo?.description.en)}
        </Typography>
      </Grid>
      <Grid item xs={6} md={8}>
        <SyncChart />
      </Grid>
    </Grid>
  );
}
{
  /* <Link href={`/films?releaseYear=${releaseYear}`}>Back to Dashboard</Link> */
}
