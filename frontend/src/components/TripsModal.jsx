import React from 'react';
import './styles/TripsModal.css'; // Asegúrate de crear este archivo

export default function TripsModal({ isOpen, onClose, trips, onStartTrip, onCancelTrip }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box-trips">
        <div className="modal-header">
          <h5 className="modal-title">Mis viajes programados</h5>
        </div>

        <div className="modal-body">
          {trips.length === 0 ? (
            <p>No tienes viajes programados.</p>
          ) : (
            <ul className="trip-list">
              {trips.map((trip, idx) => (
                <li key={idx} className="trip-item">
                  <div>
                    <div>
                      <strong>Salida:</strong>{" "}
                      {new Date(trip.start_time).toLocaleTimeString('es-CO', {
                        timeZone: 'America/Bogota',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}<br />
                      <strong>Fecha:</strong>{" "}
                      {new Date(trip.start_time).toLocaleDateString('es-CO', {
                        timeZone: 'America/Bogota'
                      })}
                    </div>
                  </div>
                  <button
                    onClick={() => onStartTrip(trip)}
                    className="modal-btn confirm"
                  >
                    Iniciar viaje
                  </button>
                  <button
                    onClick={() => onCancelTrip(trip)}
                    className="modal-btn confirm"
                  >
                    Cancelar viaje
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn cancel" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
