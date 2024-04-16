import useSWR from "swr";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 11,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 9,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

export function MultiCarousel({}) {
  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/search/trending`;

  const { data: trendingCoinsData, error, mutate } = useSWR(URL, fetcher);

  console.log("TrendingCoinsData : ", trendingCoinsData);
  if (error) return <div>Failed to load coins</div>;
  if (!trendingCoinsData) return <div>Loading...</div>;

  const coinsToDisplay = trendingCoinsData.coins;

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode
      // containerClass="container"
    >
      {coinsToDisplay.map((coin, index) => (
        <div
          key={index}
          style={{
            textAlign: "center",
            border: "1px solid #FF00FF", //#FF00FF
            padding: "1rem",
            borderRadius: "0.5rem",
          }} //bg-pink-100 border border-yellow-700 p-4 rounded-lg
        >
          {/* Assuming coin has properties 'name' and 'link' */}
          {/* <a href={coin.link}>{coin.name}</a> */}
          <Link
            href={`/coins/${coin.item.id}`}

            // className="bg-transparent hover:bg-gray-300"
          >
            <img
              src={coin.item.large}
              alt={coin.item.name}
              height={100}
              width={100}
              style={{
                border: "4px solid transparent",
                borderRadius: "0.5rem",
                transition: "border-color 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#FED7E2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "transparent";
              }} // className="bg-transparent hover:bg-pink-100 p-2"
            />
          </Link>

          <div>
            <p>{coin.item.symbol.toUpperCase()}</p>
            <p
              style={{
                color:
                  coin.item.data.price_change_percentage_24h.aud != null &&
                  coin.item.data.price_change_percentage_24h.aud >= 0
                    ? "green"
                    : "red",
              }}
            >
              {coin.item.data.price_change_percentage_24h.aud.toFixed(2)}%
            </p>
            <p>AU${coin.item.data.price.toFixed(2)}</p>
          </div>
          <div className="items-center">
            <img
              src={coin.item.data.sparkline}
              alt={`${coin.item.data.sparkline}`}
              height={50}
              width={80}
              style={{ margin: "auto" }}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
