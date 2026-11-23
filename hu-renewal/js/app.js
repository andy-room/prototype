// =========================================================
// HU 개선 시안 v2 — 공통 로직 (라우터 · 셸 · HDS 컴포넌트 · 오버레이 · 스킬 갤럭시)
// =========================================================
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const store = { get:k=>{try{return localStorage.getItem(k)}catch(e){return null}}, set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}} };

// ---------- 아이콘 (24 그리드, 1.8 선) ----------
const sv = (p, sw=1.8) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const I = {
  search: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', 2),
  ext: sv('<path d="M9 5h10v10M19 5 5 19"/>'),
  down: sv('<path d="m6 9 6 6 6-6"/>', 2),
  x: sv('<path d="M6 6l12 12M18 6 6 18"/>', 2),
  menu: sv('<path d="M4 7h16M4 12h16M4 17h16"/>', 2),
  back: sv('<path d="M15 5 8 12l7 7"/>', 2),
  heart: sv('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
  share: sv('<path d="M12 15V3m0 0L7 8m5-5 5 5M5 13v6h14v-6"/>'),
  grid: sv('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
  list: sv('<path d="M9 6h11M9 12h11M9 18h11"/><rect x="3.5" y="4.5" width="3" height="3" rx=".8"/><rect x="3.5" y="10.5" width="3" height="3" rx=".8"/><rect x="3.5" y="16.5" width="3" height="3" rx=".8"/>'),
  galaxy: sv('<circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="6" r="1.6"/><circle cx="19.5" cy="7" r="1.6"/><circle cx="18" cy="19" r="1.6"/><circle cx="5" cy="18" r="1.6"/><path d="M6 7l3.6 3.2M18 8.2l-3.6 2.6M16.8 17.8l-2.7-3.6M6.4 16.9l3.4-2.7"/>'),
  minus: sv('<path d="M5 12h14"/>', 2), plus: sv('<path d="M12 5v14M5 12h14"/>', 2),
  target: sv('<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/>', 2),
  reset: sv('<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/>', 2),
  home: sv('<path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-6h4v6"/>'),
  play: sv('<rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="M10.5 9.5v5l4-2.5z"/>'),
  brief: sv('<rect x="3.5" y="7" width="17" height="12" rx="2.5"/><path d="M9 7V5.5h6V7"/>'),
  bolt: sv('<path d="M13 3 5 13h6l-1 8 8-10h-6z"/>'),
  user: sv('<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>'),
  trophy: sv('<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1.5A3 3 0 0 0 8 10.5M16 6h3v1.5a3 3 0 0 1-3 3M12 13v4M8.5 20h7"/>')
};
// 콘텐츠 카테고리 아이콘 (CATS 순서)
const CAT_ICO = [
  '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  '<path d="M5 18h14l1-9-4.5 3L12 5l-3.5 7L4 9z"/>',
  '<rect x="3.5" y="7" width="17" height="12" rx="2.5"/><path d="M9 7V5.5h6V7"/>',
  '<path d="M4 6h10M4 12h16M4 18h7"/><path d="m16 4 2 2 3-3"/>',
  '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  '<path d="M5 20V12M10 20V6M15 20v-9M20 20V4"/>',
  '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
  '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z"/>',
  '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  '<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="8"/>'
].map(p=>sv(p));
// 스킬 그룹 아이콘 (GROUPS 순서)
const GI = [
  '<path d="M4 14V10l12-5v14L4 14zM16 9h2a2 2 0 0 1 0 4h-2M7 14.5 8.5 19"/>',
  '<path d="M5 20V12M10 20V6M15 20v-9M20 20V4"/>',
  '<path d="M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9"/>',
  '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  '<path d="M5 18h14l1-9-4.5 3L12 5l-3.5 7L4 9z"/>',
  '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z"/>',
  '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
];
const gIdx = s => GROUPS.indexOf(s.g);
const si = (s, cls='') => `<span class="si gi${gIdx(s)} ${cls}">${sv(GI[gIdx(s)])}</span>`;

// ---------- 상태 & 라우터 ----------
// 해시: #<안>/<페이지>[/<id>][?o=<오버레이>]   오버레이: content:3 | skill:2 | login | galaxy:2
const VIEWS = ['cur','a','b','c'];
const PAGE_KEYS = ['home','contents','content','skills','skill','login'];
let S = {v:'a', page:'home', id:null, o:null};
const F = {cat:'전체', type:'전체', price:'전체', sort:'pop', q:'', view:'grid', group:'전체', bsk:2, bskTab:'info'};
let lastKey = '', lastShell = '';

function parse(){
  const h = decodeURIComponent(location.hash.slice(1));
  const [path, qs] = h.split('?');
  const [v, page, id] = (path||'').split('/');
  return { v:VIEWS.includes(v)?v:(store.get('hu3-v')||'a'), page:PAGE_KEYS.includes(page)?page:'home', id:id||null, o:new URLSearchParams(qs||'').get('o') };
}
const href = (st={}) => { const s={...S,...st}; return `#${s.v}/${s.page}${s.id?'/'+s.id:''}${s.o?'?o='+s.o:''}`; };
const go = st => { const h = href(st); if (location.hash===h) render(); else location.hash = h; };

// 안별 상세 노출: A=페이지, B=드로어, C=모달
const openContent = id => S.v==='a' ? go({page:'content', id, o:null}) : go({o:'content:'+id});
const openSkill   = id => S.v==='a' ? go({page:'skill', id, o:null})   : go({o:'skill:'+id});
const openLogin   = () => S.v==='c' ? go({o:'login'}) : go({page:'login', id:null, o:null});
const openGalaxy  = (id=2) => go({o:'galaxy:'+id});
const closeOv     = () => go({o:null});

// ---------- HDS 기반 공통 조각 ----------
// 썸네일: 로딩 중 스켈레톤 → 로드되면 페이드인 (실패 시 회색 면 유지)
const th = (src, cls='', inner='') => `<div class="th ${cls} ${src?'':'ok'}">${inner}${src?`<img src="${src}" alt="" loading="lazy" decoding="async" onload="this.parentNode.classList.add('ok')" onerror="this.parentNode.classList.add('ok');this.remove()">`:''}</div>`;
// 빈 상태
const emptyState = (title='조건에 맞는 콘텐츠가 없어요', desc='필터를 줄이거나 다른 검색어로 찾아보세요', reset=true) => `<div class="empty-st"><span class="si lg gi4">${I.search}</span><b>${title}</b><p>${desc}</p>${reset?'<button class="btn outline" data-reset>필터 초기화</button>':''}</div>`;
const TYPE_BADGE = {'과정':'normal','아티클':'info','영상':'warning','카드뉴스':'success'};
const badge = (t, kind) => `<span class="badge ${kind||TYPE_BADGE[t]||'normal'}">${t}</span>`;
const typeBadge = c => badge(c.type);
const priceHTML = c => c.p==='무료' ? '<span class="pr free">무료</span>' : c.p==='멤버십 전용' ? '<span class="pr mem">멤버십</span>' : c.p ? `<span class="pr">${c.p}</span>` : '<span class="pr mem c60 w5">바로 보기</span>';
const metaHTML = (c, withPrice=false) => [withPrice?priceHTML(c):'', `<span class="num">${c.t}</span>`, c.n?`<span><span class="num">${c.n}</span>명 학습</span>`:''].filter(Boolean).join('<span class="dot"></span>');
const skTags = (c, n=2, cls='') => `<div class="tags">${c.sk.slice(0,n).map(k=>`<span class="tag ${cls}">${k}</span>`).join('')}</div>`;
const chg = ['▲2','NEW','▲1','–','▼1','▲3','–','▼2','NEW'];
const chgBadge = x => x==='NEW' ? badge('NEW','info') : x.startsWith('▲') ? badge(x,'brand') : x.startsWith('▼') ? badge(x,'normal') : '';
const descOf = c => c.d || `${c.title}에서 다루는 핵심을 ${c.type==='과정'?'단계별 강의와 실습으로':'짧고 밀도 있게'} 정리했어요. 실무에 바로 적용할 수 있는 관점과 사례를 함께 담았어요.`;
const relatedOf = (c, n=4) => CONTENTS.filter(x=>x.id!==c.id && (x.cat===c.cat || x.sk.some(k=>c.sk.includes(k)))).slice(0,n);
const skillDesc = s => s.id===1
  ? '기업의 목표와 시장 환경을 반영해 장기적인 브랜드 방향과 차별화된 가치를 설계하는 역량이에요. 타깃 고객, 경쟁 구도, 브랜드 약속을 정의하고 커뮤니케이션과 경험 전반에 일관되게 녹여내요.'
  : GROUP_DESC[s.g];
const relatedSkills = s => {
  const fromC = [...new Set(contentsOfSkill(s).flatMap(c=>c.sk))].filter(k=>k!==s.k).map(skillByName).filter(Boolean);
  return [...fromC, ...SKILLS.filter(x=>x.g===s.g && x.id!==s.id && !fromC.includes(x))].slice(0,8);
};
const topSkills = n => [...SKILLS].sort((a,b)=>b.n-a.n).slice(0,n);
const skillPtsHTML = c => `<div class="skp">${skillPts(c).map(({s,pt})=>`<button data-s="${s.id}">${si(s,'sm')}<span class="t16 w5">${s.k}</span><span class="bar"><i style="width:${Math.min(100,pt)}%"></i></span><span class="pt">+${pt}pt</span></button>`).join('')}</div>`;
const currHTML = c => `<ol class="curr">${CURRICULUM(c).map((t,i)=>`<li><span class="n">${String(i+1).padStart(2,'0')}</span><span>${t}</span><span class="d">${c.type==='과정'?`${18+i*7}분`:''}</span></li>`).join('')}</ol>`;
const factsKV = c => `<dl class="kv"><dt>형태</dt><dd>${c.type==='과정'?'온라인 강의':c.type}</dd><dt>학습 시간</dt><dd class="num">${c.t}</dd><dt>수강 기간</dt><dd>${c.type==='과정'?'제한 없음':'-'}</dd><dt>수료</dt><dd>${c.type==='과정'?'이수증 발급':'-'}</dd><dt>카테고리</dt><dd>${c.cat}</dd></dl>`;
const bigPrice = c => c.p==='무료' ? `<span class="pr free t28">무료</span>${c.was?`<span class="t14 c45" style="text-decoration:line-through">${c.was}</span>`:''}` : c.p ? `<span class="pr t28">${c.p}</span>` : `<span class="pr t28">바로 보기</span>`;

// 콘텐츠 필터
function filtered(){
  let list = CONTENTS.filter(c =>
    (F.cat==='전체' || c.cat===F.cat) && (F.type==='전체' || c.type===F.type) &&
    (F.price==='전체' || (F.price==='무료' ? c.p==='무료' : F.price==='멤버십' ? c.p==='멤버십 전용' : (c.p && c.p.endsWith('원')))) &&
    (!F.q || (c.title+c.cat+c.sk.join()).toLowerCase().includes(F.q.toLowerCase())));
  if (F.sort==='pop') list = [...list].sort((a,b)=>b.n-a.n || a.id-b.id);
  if (F.sort==='new') list = [...list].sort((a,b)=>b.id-a.id);
  if (F.sort==='time') list = [...list].sort((a,b)=>mins(a.t)-mins(b.t));
  return list;
}
const mins = t => { const h=+(t.match(/(\d+)시간/)||[0,0])[1], m=+(t.match(/(\d+)분/)||[0,0])[1]; return h*60+m || 5; };

// ---------- 셸: 안마다 다른 GNB, 기능은 동일 ----------
const NAV = [['home','홈',I.home],['contents','콘텐츠',I.play],['careers','커리어',I.brief],['skills','스킬',I.bolt]];
const navHref = k => k==='careers' ? 'javascript:void 0' : href({page:k, id:null, o:null});
const navAttr = k => k==='careers' ? 'data-toast="커리어 페이지는 시안 범위 밖이에요"' : `data-nav="${k}"`;
function renderShell(){
  const v = S.v;
  const hp = `<div class="hp"><button class="hl" id="hpBtn" aria-expanded="false" aria-haspopup="menu">HU Plus ${I.down}</button>
    <div class="hp-menu" id="hpMenu" role="menu">${HU_PLUS.map(x=>`<a role="menuitem" href="${x.href}" target="_blank" rel="noopener"><span><b>${x.k}</b><small>${x.d}</small></span><span class="ext">${I.ext}</span></a>`).join('')}</div></div>`;
  const right = `<div class="hdr-links">
      ${v==='c'?`<button class="gicon c-search" data-csearch aria-label="검색">${I.search}</button>`:''}
      ${hp}<a class="hl" href="${HRD_URL}" target="_blank" rel="noopener">기업교육 ${I.ext}</a>
      <button class="btn primary xs" data-login style="margin-left:var(--spacing-2)">로그인</button>
      <button class="gicon mbtn" data-msheet aria-label="메뉴">${I.menu}</button></div>`;
  const search = `<form class="input" data-qform role="search">${I.search}<input name="q" placeholder="나에게 필요한 학습을 검색해보세요" autocomplete="off"></form>`;
  $('#hdr').innerHTML = `<div class="wrap">
    <div class="hdr-row"><a class="logo" href="${href({page:'home',id:null,o:null})}"><i></i>Hunet University</a>
      ${v==='c' ? `<nav class="c-nav">${NAV.map(([k,l])=>`<a href="${navHref(k)}" ${navAttr(k)} data-navkey="${k}">${l}</a>`).join('')}</nav>` : search}
      ${right}</div>
    <nav class="navrow"><div class="tabs">${NAV.map(([k,l])=>`<a class="tab" href="${navHref(k)}" ${navAttr(k)} data-navkey="${k}">${l}</a>`).join('')}</div><span class="sp"></span>
      <a class="ghost" data-login>마이클래스</a><a class="ghost" data-toast="프리미엄 콘텐츠는 시안 범위 밖이에요">프리미엄</a></nav></div>`;
  $('#rail').innerHTML = NAV.map(([k,l,ic])=>`<a class="rl" href="${navHref(k)}" ${navAttr(k)} data-navkey="${k}">${ic}${l}</a>`).join('')
    + `<a class="rl" data-login>${I.user}마이</a><a class="rl sep" data-toast="프리미엄 콘텐츠는 시안 범위 밖이에요">${I.trophy}프리미엄</a>`;
  $('#tabbar').innerHTML = NAV.map(([k,l,ic])=>`<a href="${navHref(k)}" ${navAttr(k)} data-navkey="${k}">${ic}${l}</a>`).join('') + `<a data-login>${I.user}마이</a>`;
  $('#msheet').innerHTML = `<div class="dim" data-msheet></div><div class="panel">
    <div style="display:flex;align-items:center;justify-content:space-between"><span class="logo"><i></i>Hunet University</span><button class="gicon" data-msheet aria-label="닫기">${I.x}</button></div>
    ${search}
    <div><h4>HU Plus</h4>${HU_PLUS.map(x=>`<a class="ml" href="${x.href}" target="_blank" rel="noopener"><span>${x.k} <small>${x.d}</small></span>${I.ext}</a>`).join('')}</div>
    <div><h4>휴넷</h4><a class="ml" href="${HRD_URL}" target="_blank" rel="noopener">기업교육 ${I.ext}</a><a class="ml" data-toast="프리미엄 콘텐츠는 시안 범위 밖이에요">프리미엄 콘텐츠</a></div>
    <button class="btn primary md full" data-login>로그인</button></div>`;
  $('#hpBtn')?.addEventListener('click', e => { e.stopPropagation(); const m=$('#hpMenu'); const on=!m.classList.contains('open'); m.classList.toggle('open',on); e.currentTarget.setAttribute('aria-expanded',on); });
  bindQForms(document.body);
}
function syncShell(){
  const key = {home:'home',contents:'contents',content:'contents',skills:'skills',skill:'skills'}[S.page];
  $$('[data-navkey]').forEach(a=>a.classList.toggle('on', a.dataset.navkey===key));
  $$('.proto [data-view]').forEach(b=>b.setAttribute('aria-selected', b.dataset.view===S.v));
  $$('[data-qform] input').forEach(i=>{ if (document.activeElement!==i) i.value=F.q; });
}
function bindQForms(root){
  $$('[data-qform]', root).forEach(f => { if (f.dataset.bound) return; f.dataset.bound=1; f.addEventListener('submit', e => { e.preventDefault(); F.q = f.querySelector('input').value.trim(); F.cat='전체'; F.type='전체'; F.price='전체'; $('#msheet').classList.remove('open'); go({page:'contents', id:null, o:null}); }); });
}

// ---------- 오버레이 ----------
function renderOverlay(){
  const root = $('#ov');
  if (!S.o || S.v==='cur'){ root.innerHTML=''; document.body.classList.remove('lock'); return; }
  const [kind, id] = S.o.split(':');
  document.body.classList.add('lock');
  if (kind==='galaxy'){
    root.innerHTML = `<div class="gx" role="dialog" aria-modal="true" aria-label="스킬 갤럭시"><div class="gx-h"><h2>스킬 갤럭시</h2><span class="cr" id="gxCr"></span><button class="gicon" data-close aria-label="닫기">${I.x}</button></div><div class="gxe" id="gxFull" style="position:absolute;inset:0"></div></div>`;
    mountGalaxy($('#gxFull'), +id||2, {crumb:true}); return;
  }
  const P = PAGES[S.v];
  let html = '';
  if (kind==='content' && byId(id)) html = P.contentOverlay(byId(id));
  else if (kind==='skill' && skillById(id)) html = P.skillOverlay(skillById(id));
  else if (kind==='login') html = `<div class="dim" data-close></div><div class="modal sm" role="dialog" aria-modal="true"><button class="gicon md-x" data-close aria-label="닫기">${I.x}</button><div class="md-b" style="padding:var(--spacing-10) var(--spacing-8)">${loginBody()}</div></div>`;
  root.innerHTML = html;
  $$('#ov [data-gx-mini]').forEach(el=>mountGalaxy(el, +el.dataset.gxMini, {mini:true}));
  root.querySelector('.dr-b,.md-b')?.scrollTo(0,0);
}
const loginBody = () => `<div class="login" style="margin:0 auto">
  <span class="logo" style="justify-content:center"><i></i>Hunet University</span>
  <h1>배움이 커리어가 되는 곳,<br>휴넷 유니버시티</h1>
  <p>새 계정을 만들거나 SNS 계정으로 간편하게 시작하세요.</p>
  <div class="sns">${[['kakao','●','카카오로 계속하기'],['naver','N','네이버로 계속하기'],['google','G','Google로 계속하기'],['apple','','Apple로 계속하기']].map(([c,i,l])=>`<button class="${c}" data-toast="프로토타입이라 실제 로그인은 동작하지 않아요"><span class="ico">${i}</span>${l}</button>`).join('')}</div>
  <div class="or">또는</div>
  <button class="btn neutral md full" data-toast="프로토타입이라 실제 로그인은 동작하지 않아요">이메일로 계속하기</button>
  <p class="foot">계속하면 <a href="javascript:void 0">이용약관</a> 및 <a href="javascript:void 0">개인정보 처리방침</a>에 동의하는 것으로 간주돼요.</p></div>`;

// =========================================================
// 스킬 갤럭시 — 중심 스킬 / 내곽 관련 스킬 / 외곽 콘텐츠·커리어 (HDS 상태색)
// =========================================================
const GX = {skill:'#00BF40', content:'#3385FF', career:'#FF9200'};
function galaxyModel(sid){
  const s = skillById(sid) || SKILLS[1];
  const skills = relatedSkills(s).slice(0,8), cs = contentsOfSkill(s).slice(0,8), cars = careersOfSkill(s).slice(0,4);
  const nodes = [];
  skills.forEach((x,i)=>nodes.push({t:'skill', id:x.id, label:x.k, a:(i/skills.length)*Math.PI*2 - Math.PI/2 + .2, r:178}));
  const cc = cs.map(c=>({t:'content', id:c.id, label:c.title, img:c.img})), cr = cars.map(c=>({t:'career', id:c.id, label:c.k, img:c.img}));
  const mixed = []; const step = cr.length ? Math.max(1, Math.round(cc.length/cr.length)) : 99;
  while (cc.length || cr.length){ for(let k=0;k<step && cc.length;k++) mixed.push(cc.shift()); if(cr.length) mixed.push(cr.shift()); }
  mixed.forEach((o,i)=>{ o.a=(i/mixed.length)*Math.PI*2 - Math.PI/2; o.r = 330 + (i%2?28:-6); nodes.push(o); });
  nodes.forEach(n=>{ n.x=Math.cos(n.a)*n.r; n.y=Math.sin(n.a)*n.r; });
  return {s, nodes, counts:{skill:skills.length, content:mixed.filter(n=>n.t==='content').length, career:mixed.filter(n=>n.t==='career').length}};
}
const trunc = (t,n) => t.length>n ? t.slice(0,n-1)+'…' : t;
const giSvg = (s, size, col) => `<svg x="${-size/2}" y="${-size/2}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="stroke:${col}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${GI[gIdx(s)]}</svg>`;
function galaxySVG(m, uid){
  const link = n => { const mx=n.x/2 - n.y*.18, my=n.y/2 + n.x*.18; return `<path class="gl-link l-${n.t}" data-for="${n.t}:${n.id}" d="M0 0 Q${mx.toFixed(1)} ${my.toFixed(1)} ${n.x.toFixed(1)} ${n.y.toFixed(1)}"/>`; };
  const node = (n,i) => {
    const col = GX[n.t], tr = `transform="translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})"`;
    if (n.t==='skill') return `<g class="gn gn-skill" data-gt="skill" data-gid="${n.id}" ${tr}><circle class="halo" r="34" fill="${col}" opacity=".18"/><circle class="core" r="24"/><circle class="ring" r="24"/>${giSvg(skillById(n.id),20,col)}<text y="44">${trunc(n.label,10)}</text></g>`;
    const r = n.t==='content' ? 27 : 25;
    return `<g class="gn gn-${n.t}" data-gt="${n.t}" data-gid="${n.id}" ${tr}><defs><clipPath id="cp${uid}-${i}"><circle r="${r}"/></clipPath></defs><circle class="halo" r="${r+10}" fill="${col}" opacity=".2"/><circle class="nbg" r="${r}"/><image href="${n.img}" x="${-r*1.6}" y="${-r}" width="${r*3.2}" height="${r*2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#cp${uid}-${i})"/><circle class="ring" r="${r}"/><text y="${r+18}">${trunc(n.label,12)}</text></g>`;
  };
  return `<svg viewBox="-600 -455 1200 950" preserveAspectRatio="xMidYMid meet" aria-label="${m.s.k} 스킬 갤럭시">
    <defs><radialGradient id="cg${uid}"><stop offset="0" stop-color="#00BF40" stop-opacity=".3"/><stop offset="1" stop-color="#00BF40" stop-opacity="0"/></radialGradient></defs>
    <g class="gz"><circle class="orb" r="178"/><circle class="orb" r="340"/>
      ${m.nodes.map(link).join('')}${m.nodes.map(node).join('')}
      <g class="gn gn-center" data-gt="center" data-gid="${m.s.id}"><circle r="120" fill="url(#cg${uid})"/><circle class="pulse" r="46" stroke-width="2"/><circle class="pulse p2" r="46" stroke-width="2"/><circle class="cc" r="46" stroke="#00BF40" stroke-width="3"/>${giSvg(m.s,36,'var(--gx-ico)')}<text y="72">${m.s.k}</text></g>
    </g></svg>`;
}
let gxSeq = 0;
function mountGalaxy(el, sid, opts={}){
  const uid = ++gxSeq, first = sid;
  const st = {sid, k:1, x:0, y:0, hide:{}};
  el.classList.add('gxe'); if (opts.mini) el.classList.add('gx-mini');
  el.innerHTML = `<div class="gx-stage"></div>${opts.mini?'':`
    <div class="gx-leg">${['skill','content','career'].map(t=>`<button data-leg="${t}"><i style="background:${GX[t]}"></i>${{skill:'스킬',content:'콘텐츠',career:'커리어'}[t]} <small></small></button>`).join('')}</div>
    <div class="gx-tools"><form>${I.search}<input list="gxl${uid}" placeholder="스킬 검색" aria-label="스킬 검색"><datalist id="gxl${uid}">${SKILLS.map(s=>`<option value="${s.k}">`).join('')}</datalist></form><span class="sep"></span>
      <button data-act="out" aria-label="축소">${I.minus}</button><button data-act="in" aria-label="확대">${I.plus}</button><button data-act="fit" aria-label="가운데로">${I.target}</button><button data-act="home" aria-label="처음 스킬로">${I.reset}</button></div>
    <div class="gx-info"></div>`}`;
  const stage = $('.gx-stage', el), info = $('.gx-info', el);
  const apply = () => $('.gz',stage)?.setAttribute('transform',`translate(${st.x} ${st.y}) scale(${st.k})`);
  const draw = () => {
    const m = galaxyModel(st.sid);
    stage.innerHTML = galaxySVG(m, uid); apply();
    if (opts.mini) return;
    $$('[data-leg]', el).forEach(b=>{ b.querySelector('small').textContent = m.counts[b.dataset.leg]; b.classList.toggle('off', !!st.hide[b.dataset.leg]); });
    Object.keys(st.hide).forEach(t=>st.hide[t] && $$(`.gn-${t}, .l-${t}`, stage).forEach(n=>n.style.display='none'));
    if (opts.crumb) $('#gxCr').innerHTML = `· <b>${m.s.k}</b> 중심으로 보는 중`;
    info.classList.remove('on');
    opts.onChange?.(m.s);
  };
  const recenter = id => { st.sid=id; st.x=0; st.y=0; st.k=1; stage.style.transition='opacity .14s'; stage.style.opacity=0; setTimeout(()=>{ draw(); stage.style.opacity=1; },140); };
  draw();
  const api = {recenter, get sid(){return st.sid}};
  el._gx = api;
  if (opts.mini) return api;

  const showInfo = (t, id) => {
    let h='';
    if (t==='skill'){ const s=skillById(id); h=`<span class="k" style="color:${GX.skill}">스킬</span><h4>${s.k}</h4><p><span class="num">${s.n.toLocaleString()}</span>명 학습 · ${s.g}</p><div style="display:flex;gap:var(--spacing-2)"><button class="btn primary xs" data-gx-go="${id}">중심으로 보기</button><button class="btn outline xs" data-s="${id}">스킬 상세</button></div>`; }
    if (t==='content'){ const c=byId(id); h=`${th(c.img)}<span class="k" style="color:${GX.content}">${c.type}</span><h4>${c.title}</h4><p>${[c.p,c.t].filter(Boolean).join(' · ')}</p><button class="btn primary xs" data-c="${c.id}">콘텐츠 보기</button>`; }
    if (t==='career'){ const c=CAREERS.find(x=>x.id==id); h=`${th(c.img)}<span class="k" style="color:${GX.career}">커리어</span><h4>${c.k}</h4><p>${c.e} · 필요 스킬 ${c.sk.length}개</p><button class="btn outline xs" data-toast="커리어 페이지는 시안 범위 밖이에요">커리어 보기</button>`; }
    info.innerHTML = h; info.classList.add('on');
  };
  stage.addEventListener('pointerover', e => { const n=e.target.closest('.gn'); if(!n||n.dataset.gt==='center') return; stage.classList.add('gx-dim'); n.classList.add('hl'); $(`.gl-link[data-for="${n.dataset.gt}:${n.dataset.gid}"]`, stage)?.classList.add('hl'); });
  stage.addEventListener('pointerout', e => { const n=e.target.closest('.gn'); if(!n) return; stage.classList.remove('gx-dim'); n.classList.remove('hl'); $$('.gl-link.hl', stage).forEach(l=>l.classList.remove('hl')); });
  // 드래그 이동 + 두 손가락 확대
  const pts = new Map(); let drag=null, moved=false, pinch=null;
  const scale = () => 1200 / ($('svg',stage)?.clientWidth || 1200);
  stage.addEventListener('pointerdown', e => { pts.set(e.pointerId,{x:e.clientX,y:e.clientY}); moved=false;
    if (pts.size===2){ const [a,b]=[...pts.values()]; pinch={d:Math.hypot(a.x-b.x,a.y-b.y), k:st.k}; drag=null; }
    else drag={x:e.clientX, y:e.clientY, ox:st.x, oy:st.y}; });
  stage.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return; pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if (pinch && pts.size===2){ const [a,b]=[...pts.values()]; st.k=Math.min(2.4,Math.max(.5,pinch.k*Math.hypot(a.x-b.x,a.y-b.y)/pinch.d)); moved=true; stage.classList.add('wheel'); apply(); return; }
    if (!drag) return; const dx=(e.clientX-drag.x)*scale(), dy=(e.clientY-drag.y)*scale();
    if (Math.abs(dx)+Math.abs(dy)>4){ moved=true; stage.classList.add('drag'); stage.setPointerCapture?.(e.pointerId); }
    st.x=drag.ox+dx; st.y=drag.oy+dy; apply(); });
  const up = e => { pts.delete(e.pointerId); if (pts.size<2) pinch=null; if (!pts.size){ drag=null; stage.classList.remove('drag','wheel'); } };
  stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
  stage.addEventListener('click', e => {
    if (moved) return;
    const n = e.target.closest('.gn'); if (!n){ info.classList.remove('on'); return; }
    const t=n.dataset.gt, id=+n.dataset.gid; if (t==='center') return;
    if (t==='skill' && info.classList.contains('on') && info.dataset.cur===`skill:${id}`) return recenter(id);
    info.dataset.cur=`${t}:${id}`; showInfo(t,id);
  });
  stage.addEventListener('dblclick', e => { const n=e.target.closest('.gn-skill'); if(n) recenter(+n.dataset.gid); });
  stage.addEventListener('wheel', e => { e.preventDefault(); st.k=Math.min(2.4,Math.max(.5,st.k*(e.deltaY<0?1.1:.9))); stage.classList.add('wheel'); apply(); clearTimeout(st.wt); st.wt=setTimeout(()=>stage.classList.remove('wheel'),120); }, {passive:false});
  el.addEventListener('click', e => {
    const a=e.target.closest('[data-act]'); if (a){ const k=a.dataset.act; if(k==='in') st.k=Math.min(2.4,st.k*1.2); if(k==='out') st.k=Math.max(.5,st.k/1.2); if(k==='fit'){st.k=1;st.x=0;st.y=0;} if(k==='home') return recenter(first); apply(); }
    const g=e.target.closest('[data-gx-go]'); if (g) recenter(+g.dataset.gxGo);
    const l=e.target.closest('[data-leg]'); if (l){ st.hide[l.dataset.leg]=!st.hide[l.dataset.leg]; draw(); }
  });
  const f = $('.gx-tools form', el);
  f.addEventListener('submit', e => { e.preventDefault(); const v=f.querySelector('input').value.trim(); const s=SKILLS.find(x=>x.k===v)||SKILLS.find(x=>x.k.includes(v)); if(s){ recenter(s.id); f.reset(); } else toast('일치하는 스킬이 없어요'); });
  f.querySelector('input').addEventListener('change', e => { const s=SKILLS.find(x=>x.k===e.target.value); if(s){ recenter(s.id); e.target.value=''; } });
  return api;
}

// ---------- 토스트 ----------
let toastT;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),1800); }

// ---------- 테마: 세 안 모두 라이트 기본, 툴바에서 다크 토글 ----------
function applyTheme(){
  const t = store.get('hu3-theme')||'light';
  document.documentElement.setAttribute('data-theme', t);
  const tg = $('#tgTheme'); tg.setAttribute('aria-pressed', t==='dark');
}

// ---------- 렌더 ----------
function render(){
  S = parse();
  if (S.v!=='a' && S.v!=='cur' && (S.page==='content'||S.page==='skill')) return go({page:S.page==='content'?'contents':'skills', id:null, o:`${S.page}:${S.id}`});
  if (S.v==='c' && S.page==='login') return go({page:'home', id:null, o:'login'});
  store.set('hu3-v', S.v);
  document.body.dataset.v = S.v;
  applyTheme();
  if (lastShell!==S.v){ renderShell(); lastShell=S.v; }
  const key = `${S.v}/${S.page}/${S.id}`;
  $('#main').innerHTML = S.v==='cur' ? renderCur() : (PAGES[S.v][S.page] || PAGES[S.v].home)(S.id);
  if (key!==lastKey){ scrollTo(0,0); lastKey=key; }
  syncShell();
  $$('#main [data-gx-mini]').forEach(el=>mountGalaxy(el, +el.dataset.gxMini, {mini:true}));
  PAGES[S.v]?.after?.();
  bindQForms($('#main'));
  renderOverlay();
}

// ---------- 전역 이벤트 ----------
document.addEventListener('click', e => {
  const t = e.target;
  if (!t.closest('.hp')){ $('#hpMenu')?.classList.remove('open'); $('#hpBtn')?.setAttribute('aria-expanded','false'); }
  const c = t.closest('[data-c]'); if (c && !t.closest('.gx-stage')) { e.preventDefault(); $('#msheet').classList.remove('open'); return openContent(+c.dataset.c); }
  const s = t.closest('[data-s]'); if (s && !t.closest('.gx-stage')) { e.preventDefault(); return openSkill(+s.dataset.s); }
  if (t.closest('[data-login]')) { e.preventDefault(); $('#msheet').classList.remove('open'); return openLogin(); }
  const g = t.closest('[data-galaxy]'); if (g) { e.preventDefault(); return openGalaxy(+g.dataset.galaxy||2); }
  if (t.closest('[data-close]')) { e.preventDefault(); return closeOv(); }
  if (t.closest('[data-msheet]')) { e.preventDefault(); return $('#msheet').classList.toggle('open'); }
  if (t.closest('[data-csearch]')) { e.preventDefault(); F.q=''; return go({page:'contents', id:null, o:null}); }
  const n = t.closest('[data-nav]'); if (n) { e.preventDefault(); if (n.dataset.nav==='contents') F.q=''; return go({page:n.dataset.nav, id:null, o:null}); }
  const ts = t.closest('[data-toast]'); if (ts) { e.preventDefault(); return toast(ts.dataset.toast); }
  if (t.closest('[data-reset]')) { e.preventDefault(); Object.assign(F, {cat:'전체', type:'전체', price:'전체', q:''}); return render(); }
  const f = t.closest('[data-f]'); if (f) { const i=f.dataset.f.indexOf('='); F[f.dataset.f.slice(0,i)] = f.dataset.f.slice(i+1); return render(); }
});
document.addEventListener('keydown', e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
  if (e.key==='Escape'){ if ($('#msheet').classList.contains('open')) return $('#msheet').classList.remove('open'); if (S.o) return closeOv(); }
  if (e.key==='Enter' && document.activeElement?.matches('[data-c]')) return openContent(+document.activeElement.dataset.c);
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  const i = '1234'.indexOf(e.key); if (i>-1) go({v:VIEWS[i], o:null});
});
document.addEventListener('change', e => { const f=e.target.closest('[data-fsel]'); if(f){ F[f.dataset.fsel]=f.value; render(); } });
addEventListener('hashchange', render);

function initProto(){
  $('.proto .seg').addEventListener('click', e => { const b=e.target.closest('[data-view]'); if(b) go({v:b.dataset.view, o:null}); });
  $('#tgTheme').onclick = () => { store.set('hu3-theme', document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); applyTheme(); };
}
