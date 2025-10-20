const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token) {
    localStorage.setItem("token", token);
}

export function clearToken() {
    localStorage.removeItem("token");
}
export async function api(path, options = {}) {
    const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        ...(options.headers || {}),
    };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
        const res = await fetch(`${API_URL}${path}`, { ...options, headers })
        console.log(res)
        console.log(123)
        if (!res.ok) {
            const data = await res.json();
            return {
                error: true,
                message: data.message,
            }
        }
        if (res.status === 204) return null;
        return res.json();
    }
    catch (err) {
        console.error(err);
    }
}