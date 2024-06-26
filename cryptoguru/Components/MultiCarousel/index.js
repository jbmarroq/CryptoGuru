import useSWR from "swr";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

export function MultiCarousel({}) {
  // const router = useRouter();
  // const { query } = router;

  //   const [favoriteFilms, setFavoriteFilms] = useState([]);
  //   const [showFavorites, setShowFavorites] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [releaseYear, setReleaseYear] = useState(query.releaseYear || 2020); // Reading releaseYear from query object or when user changes state

  // Retrieve favorite films from localStorage on mount
  //   useEffect(() => {
  //     const storedFavoriteFilms = localStorage.getItem("favoriteFilms");
  //     if (storedFavoriteFilms) {
  //       setFavoriteFilms(JSON.parse(storedFavoriteFilms));
  //     }
  //   }, []);
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

  //   const addToFaves = (film) => {
  //     const updatedFavoriteFilms = [...favoriteFilms, film];
  //     setFavoriteFilms(updatedFavoriteFilms);
  //     localStorage.setItem("favoriteFilms", JSON.stringify(updatedFavoriteFilms));
  //   };

  //   const removeFromFaves = (film) => {
  //     const updatedFavoriteFilms = favoriteFilms.filter((f) => f.id !== film.id);
  //     setFavoriteFilms(updatedFavoriteFilms);
  //     localStorage.setItem("favoriteFilms", JSON.stringify(updatedFavoriteFilms));
  //   };
  //   const loadMoreMovies = async (e) => {
  //     e.preventDefault();
  //     const nextPage = fetchedPage + 1;
  //     const nextUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nextPage}&primary_release_year=${releaseYear}&sort_by=popularity.desc`;
  //     try {
  //       const moreFilmsData = await fetcher(nextUrl);
  //       // console.log("morefilms:", moreFilmsData);
  //       mutate(
  //         (currentData) => ({
  //           ...currentData,
  //           results: [...(currentData?.results || []), ...moreFilmsData.results],
  //           page: nextPage,
  //         }),
  //         false
  //       );

  //       console.log("newlist:", films); // Append new films to existing list
  //     } catch (error) {
  //       console.log("Failed to fetch data:", error);
  //     }
  //   };

  //   const handleYearChange = (event) => {
  //     const value = event.target.value;
  //     if (/^\d{0,4}$/.test(value) && parseInt(value) > 1882);
  //     {
  //       const year = parseInt(value);
  //       setReleaseYear(year);
  //       // Update the URL query parameter
  //       if (year.lenght === 4) {
  //         router.push({
  //           pathname: router.pathname,
  //           query: { ...router.query, releaseYear: year },
  //         });
  //       }
  //     }
  //     // setCurrentPage(1); // Reset the page number when the year changes
  //   };

  const coinsToDisplay = trendingCoinsData.coins;

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      // containerClass="container"
    >
      {coinsToDisplay.map((coin, index) => (
        <div key={index} className="text-center">
          {/* Assuming coin has properties 'name' and 'link' */}
          <a href={coin.link}>{coin.name}</a>
          {/* <Link
            className={classes.carouselItem}
            to={`/coins/${coin.id}`}
          ></Link> */}
          <img
            src={coin.item.large}
            alt={coin.item.name}
            className="mx-auto"
            height={100}
            width={100}
          />
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
        </div>
      ))}
    </Carousel>
  );
}
