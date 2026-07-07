// ギャラリー(トップページのセクション / 専用ページ)で共有するクライアント処理。
// 両ページのスクリプトから astro:page-load ごとに呼ばれるため、
// 処理済みの要素には data 属性で印を付けて二重初期化を防ぐ。

// mdi:play-circle と同じパス。astro-icon の <symbol> 共有に依存すると、
// 定義を持つ要素が DOM から消えた際に他のアイコンも消えるため、生の SVG を使う。
const PLAY_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;

let youtubeListenerCount = 0;

export function initializeGalleryReveal(): void {
  const cards = Array.from(
    document.querySelectorAll(".gallery-card"),
  ) as HTMLElement[];
  const unboundCards = cards.filter(
    (card) => card.dataset.revealBound !== "true",
  );
  if (unboundCards.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          observer.unobserve(card);
          card.classList.add("reveal");
          card.addEventListener(
            "animationend",
            () => card.classList.remove("reveal-animating"),
            { once: true },
          );
          card.classList.add("reveal-animating");
        }
      });
    },
    { threshold: 0.1 },
  );

  unboundCards.forEach((card) => {
    card.dataset.revealBound = "true";
    observer.observe(card);
  });
}

// 生の YouTube iframe は初期フレームが真っ黒に描画される環境があるため、
// 初期はサムネイル画像を表示し、クリックで埋め込みプレイヤーを読み込む。
export function initializeVideoFacades(): void {
  const facades = document.querySelectorAll(
    ".video-facade",
  ) as NodeListOf<HTMLElement>;

  facades.forEach((facade) => {
    if (facade.dataset.facadeBound === "true") {
      return;
    }
    facade.dataset.facadeBound = "true";
    facade.addEventListener("click", () => activateVideo(facade), {
      once: true,
    });
  });
}

// サムネイルを YouTube プレイヤーに置き換える。プレイヤーの上(コントロール
// バーを除く)に透明なオーバーレイを重ね、pointer カーソルとクリックでの
// 再生/一時停止の切り替えを提供する。
function activateVideo(facade: HTMLElement): void {
  const embedUrl = facade.dataset.embedUrl;
  const container = facade.parentElement;
  if (!embedUrl || !container) {
    return;
  }

  const separator = embedUrl.includes("?") ? "&" : "?";
  const iframe = document.createElement("iframe");
  iframe.src = `${embedUrl}${separator}autoplay=1&enablejsapi=1`;
  iframe.title = facade.getAttribute("aria-label") ?? "";
  iframe.className = "absolute inset-0 h-full w-full";
  iframe.style.border = "0";
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  );
  iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframe.setAttribute("allowfullscreen", "");

  const playerOrigin = new URL(embedUrl).origin;

  const overlay = document.createElement("button");
  overlay.type = "button";
  overlay.className = "video-toggle-overlay";

  const pausedIndicator = document.createElement("span");
  pausedIndicator.className = "video-paused-indicator";
  pausedIndicator.innerHTML = PLAY_ICON_SVG;
  overlay.appendChild(pausedIndicator);

  let playing = true;

  function updateOverlay(): void {
    overlay.classList.toggle("paused", !playing);
    overlay.setAttribute("aria-label", playing ? "Pause video" : "Play video");
  }

  function postPlayerCommand(command: string): void {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      playerOrigin,
    );
  }

  overlay.addEventListener("click", () => {
    if (playing) {
      postPlayerCommand("pauseVideo");
      playing = false;
    } else {
      postPlayerCommand("playVideo");
      playing = true;
    }
    updateOverlay();
  });

  // プレイヤー側の状態変化(コントロールバー操作など)とオーバーレイを同期する
  youtubeListenerCount += 1;
  const listenerId = `gallery-video-${youtubeListenerCount}`;
  iframe.addEventListener("load", () => {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: listenerId, channel: "widget" }),
      playerOrigin,
    );
  });
  window.addEventListener("message", (messageEvent: MessageEvent) => {
    if (messageEvent.source !== iframe.contentWindow) {
      return;
    }
    if (typeof messageEvent.data !== "string") {
      return;
    }
    let payload: { event?: string; info?: { playerState?: number } };
    try {
      payload = JSON.parse(messageEvent.data);
    } catch {
      return;
    }
    const playerState = payload.info?.playerState;
    if (payload.event === "infoDelivery" && typeof playerState === "number") {
      // 1: 再生中, 3: バッファリング中
      playing = playerState === 1 || playerState === 3;
      updateOverlay();
    }
  });

  updateOverlay();
  facade.replaceWith(iframe);
  container.appendChild(overlay);
}
