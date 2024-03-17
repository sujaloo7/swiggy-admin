import { useState, useEffect } from "react";
import axios from "axios";
// import { toast } from "react-toastify";

const useRequest = () => {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const BASEURL = "http://localhost:5000/api";

  const startFetching = () => {
    setResponse(null);
    setError(null);
  };

  const clear = () => {
    setResponse(null);
    setError(null);
  };

  const fetchedData = () => {
    setError(null);
  };

  const request = (method, url, data) => {
    let access_token = localStorage.getItem("access_token");

    let config;

    if (access_token) {
      config = {
        method,
        url: `${BASEURL}/${url}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data,
      };
    } else {
      config = {
        method,
        url: `${BASEURL}/${url}`,
        data,
      };
    }

    startFetching();

    axios(config)
      .then((res) => {
        fetchedData();
        setResponse(res.data);
      })
      .catch((err) => {
        fetchedData();
        if (err.response) {
          if (err.response.status === 401) {
            console.log("you are logout");
          } else if (err.response.status === 502) {
            console.error("Oops!! Unusual error occurred");
          } else {
            console.error(err.response.data.message);
          }
        } else if (err.request) {
          console.error("Slow Network Speed. Try Again later.");
        } else {
          console.error("Oops!! Unusual error occurred");
        }
      });
  };
  return {
    request,
    clear,
    response,
  };
};
export default useRequest;
