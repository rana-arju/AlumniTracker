import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (endPoint, token) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    method: "GET",
    url: `https://worrisome-lion-necklace.cyclic.app/api/v1/${endPoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      setLoading(true);
      if (token) {
        const response = await axios.request(options);
        setData(response.data);
        setLoading(false);
        setError("");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    } finally {
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchData();
  }, [token]);
  const refetch = () => {
    if (!token) {
      return;
    }
    setLoading(true);

    fetchData();
  };
  return { data, isLoading, error, refetch };
};

export default useFetch;
