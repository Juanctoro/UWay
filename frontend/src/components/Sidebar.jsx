import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './styles/UWayDashboard.css';

export default function Sidebar({
  open,
  onClose,
  logoText = 'Ugüee',
  tagline = 'Tu campus, tu viaje, a tu ritmo.',
  sections = [],       // Array de secciones: cada sección es { items: [ { label, icon: IconComponent, path?, className? } ] }
  support              // { text: string, button: { icon: IconComponent, label: string, path? } }
}) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar-dashboard ${open ? 'open' : ''}`}>
      <div className="sidebar-header-dashboard">
        <div className="logo-dashboard">
          <span className="logo-dashboard-text">{logoText}</span>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <p className="tagline">{tagline}</p>
      </div>

      {sections.map((section, si) => (
        <React.Fragment key={si}>
          <hr />
          <ul className="menu">
            {section.items.map(({ label, icon: Icon, path, className }, i) => (
              <li
                key={i}
                className={`menu-item ${className || ''}`}
                onClick={() => path && navigate(path)}
              >
                <Icon className="icon" />
                {label}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}

      {support && (
        <>
          <hr />
          <div className="support">
            <p>{support.text}</p>
            <button
              className="contact-button"
              onClick={() => support.button.path && navigate(support.button.path)}
            >
              <support.button.icon className="icon" />
              {support.button.label}
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
