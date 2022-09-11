import { useEffect, useReducer } from "react";

const GEO_URL = process.env.REACT_APP_GEO_URL;
// https://api.ipgeolocation.io/ipgeo

const GEO_API_KEY = process.env.REACT_APP_GEO_API;

const options = `continent_code,continent_name,country_code3,country_capital,district,zipcode,is_eu,calling_code,country_tld,languages,country_flag,geoname_id,connection_type,currency,time_zone`;

const initialState = {
  data: undefined,
  isLoading: false,
  isError: false,
};

function ipReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        isLoading: true,
        isError: false,
      };
    case "success":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "failure":
      return {
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
}

function useLocationData(query) {
  const [state, dispatch] = useReducer(ipReducer, initialState);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      dispatch({ type: "loading" });
      let qs;

      if (query === 0) {
        qs = `${GEO_URL}?apiKey=${GEO_API_KEY}&excludes=${options}`;
      } else {
        qs = `${GEO_URL}?apiKey=${GEO_API_KEY}&ip=${query}&excludes=${options}`;
      }

      try {
        const result = await fetch(qs);
        const data = await result.json();

        if (result.status !== 200) {
          throw new Error();
        }

        if (!didCancel) {
          dispatch({ type: "success", payload: data });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: "failure" });
        }
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [query]);

  return state;
}

export default useLocationData;
