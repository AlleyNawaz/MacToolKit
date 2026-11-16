"use client"

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#08090b",
          color: "#f4f4f5",
          fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 440,
            padding: 32,
            textAlign: "center",
            background: "#0e1116",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontFamily: "ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#f59e0b",
              fontWeight: 600,
            }}
          >
            Fatal Exception
          </div>
          <h1 style={{ fontSize: 22, margin: "8px 0 0", fontWeight: 600 }}>Alloy could not initialize</h1>
          <p style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.6, margin: "8px 0 0" }}>
            The application shell failed to bootstrap. Reattempt initialization.
          </p>
          <button
            type="button"
            onClick={retry}
            style={{
              marginTop: 20,
              padding: "8px 16px",
              border: 0,
              borderRadius: 8,
              background: "#f4f4f5",
              color: "#08090b",
              fontSize: 12,
              fontFamily: "ui-monospace, monospace",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Retry bootstrap
          </button>
        </div>
      </body>
    </html>
  )
}
