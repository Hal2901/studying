import { useLocation, useSearchParams } from "react-router-dom";

export const useSearchParamHook = () => {
  const params = useLocation();
  const [searchParams, setSearchParam] = useSearchParams(params.search);

  const setQueries = (keyO: string, value: string) => {
    searchParams.forEach((value, key) => {
      searchParams.set(key, value);
      if (key === keyO) {
        searchParams.delete(keyO);
      }
    });
    searchParams.set(keyO, value);
    searchParams.sort()
    setSearchParam(searchParams);
  };

  const deleteParam = (keyO:string) => {
    searchParams.forEach((value, key) => {
      searchParams.set(key, value);
      if (key === keyO) {
        searchParams.delete(keyO);
      }
    });
    searchParams.sort()
    setSearchParam(searchParams);
  }

  return {
    searchParams,
    setSearchParam,
    setQueries,
    deleteParam,
    ...params
  };
};
