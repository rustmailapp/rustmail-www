const buttons = document.querySelectorAll(".shot-btn");
const panels = document.querySelectorAll("[data-shot-panel]");

function show(theme) {
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.shotPanel !== theme;
  });
  buttons.forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.shot === theme));
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => show(btn.dataset.shot));
});
