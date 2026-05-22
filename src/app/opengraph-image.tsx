import { ImageResponse } from "next/og";

export const alt = "Byte Quest - Desenvolvedora de Sites em Barueri";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          BYTE{" "}
          <span style={{ color: "#0047FF", marginLeft: 16 }}>QUEST</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            marginTop: 24,
          }}
        >
          Criação de Sites Profissionais
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#0047FF",
            marginTop: 16,
            textTransform: "uppercase",
            letterSpacing: "4px",
          }}
        >
          Barueri • Alphaville • São Paulo
        </div>
      </div>
    ),
    { ...size }
  );
}
