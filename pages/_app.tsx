import { useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";
type Movie = {
  name: string;
  rating: number;
  genres: string[];
  showings: string[];
  [name: string]: any;
};
const timeFormat = "HH:mm:ss";
const movies: Movie[] = [
  {
    name: "Moonlight",
    rating: 98,
    genres: ["Drama"],
    showings: ["18:30:00+11:00", "20:30:00+11:00"],
  },
  {
    name: "Zootopia",
    rating: 92,
    genres: ["Action & Adventure", "Animation", "Comedy"],
    showings: ["19:00:00+11:00", "21:00:00+11:00"],
  },
  {
    name: "The Martian",
    rating: 92,
    genres: ["Science Fiction & Fantasy"],
    showings: ["17:30:00+11:00", "19:30:00+11:00"],
  },
  {
    name: "Shaun The Sheep",
    rating: 80,
    genres: ["Animation", "Comedy"],
    showings: ["19:00:00+11:00"],
  },
];

const Home = () => {
  const [gern, setGern] = useState("");
  const [time, setTime] = useState("");
  const [movieItems, setMovieItems] = useState([] as Movie[]);

  const getRecommends = useCallback(async () => {
    const moviesByGern = movies
      // add vitural field keyword, times for query purpose
      .map((item) => {
        return {
          ...item,
          keyword: gern,
          times: item.showings.map((t) => moment(t, timeFormat)),
        };
      })
      // filter by gern
      .filter((item: Movie) =>
        item.genres.find((i) => i.toLowerCase().includes(gern.toLowerCase()))
      )
      // filter by time: the input + 30min is equal or before the time showing
      .filter((i: Movie) => {
        if (time && moment(`${time}:00`, timeFormat).isValid()) {
          const inTime = moment(`${time}:00`, timeFormat);
          const before30Min = inTime.add(+30, "minutes");
          return i.showings.find((t) => {
            const before30m = moment(t, timeFormat).isSameOrAfter(before30Min);
            return before30m;
          });
        }
        return i;
      })
      .sort(
        (a, b) => a.keyword.localeCompare(b.keyword) || b.rating - a.rating
      );
    setMovieItems(moviesByGern);
  }, [time, gern]);

  useEffect(() => {
    if (!time && !gern) {
      setMovieItems(movies);
    }
  }, [time, gern]);

  return (
    <>
      <div>
        {/* input query block  */}
        <input
          placeholder="Enter you genres"
          type={"text"}
          onChange={(e) => setGern(e.target.value)}
        />
        <input
          placeholder="Time: hour:min"
          type={"text"}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={() => getRecommends()}>search</button>
      </div>
      {/* display all  or result after filter  */}
      {movieItems.length > 0 ? (
        <div>
          {movieItems.map((item, ind: number) => {
            return (
              <>
                <ul key={`item-${ind}`}>
                  <li>Name: {item.name}</li>
                  <li>Rating: {item.rating}</li>
                  <li>Genres: {item.genres.join(", ")}</li>
                  <li>Showings: {item.showings.join(", ")}</li>
                </ul>
                {ind < movieItems.length - 1 && <hr />}
              </>
            );
          })}
        </div>
      ) : (
        "no	movie	recommendations"
      )}
    </>
  );
};

export default Home;
