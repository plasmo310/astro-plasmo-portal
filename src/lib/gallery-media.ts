// ギャラリー(トップページのセクション / 専用ページ)で共有するクライアント処理。
// 両ページのスクリプトから astro:page-load ごとに呼ばれるため、
// 処理済みの要素には data 属性で印を付けて二重初期化を防ぐ。

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

// src を持った iframe は、その中身の読み込みが終わるまで親ドキュメントの
// load イベントを待たせる。初回ロード時の astro:page-load は window の load
// イベントで発火するため、外部プレイヤー(Apple Music)の読み込みが遅いと
// カードの表示処理まで巻き込まれて遅延する。
// そのため src は HTML に出さず、画面に近づいた時点で JS から設定する。
export function initializeDeferredEmbeds(): void {
  const frames = Array.from(
    document.querySelectorAll("iframe[data-embed-src]"),
  ) as HTMLIFrameElement[];
  const unboundFrames = frames.filter(
    (frame) => frame.dataset.embedBound !== "true",
  );
  if (unboundFrames.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const frame = entry.target as HTMLIFrameElement;
          observer.unobserve(frame);
          const embedSource = frame.dataset.embedSrc;
          if (embedSource) {
            frame.src = embedSource;
          }
        }
      });
    },
    { rootMargin: "600px 0px" },
  );

  unboundFrames.forEach((frame) => {
    frame.dataset.embedBound = "true";
    observer.observe(frame);
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

// サムネイルを YouTube プレイヤーに置き換える。プレイヤーの上に要素を重ねると
// コントロールバー(シークバー等)の操作を妨げるため、何も重ねない。
// クリックでの再生/一時停止は埋め込みプレイヤー自身が備えている。
function activateVideo(facade: HTMLElement): void {
  const embedUrl = facade.dataset.embedUrl;
  if (!embedUrl) {
    return;
  }

  const separator = embedUrl.includes("?") ? "&" : "?";
  const iframe = document.createElement("iframe");
  iframe.src = `${embedUrl}${separator}autoplay=1`;
  iframe.title = facade.getAttribute("aria-label") ?? "";
  iframe.className = "absolute inset-0 h-full w-full";
  iframe.style.border = "0";
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  );
  iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframe.setAttribute("allowfullscreen", "");

  facade.replaceWith(iframe);
}
