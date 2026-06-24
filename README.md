# ProtonMail Launcher Extension

ProtonMail Launcher is a simple Firefox extension that allows you to quickly open ProtonMail from the toolbar. If ProtonMail is already open in a tab, it will switch to that tab instead of opening a new one.

## Features

- Open ProtonMail with a single click from the toolbar.
- Automatically switches to an existing ProtonMail tab if one is already open. If several are open, it switches to the most recently used one and focuses its window.
- Optional keyboard shortcut to open or switch to ProtonMail (assign your own — see Usage).
- Opens ProtonMail automatically on first install.

## Installation

### From Mozilla Add-ons Store

1. Visit the [Mozilla Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/protonmail-simple-launcher/).
2. Click "Add to Firefox" to install the extension.

### Manual Installation

1. Download the latest release of the extension (`.xpi` file) from the [Releases](https://github.com/PyroDonkey/ProtonMail-Launcher/releases/tag/extension) section.
2. Open Firefox and navigate to `about:addons`.
3. Click the gear icon (⚙️) and select "Install Add-on From File...".
4. Select the downloaded `.xpi` file to install the extension.

## Usage

1. After installation, you will see the ProtonMail Launcher icon in your toolbar.
2. Click the icon to open ProtonMail. If ProtonMail is already open in a tab, it will switch to that tab.
3. The first time you use it, Firefox will ask permission to access `mail.proton.me`. This is required so the extension can detect and switch to an existing ProtonMail tab. Click **Allow**. If you decline, the extension will simply open a new tab each time instead of switching.
4. To pin the icon to the toolbar, click the Firefox Extensions icon (puzzle piece), right-click on "ProtonMail Launcher", and select "Pin to Toolbar".

> To set a keyboard shortcut, go to `about:addons` → gear icon (⚙️) → **Manage Extension Shortcuts**, and assign a key combination to "Open or switch to ProtonMail". No shortcut is set by default.
