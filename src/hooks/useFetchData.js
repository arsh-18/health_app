import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { token } from '../config';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token') || null
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message + '😠');
        }
        setData(result.data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
