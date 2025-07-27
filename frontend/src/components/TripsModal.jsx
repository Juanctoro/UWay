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
                        <strong>Salida:</strong> {trip.start_time?.slice(11, 16)}<br />
                        <strong>Fecha:</strong> {trip.start_time?.slice(0, 10)}
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
