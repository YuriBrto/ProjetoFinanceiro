import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:5127/api", // ✅ Ajuste a porta conforme seu backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // ✅ Timeout de 10 segundos
});

// ✅ Interceptor para tratamento de erros global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro retornado pelo servidor (4xx, 5xx)
      console.error("Erro da API:", error.response.data);
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error("Sem resposta do servidor:", error.request);
    } else {
      // Erro ao configurar a requisição
      console.error("Erro na requisição:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;