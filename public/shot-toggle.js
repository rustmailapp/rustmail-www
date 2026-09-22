const tablist = document.querySelector('[role="tablist"]');
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll("[data-shot-panel]")];

if (tablist && tabs.length) {
  const select = (theme, { focus = false } = {}) => {
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.shotPanel !== theme;
    });
    tabs.forEach((tab) => {
      const selected = tab.dataset.shot === theme;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => select(tab.dataset.shot));
  });

  tablist.addEventListener("keydown", (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 }[event.key];
    const jump = { Home: 0, End: tabs.length - 1 }[event.key];
    if (step === undefined && jump === undefined) return;
    event.preventDefault();
    const current = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
    const next = step === undefined ? jump : (current + step + tabs.length) % tabs.length;
    select(tabs[next].dataset.shot, { focus: true });
  });
}
