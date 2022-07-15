import { useCallback, useEffect, useState } from "react";
import { movies, moviesFilter } from "@/services/movie";
import { IMovie } from "@/types/movie";

const Home = () => {
  const [gern, setGern] = useState("");
  const [time, setTime] = useState("");
  const [movieItems, setMovieItems] = useState([] as IMovie[]);

  const getRecommends = useCallback(() => {
    const moviesByGern = moviesFilter(movies, gern, time);
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
