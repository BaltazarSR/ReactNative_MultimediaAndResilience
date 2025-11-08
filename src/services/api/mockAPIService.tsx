
export const simulateAPI = async <T = any>(): Promise<T> => {
    
    const failureRate = 0.5
    const delay = 1000
    const successData = { success: true }
    const errorMessage = 'Simulated API failure'

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, delay));

    if (Math.random() < failureRate) {
        throw new Error(errorMessage);
    }

    return successData as T;
};