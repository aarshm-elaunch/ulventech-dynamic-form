/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'https://ulventech-react-exam.netlify.app/api'; // Replace with your API base URL

type HttpMethod = 'get' | 'post';

interface UseAxiosOptions extends AxiosRequestConfig {
  method: HttpMethod;
  data?: any; // Add a data property to the UseAxiosOptions interface
}

function useAxios<T>(endpoint: string, options: UseAxiosOptions = {
    method: 'get'
}): {
  data: any | null;
  loading: boolean;
  error: any;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { method = 'get', data: requestData, ...requestConfig } = options; // Destructure data from options
        const response: AxiosResponse<T> = await axios[method](`${BASE_URL}/${endpoint}`, requestData, requestConfig); // Pass requestData as the third argument
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useAxios;