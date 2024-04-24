import { useState } from "react";

/*
Provide a list of strings to choose from.
When you choose a new item a onSelectItem event occurs
and passes the selected item. This event should be handled by the app
*/
interface Props {
  items: string[];
  className?: string;
  onSelectItem: (item: string) => void;
}

function DropDownButtonWithLabel({ items, onSelectItem, className }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn btn-dark border-2 border-white p-3 fw-bolder"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {items[selectedIndex]}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            className={
              selectedIndex == index ? "dropdown-item active" : "dropdown-item"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropDownButtonWithLabel;
