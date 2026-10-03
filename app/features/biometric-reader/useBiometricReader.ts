"use client";

import { useEffect, useRef, useState } from "react";
import { AccessLog, initialAccessLogs, ReaderConnection, ScanState } from "./types";

export function useBiometricReader() {
  const [state, setState] = useState<ScanState>("idle");
  const [step, setStep] = useState(0);
  const [connection, setConnection] = useState<ReaderConnection>("disconnected");
  const [logs, setLogs] = useState<AccessLog[]>(initialAccessLogs);
  const socketRef = useRef<WebSocket | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    socketRef.current?.close();
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  const completeScan = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setState("success");
    setLogs((current) => [
      { time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }), person: "Marina Almeida", status: "Granted" },
      ...current,
    ]);
  };

  const handleReaderStep = (readerStep: number) => {
    if (readerStep === 1 || readerStep === 2) {
      setStep(readerStep);
      setState("reading");
    } else if (readerStep === 3) {
      completeScan();
    }
  };

  const startScan = () => {
    socketRef.current?.close();
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setStep(0);
    setState("reading");
    setConnection("connecting");

    const socket = new WebSocket("ws://localhost:5677");
    socketRef.current = socket;
    timeoutRef.current = window.setTimeout(() => {
      if (socketRef.current !== socket) return;
      socket.close();
      setConnection("disconnected");
      setState("error");
    }, 12000);
    socket.onopen = () => {
      if (socketRef.current === socket) setConnection("connected");
    };
    socket.onmessage = (event) => {
      if (socketRef.current !== socket) return;
      try {
        const payload = JSON.parse(event.data) as { step?: number };
        if (typeof payload.step === "number") handleReaderStep(payload.step);
      } catch {
        setState("error");
      }
    };
    socket.onerror = () => {
      if (socketRef.current !== socket) return;
      setConnection("disconnected");
      setState("error");
    };
  };

  const reset = () => {
    socketRef.current?.close();
    socketRef.current = null;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setStep(0);
    setState("idle");
    setConnection("disconnected");
  };

  return { state, step, connection, logs, startScan, reset };
}
