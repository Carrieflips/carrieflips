/* coming-soon-banner.js — <coming-soon-banner> Web Component
 * Usage: <coming-soon-banner></coming-soon-banner>
 * Renders a sticky pale-green banner at the top of any page.
 */
(function () {
  'use strict';

  const CSS = [
    'coming-soon-banner { display: block; }',
    '.csb-inner {',
    '  position: sticky;',
    '  top: 0;',
    '  z-index: 200;',
    '  background: #dbffb0;',
    '  color: #1a1a18;',
    '  text-align: center;',
    '  padding: 10px 20px;',
    '  font-family: var(--font-body, \'Asap Condensed\', sans-serif);',
    '  font-size: 11px;',
    '  font-weight: 600;',
    '  letter-spacing: 0.14em;',
    '  text-transform: uppercase;',
    '}',
  ].join('\n');

  class ComingSoonBanner extends HTMLElement {
    connectedCallback() {
      const inner = document.createElement('div');
      inner.className = 'csb-inner';
      inner.textContent = 'Graphics coming soon';
      this.appendChild(inner);
    }
  }

  if (!document.getElementById('coming-soon-banner-styles')) {
    const style = document.createElement('style');
    style.id = 'coming-soon-banner-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  if (!customElements.get('coming-soon-banner')) {
    customElements.define('coming-soon-banner', ComingSoonBanner);
  }

}());
