import React from "react";
import { api, apiWithFormData } from "../config/apiConfig";
import { hideError } from "../redux/slices/errorSlice";
import { useDispatch } from "react-redux";

const useReload = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();
    const retryRequest = async (error) => {
        try {
            setIsLoading(true);
            const response = await api.request(error.retryConfig);
            dispatch(hideError());
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, retryRequest }

};

export default useReload;