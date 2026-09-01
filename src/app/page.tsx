"use client";

import dynamic from "next/dynamic";

function BirthdayLoader() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#080f1e",
        gap: "16px",
      }}
    >
      <div style={{ fontSize: "48px" }}>🎂</div>
      <p
        style={{
          color: "#a5b4fc",
          fontFamily: "sans-serif",
          fontSize: "14px",
          letterSpacing: "0.1em",
          margin: 0,
        }}
      >
        Memuat...
      </p>
    </div>
  );
}

const BirthdayApp = dynamic(() => import("@/components/BirthdayApp"), {
  ssr: false,
  loading: BirthdayLoader,
});

export default function Home() {
  return <BirthdayApp />;
}
