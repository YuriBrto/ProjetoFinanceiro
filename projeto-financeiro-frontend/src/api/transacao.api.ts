import axios from "axios";
import type {
  TransacaoResponseDTO,
  TransacaoCreateDTO,
  TransacaoUpdateDTO,
} from "../models/transacao";

const BASE_URL = "http://localhost:5127/api/Transacao";

export const getAllTransacoes = async (): Promise<TransacaoResponseDTO[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getTransacaoById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const createTransacao = async (dto: TransacaoCreateDTO) => {
  const res = await axios.post(BASE_URL, dto);
  return res.data;
};

export const updateTransacao = async (id: number, dto: TransacaoUpdateDTO) => {
  const res = await axios.put(`${BASE_URL}/${id}`, dto);
  return res.data;
};

export const deleteTransacao = async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
