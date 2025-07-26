import React, { useEffect, useState } from 'react';
import './styles/UWayScheduleModal.css';
import api from '../api/axiosClient'; // Ajusta si tu ruta es distinta

export default function ScheduleModal({
  isOpen,
  onClose,
  scheduledTime,
  setScheduledTime,
  onConfirm,
  selectedVehicle,
  setSelectedVehicle
}) {
  const [vehicles, setVehicles] = useState([]);

  // Cargar vehículos del usuario al abrir el modal
  useEffect(() => {
    if (!isOpen) return;

    api.get('/vehicles/mine/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => setVehicles(res.data))
      .catch(err => {
        console.error('Error al obtener vehículos', err);
        setVehicles([]);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h5 className="modal-title">Programar viaje</h5>
        </div>

        <div className="modal-body">
          <label>
            Vehículo:
            <select
              className="modal-input"
              value={selectedVehicle}
              onChange={e => setSelectedVehicle(e.target.value)}
              required
            >
              <option value="">Selecciona un vehículo</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>
                  {v.plate}
                </option>
              ))}
            </select>
          </label>

          <label>
            Fecha:
            <input type="date" className="modal-input" />
          </label>

          <label>
            Hora:
            <input
              type="time"
              value={scheduledTime}
              onChange={e => setScheduledTime(e.target.value)}
              className="modal-input"
              required
            />
          </label>
        </div>

        <div className="modal-footer">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-btn confirm" onClick={onConfirm}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
