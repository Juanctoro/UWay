import axios from 'axios';

const API_URL = 'http://192.168.1.5:8000/trips/'; // Cambia por tu endpoint real

export async function crearViaje({ 
  vehicle, // id del vehículo (puedes mockearlo)
  start_point, // { type: "Point", coordinates: [lon, lat] }
  end_point,   // { type: "Point", coordinates: [lon, lat] }
  waypoints = [], // array de [lon, lat], opcional
  start_time   // string ISO opcional
}) {
  const payload = {
    vehicle,
    start_point,
    end_point,
    waypoints,
    start_time
  };

  // Elimina campos vacíos para evitar errores de validación
  Object.keys(payload).forEach(key => (payload[key] == null || payload[key].length === 0) && delete payload[key]);

  try {
    const res = await axios.post(API_URL, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
  } catch (err) {
    // Si el backend retorna error, muestra el detalle
    throw err.response?.data || err.message;
  }
}