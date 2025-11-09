
import axios, { AxiosRequestConfig } from 'axios';

export const simulateAPI = async <T = any>(
    url: string = process.env.EXPO_PUBLIC_API_URL,
    config?: AxiosRequestConfig
): Promise<T> => {
    
    const failureRate = 0.5;
    const delay = 1000;
    const errorMessage = 'Simulated API failure';

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, delay));

    if (Math.random() < failureRate) {
        throw new Error(errorMessage);
    }

    // Make actual axios request
    const response = await axios.get<T>(url, config);
    return response.data;
};