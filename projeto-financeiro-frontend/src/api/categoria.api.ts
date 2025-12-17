import axios from "axios";
import type {  CategoriaCreateDTO, CategoriaUpdateDTO, CategoriaDTOProcessed } from "../models/categoria";
import { processarCategoria } from "../models/categoria";

const BASE_URL = "http://localhost:5127/api/Categoria";

export const getAllCategorias = async (): Promise<CategoriaDTOProcessed[]> => {
  const res = await axios.get(BASE_URL);
  // ✅ Processar todas as categorias para converter finalidade
  return res.data.map(processarCategoria);
};

export const getCategoriaById = async (id: number): Promise<CategoriaDTOProcessed> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  // ✅ Processar a categoria para converter finalidade
  return processarCategoria(res.data);
};

export const createCategoria = async (dto: CategoriaCreateDTO): Promise<CategoriaDTOProcessed> => {
  const res = await axios.post(BASE_URL, dto);
  // ✅ Processar a resposta
  return processarCategoria(res.data);
};

export const updateCategoria = async (
  id: number,
  dto: CategoriaUpdateDTO
): Promise<CategoriaDTOProcessed> => {
  const res = await axios.put(`${BASE_URL}/${id}`, dto);
  // ✅ Processar a resposta
  return processarCategoria(res.data);
};

export const deleteCategoria = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};