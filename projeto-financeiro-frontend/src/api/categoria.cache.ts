import type { CategoriaDTOProcessed } from "../models/categoria";

// ✅ Cache em memória das categorias
const categoriasCache: Map<number, CategoriaDTOProcessed> = new Map();

export function setCategoriaCache(categorias: CategoriaDTOProcessed[]) {
  categoriasCache.clear();
  categorias.forEach((cat) => {
    categoriasCache.set(cat.id, cat);
  });

}

export function getCategoriaById(id: number): CategoriaDTOProcessed | undefined {
  return categoriasCache.get(id);
}

export function getTipoTransacaoByCategoriaId(
  categoriaId: number
): 1 | 2 | null {
  const categoria = categoriasCache.get(categoriaId);
  if (!categoria) {
    console.warn(`⚠️ Categoria ${categoriaId} não encontrada no cache`);
    return null;
  }

  // 1 = Despesa, 2 = Receita, 3 = Ambas
  return categoria.finalidade === 2 ? 2 : 1;
}

export function clearCategoriaCache() {
  categoriasCache.clear();
}