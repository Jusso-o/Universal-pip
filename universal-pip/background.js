// Envia o comando para todos os frames da aba (players ficam em iframes).
function togglePip(tabId) {
  if (!tabId) return;
  chrome.tabs.sendMessage(tabId, { type: "toggle-pip" }).catch(() => {});
}

// Clique no ícone da extensão
chrome.action.onClicked.addListener((tab) => togglePip(tab.id));

// Atalho de teclado (padrão: Alt+P)
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-pip") return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  togglePip(tab && tab.id);
});
