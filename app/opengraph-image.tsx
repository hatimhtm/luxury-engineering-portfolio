import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hatim El Hassak, senior product engineer";
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
                    padding: "80px",
                    background: "linear-gradient(120deg, #F4F3EF 0%, #EBEAE6 55%, #DEDCD6 100%)",
                    color: "#1D1E21",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#4A4C52" }}>Hatim El Hassak, senior product engineer</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.04, maxWidth: 980 }}>
                        I build native apps for iPhone, Mac and Android.
                    </div>
                    <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#4A4C52" }}>GoPilates, Hope Assistant, Viral OS, Estelle and more.</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ display: "flex", padding: "14px 26px", borderRadius: 999, background: "#2E4FD6", color: "#fff", fontSize: 26, fontWeight: 700 }}>
                        hatimelhassak.is-a.dev
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
