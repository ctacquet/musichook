import { useCallback, useRef, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";

function Search(props) {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const getTrackInfos = (e, track) => {
    e.preventDefault();
    props.setTrack(track);
  };

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative mt-1 p-3">
        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
          onChange={onChange}
          onFocus={onFocus}
          placeholder="Search..."
          type="text"
          value={query}
        />
      </div>
      <div className="h-60 lg:h-96 overflow-y-scroll scrollbar-thumb-black scrollbar-thin align rounded-lg">
        <div className="ml-2 mt-1">
          {active &&
            results &&
            results.length > 0 &&
            results.map(({ id, title, artist, coverLink }) => (
              <div
                key={id}
                className="flex items-center space-x-2 mb-2 last:mb-1 overflow-hidden mr-3"
              >
                <button
                  onClick={(e) => getTrackInfos(e, results[id])}
                  className="w-full p-2 bg-white border hover:bg-purple-500 ring-inset focus:ring-2 focus:ring-purple-600 focus:ring-opacity-75 focus:bg-purple-300 rounded-lg "
                >
                  <div className="select-none text-left">
                    <div className="flex flex-row">
                      <div className="flex items-center">
                        <div className="w-12 h-12 border mr-2">
                          {coverLink && (
                            <Image
                              src={coverLink}
                              className="object-cover z-0"
                              alt=""
                              quality={100}
                              priority="false"
                              width="100%"
                              height="100%"
                              layout="responsive"
                              objectFit="contain"
                            />
                          )}
                        </div>
                        <div className="flex flex-col w-60 lg:w-96">
                          <p className="font-bold truncate">{artist}</p>
                          <p className="font-normal truncate">{title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
