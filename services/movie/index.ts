import { IMovie, TimeFormat } from "@/types/movie";
import moment from "moment";

export const movies: IMovie[] = [
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

/**
 *
 * @param items : movie data
 * @param keyword : string, use for search
 * @param time : string format HH:mm, use for search by time
 * @returns filtered movies
 */
export const moviesFilter = (
  items: IMovie[],
  keyword: string = "",
  time: string = ""
) => {
  // add vitural field keyword, times for query purpose
  return (
    items
      .map((item) => {
        return {
          ...item,
          keyword: keyword,
          times: item.showings.map((t) => moment(t, TimeFormat)),
        };
      })
      // filter by gern
      .filter((item: IMovie) =>
        item.genres.find((i) => i.toLowerCase().includes(keyword.toLowerCase()))
      )
      // filter by time: the input + 30min is equal or before the time showing
      .filter((i: IMovie) => {
        if (time && moment(`${time}:00`, TimeFormat).isValid()) {
          const inTime = moment(`${time}:00`, TimeFormat);
          const before30Min = inTime.add(+30, "minutes");
          return i.showings.find((t) => {
            const before30m = moment(t, TimeFormat).isSameOrAfter(before30Min);
            return before30m;
          });
        }
        return i;
      })
      .sort((a, b) => a.keyword.localeCompare(b.keyword) || b.rating - a.rating)
  );
};
