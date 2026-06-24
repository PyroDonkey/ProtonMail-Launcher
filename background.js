const PROTONMAIL_URL = "https://mail.proton.me/";
const PROTONMAIL_ORIGIN = "https://mail.proton.me";
const PROTONMAIL_MATCH = "https://mail.proton.me/*";
const MENU_ID = "open-protonmail";
const HOST_PERM = { origins: [PROTONMAIL_MATCH] };

async function openOrSwitchToProtonMail() {
  try {
    // Reading tab URLs needs the host permission. It's optional, so request
    // it on demand. This MUST be the first call in the handler, before any
    // await — Firefox only allows permissions.request() directly from a user
    // gesture (click / command / menu), and an earlier await would consume it.
    // If the permission is already held, request() resolves true with no prompt.
    const granted = await browser.permissions.request(HOST_PERM);

    if (!granted) {
      await browser.tabs.create({ url: PROTONMAIL_URL });
      return;
    }

    // Narrow query: ask the browser to match the URL instead of fetching
    // every tab and filtering in JS.
    const tabs = await browser.tabs.query({ url: PROTONMAIL_MATCH });

    // Exact-origin check guards against false positives the query pattern
    // can't catch, and against tabs whose url we can't read (origin throws).
    const match = tabs
      .filter((tab) => {
        try {
          return new URL(tab.url).origin === PROTONMAIL_ORIGIN;
        } catch {
          return false;
        }
      })
      // Prefer the most recently active ProtonMail tab.
      .sort((a, b) => (b.lastAccessed ?? 0) - (a.lastAccessed ?? 0))[0];

    if (match) {
      await browser.tabs.update(match.id, { active: true });
      await browser.windows.update(match.windowId, { focused: true });
      return;
    }

    await browser.tabs.create({ url: PROTONMAIL_URL });
  } catch (error) {
    console.error("ProtonMail Launcher:", error);
  }
}

browser.action.onClicked.addListener(openOrSwitchToProtonMail);

browser.commands.onCommand.addListener((command) => {
  if (command === "open-protonmail") {
    openOrSwitchToProtonMail();
  }
});

browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === MENU_ID) {
    openOrSwitchToProtonMail();
  }
});

// Event pages restart on demand, so recreate the menu on every load and
// swallow the duplicate-id error if it already exists.
browser.contextMenus.create(
  {
    id: MENU_ID,
    title: "Open ProtonMail",
    contexts: ["action"]
  },
  () => void browser.runtime.lastError
);

// On first install, open ProtonMail so the user gets immediate value
// instead of a pin-instructions notification.
browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    browser.tabs.create({ url: PROTONMAIL_URL });
  }
});
