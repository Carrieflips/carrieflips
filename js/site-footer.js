/* site-footer.js — <site-footer> Web Component
 * Usage:  <site-footer></site-footer>          — work variant (default)
 *         <site-footer variant="play"></site-footer> — play variant
 *
 * Toggle via JS:
 *   el.setAttribute('variant', 'play');
 *   el.removeAttribute('variant');
 */
(function () {
  'use strict';

  /* ── Styles injected once into <head> ─────────────────── */

  const FOOTER_CSS = [
    'site-footer { display: block; flex-shrink: 0; }',

    '.site-footer {',
    '  position: relative;',
    '  background: #e8e5de;',
    '  padding: 32px 44px 32px;',
    '  transition: background-color 0.4s ease;',
    '}',

    '.site-footer.play-mode {',
    '  background-color: transparent;',
    '  display: flex;',
    '  flex-direction: row;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '}',

    '.site-footer.play-mode .footer-wordmark {',
    '  display: none;',
    '}',

    '.site-footer.play-mode .footer-main {',
    '  order: 2;',
    '}',

    '.site-footer.play-mode .footer-right {',
    '  margin-left: 0;',
    '}',

    '.site-footer.play-mode .footer-bottom {',
    '  order: 1;',
    '  margin-top: 0;',
    '}',

    '.footer-main {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  gap: 20px;',
    '}',

    '.footer-wordmark {',
    '  font-family: \'Knewave\', var(--font-display, sans-serif);',
    '  font-weight: 400;',
    '  font-size: 20px;',
    '  color: var(--ink, #1a1a18);',
    '  line-height: 1;',
    '  letter-spacing: 0.02em;',
    '  text-decoration: none;',
    '}',

    '.footer-right {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 16px;',
    '}',

    '.footer-connect {',
    '  font-family: var(--font-display, sans-serif);',
    '  font-size: 10px;',
    '  font-weight: 600;',
    '  letter-spacing: 0.16em;',
    '  text-transform: uppercase;',
    '  color: var(--muted, #8a8680);',
    '  white-space: nowrap;',
    '}',

    '.footer-socials {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 4px;',
    '}',

    '.footer-socials a {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 30px;',
    '  height: 30px;',
    '  border-radius: 50%;',
    '  color: var(--ink, #1a1a18);',
    '  opacity: 0.35;',
    '  text-decoration: none;',
    '  background-color: transparent;',
    '  transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease;',
    '}',

    '.footer-socials a:hover {',
    '  opacity: 1;',
    '  transform: translateY(-2px);',
    '  background-color: rgba(17, 17, 17, 0.06);',
    '}',

    '.footer-socials svg {',
    '  width: 16px;',
    '  height: 16px;',
    '  fill: currentColor;',
    '}',

    '.footer-bottom {',
    '  margin-top: 20px;',
    '}',

    '.footer-copy {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: 11px;',
    '  font-weight: 300;',
    '  color: var(--muted, #8a8680);',
    '  line-height: 1;',
    '}',

    '/* Lang button — base styles */',
    '.lang-btn {',
    '  font-family: var(--font-display, sans-serif);',
    '  font-weight: 500;',
    '  font-size: 12px;',
    '  letter-spacing: 0.12em;',
    '  text-transform: uppercase;',
    '  color: var(--muted, #8a8680);',
    '  opacity: 0.55;',
    '  cursor: pointer;',
    '  border: none;',
    '  background: none;',
    '  padding: 0;',
    '  transition: color 0.2s, opacity 0.2s;',
    '}',
    '.lang-btn:hover { color: var(--ink, #1a1a18); opacity: 1; }',
    '.lang-btn-mobile { display: none; }',

    '@media (max-width: 767px) {',
    '  .site-footer { padding: 28px 24px 24px; }',
    '  .footer-wordmark { font-size: 26px; }',
    '  .footer-bottom { display: flex; align-items: center; justify-content: space-between; }',
    '  .lang-btn-mobile { display: inline-block; }',
    '}',
  ].join('\n');

  /* ── Social link data ─────────────────────────────────── */

  const SOCIALS = [
    {
      href: 'https://x.com/carrieflips',
      label: 'X',
      d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      href: 'https://www.linkedin.com/in/carriemphillips/',
      label: 'LinkedIn',
      d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      href: 'https://github.com/Carrieflips',
      label: 'GitHub',
      d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    },
    {
      href: 'https://carrieflips.substack.com/',
      label: 'Substack',
      d: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z',
    },
  ];

  /* ── DOM helpers ──────────────────────────────────────── */

  const NS_SVG = 'http://www.w3.org/2000/svg';

  function makeEl(tag, attrs) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class')     node.className   = v;
        else if (k === 'text') node.textContent = v;
        else                   node.setAttribute(k, v);
      }
    }
    return node;
  }

  function makeSvgIcon(pathD) {
    const svg  = document.createElementNS(NS_SVG, 'svg');
    const path = document.createElementNS(NS_SVG, 'path');
    svg.setAttribute('viewBox', '0 0 24 24');
    path.setAttribute('d', pathD);
    svg.appendChild(path);
    return svg;
  }

  /* ── Web Component ────────────────────────────────────── */

  class SiteFooter extends HTMLElement {
    static get observedAttributes() { return ['variant']; }

    connectedCallback() {
      this._build();
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (this._footerEl) {
        this._footerEl.classList.toggle('play-mode', newVal === 'play');
      }
    }

    _build() {
      /* outer <footer> */
      const footer = makeEl('footer', { class: 'site-footer' });
      this._footerEl = footer;

      /* ── Row 1: main ── */
      const footerMain = makeEl('div', { class: 'footer-main' });

      /* wordmark */
      footerMain.appendChild(
        makeEl('a', { href: '/', class: 'footer-wordmark', text: 'Carrieflips' })
      );

      /* right cluster */
      const footerRight = makeEl('div', { class: 'footer-right' });

      const footerSocials = makeEl('div', { class: 'footer-socials' });
      for (const s of SOCIALS) {
        const a = makeEl('a', { href: s.href, target: '_blank', rel: 'noopener', 'aria-label': s.label });
        a.appendChild(makeSvgIcon(s.d));
        footerSocials.appendChild(a);
      }
      footerRight.appendChild(footerSocials);
      footerMain.appendChild(footerRight);
      footer.appendChild(footerMain);

      /* ── Row 2: bottom bar ── */
      const footerBottom = makeEl('div', { class: 'footer-bottom' });
      footerBottom.appendChild(
        makeEl('span', { class: 'footer-copy', text: '© 2026 Carrie Phillips' })
      );
      footerBottom.appendChild(
        makeEl('button', {
          class: 'lang-btn lang-btn-mobile',
          'aria-label': 'Language selector',
          text: 'EN',
        })
      );
      footer.appendChild(footerBottom);

      this.appendChild(footer);

      /* apply variant if already set at parse time */
      if (this.getAttribute('variant') === 'play') {
        footer.classList.add('play-mode');
      }
    }
  }

  /* ── Inject styles once ───────────────────────────────── */

  if (!document.getElementById('site-footer-styles')) {
    const style = document.createElement('style');
    style.id = 'site-footer-styles';
    style.textContent = FOOTER_CSS;
    document.head.appendChild(style);
  }

  /* ── Register once ────────────────────────────────────── */

  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }

}());
