// Procura <video> na página, inclusive dentro de Shadow DOM.
function findVideos(root = document) {
  const found = [];
  const visit = (node) => {
    node.querySelectorAll("video").forEach((v) => found.push(v));
    node.querySelectorAll("*").forEach((el) => {
      if (el.shadowRoot) visit(el.shadowRoot);
    });
  };
  visit(root);
  return found;
}

// Escolhe o melhor candidato: o que está tocando; depois, o maior.
function pickVideo() {
  const candidates = findVideos()
    .map((v) => {
      const r = v.getBoundingClientRect();
      const area = r.width * r.height;
      const playing = !v.paused && !v.ended && v.readyState > 2;
      return { v, score: (playing ? 1e9 : 0) + area, area };
    })
    .filter((c) => c.area > 0 && c.v.readyState > 0)
    .sort((a, b) => b.score - a.score);
  return candidates.length ? candidates[0].v : null;
}

// Remove o bloqueio que vários sites colocam.
function unlockPip(video) {
  video.removeAttribute("disablePictureInPicture");
  video.disablePictureInPicture = false;
}

async function openPip(video) {
  unlockPip(video);
  await video.requestPictureInPicture();
}

// Plano B: se o navegador exigir um clique direto na página,
// mostra um botão sobre o vídeo por alguns segundos.
function showFallbackButton(video) {
  const old = document.getElementById("__upip_btn");
  if (old) old.remove();
  const r = video.getBoundingClientRect();
  const btn = document.createElement("button");
  btn.id = "__upip_btn";
  btn.textContent = "Abrir PiP";
  Object.assign(btn.style, {
    position: "fixed",
    top: Math.max(8, r.top + 8) + "px",
    left: Math.max(8, r.left + 8) + "px",
    zIndex: 2147483647,
    padding: "8px 14px",
    font: "600 14px sans-serif",
    color: "#fff",
    background: "#e11d48",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  });
  btn.onclick = async () => {
    try { await openPip(video); } catch (e) { console.warn("[UniversalPiP]", e); }
    btn.remove();
  };
  document.documentElement.appendChild(btn);
  setTimeout(() => btn.remove(), 6000);
}

async function toggle() {
  // Se já há PiP neste frame, fecha.
  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
    return;
  }
  const video = pickVideo();
  if (!video) return; // este frame não tem vídeo utilizável
  try {
    await openPip(video);
  } catch (e) {
    console.warn("[UniversalPiP] falhou:", e.name, e.message);
    if (e.name === "NotAllowedError") showFallbackButton(video);
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === "toggle-pip") toggle();
});
