import { useEffectOnce } from "@lukasbriza/lbui-lib";
import { useState } from "react";

export const useServerData = <E, T>(fetcher: (props?: T) => () => Promise<E>, props?: T) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<E | undefined>(undefined);

  useEffectOnce(() => {
    setLoading(true);
    const call = fetcher(props);
    call()
      .then((value) => {
        setData(value);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const reFetch = async () => {
    setLoading(true);
    const call = fetcher(props);
    const response = await call();
    setData(response);
    setLoading(false);
    return response;
  };

  return {
    loading,
    data,
    reFetch,
  };
};

export const useServerdataLazy = <E, T>(fetcher: (props?: E) => () => Promise<T | undefined>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const fetchCall = async (props?: E) => {
    setLoading(true);
    const response = await fetcher(props)();
    setData(response);
    setLoading(false);
    return response;
  };
  return { fetchCall, loading, data };
};
