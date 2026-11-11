(() => {
const D = window.T2;
const fmt = n => n.toLocaleString('ko-KR');
const esc = s => String(s).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const josa = (w, a, b) => { const c = w.trim().charCodeAt(w.trim().length - 1); return (c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28) ? a : b; };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FAMS = D.fams;
const css = getComputedStyle(document.documentElement);
const COLOR = Object.fromEntries(FAMS.map((f, i) => [f, css.getPropertyValue('--fam-' + i).trim()]));
const CATS = Object.fromEntries(D.cats.map(c => [c.id, c]));
const GIDX = Object.fromEntries(D.groups.map((g, i) => [g.id, i]));
const catName = c => (c.mid === '직무' || c.mid === '산업특화') ? `${c.name} · ${c.mid}` : c.name;
const on = new Set(FAMS);
// 페이지마다 있는 요소만 그림 (버블 페이지 / 트리 페이지)
function $id(id) { return document.getElementById(id) || document.createElement('div'); }
const HAS_SWARM = !!document.getElementById('swarm'), HAS_TREE = !!document.getElementById('dendro');
$id('totalN').textContent = fmt(D.total);

/* ---------- 기준(중앙 요소)과 경로 ---------- */
// 기준: {t:'cat'|'grp', id}. 경로(trail)는 브레드크럼으로 표시
let trail = [], pinned = null;
const cur = () => trail[trail.length - 1];
const nodeOf = c => c.t === 'cat'
  ? { name: catName(CATS[c.id]), fam: CATS[c.id].fam, cov: CATS[c.id].cov, n: CATS[c.id].n, sub: '분야' }
  : (g => ({ name: g.name, fam: g.fam, cov: g.cov, n: g.n, sub: catName(CATS[g.cat]) }))(D.groups[GIDX[c.id]]);
const relCache = new Map();
function related() {
  // 연관도 행렬(문자 1개 = 0–100)을 풀어 기준과 가까운 순으로 정렬
  const c = cur(), key = c.t + c.id;
  if (!relCache.has(key)) {
    const s = c.t === 'cat' ? D.relC[c.id] : D.relG[GIDX[c.id]];
    const out = [];
    for (let i = 0; i < s.length; i++) { const r = s.charCodeAt(i) - 48; if (r > 0) out.push({ ...D.groups[i], rel: r }); }
    out.sort((a, b) => b.rel - a.rel);
    relCache.set(key, out);
  }
  return relCache.get(key);
}

const sel = $id('center');
sel.innerHTML = FAMS.map(f => `<optgroup label="${esc(f)}">` + D.cats.filter(c => c.fam === f).sort((a, b) => b.n - a.n).map(c => `<option value="${esc(c.id)}">${esc(catName(c))}</option>`).join('') + '</optgroup>').join('');
sel.addEventListener('change', () => goTrail([{ t: 'cat', id: sel.value }]));

const enc = tr => '#' + tr.map(x => x.t + '=' + encodeURIComponent(x.id)).join('&');
function go(c) {
  const i = trail.findIndex(x => x.t === c.t && x.id === c.id);
  if (i >= 0) trail = trail.slice(0, i + 1); else trail = [...trail, c];
  history.pushState({ tr: trail }, '', enc(trail));
  update();
}
function goTrail(tr) { trail = tr; history.pushState({ tr: trail }, '', enc(trail)); update(); }
addEventListener('popstate', e => { const tr = (e.state && e.state.tr) || parseHash(); if (tr) { trail = tr; update(); } });
// Backspace = 뒤로 (입력 중 제외), 마우스 뒤로 버튼은 브라우저가 처리
addEventListener('keydown', e => {
  if (e.key !== 'Backspace' || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.target.closest && e.target.closest('input,textarea,select,[contenteditable]')) return;
  e.preventDefault(); history.back();
});
/* ---------- 중심 히스토리 (뎁스 트리) ---------- */
const hRoots = []; let hSeq = 0;
const kOf = c => c.t + ':' + c.id;
function recordHist() {
  let level = hRoots;
  trail.forEach(c => { let n = level.find(x => x.k === kOf(c)); if (!n) { n = { k: kOf(c), c, kids: [] }; level.push(n); hSeq++; } level = n.kids; });
}
function renderHist() {
  const box = document.getElementById('histTree'); if (!box) return;
  const curK = trail.map(kOf).join('>');
  const li = (n, pre) => {
    const pk = [...pre, n.k].join('>'), isCur = pk === curK, onPath = (curK + '>').startsWith(pk + '>');
    const nd = nodeOf(n.c);
    return `<li><button data-hp="${esc(pk)}" class="${onPath ? 'on-path' : ''}" ${isCur ? 'aria-current="true"' : ''}><span class="tbadge ${n.c.t === 'cat' ? 'tb-cat' : 'tb-grp'}">${n.c.t === 'cat' ? '분야' : '그룹'}</span><span class="nm">${esc(nd.name)}</span></button>${n.kids.length ? `<ul class="tree">${n.kids.map(k => li(k, [...pre, n.k])).join('')}</ul>` : ''}</li>`;
  };
  box.innerHTML = `<ul class="tree">${hRoots.map(r => li(r, [])).join('')}</ul>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('#histTree button[data-hp]'); if (!b || b.hasAttribute('aria-current')) return;
  const tr = b.dataset.hp.split('>').map(k => ({ t: k.slice(0, k.indexOf(':')), id: k.slice(k.indexOf(':') + 1) }));
  goTrail(tr);
});
function update() {
  pinned = null;
  const root = trail[0], c = cur(), n = nodeOf(c);
  sel.value = root.id;
  const rc = CATS[root.id];
  $id('centerDot').style.setProperty('--c', COLOR[rc.fam]);
  $id('centerMeta').innerHTML = `<b class="num">${fmt(rc.n)}</b>개 스킬 · ${esc(rc.fam)}`;
  history.replaceState({ tr: trail }, '', enc(trail));
  renderCrumbs(); recordHist(); renderHist();
  if (HAS_SWARM) { setReadout(null); drawSwarm(); }
  if (HAS_TREE) drawDendro(true);
}
const crumbs = $id('crumbs');
function renderCrumbs() {
  crumbs.innerHTML = '<span class="lbl">선택 경로</span>' + trail.map((c, i) => {
    const n = nodeOf(c), last = i === trail.length - 1;
    return (i ? '<span class="sep" aria-hidden="true">›</span>' : '') + `<button data-i="${i}" ${last ? 'aria-current="true"' : ''} title="${esc(n.sub)}">${esc(n.name)}</button>`;
  }).join('');
}
crumbs.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b && !b.hasAttribute('aria-current')) goTrail(trail.slice(0, +b.dataset.i + 1)); });

/* ---------- 계열 칩 ---------- */
const sent = $id('famSentence');
sent.innerHTML = '버블 색은 ' + FAMS.map(f => `<button class="fam" style="--c:${COLOR[f]}" data-fam="${esc(f)}" aria-pressed="true">${esc(f)}</button>`).join(', ') + ' 일곱 계열입니다. 칩을 눌러 계열을 끄고 켤 수 있습니다.';
sent.addEventListener('click', e => {
  const b = e.target.closest('.fam'); if (!b) return;
  const f = b.dataset.fam;
  if (on.has(f) && on.size === 1) FAMS.forEach(x => on.add(x)); else if (on.has(f)) on.delete(f); else on.add(f);
  sent.querySelectorAll('.fam').forEach(x => x.setAttribute('aria-pressed', on.has(x.dataset.fam)));
  paintSwarm();
});

/* ---------- 툴팁 ---------- */
const tip = $id('tip');
const showTip = (e, html) => { tip.innerHTML = html; tip.classList.add('show'); tip.style.left = Math.min(innerWidth - tip.offsetWidth - 8, e.clientX + 14) + 'px'; tip.style.top = (e.clientY + 16) + 'px'; };
const hideTip = () => tip.classList.remove('show');

/* ================= 1. 연관도 비스웜 (USGS Consensus 차트 응용) ================= */
const W = 700, H = 700, M = { t: 40, r: 16, b: 50, l: 58 };
const svg = d3.select('#swarm');
const y = d3.scalePow().exponent(.6).domain([0, 65]).range([H - M.b, M.t]);
svg.append('g').attr('class', 'grid').selectAll('line').data([5, 10, 20, 30, 40, 50, 60]).join('line').attr('x1', M.l - 8).attr('x2', W - M.r).attr('y1', y).attr('y2', y);
svg.append('g').attr('class', 'axis').attr('transform', `translate(${M.l - 14},0)`).call(d3.axisLeft(y).tickValues([0, 5, 10, 20, 30, 40, 50, 60]).tickFormat(d => d + '%').tickSizeOuter(0));
svg.append('text').attr('class', 'axis-cap').attr('x', M.l - 14).attr('y', M.t - 20).text('지금 배울 수 있음');
svg.append('text').attr('class', 'axis-cap').attr('x', M.l - 14).attr('y', H - 10).text('스킬 갭 (콘텐츠 없음)');
const gB = svg.append('g'), gC = svg.append('g');
// 원 크기 = 연관도 (제곱 스케일로 차이를 키움)
let rr = rel => 5 + 25 * rel / 100;
let nodes = [];
const readout = $id('readout');
const gauge = $id('gauge');
gauge.addEventListener('input', () => drawSwarm());

function drawSwarm() {
  const all = related(), N = Math.min(+gauge.value, all.length);
  const data = all.slice(0, N);
  // 원 크기 = 연관도: 지금 보이는 범위(최저~100)를 5–32px로 펼쳐 차이를 키움
  const lo = data.length ? Math.max(0, data[data.length - 1].rel - 4) : 0;
  rr = rel => 5 + 27 * Math.pow(Math.max(0, rel - lo) / Math.max(1, 100 - lo), 1.3);
  $id('gaugeN').textContent = N + '개';
  $id('gaugeMin').textContent = `연관도 ${data.length ? data[data.length - 1].rel : 0} 이상`;
  const c = nodeOf(cur());
  const cx = (W + M.l) / 2, cy = y(c.cov);
  const prev = new Map(nodes.map(n => [n.id, n]));
  const center = { id: '__c', r: 34, x: cx, y: cy, fx: cx, fy: cy };
  nodes = data.map(d => ({ ...d, r: rr(d.rel), x: prev.get(d.id)?.x ?? cx + (Math.random() - .5) * 80, y: prev.get(d.id)?.y ?? y(d.cov) }));
  const sim = d3.forceSimulation([center, ...nodes])
    .force('y', d3.forceY(d => d.id === '__c' ? cy : y(d.cov)).strength(.9))
    .force('x', d3.forceX(cx).strength(d => .04 + (d.rel || 0) / 100 * .08))
    .force('c', d3.forceCollide(d => d.r + 1.5).iterations(3)).stop();
  for (let i = 0; i < 300; i++) sim.tick();
  nodes.forEach(n => { n.x = Math.max(M.l + n.r, Math.min(W - M.r - n.r, n.x)); });

  const T = reduce ? 0 : 450;
  const g = gB.selectAll('g.b').data(nodes, d => d.id);
  g.exit().transition().duration(T * .5).style('opacity', 0).remove();
  const ent = g.enter().append('g').attr('class', 'b').attr('transform', d => `translate(${cx},${cy}) scale(.2)`).style('opacity', 0);
  ent.append('circle').attr('class', 'bub').attr('tabindex', 0).attr('role', 'button')
    .on('mouseenter', (e, d) => { setReadout(d); showTip(e, tipHTML(d)); })
    .on('mousemove', (e, d) => showTip(e, tipHTML(d)))
    .on('mouseleave', () => { hideTip(); setReadout(pinned); })
    .on('click', (e, d) => { hideTip(); go({ t: 'grp', id: d.id }); })
    .on('keydown', (e, d) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go({ t: 'grp', id: d.id }); } });
  ent.append('text').attr('class', 'blabel');
  const merged = ent.merge(g);
  merged.transition().duration(T).ease(d3.easeCubicOut).attr('transform', d => `translate(${d.x},${d.y})`).style('opacity', 1);
  merged.select('circle').attr('fill', d => COLOR[d.fam]).attr('aria-label', d => `${d.name}, 연관도 ${d.rel}, 커버리지 ${d.cov}%. 누르면 새 기준이 됩니다`)
    .transition().duration(T).attr('r', d => d.r);
  merged.select('text').text(d => d.r >= 15 ? d.rel : '');

  // 기준(중앙 요소)
  let cg = gC.select('g.cn');
  if (cg.empty()) {
    cg = gC.append('g').attr('class', 'cn');
    cg.append('circle').attr('class', 'center-ring').attr('r', 34);
    cg.append('text').attr('class', 'center-sub').attr('y', -8).text('기준');
    cg.append('text').attr('class', 'center-lbl').attr('y', 8);
  }
  cg.transition().duration(T).attr('transform', `translate(${cx},${cy})`);
  cg.select('.center-lbl').text(c.name.length > 7 ? c.name.slice(0, 6) + '…' : c.name);
  cg.select('.center-ring').attr('stroke', COLOR[c.fam]);
  paintSwarm();
}
const tipHTML = d => `<b>${esc(d.name)}</b><span>${esc(catName(CATS[d.cat]))} · 연관도 ${d.rel} · 커버리지 ${d.cov}%<br>누르면 이 그룹이 새 기준이 됩니다</span>`;
function paintSwarm() {
  gB.selectAll('circle').classed('off', d => !on.has(d.fam));
  gB.selectAll('text').style('opacity', d => on.has(d.fam) ? 1 : 0);
}
function setReadout(d) {
  const cn = nodeOf(cur()).name;
  if (!d) { readout.innerHTML = `<div>지금 기준은 <b>${esc(cn)}</b>입니다. 버블에 마우스를 올리면 기준${josa(cn, '과', '와')}의 연관도와<br>휴넷 콘텐츠로 배울 수 있는 정도를 볼 수 있고, 누르면 그 그룹이 새 기준이 됩니다.</div>`; return; }
  const p = k => (d[k] / d.n * 100);
  readout.innerHTML = `<div><b>${esc(d.name)}</b> <span style="color:var(--fg-45)">(${esc(catName(CATS[d.cat]))})</span></div>
    <div class="rel-meter" style="--c:${COLOR[d.fam]}">${esc(cn)}${josa(cn, '과', '와')} 연관도 <span class="track"><i style="width:${d.rel}%"></i></span><b class="num">${d.rel}</b></div>
    <div class="stack" aria-hidden="true"><i class="s-direct" style="width:${p('direct')}%"></i><i class="s-partial" style="width:${p('partial')}%"></i><i class="s-none" style="width:${p('none')}%"></i></div>
    <div class="keys"><span><i class="s-direct"></i>직접 매칭 ${fmt(d.direct)}</span><span><i class="s-partial"></i>부분 매칭 ${fmt(d.partial)}</span><span><i class="s-none"></i>스킬 갭 ${fmt(d.none)} / ${fmt(d.n)}</span></div>`;
}

/* ================= 2. 연관 트리 (USGS Meta-analysis 덴드로그램 응용) ================= */
const dsvg = d3.select('#dendro');
const X_ROOT = 150, X_FAM = 330, X_GRP = 520, ROW = 22, GAP = 16, PER_FAM = 7;
const famOpen = new Set();
let revealed = false;
const link = (x0, y0, x1, y1) => { const mx = x0 + (x1 - x0) * .55; return `M${x0},${y0} C${mx},${y0} ${mx},${y1} ${x1},${y1}`; };
const gL = dsvg.append('g'), gN = dsvg.append('g');

function dLayout() {
  const rel = related();
  const byFam = d3.group(rel, d => d.fam);
  const fams = FAMS.filter(f => byFam.has(f)).map(f => ({ f, items: byFam.get(f).slice(0, PER_FAM) }))
    .map(o => ({ ...o, sum: d3.sum(o.items, d => d.rel), top: o.items[0].rel, cnt: byFam.get(o.f).length }))
    .sort((a, b) => b.sum - a.sum);
  // 보이는 값 범위에 맞춰 두께를 늘림 → 차이가 확실히 보이도록 (제곱 스케일)
  const shown = fams.flatMap(o => o.items.map(d => d.rel));
  const lo = d3.min(shown), hi = d3.max(shown);
  const lw = d3.scalePow().exponent(2).domain([lo, hi]).range([.5, 6]).clamp(true);
  const lr = d3.scalePow().exponent(2).domain([lo, hi]).range([2, 8]).clamp(true);
  const fw = d3.scalePow().exponent(1.5).domain([d3.min(fams, o => o.sum), d3.max(fams, o => o.sum)]).range([1, 6]);
  const N = [], L = [];
  let yy = 10;
  fams.forEach(o => {
    const start = yy;
    if (famOpen.has(o.f) && revealed) {
      o.items.forEach(g => { N.push({ key: o.f + '>' + g.id, kind: 'grp', x: X_GRP, y: yy + ROW / 2, d: g, fam: o.f, r: lr(g.rel), w: lw(g.rel) }); yy += ROW; });
    } else yy += ROW * 1.6;
    N.push({ key: o.f, kind: 'fam', x: X_FAM, y: (start + yy) / 2, fam: o.f, top: o.top, cnt: o.cnt, w: fw(o.sum), sum: o.sum });
    yy += GAP;
  });
  const H = yy + 10, rootY = H / 2;
  const pos = new Map(N.map(n => [n.key, n]));
  N.filter(n => n.kind === 'fam').forEach(n => L.push({ key: 'root>' + n.fam, fam: n.fam, x0: X_ROOT + 14, y0: rootY, x1: X_FAM - 8, y1: n.y, w: n.w }));
  N.filter(n => n.kind === 'grp').forEach(n => L.push({ key: n.key, fam: n.fam, x0: X_FAM + 8, y0: pos.get(n.fam).y, x1: X_GRP, y1: n.y, w: n.w }));
  return { N, L, H, rootY, pos };
}
function drawDendro(reset) {
  if (reset) { gL.selectAll('*').remove(); gN.selectAll('*').remove(); }
  const { N, L, H, rootY, pos } = dLayout();
  const T = reduce ? 0 : 550;
  dsvg.transition().duration(T).attr('viewBox', `0 0 760 ${Math.max(H, 240)}`);

  const c = nodeOf(cur());
  let root = gN.select('g.root');
  if (root.empty()) {
    root = gN.append('g').attr('class', 'root');
    root.append('circle').attr('r', 14);
    root.append('text').attr('class', 'root-lbl').attr('x', -22).attr('y', -9).attr('text-anchor', 'end');
    root.append('text').attr('class', 'root-sub').attr('x', -22).attr('y', 11).attr('text-anchor', 'end');
  }
  root.select('circle').attr('fill', COLOR[c.fam]);
  root.select('.root-lbl').text(c.name.length > 10 ? c.name.slice(0, 9) + '…' : c.name);
  root.select('.root-sub').text(`기준 · ${c.sub}`);
  root.transition().duration(T).attr('transform', `translate(${X_ROOT},${rootY})`);

  const ls = gL.selectAll('path').data(L, d => d.key);
  ls.exit().transition().duration(T * .6).attr('d', d => link(d.x0, d.y0, d.x0, d.y0)).style('opacity', 0).remove();
  ls.enter().append('path').attr('stroke', d => COLOR[d.fam]).attr('stroke-opacity', .8).attr('stroke-linecap', 'round')
    .attr('stroke-width', d => d.w).attr('d', d => link(d.x0, d.y0, d.x0, d.y0))
    .merge(ls).transition().duration(T).ease(d3.easeCubicInOut).attr('stroke-width', d => d.w).attr('d', d => link(d.x0, d.y0, d.x1, d.y1));

  const ns = gN.selectAll('g.n').data(N, d => d.key);
  ns.exit().transition().duration(T * .5).style('opacity', 0).remove();
  const ent = ns.enter().append('g').attr('class', d => 'n ' + (d.kind === 'grp' ? 'leaf' : 'famn'))
    .attr('transform', d => { const o = d.kind === 'grp' ? pos.get(d.fam) : { x: X_ROOT, y: rootY }; return `translate(${o.x},${o.y})`; }).style('opacity', 0);
  ent.each(function (d) {
    const g = d3.select(this), col = COLOR[d.fam];
    g.attr('tabindex', 0).attr('role', 'treeitem');
    if (d.kind === 'fam') {
      g.append('circle').attr('r', 7).attr('fill', col);
      g.append('text').attr('class', 'fam-lbl').attr('y', -16).attr('text-anchor', 'middle').attr('fill', col).text(d.fam);
      g.append('text').attr('class', 'hint').attr('x', 14);
      g.on('click', () => toggleFam(d.fam)).on('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFam(d.fam); } });
    } else {
      g.append('circle').attr('r', d.r).attr('fill', col);
      const t = g.append('text').attr('x', d.r + 6).attr('fill', col);
      t.append('tspan').text(d.d.name + ' ');
      t.append('tspan').attr('class', 'rel').text(`(${d.d.rel})`);
      const pick = () => { hideTip(); go({ t: 'grp', id: d.d.id }); };
      g.on('click', pick).on('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } })
        .on('mousemove', e => showTip(e, `<b>${esc(d.d.name)}</b><span>${esc(catName(CATS[d.d.cat]))} · 연관도 ${d.d.rel} · 스킬 갭 ${fmt(d.d.none)}/${fmt(d.d.n)}<br>누르면 이 그룹이 새 기준이 됩니다</span>`))
        .on('mouseleave', hideTip);
    }
  });
  const all = ent.merge(ns);
  all.filter(d => d.kind === 'fam').attr('aria-expanded', d => famOpen.has(d.fam) && revealed)
    .select('.hint').text(d => famOpen.has(d.fam) && revealed ? '' : `연관 그룹 ${d.cnt}개 · 최고 ${d.top}`);
  all.transition().duration(T).ease(d3.easeCubicInOut).attr('transform', d => `translate(${d.x},${d.y})`).style('opacity', 1);
}
function toggleFam(f) { famOpen.has(f) ? famOpen.delete(f) : famOpen.add(f); revealed = true; drawDendro(); }

/* ---------- 시작: 주소의 경로 복원 ---------- */
function parseHash() {
  const fromHash = location.hash.slice(1).split('&').map(p => p.split('=')).filter(([t, v]) => v && (t === 'cat' ? CATS[decodeURIComponent(v)] : t === 'grp' ? GIDX[decodeURIComponent(v)] != null : false))
  .map(([t, v]) => ({ t, id: decodeURIComponent(v) }));
  return fromHash.length && fromHash[0].t === 'cat' ? fromHash : null;
}
trail = parseHash() || [{ t: 'cat', id: '직무|비즈니스' }];
update();
const io = new IntersectionObserver(es => {
  if (es.some(e => e.isIntersecting)) { FAMS.forEach(f => famOpen.add(f)); revealed = true; drawDendro(); io.disconnect(); }
}, { threshold: .2 });
if (HAS_TREE) io.observe(document.getElementById('dendro'));
})();
