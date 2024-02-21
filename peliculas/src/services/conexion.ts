export async function buscar(nombre: string): Promise<any[]> {
    const response = await fetch(`http://www.omdbapi.com/?s=${nombre}&apikey=19f8a30e`);
    const respuesta = await response.json();
    return respuesta.Search;
}

export async function buscarID(id: string): Promise<any> {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=19f8a30e`);
    const respuesta = await response.json();
    return respuesta;
}
