// vehicleService.js

const API_URL = 'http://192.168.1.5:8000/vehicles/';

const vehicleService = {
  // Obtiene un vehículo por su ID
  async getVehicleById(id, token) {
    const response = await fetch(`${API_URL}${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    if (!response.ok) throw new Error('No se pudo obtener el vehículo');
    return response.json();
  },
};

export default vehicleService;
