import { useState, useEffect } from 'react';
import ax from '../axios/axios';

export function useAxiosGet({ url, config = null }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  if (config != null) {
    config = JSON.stringify(config); // This is done so useEffect doesnt keep gettting called (string stays same on rerender object wont)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await ax.get(url, JSON.parse(config));
        setResponse(resp.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return [response, error, isLoading];
}

export function useAxiosPost({ url, body = null, config = null }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  if (config != null) {
    config = JSON.stringify(config);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await ax.get(url, body, config);
        setResponse(resp.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, body, config]);

  return [response, error, isLoading];
}
