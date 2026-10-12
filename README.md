# Universal PiP

🇧🇷 [Português](#português) · 🇺🇸 [English](#english)

---

## Português

Extensão para navegadores Chromium (Opera, Opera GX, Chrome, Edge, Brave) que coloca **qualquer vídeo em Picture-in-Picture** (janela flutuante), inclusive em sites que não oferecem esse botão e em players dentro de iframes.

### Recursos

- Abre o vídeo em uma janela flutuante com um clique no ícone ou com o atalho **Alt+P**.
- Escolhe automaticamente o vídeo que está tocando (ou o maior da página).
- Encontra vídeos dentro de iframes e de Shadow DOM.
- Remove o bloqueio `disablePictureInPicture` que alguns sites colocam.
- Usa a API nativa de Picture-in-Picture do navegador, que é compatível com conteúdo protegido por DRM.
- Se o navegador exigir um clique direto na página, mostra um botão **"Abrir PiP"** sobre o vídeo por alguns segundos.
- Sem coleta de dados, sem servidores, sem analytics.

### Instalação

**Pela loja:** procure por **Universal PiP** na [loja de extensões do Opera](https://addons.opera.com/extensions/).

**Manualmente (modo desenvolvedor):**

1. Baixe este repositório (**Code → Download ZIP**) e extraia a pasta.
2. Abra `opera://extensions` (ou `chrome://extensions`, `edge://extensions`).
3. Ative o **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação** e selecione a pasta que contém o `manifest.json`.

### Como usar

1. Abra uma página com vídeo e dê play.
2. Clique no ícone da Universal PiP ou pressione **Alt+P**.
3. O vídeo vai para uma janela flutuante. Clique no ícone ou pressione **Alt+P** de novo para fechar.

Para trocar o atalho, acesse `opera://extensions/shortcuts` (ou `chrome://extensions/shortcuts`).

### Sites testados

| Site | Status |
|------|--------|
| YouTube | Funciona |
| Netflix | Funciona |
| Prime Video | Funciona |
| Disney+ | Funciona |
| HBO Max | Funciona |

O funcionamento pode variar de site para site, já que cada um usa um player diferente.

### Limitações conhecidas

- O navegador só permite abrir o PiP após uma ação do usuário (clique ou atalho).
- O PiP nativo geralmente **não mostra legendas** desenhadas pelo site, porque elas são HTML sobreposto e não faixas do `<video>`.
- Os controles da janela flutuante são os do navegador (play/pausa e, quando o site suporta, faixa anterior/próxima).
- Sites que recriam o elemento `<video>` ao trocar de episódio podem exigir abrir o PiP novamente.

### Como funciona

| Arquivo | Função |
|---------|--------|
| `manifest.json` | Manifest V3, permissões, atalho e content script (`all_frames`) |
| `background.js` | Service worker: escuta o clique no ícone e o atalho e envia o comando para a aba |
| `content.js` | Localiza o vídeo, desbloqueia o PiP e chama `requestPictureInPicture()` |

A permissão de acesso a todos os sites é necessária para encontrar vídeos em qualquer página e dentro de iframes. A extensão usa também `activeTab` e `scripting`.

### Privacidade

A extensão roda inteiramente no navegador. Ela **não coleta, armazena nem envia** nenhum dado pessoal ou de navegação e não usa serviços de terceiros.

### Contribuindo

Encontrou um site onde não funciona? Abra uma **issue** informando o site, o navegador e a mensagem que aparece no console (F12) começando com `[UniversalPiP]`.

### Licença

MIT. Veja o arquivo `LICENSE`.

---

## English

A Chromium browser extension (Opera, Opera GX, Chrome, Edge, Brave) that pops **any video** out into a floating **Picture-in-Picture** window, including on sites that don't offer their own PiP button and on players embedded in iframes.

### Features

- Opens the video in a floating window with one click on the toolbar icon or with the **Alt+P** shortcut.
- Automatically picks the video that is playing (or the largest one on the page).
- Finds videos inside iframes and Shadow DOM.
- Removes the `disablePictureInPicture` lock that some sites add.
- Uses the browser's native Picture-in-Picture API, which is compatible with DRM-protected content.
- If the browser requires a direct click on the page, shows an **"Open PiP"** button over the video for a few seconds.
- No data collection, no servers, no analytics.

### Installation

**From the store:** search for **Universal PiP** on the [Opera add-ons catalog](https://addons.opera.com/extensions/).

**Manually (developer mode):**

1. Download this repository (**Code → Download ZIP**) and extract it.
2. Open `opera://extensions` (or `chrome://extensions`, `edge://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the folder that contains `manifest.json`.

### Usage

1. Open a page with a video and press play.
2. Click the Universal PiP icon or press **Alt+P**.
3. The video moves to a floating window. Click the icon or press **Alt+P** again to close it.

To change the shortcut, go to `opera://extensions/shortcuts` (or `chrome://extensions/shortcuts`).

### Tested sites

| Site | Status |
|------|--------|
| YouTube | Works |
| Netflix | Works |
| Prime Video | Works |
| Disney+ | Works |
| HBO Max | Works |

Behavior may vary from site to site, since each one uses a different player.

### Known limitations

- Browsers only allow PiP after a user action (a click or a shortcut).
- Native PiP usually **does not show subtitles** rendered by the site, because they are HTML overlays rather than `<video>` text tracks.
- The floating window uses the browser's own controls (play/pause and, when the site supports it, previous/next track).
- Sites that recreate the `<video>` element when you change episodes may require opening PiP again.

### How it works

| File | Purpose |
|------|---------|
| `manifest.json` | Manifest V3, permissions, shortcut and content script (`all_frames`) |
| `background.js` | Service worker: listens for the icon click and shortcut and messages the tab |
| `content.js` | Finds the video, unlocks PiP and calls `requestPictureInPicture()` |

Access to all sites is required to find videos on any page and inside iframes. The extension also uses `activeTab` and `scripting`.

### Privacy

The extension runs entirely in your browser. It **does not collect, store or send** any personal or browsing data and uses no third-party services.

### Contributing

Found a site where it doesn't work? Open an **issue** with the site, your browser, and the console message (F12) that starts with `[UniversalPiP]`.

### License

MIT. See the `LICENSE` file.
