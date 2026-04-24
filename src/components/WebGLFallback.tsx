export function WebGLFallback() {
  return (
    <main className="fallback-screen">
      <div className="fallback-panel">
        <h1>WebGL Required</h1>
        <p>
          WRLD ONE GATE requires GPU acceleration and WebGL support. If this device is in low-power
          mode, enable hardware acceleration or try a modern browser (Chrome, Edge, Safari, or
          Firefox).
        </p>
      </div>
    </main>
  );
}
