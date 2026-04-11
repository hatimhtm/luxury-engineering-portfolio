🎯 **What:** The codebase contains multiple instances of anchor tags using `target="_blank"` without the accompanying `rel="noopener noreferrer"` attribute.

⚠️ **Risk:** This introduces a reverse tabnabbing vulnerability, where the newly opened tab can manipulate the original page's `window.opener` object, potentially navigating the user to a malicious site or phishing page.

🛡️ **Solution:** Added `rel="noopener noreferrer"` to all `<a>` tags utilizing `target="_blank"` to ensure the newly opened page cannot access the original window's `window.opener` property.
