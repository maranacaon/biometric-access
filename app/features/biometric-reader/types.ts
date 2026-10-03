export type ScanState = "idle" | "reading" | "success" | "error";
export type ReaderConnection = "disconnected" | "connecting" | "connected";
export type AccessStatus = "Granted" | "Denied";
export type AccessLog = { time: string; person: string; status: AccessStatus };

export const scanSteps = [
  { label: "First scan", hint: "Place your finger on the sensor" },
  { label: "Second scan", hint: "Lift and place your finger again" },
  { label: "Confirmation", hint: "One more scan to verify" },
];

export const initialAccessLogs: AccessLog[] = [
  { time: "14:32:08", person: "Marina Almeida", status: "Granted" },
  { time: "14:29:41", person: "Rafael Nunes", status: "Granted" },
  { time: "14:24:16", person: "Unidentified scan", status: "Denied" },
];
