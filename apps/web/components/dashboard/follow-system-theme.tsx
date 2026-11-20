// Rendered only when no theme cookie exists yet. As the first child of the dashboard root it
// runs before anything inside the dashboard is parsed, so the first paint already follows the
// system setting. It reads the setting and writes nothing.
const script =
  "(function(){var root=document.currentScript.parentElement;if(!root.dataset.theme){root.dataset.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}})();";

export function FollowSystemTheme() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed script with no outside input
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
