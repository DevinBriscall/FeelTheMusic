import { useState } from "react";

interface Props {
  onMuteChange: (item: boolean) => void;
  label?: string;
  className?: string;
}

function MuteButton({ onMuteChange, label = "", className }: Props) {
  const [mute, setMute] = useState(true);
  return (
    <div>
      {label.length > 0 && <span className="user-select-none">{label}</span>}
      {mute == false ? (
        <i
          className={`bx bx-volume-full display-6 text-white d-flex align-items-center ${className}`}
          onClick={() => {
            setMute(true); //set mute state to true
            onMuteChange(true); // trigger event to be handled by the app
          }}
        ></i>
      ) : (
        <i
          className={`bx bx-volume-mute display-6 text-white d-flex align-items-center ${className}`}
          onClick={() => {
            setMute(false);
            onMuteChange(false);
          }}
        ></i>
      )}
    </div>
  );
}

export default MuteButton;
