export const themeScript = `(function() {
    try {
        var saved = localStorage.getItem("theme");
        if (saved) {
            document.documentElement.setAttribute("data-theme", saved);
        }
    } catch (e) {}
})()`;
