import axios from 'axios';

export async function direccionATupla(direccion) {
  if (!direccion) throw new Error('Dirección vacía');

  const url = `https://nominatim.openstreetmap.org/search`;
  try {
    const res = await axios.get(url, {
      params: {
        q: direccion,
        format: 'json',
        addressdetails: 1,
        limit: 1,
        countrycodes: 'co',
      },
      headers: {
        'Accept-Language': 'es',
        'User-Agent': 'UWayApp/1.0' // recomendable para Nominatim
      }
    });
    if (res.data && res.data.length > 0) {
      // Nominatim da lat/lon en strings
      const { lon, lat } = res.data[0];
      return [parseFloat(lon), parseFloat(lat)]; // Formato [lon, lat]
    } else {
      throw new Error('No se encontraron coordenadas para esa dirección');
    }
  } catch (e) {
    throw new Error('Error geocodificando: ' + e.message);
  }
}