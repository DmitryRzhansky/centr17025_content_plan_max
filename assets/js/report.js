(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function setupNav() {
    const sidebar = $("#sidebar");
    const menuToggle = $("#menu-toggle");
    const backdrop = $("#drawer-backdrop");
    const setOpen = (open) => {
      if (!sidebar || !menuToggle || !backdrop) return;
      sidebar.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      backdrop.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
    };

    menuToggle?.addEventListener("click", () => setOpen(!sidebar.classList.contains("is-open")));
    backdrop?.addEventListener("click", () => setOpen(false));
    $$('.sidebar__nav a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    const navLinks = $$('.sidebar__nav a[href^="#"]');
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const sync = () => {
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) current = section;
      }
      if (!current) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
      });
    };

    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  document.addEventListener("DOMContentLoaded", setupNav);
})();
