import axios from './axios';
import type { CategoriaDTO, CategoriaCreateDTO, CategoriaUpdateDTO } from '../models/categoria';

export const getAllCategorias = async (): Promise<CategoriaDTO[]> => {
  const response = await axios.get("/Categoria");
  return response.data;
};

export const getCategoriaById = async (id: number): Promise<CategoriaDTO> => {
  const response = await axios.get(`/Categoria/${id}`);
  return response.data;
};

export const createCategoria = async (dto: CategoriaCreateDTO): Promise<CategoriaDTO> => {
  const response = await axios.post("/Categoria", dto);
  return response.data;
};

export const updateCategoria = async (id: number, dto: CategoriaUpdateDTO): Promise<CategoriaDTO> => {
  const response = await axios.put(`/Categoria/${id}`, dto);
  return response.data;
};

export const deleteCategoria = async (id: number): Promise<void> => {
  await axios.delete(`/Categoria/${id}`); 
};