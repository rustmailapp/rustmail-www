const STEP_KEYS = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };

document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];

  const select = (next, { focus = false } = {}) => {
    tabs.forEach((tab) => {
      const selected = tab === next;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !selected;
    });
    if (focus) next.focus();
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => select(tab));
  });

  tablist.addEventListener("keydown", (event) => {
    const step = STEP_KEYS[event.key];
    const jump = { Home: 0, End: tabs.length - 1 }[event.key];
    if (step === undefined && jump === undefined) return;
    event.preventDefault();
    const current = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
    const next = step === undefined ? jump : (current + step + tabs.length) % tabs.length;
    select(tabs[next], { focus: true });
  });
});
