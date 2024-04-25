export const keys = ["C", "G", "D", "A", "E", "B", "Gb", "Db", "Ab", "Eb", "Bb", "F"];
export const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
export const degrees = [
  "1",
  "b2",
  "2",
  "b3",
  "3",
  "4",
  "b5",
  "5",
  "b6",
  "6",
  "b7",
  "7",
] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapDegreeToHalfSteps: any = {
  "1": 0,
  b2: 1,
  "2": 2,
  b3: 3,
  "3": 4,
  "4": 5,
  b5: 6,
  "5": 7,
  b6: 8,
  "6": 9,
  b7: 10,
  "7": 11,
  "8": 12,
};

export const songs = [
  "Choose a Song",
  "Twinkle Twinkle Little Star",
  "Mary Had a Little Lamb",
];

export const inputModes = ["Manual", "Song"];