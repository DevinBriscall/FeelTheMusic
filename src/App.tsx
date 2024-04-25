import DropDownButtonWithLabel from "./components/DropDownButtonWithLabel.tsx";
import Header from "./components/Header.tsx";
import MuteButton from "./components/MuteButton.tsx";
import * as Tone from "tone";
import KeyBoardKey from "./components/KeyBoardKey.tsx";
import { useState } from "react";
import {
  keys,
  notes,
  degrees,
  mapDegreeToHalfSteps,
  songs,
  inputModes,
} from "./assets/util.tsx";

let currentKey = "C";
let droneMuted = true;
let keyboardMuted = true;
const drone = new Tone.Synth().toDestination();
const keyboardSynth = new Tone.PolySynth(Tone.AMSynth).toDestination();

export default function App() {
  const [mode, setMode] = useState("Manual");
  const [song, setSong] = useState("Twinkle Twinkle Little Star");
  const [songChosen, setSongChosen] = useState(false);

  const handleSelectedMode = (item: string) => setMode(item);

  const playSong = () => {
    if (song == "Twinkle Twinkle Little Star") {
      keyboardSynth.triggerAttack("E3");
    }
  };

  const handleSelectedSong = (item: string) => {
    setSong(item);
    keyboardSynth.releaseAll();
    if (item != "Choose a Song") {
      setSongChosen(true);
    } else {
      setSongChosen(false);
    }
  };

  const handleSelectedKey = (item: string) => {
    currentKey = item;
    if (!droneMuted) {
      drone.triggerAttack(`${currentKey}3`);
    }
  };

  const handleNoteAttacked = (item: string) => {
    if (!keyboardMuted) {
      //get the current key so we can calculate which note to play back based on scale degree
      const indexOfOne = notes.indexOf(currentKey);
      //we need to check if we passed c so that we can go to the next octave
      const indexOfDesiredNote = (indexOfOne + mapDegreeToHalfSteps[item]) % 12;
      const didWePassC = indexOfDesiredNote < indexOfOne || item == "8";

      //trigger the desired note
      keyboardSynth.triggerAttack(
        `${notes[indexOfDesiredNote]}${didWePassC ? "4" : "3"}`
      );
    }
  };

  const handleNoteReleased = (item: string) => {
    //get the current key so we can calculate which note to play back based on scale degree
    const indexOfOne = notes.indexOf(currentKey);
    //we need to check if we passed c so that we can go to the next octave
    const indexOfDesiredNote = (indexOfOne + mapDegreeToHalfSteps[item]) % 12;
    const didWePassC = indexOfDesiredNote < indexOfOne;

    keyboardSynth.triggerRelease(
      `${notes[indexOfDesiredNote]}${didWePassC ? "4" : "3"}`
    );

    //there is a bug that makes it so that sometimes a note continues playing when all are released.
    //lets check if all are released then stop playing sounds
    const activeKeys = document.querySelectorAll(".activeKey");
    console.log(activeKeys);
    if (activeKeys.length == 1) {
      keyboardSynth.releaseAll();
    }
  };

  const handleDroneMuteChange = (item: boolean) => {
    droneMuted = item;
    //if the app is being muted, end the drone
    if (item) {
      drone.triggerRelease();
    } else {
      drone.triggerAttack(`${currentKey}3`);
    }
  };

  const handleKeyboardMuteChange = (item: boolean) => {
    keyboardMuted = item;
    //if the app is being muted, end the drone
    if (item) {
      keyboardSynth.releaseAll();
    }
  };

  return (
    <div className="p-5">
      <Header />
      <div id="top-buttons-div">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <DropDownButtonWithLabel
              items={inputModes}
              onSelectItem={handleSelectedMode}
              className="me-3"
            />

            <DropDownButtonWithLabel
              items={keys}
              onSelectItem={handleSelectedKey}
            />
          </div>

          <div className="d-flex">
            <MuteButton
              className="me-4"
              label="Drone"
              onMuteChange={handleDroneMuteChange}
            />
            <MuteButton label="Keys" onMuteChange={handleKeyboardMuteChange} />
          </div>
        </div>
      </div>
      <div id="keyboard-div" className="mt-3">
        <div className="container h-100">
          <div className="row h-100">
            {degrees.map((degree) => (
              <KeyBoardKey
                scaleDegree={degree}
                onNoteAttacked={handleNoteAttacked}
                onNoteReleased={handleNoteReleased}
              />
            ))}
          </div>
        </div>
      </div>

      {mode == "Song" && (
        <div className="d-flex mt-2">
          <DropDownButtonWithLabel
            items={songs}
            onSelectItem={handleSelectedSong}
            className="me-2"
          />
          {songChosen && (
            <button className="btn btn-warning" onClick={playSong}>
              Play Full Song
            </button>
          )}
        </div>
      )}
    </div>
  );
}
