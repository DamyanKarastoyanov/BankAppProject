import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";

function Navbar() {
  const [activeItem, setActiveItem] = useState();
  const navigate = useNavigate();
  const handleItemClick = (e, { name }) => {
    if (name === "logout") navigate("/");
    else {
      setActiveItem(name);
      navigate("/" + name);
    }
  };

  return (
    <Menu color="blue" fluid className="navbar">
      <Menu.Menu position="left">
        <Menu.Item
          icon="user"
          content="Акаунт"
          name="account"
          active={activeItem === "account"}
          onClick={handleItemClick}
        />
        <Menu.Item
          icon="servicestack"
          content="Услуги"
          name="services"
          active={activeItem === "services"}
          onClick={handleItemClick}
        />
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item
          icon="call"
          content="Обратна Връзка"
          name="contact"
          active={activeItem === "contact"}
          onClick={handleItemClick}
        />
        <Menu.Item
          icon="setting"
          content="Настройки"
          name="settings"
          active={activeItem === "settings"}
          onClick={handleItemClick}
        />
        <Menu.Item
          icon="log out"
          content="Излизане"
          name="logout"
          active={activeItem === "logout"}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
}
export default Navbar;
