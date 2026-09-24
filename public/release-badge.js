const RELEASES_API = "https://api.github.com/repos/rustmailapp/rustmail/releases/latest";
const RELEASE_FETCH_TIMEOUT_MS = 5000;

const badge = document.querySelector("[data-release-badge]");
const label = badge?.querySelector("[data-release-tag]");

if (badge && label) {
  try {
    const response = await fetch(RELEASES_API, {
      signal: AbortSignal.timeout(RELEASE_FETCH_TIMEOUT_MS),
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub releases API answered ${response.status}`);
    const { tag_name: tag } = await response.json();
    if (typeof tag !== "string" || tag.length === 0) {
      throw new Error("GitHub releases API answered without a tag_name string");
    }
    label.textContent = tag;
    badge.hidden = false;
  } catch (error) {
    console.warn(`Release badge omitted: ${error.message}`);
  }
}
