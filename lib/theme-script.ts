// The key that remembers a visitor's own pick from the theme toggle.
export const THEME_KEY = "theme-choice";

// Runs before paint: the site opens in light mode; dark only if the visitor chose it with the toggle.
export const themeScript = `(function() {
    try {
        var saved = localStorage.getItem("${THEME_KEY}");
        document.documentElement.setAttribute("data-theme", saved === "dark" ? "dark" : "light");
    } catch (e) {
        document.documentElement.setAttribute("data-theme", "light");
    }
})()`;
