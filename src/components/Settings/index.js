import React from "react";
import PropTypes from "prop-types";

const navigations = [
  { id: "general", name: "設定" },
  { id: "dictionaries", name: "字典" },
];

const Settings = ({ navigation, onNavigate, children }) => {
  const handleNavigation = (event) => {
    event.preventDefault();
    onNavigate(event.target.dataset.navigation);
  };
  return (
    <div className="container-fluid py-3">
      <div className="row">
        <div className="col-4 col-lg-3">
          <nav className="navbar navbar-light bg-light flex-column nav-pills align-items-stretch">
            <span className="navbar-brand">設定</span>
            {navigations.map(({ id, name }) => (
              <a
                key={id}
                href="#"
                className={navigation === id ? "nav-link active" : "nav-link"}
                data-navigation={id}
                onClick={handleNavigation}
              >
                {name}
              </a>
            ))}
          </nav>
        </div>
        <div className="col-8 col-lg-9">{children}</div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  navigation: PropTypes.oneOf(navigations.map((nav) => nav.id)).isRequired,
  onNavigate: PropTypes.func,
  children: PropTypes.node,
};

Settings.defaultProps = {
  onNavigate: () => {},
};

export default Settings;
