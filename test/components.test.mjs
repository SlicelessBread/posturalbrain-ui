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

test('IconButton: named by its label, optional dot, a link with href', () => {
  assert.equal(html(ui.IconButton, { label: 'Chiudi', icon: 'x', variant: 'ghost' }).replace(/<svg.*<\/svg>/, '<svg/>'), '<button type="button" class="pb-icon-btn pb-icon-btn--ghost" aria-label="Chiudi"><svg/></button>');
  assert.match(html(ui.IconButton, { label: 'Notifiche, 2 non lette', icon: 'bell', dot: true }), /<\/svg><span class="pb-dot" aria-hidden="true"><\/span><\/button>$/);
  assert.match(html(ui.IconButton, { label: 'Torna ai pazienti', icon: 'chevron-left', href: '/pazienti', className: 'pb-page-head__back' }), /^<a href="\/pazienti" class="pb-icon-btn pb-page-head__back" aria-label="Torna ai pazienti">/);
});

test('Chip and Segmented state their selection with aria-pressed', () => {
  assert.match(html(ui.Chip, { pressed: true, icon: 'check' }, 'YouTube'), /^<button type="button" class="pb-chip" aria-pressed="true"><svg class="pb-icon pb-icon--sm"/);
  assert.match(html(ui.Chip, { pressed: false }, 'TikTok'), /aria-pressed="false">TikTok</);
  const segmented = html(ui.Segmented, { label: 'Vista', value: 'b', options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] });
  assert.match(segmented, /^<div class="pb-segmented" role="group" aria-label="Vista">/);
  assert.match(segmented, /aria-pressed="false" data-value="a">A<\/button><button type="button" aria-pressed="true" data-value="b">B</);
  assert.equal(html(ui.Segmented, { label: 'Vuoto', value: '', options: [] }), '<div class="pb-segmented" role="group" aria-label="Vuoto"></div>');
});
