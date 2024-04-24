import { useState } from "react";
import { useEffect } from "react";

interface Props {
  scaleDegree:
    | "1"
    | "b2"
    | "2"
    | "b3"
    | "3"
    | "4"
    | "b5"
    | "5"
    | "b6"
    | "6"
    | "b7"
    | "7";
  onNoteAttacked: (item: string) => void; // passes the scale degree
  onNoteReleased: (item: string) => void; // passes the scale degree
}

const degreesToCSSClass = {
  "1": "one",
  b2: "flat-two",
  "2": "two",
  b3: "flat-three",
  "3": "three",
  "4": "four",
  b5: "flat-five",
  "5": "five",
  b6: "flat-six",
  "6": "six",
  b7: "flat-seven",
  "7": "seven",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lettersToDegrees: any = {
  a: "1",
  w: "b2",
  s: "2",
  e: "b3",
  d: "3",
  f: "4",
  t: "b5",
  g: "5",
  y: "b6",
  h: "6",
  u: "b7",
  j: "7",
  k: "8",
};

function KeyBoardKey({ scaleDegree, onNoteAttacked, onNoteReleased }: Props) {
  const [isActive, setActive] = useState(false);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return; // make sure not to fire over and over when holding the key
    if (lettersToDegrees[e.key.toLowerCase()] === scaleDegree) {
      setActive(true);
      onNoteAttacked(scaleDegree);
    }

    //special case for octave
    if (lettersToDegrees[e.key.toLowerCase()] === "8" && scaleDegree == "1") {
      setActive(true);
      onNoteAttacked("8");
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (lettersToDegrees[e.key.toLowerCase()] === scaleDegree) {
      setActive(false);
      onNoteReleased(scaleDegree);
    }

    //special case for octave
    if (lettersToDegrees[e.key.toLowerCase()] === "8" && scaleDegree == "1") {
      setActive(false);
      onNoteReleased("8");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, false);
    return () => window.removeEventListener("keydown", handleKeyDown, false);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp, false);
    return () => window.removeEventListener("keyup", handleKeyUp, false);
  }, []);

  return (
    <div
      className="col-1 border p-0 m-0 position-relative"
      onMouseDown={() => {
        setActive(true);
        onNoteAttacked(scaleDegree);
      }}
      onMouseUp={() => {
        onNoteReleased(scaleDegree);
        setActive(false);
      }}
      onTouchStart={() => {
        setActive(true);
        onNoteAttacked(scaleDegree);
      }}
      onTouchEnd={() => {
        onNoteReleased(scaleDegree);
        setActive(false);
      }}
      onMouseLeave={() => {
        if (isActive) {
          onNoteReleased(scaleDegree);
          setActive(false);
        }
      }}
    >
      <div
        className={
          isActive
            ? `${degreesToCSSClass[scaleDegree]} activeKey position-absolute bottom-0 w-100 h-100`
            : `${degreesToCSSClass[scaleDegree]} position-absolute bottom-0 w-100`
        }
      >
        <div className="text-center">
          <span className="fw-bolder user-select-none">{scaleDegree}</span>
        </div>
      </div>
    </div>
  );
}

export default KeyBoardKey;
