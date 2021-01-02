import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

// export function useNavigator({ max, onForward, onBack }) {
//   const [cursor, updateCursor] = useState(0);

//   function up() {
//     let newCursor = cursor - 1;
//     if (newCursor < 0) {
//       newCursor = 0;
//     }
//     updateCursor(newCursor);
//   }

//   function down() {
//     let newCursor = cursor + 1;
//     if (newCursor > max) {
//       newCursor = max;
//     }
//     updateCursor(newCursor);
//   }

//   function onKey({ key }) {
//     switch (key) {
//       case "ArrowUp":
//         up();
//         break;
//       case "ArrowDown":
//         down();
//         break;
//       case "ArrowRight":
//       case "Enter":
//         onForward(cursor);
//         break;
//       case "ArrowLeft":
//         onBack(cursor);
//         break;
//       default:
//         break;
//     }
//   }

//   useEffect(() => {
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   });

//   return {
//     cursor
//   };
// }

export default function Navigator({
  children,
  cursor,
  max,
  onChangeCursor,
  onForward,
  onBack
}) {
  const [enabled, updateEnabled] = useState(false);
  const ref = useRef();

  function up() {
    let newCursor = cursor - 1;
    if (newCursor < 0) {
      newCursor = 0;
    }
    onChangeCursor(newCursor);
  }

  function down() {
    let newCursor = cursor + 1;
    if (newCursor > max) {
      newCursor = max;
    }
    onChangeCursor(newCursor);
  }

  function onKey({ key }) {
    if (!enabled) return;

    switch (key) {
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;
      case "ArrowRight":
      case "Enter":
        onForward(cursor);
        break;
      case "ArrowLeft":
        onBack(cursor);
        break;
      default:
        break;
    }
  }

  function onClick(e) {
    const clickedNavigator = Boolean(e.path.find((el) => el === ref.current));
    updateEnabled(clickedNavigator);
  }

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  });

  return (
    <div ref={ref} className="h-full" onClick={() => updateEnabled(true)}>
      {children}
    </div>
  );
}

Navigator.propTypes = {
  onChangeCursor: PropTypes.func.isRequired
};
