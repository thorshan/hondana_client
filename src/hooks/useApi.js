import { useContext } from "react";
import LoadingContext from "../context/LoadingContext";

export const useApi = () => {
  const { setLoading, showError } = useContext(LoadingContext);

  const callApi = async (apiFunc, ...args) => {
    setLoading(true);
    try {
      const data = await apiFunc(...args);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      showError(err.response?.data?.message || "Something went wrong");
      throw err;
    }
  };

  return { callApi };
};
