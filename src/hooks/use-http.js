import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = useCallback(async (requestOptions, manageData) => {
    const sleep = (m) => new Promise((r) => setTimeout(r, m));

    async function fetchWithTimeout(resource, options = {}) {
      const { timeout = 4000 } = options;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      await sleep(1000);
      const res = await fetch(resource, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return res;
    }

    setIsLoading(true);

    try {
      //   await sleep(3000);
      const response = await fetchWithTimeout(requestOptions.url, {
        method: requestOptions.method ? requestOptions.method : 'GET',
        headers: requestOptions.headers ? requestOptions.headers : {},
        body: requestOptions.body ? requestOptions.body : null,
        timeout: 2000,
      });

      // const response = await fetch(
      // requestOptions.url,
      //     {
      //     method: requestOptions.method ? requestOptions.method : 'GET',
      //     headers: requestOptions.headers ? requestOptions.headers : {},
      //     body: requestOptions.body ? requestOptions.body : null,
      //     }
      // );
      //   console.log(response);

      if (!response.ok) {
        throw new Error('Something wrong! Error: ' + response.status);
      }

      const data = await response.json();
      manageData(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendHttpRequest,
  };
};

export default useHttp;
