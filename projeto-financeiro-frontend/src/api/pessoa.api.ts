import axios from './axios';
import type { PessoaDTO, PessoaCreateDTO, PessoaUpdateDTO } from '../models/pessoa';

export const getAllPessoas = async (): Promise<PessoaDTO[]> => {
  const response = await axios.get("/Pessoa"); // ✅ Singular
  return response.data;
};

export const getPessoaById = async (id: number): Promise<PessoaDTO> => {
  const response = await axios.get(`/Pessoa/${id}`); // ✅ Singular
  return response.data;
};

export const createPessoa = async (dto: PessoaCreateDTO): Promise<PessoaDTO> => {
  const response = await axios.post("/Pessoa", dto); // ✅ Singular
  return response.data;
};

export const updatePessoa = async (id: number, dto: PessoaUpdateDTO): Promise<PessoaDTO> => {
  const response = await axios.put(`/Pessoa/${id}`, dto); // ✅ Singular
  return response.data;
};

export const deletePessoa = async (id: number): Promise<void> => {
  await axios.delete(`/Pessoa/${id}`); // ✅ Singular
};