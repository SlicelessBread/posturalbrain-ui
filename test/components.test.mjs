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
  assert.match(html(ui.Button, { href: '/pazienti', variant: 'ghost', size: 'small' }, 'Vedi tutte'), /^<a class="pb-btn pb-btn--ghost pb-btn--small" href="\/pazienti">Vedi tutte<\/a>$/);
  assert.match(html(ui.Button, { loading: true }, 'Salvataggio…'), /aria-busy="true" disabled=""/);
  assert.match(html(ui.Button, { loading: true, href: '/x' }, 'Apri'), /^<a class="pb-btn" aria-busy="true" href="\/x">Apri<\/a>$/);
  assert.match(html(ui.Button, { disabled: true }, 'Pubblica'), /disabled=""/);
  assert.doesNotMatch(html(ui.Button, null, 'Salva'), /aria-busy/);
  assert.match(html(ui.Button, { icon: 'plus' }, 'Aggiungi'), /<svg class="pb-icon"[^>]*aria-hidden="true"><path/);
});

test('Icon: sizes, and an unknown name draws an empty icon instead of failing', () => {
  assert.match(html(ui.Icon, { name: 'check', size: 'sm' }), /^<svg class="pb-icon pb-icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">/);
  assert.match(html(ui.Icon, { name: 'non-esiste' }), /^<svg class="pb-icon"[^>]*><\/svg>$/);
  for (const name of ['constructor', 'toString', '__proto__']) assert.match(html(ui.Icon, { name }), /^<svg class="pb-icon"[^>]*><\/svg>$/, name);
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
  assert.match(html(ui.IconButton, { label: 'Torna ai pazienti', icon: 'chevron-left', href: '/pazienti', className: 'pb-page-head__back' }), /^<a class="pb-icon-btn pb-page-head__back" aria-label="Torna ai pazienti" href="\/pazienti">/);
});

test('Chip and Segmented state their selection with aria-pressed', () => {
  assert.match(html(ui.Chip, { pressed: true, icon: 'check' }, 'YouTube'), /^<button type="button" class="pb-chip" aria-pressed="true"><svg class="pb-icon pb-icon--sm"/);
  assert.match(html(ui.Chip, { pressed: false }, 'TikTok'), /aria-pressed="false">TikTok</);
  const segmented = html(ui.Segmented, { label: 'Vista', value: 'b', options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] });
  assert.match(segmented, /^<div class="pb-segmented" role="group" aria-label="Vista">/);
  assert.match(segmented, /aria-pressed="false" data-value="a">A<\/button><button type="button" aria-pressed="true" data-value="b">B</);
  assert.equal(html(ui.Segmented, { label: 'Vuoto', value: '', options: [] }), '<div class="pb-segmented" role="group" aria-label="Vuoto"></div>');
});

test('Progress stays a drawable bar for values outside its scale', () => {
  const value = (props) => /--value:([^;"]*)/.exec(html(ui.Progress, { label: 'x', ...props }))[1];
  assert.equal(value({ value: 40 }), '0.4');
  assert.equal(value({ value: -1 }), '0');
  assert.equal(value({ value: 150 }), '1');
  assert.equal(value({ value: NaN }), '0');
  assert.equal(value({ value: 3, max: 0 }), '0');
  for (const props of [{ value: NaN }, { value: 5, max: NaN }, { value: Infinity }, { value: 3, max: 0 }]) assert.doesNotMatch(html(ui.Progress, { label: 'x', ...props }), /NaN|Infinity/);
  assert.match(html(ui.Progress, { label: 'Rate incassate', value: 3, max: 3 }), /aria-valuemin="0" aria-valuemax="3" aria-valuenow="3"/);
  const unknown = html(ui.Progress, { label: 'Pubblicazione in corso' });
  assert.match(unknown, /class="pb-progress pb-progress--indeterminate" role="progressbar" aria-label="Pubblicazione in corso"/);
  assert.doesNotMatch(unknown, /aria-valuenow/);
});

test('an error is announced at once: Banner and Toast use role="alert" only for danger', () => {
  assert.match(html(ui.Banner, { tone: 'danger', title: 'Errore' }), /role="alert"/);
  assert.match(html(ui.Banner, { tone: 'warn', title: 'Attenzione' }), /role="status"/);
  assert.match(html(ui.Toast, { tone: 'danger' }, 'Errore'), /role="alert"/);
  assert.match(html(ui.Toast, null, 'Link copiato'), /^<div class="pb-toast" role="status"><span class="pb-toast__text">Link copiato<\/span><\/div>$/);
  assert.match(html(ui.Banner, { tone: 'ok', title: 'Fatto' }), /<div class="pb-banner__body"><strong>Fatto<\/strong><\/div>/);
});

test('BottomNav: an empty list draws an empty bar, and only the current section is marked', () => {
  assert.equal(html(ui.BottomNav, { items: [] }), '<nav class="pb-bottomnav" aria-label="Sezioni"></nav>');
  const nav = html(ui.BottomNav, { items: [{ href: '/a', label: 'A', icon: 'house' }, { href: '/b', label: 'B', icon: 'user', current: true }] });
  assert.equal(nav.match(/aria-current="page"/g).length, 1);
  assert.match(nav, /<a href="\/b" aria-current="page"><svg[^>]*>.*?<\/svg><span>B<\/span><\/a>/);
});

test('Tabs: only the chosen tab is in the Tab order, the first one when nothing matches', () => {
  const tabs = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }];
  const order = (value) => [...html(ui.Tabs, { label: 'x', tabs, value }).matchAll(/tabindex="(-?\d)"/g)].map((m) => m[1]);
  assert.deepEqual(order('b'), ['-1', '0', '-1']);
  assert.deepEqual(order('zzz'), ['0', '-1', '-1']);
  assert.equal(html(ui.Tabs, { label: 'x', tabs: [], value: 'a' }), '<div class="pb-tabs" role="tablist" aria-label="x"></div>');
});

test('PageHeader and PeriodSwitch: optional parts appear only when given', () => {
  assert.equal(html(ui.PageHeader, { title: 'Pazienti' }), '<header class="pb-page-head"><div class="pb-page-head__text"><h1 class="pb-page-head__title text-title">Pazienti</h1></div></header>');
  assert.match(html(ui.PageHeader, { title: 'Buongiorno', display: true }), /class="pb-page-head__title text-display"/);
  assert.match(html(ui.PageHeader, { title: 'Anna', back: { href: '/pazienti', label: 'Torna ai pazienti' } }), /^<header class="pb-page-head"><a class="pb-icon-btn pb-icon-btn--ghost pb-page-head__back" aria-label="Torna ai pazienti" href="\/pazienti">/);
  const month = html(ui.PeriodSwitch, { label: 'Novembre 2026', prevLabel: 'Mese precedente', nextLabel: 'Mese successivo' });
  assert.doesNotMatch(month, /pb-period--week|Oggi/);
  assert.match(html(ui.PeriodSwitch, { week: true, label: 'x', prevLabel: 'p', nextLabel: 'n' }), /class="pb-period pb-period--week".*<button type="button" class="pb-btn pb-btn--small">Oggi<\/button><\/div>$/);
});

test('YearBars draws nothing it cannot measure: zeros, a loss, an empty year', () => {
  const values = (bars, max) => [...html(ui.YearBars, { title: 'x', bars, max }).matchAll(/--value:([^;"]*)/g)].map((m) => m[1]);
  const bar = (value) => ({ label: 'M', value, description: 'm' });
  assert.deepEqual(values([bar(0), bar(0)]), ['0', '0']);
  assert.deepEqual(values([bar(-500), bar(1000), bar(500)]), ['0', '1', '0.5']);
  assert.deepEqual(values([bar(NaN), bar(200)]), ['0', '1']);
  assert.deepEqual(values([bar(2810)], 5400), ['0.52']);
  assert.equal(html(ui.YearBars, { title: 'Anno', bars: [] }), '<figure class="pb-bars"><figcaption class="pb-row pb-row--between"><span class="text-body-strong">Anno</span></figcaption><ol class="pb-bars__plot"></ol></figure>');
  assert.doesNotMatch(html(ui.YearBars, { title: 'x', bars: [bar(NaN), bar(-1)], max: NaN }), /NaN/);
});

test('StatCard is a button only when it can be pressed; ListRow is a link only when it goes somewhere', () => {
  const pressed = html(ui.StatCard, { icon: 'megaphone', label: 'Pubblicità', value: '350', onClick() {} });
  assert.match(pressed, /^<button type="button" class="pb-stat pb-stat--interactive">.*<span class="pb-stat__body">.*<\/span><svg class="pb-icon"[^>]*>.*<\/svg><\/button>$/);
  assert.doesNotMatch(pressed, /<div/);
  assert.match(html(ui.StatCard, { icon: 'wallet', label: 'Lordo', value: '6.480', tone: 'highlight' }), /^<div class="pb-stat pb-stat--highlight">.*<div class="pb-stat__body">.*class="pb-stat__value text-figure-lg pb-num"/);
  assert.equal(html(ui.ListRow, { title: 'Anna' }), '<li><div class="pb-list-row"><span class="pb-list-row__body"><span class="pb-list-row__title text-body-strong">Anna</span></span></div></li>');
  assert.match(html(ui.ListRow, { title: 'Anna', href: '/pazienti/1' }), /^<li><a class="pb-list-row" href="\/pazienti\/1">.*<span class="pb-list-row__trail"><svg/);
  assert.match(html(ui.Card, { href: '/x' }, 'Apri'), /^<a class="pb-card pb-card--interactive" href="\/x">Apri<\/a>$/);
  assert.equal(html(ui.Card, { raised: true }, 'Testo'), '<section class="pb-card pb-card--raised">Testo</section>');
});

test('KeyValue and SectionTitle: empty and optional parts', () => {
  assert.equal(html(ui.KeyValue, { items: [] }), '<dl class="pb-kv"></dl>');
  assert.match(html(ui.KeyValue, { items: [{ label: 'Totale', value: '900', numeric: true }] }), /<div><dt>Totale<\/dt><dd class="pb-num">900<\/dd><\/div>/);
  assert.equal(html(ui.SectionTitle, { count: 0 }, 'Video'), '<div class="pb-section-title"><h2 class="text-section">Video <span class="pb-section-title__count">0</span></h2></div>');
});
