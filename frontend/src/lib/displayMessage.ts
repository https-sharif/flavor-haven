export function displayMessage(message: string): void {
    const dialog = document.createElement("div");
    dialog.textContent = message;
    dialog.style.position = "fixed";
    dialog.style.bottom = "20px";
    dialog.style.right = "20px";
    dialog.style.backgroundColor = "#333";
    dialog.style.color = "#fff";
    dialog.style.padding = "10px 20px";
    dialog.style.borderRadius = "5px";
    dialog.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    dialog.style.opacity = "0";
    dialog.style.transition = "opacity 0.5s ease-in-out";
    document.body.appendChild(dialog);

    requestAnimationFrame(() => {
        dialog.style.opacity = "1";
    });

    setTimeout(() => {
        dialog.style.opacity = "0";
        dialog.addEventListener("transitionend", () => {
            document.body.removeChild(dialog);
        });
    }, 3000);
}