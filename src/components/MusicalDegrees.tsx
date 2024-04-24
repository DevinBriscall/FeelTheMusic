import { useState } from "react";

interface Props {
  onNoteMouseDown: (item: string) => void;
  onNoteMouseUp: () => void;
}

function MusicalDegrees({ onNoteMouseDown, onNoteMouseUp }: Props) {
  const [activeItem, setActiveItem] = useState("0");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const degrees: any = {
    one: "1",
    "flat-two": "b2",
    two: "2",
    "flat-three": "b3",
    three: "3",
    four: "4",
    "flat-five": "b5",
    five: "5",
    "flat-six": "b6",
    six: "6",
    "flat-seven": "b7",
    seven: "7",
  };

  return (
    <div className="container h-100">
      <div className="row h-100">
        {Object.keys(degrees).map((key) => (
          <div
            className="col-1 border p-0 m-0 position-relative"
            onMouseDown={() => {
              onNoteMouseDown(degrees[key]);
              setActiveItem(degrees[key]);
              console.log(degrees[key]);
            }}
            onMouseUp={() => {
              onNoteMouseUp();
              setActiveItem("0");
            }}
            onTouchStart={() => {
              onNoteMouseDown(degrees[key]);
              setActiveItem(degrees[key]);
              console.log(degrees[key]);
            }}
            onTouchEnd={() => {
              onNoteMouseUp();
              setActiveItem("0");
            }}
          >
            <div
              className={
                activeItem == degrees[key]
                  ? `${key} position-absolute bottom-0 w-100 h-100`
                  : `${key} position-absolute bottom-0 w-100`
              }
            >
              <div className="text-center">
                <span className="fw-bolder">{degrees[key]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicalDegrees;
