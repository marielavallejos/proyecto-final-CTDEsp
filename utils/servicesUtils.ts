// export const API_URL = "http://localhost:8080"
export const API_URL = "http://44.202.51.198:8080"
export const URL_DOMAIN = "https://proyecto-final-ctd-esp.vercel.app/login"
// export const URL_DOMAIN = "http://localhost:3000/login"

export const fetchApsi = async (endpoint: string, urlParams?: string) => {
    const url = `${API_URL}/${endpoint}${urlParams || ''}`
    const response = await fetch(url);
    return await response.json();
}

export const fetchApi = async (endpoint: string, data?: { token?: string | null; headers?: Record<string, string>; method?: string; body?: any }) => {
    const url = `${API_URL}/${endpoint}`;
    const response = await fetch(url, {

        mode: "cors",
        headers: data?.headers || {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
            'Access-Control-Request-Method': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            Authorization: data?.token ? `Bearer ${data.token}` : '',
            ...(data?.headers || {}),

        },
        method: data?.method || "GET",
        body: data?.body ? JSON.stringify(data.body) : undefined,
    });
    if (response.status === 204) {
        return response.status;
    }
    return await response.json();
}
