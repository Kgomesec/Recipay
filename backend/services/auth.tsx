import axios from "axios";

const API_URL = "http://192.168.15.12:3000"; // coloca o IP do seu backend

export async function loginRequest(email: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
    });

    return response.data;
}
