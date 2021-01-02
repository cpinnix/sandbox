import React from "react";

export default function List({ items, onForward, cursor, selected }) {
  const theme = {
    backgroundColor: "bg-gray-100"
  };
  return (
    <ul className={`py-6 min-h-full ${theme.backgroundColor}`}>
      {items.map(({ path, label, name }, index) => (
        <li
          className={`
            px-6
            cursor-pointer
            ${
              cursor === index
                ? "text-black"
                : selected === name
                ? "text-blue-500"
                : "text-gray-600"
            }
            hover:text-black
          `}
          onClick={() => onForward(index)}
          key={path}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
