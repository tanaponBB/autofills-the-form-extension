# Form Autofill Helper Extension

A Chrome extension designed to automatically fill form fields on NB management forms, streamlining the testing and data entry process.

## Overview

This extension detects and automatically fills web forms (specifically Vtiger web forms with ID `#__vtigerWebForm_top`) based on the type of script loaded on the page. It supports two form configurations:

- **Split-name forms** (detected via `coresplitnamev5` script)
- **Full-name forms** (detected via `corefullnamev5` script)

## Features

- **Automatic Detection**: Identifies the form type based on loaded scripts
- **Smart Form Filling**: Populates fields with test data appropriate to the detected form structure
- **Manual Trigger**: Includes a popup interface for on-demand form filling
- **Console Logging**: Provides detailed feedback for debugging and verification

## How It Works

The extension operates in two modes:

### Split-Name Mode (`coresplitnamev5`)

Fills the following fields:

- First Name: `NBIT`
- Last Name: `TEST`
- Mobile: `0987654321`
- Email: `nbit@theneighbors.co`

### Full-Name Mode (`corefullnamev5`)

Fills the following fields:

- Full Name (cf_858): `NBIT TEST`
- Mobile: `0987654321`
- Email: `nbit@theneighbors.co`

### Common Fields (Both Modes)

- Budget dropdown (cf_854): Selects the 3rd option
- Checkbox 1: Checked
- Checkbox 2: Unchecked

## Usage

1. **Automatic**: The extension automatically fills forms when a compatible page loads
2. **Manual**: Click the extension icon and press "Fill Form Now" button to trigger autofill on-demand

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The extension icon will appear in your Chrome toolbar

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `activeTab`, `scripting`
- **Target Form**: `#__vtigerWebForm_top`
- **Script Detection**: Checks for `coresplitnamev5` or `corefullnamev5` in loaded scripts

## Files Structure

- `manifest.json` - Extension configuration
- `content.js` - Auto-fill logic that runs on page load
- `popup.html` - Extension popup interface
- `popup.js` - Manual trigger functionality
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons

## Development

This extension is maintained under NB management for internal testing and development purposes.

## Notes

- The extension only activates when it detects the specific Vtiger form structure
- Console logs provide visibility into the detection and filling process
- All form field names and values are configured for NB's specific form structure
