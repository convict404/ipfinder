import { useState } from "react";
import { SpinnerCircular } from "spinners-react";
import useLocationData from "../hooks/useLocationData";
import IPResult from "./IPResult";

function IPSearch() {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = useLocationData(query);

  function handleLookup(e) {
    e.preventDefault();

    setQuery(e.target.elements.search.value);
  }

  return (
    <>
      <div className="bg-base-200 w-full drop-shadow">
        <div className="p-2">
          <h1 className="text-center text-primary-content text-5xl md:text-6xl">
            IP geoLocator
          </h1>

          <form onSubmit={handleLookup} className="mt-3 flex mx-auto max-w-md">
            <div className="form-control mx-auto">
              <div className="input-group">
                <input
                  id="search"
                  type="search"
                  placeholder="IP Lookup…"
                  className="input input-bordered w-64 lg:w-80 text-xl outline-none"
                />
                <button type="submit" className="btn btn-square btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isError ? (
        <h1 className="text-center text-red-600 text-2xl mt-10">
          Something went wrong, first check IP
        </h1>
      ) : null}

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <SpinnerCircular thickness={150} size={100} />
        </div>
      ) : null}

      {data ? <IPResult locationData={{ data }} /> : null}
    </>
  );
}

export default IPSearch;
