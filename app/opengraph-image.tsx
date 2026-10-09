import { ImageResponse } from "next/og";

export const alt = "Pranav Auti — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#e9e9e6",
          color: "#151515",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Pranav Auti</div>
          <div style={{ marginTop: 36, fontSize: 40, lineHeight: 1.25, maxWidth: 900 }}>
            I like building the part where an idea stops being a diagram and starts behaving like a real system.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#5c5c57" }}>
          <div style={{ width: 14, height: 14, background: "#151515" }} />
          <div style={{ width: 120, height: 2, background: "#151515" }} />
          <div style={{ width: 14, height: 14, background: "#151515", marginRight: 24 }} />
          Software engineer · MS Computer Science, Stevens Institute of Technology
        </div>
      </div>
    ),
    size,
  );
}
