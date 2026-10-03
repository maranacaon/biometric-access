import { Icon } from "../ui/Icon";
import { FingerprintGraphic } from "../ui/FingerprintGraphic";
import { ReaderConnection, ScanState, scanSteps } from "../../features/biometric-reader/types";

type ScanCardProps = {
  state: ScanState;
  step: number;
  connection: ReaderConnection;
  onStart: () => void;
  onReset: () => void;
};

export function ScanCard({ state, step, connection, onStart, onReset }: ScanCardProps) {
  const readerLabel =
    connection === "connecting"
      ? "CONNECTING..."
      : connection === "connected"
        ? "READER CONNECTED"
        : "READER READY";

  return (
    <div className={`scan-card ${state}`}>
      <div className="scan-header">
        <span className="scan-tag">
          <span className="pulse" /> {readerLabel}
        </span>
        <span className="device-name">BIOMETRIC · NS-300</span>
      </div>
      <div className="fingerprint-stage">
        <div className="scan-ring ring-one" />
        <div className="scan-ring ring-two" />
        <div className="fingerprint">
          <FingerprintGraphic />
        </div>
        {state === "reading" && <div className="scan-line" />}
        {state === "success" && (
          <div className="success-badge">
            <Icon name="check" />
          </div>
        )}
      </div>
      <div className="scan-copy">
        {state === "success" && (
          <>
            <h3>Identity confirmed</h3>
            <p>
              Welcome back, <strong>Marina Almeida</strong>.
            </p>
          </>
        )}
        {state === "error" && (
          <>
            <h3>Reader unavailable</h3>
            <p>Check the mock server and try connecting again.</p>
          </>
        )}
        {state !== "success" && state !== "error" && (
          <>
            <h3>{state === "reading" ? scanSteps[step].label : "Tap to start"}</h3>
            <p>
              {state === "reading"
                ? scanSteps[step].hint
                : "Place your finger on the reader to begin."}
            </p>
          </>
        )}
      </div>
      {state === "success" ? (
        <button className="scan-button success-button" onClick={onReset}>
          <Icon name="refresh" /> New validation
        </button>
      ) : (
        <button className="scan-button" onClick={onStart} disabled={state === "reading"}>
          {state === "reading"
            ? "Scan in progress"
            : state === "error"
              ? "Try again"
              : "Connect and start"}{" "}
          <Icon name="arrow" />
        </button>
      )}
      <div className="steps">
        {scanSteps.map((item, index) => {
          const isDone = index < step || state === "success";
          const isCurrent = index === step && state !== "success";

          return (
            <div
              className={`step ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}`}
              key={item.label}
            >
              <span>{isDone ? <Icon name="check" /> : `0${index + 1}`}</span>
              <small>{item.label}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
