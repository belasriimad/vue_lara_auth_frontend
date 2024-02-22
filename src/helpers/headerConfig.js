export const getHeaderConfig = (token) => {
    const config = {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Accept": "application/json",
        }
    }  
    return config;
}