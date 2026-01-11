// src/features/menu/Menu.jsx

import { useLoaderData } from "react-router";
import MenuItem from "./MenuItem";

const Menu = () => {
  const pizzas = useLoaderData(); // array of pizza objects from loader
  return (
    <div className="menu-page">
      <h1>Our Menu</h1>

      <ul className="space-y-2 divide-y divide-stone-200 px-2">
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
