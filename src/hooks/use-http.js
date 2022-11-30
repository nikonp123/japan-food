import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = useCallback(async (requestOptions, manageData) => {
    setIsLoading(true);
    try {
      const response = await fetch(requestOptions.url, {
        method: requestOptions.method ? requestOptions.method : 'GET',
        headers: requestOptions.headers ? requestOptions.headers : {},
        body: requestOptions.body ? requestOptions.body : null,
      });

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
