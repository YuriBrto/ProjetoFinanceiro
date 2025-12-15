import axios from './axios';
import type { TransacaoDTO, TransacaoCreateDTO, TransacaoUpdateDTO } from '../models/transacao';

export const getAllTransacoes = async (): Promise<TransacaoDTO[]> => {
  const response = await axios.get("/Transacao"); // ✅ Singular
  return response.data;
};

export const getTransacaoById = async (id: number): Promise<TransacaoDTO> => {
  const response = await axios.get(`/Transacao/${id}`); // ✅ Singular
  return response.data;
};

export const createTransacao = async (dto: TransacaoCreateDTO): Promise<TransacaoDTO> => {
  const response = await axios.post("/Transacao", dto); // ✅ Singular
  return response.data;
};

export const updateTransacao = async (id: number, dto: TransacaoUpdateDTO): Promise<TransacaoDTO> => {
  const response = await axios.put(`/Transacao/${id}`, dto); // ✅ Singular
  return response.data;
};

export const deleteTransacao = async (id: number): Promise<void> => {
  await axios.delete(`/Transacao/${id}`); // ✅ Singular
};