// Markup of the components for the inputs the previews do not show.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as ui from '../src/index.ts';

const html = (type, props, ...children) => renderToStaticMarkup(h(type, props, ...children));

test('fraction keeps a bar between 0 and 1 whatever it is given', () => {
  assert.equal(ui.fraction(-5, 100), 0);
  assert.equal(ui.fraction(150, 100), 1);
  assert.equal(ui.fraction(1, 0), 0);
  assert.equal(ui.fraction(NaN, 100), 0);
  assert.equal(ui.fraction(2810, 5400), 0.52);
  assert.equal(ui.fraction(40, 100), 0.4);
});

test('Button: a button by default, a link with href, busy while loading', () => {
  assert.match(html(ui.Button, null, 'Annulla'), /^<button type="button" class="pb-btn">Annulla<\/button>$/);
  assert.match(html(ui.Button, { type: 'submit', variant: 'primary', block: true }, 'Entra'), /^<button type="submit" class="pb-btn pb-btn--primary pb-btn--block">/);
  assert.match(html(ui.Button, { href: '/pazienti', variant: 'ghost', size: 'small' }, 'Vedi tutte'), /^<a href="\/pazienti" class="pb-btn pb-btn--ghost pb-btn--small">Vedi tutte<\/a>$/);
  assert.match(html(ui.Button, { loading: true }, 'Salvataggio…'), /aria-busy="true"/);
  assert.doesNotMatch(html(ui.Button, null, 'Salva'), /aria-busy/);
  assert.match(html(ui.Button, { icon: 'plus' }, 'Aggiungi'), /<svg class="pb-icon"[^>]*aria-hidden="true"><path/);
});

test('Icon: sizes, and an unknown name draws an empty icon instead of failing', () => {
  assert.match(html(ui.Icon, { name: 'check', size: 'sm' }), /^<svg class="pb-icon pb-icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">/);
  assert.match(html(ui.Icon, { name: 'non-esiste' }), /^<svg class="pb-icon"[^>]*><\/svg>$/);
});

test('layout helpers carry their class and pass everything else through', () => {
  assert.equal(html(ui.Stack, { gap: 'tight', as: 'section', id: 'a' }), '<section class="pb-stack pb-stack--tight" id="a"></section>');
  assert.equal(html(ui.Row, { between: true, nowrap: true, as: 'span' }), '<span class="pb-row pb-row--between pb-row--nowrap"></span>');
  assert.equal(html(ui.Grid2, { className: 'x' }), '<div class="pb-grid-2 x"></div>');
  assert.equal(html(ui.Page), '<main class="pb-page"></main>');
  assert.equal(html(ui.Frame), '<div class="pb-frame"></div>');
  assert.equal(html(ui.List), '<ul class="pb-list"></ul>');
  assert.equal(html(ui.List, { as: 'div' }), '<div class="pb-list"></div>');
});
