// =========================================================
// HU 홈 개선 시안 — 공통 로직 (라우터 · 셸 · 컴포넌트 · 오버레이 · 스킬 갤럭시)
// =========================================================
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const store = { get:k=>{try{return localStorage.getItem(k)}catch(e){return null}}, set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}} };

// ---------- 아이콘 ----------
const I = {
  search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  ext:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 3h7v7M13 3 4 12"/></svg>',
  down:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="m4 6 4 4 4-4"/></svg>',
  x:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  back:'<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 3 5 8l5 5"/></svg>',
  heart:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  share:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 15V3m0 0L7 8m5-5 5 5M5 13v6h14v-6"/></svg>',
  galaxy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="6" r="1.6"/><circle cx="19.5" cy="7" r="1.6"/><circle cx="18" cy="19" r="1.6"/><circle cx="5" cy="18" r="1.6"/><path d="M6 7l3.6 3.2M18 8.2l-3.6 2.6M16.8 17.8l-2.7-3.6M6.4 16.9l3.4-2.7" stroke-linecap="round"/></svg>',
  minus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  target:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg>',
  reset:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg>',
  // 사이드바
  home:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-6h4v6"/></svg>',
  play:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="M10.5 9.5v5l4-2.5z" fill="currentColor"/></svg>',
  brief:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="7" width="17" height="12" rx="2.5"/><path d="M9 7V5.5h6V7"/></svg>',
  bolt:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M13 3 5 13h6l-1 8 8-10h-6z"/></svg>',
  note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M9 8h6M9 12h6M9 16h3" stroke-linecap="round"/></svg>',
  trophy:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1.5A3 3 0 0 0 8 10.5M16 6h3v1.5a3 3 0 0 1-3 3M12 13v4M8.5 20h7"/></svg>',
  gear:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" stroke-linecap="round"/></svg>'
};
// 스킬 그룹별 아이콘 (GROUPS 순서)
const GI = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14V10l12-5v14L4 14zM16 9h2a2 2 0 0 1 0 4h-2M7 14.5 8.5 19"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 20V12M10 20V6M15 20v-9M20 20V4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 18h14l1-9-4.5 3L12 5l-3.5 7L4 9z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></svg>'
];
const gIdx = s => GROUPS.indexOf(s.g);
const skIco = (s, cls='') => `<span class="sk-ico g${gIdx(s)} ${cls}">${GI[gIdx(s)]}</span>`;

// ---------- 상태 & 라우터 ----------
// 해시 형식: #<안>/<페이지>[/<id>][?o=<오버레이>]   오버레이: content:3 | skill:2 | login | galaxy:2
const VIEWS = ['cur','a','b','c'];
const PAGE_KEYS = ['home','contents','content','skills','skill','login'];
let S = {v:'a', page:'home', id:null, o:null};
const F = {cat:'전체', type:'전체', price:'전체', sort:'pop', q:'', view:'grid', group:'전체', skq:'', skView:'list', career:1};
let lastPageKey = '';

function parse(){
  const h = decodeURIComponent(location.hash.slice(1));
  const [path, qs] = h.split('?');
  const [v, page, id] = (path||'').split('/');
  return { v:VIEWS.includes(v)?v:(store.get('hu2-v')||'a'), page:PAGE_KEYS.includes(page)?page:'home', id:id||null, o:new URLSearchParams(qs||'').get('o') };
}
function href(st={}){
  const s = {...S, ...st};
  return `#${s.v}/${s.page}${s.id?'/'+s.id:''}${s.o?'?o='+s.o:''}`;
}
const go = st => { const h = href(st); if (location.hash===h) render(); else location.hash = h; };

// 안별 상세 노출 방식: A=페이지, B=드로어, C=모달
const openContent = id => S.v==='a' ? go({page:'content', id, o:null}) : go({o:'content:'+id});
const openSkill   = id => S.v==='a' ? go({page:'skill', id, o:null})   : go({o:'skill:'+id});
const openLogin   = () => S.v==='c' ? go({o:'login'}) : go({page:'login', id:null, o:null});
const openGalaxy  = (id=2) => go({o:'galaxy:'+id});
const closeOv     = () => go({o:null});

// ---------- 공통 컴포넌트 ----------
const th = (src, cls='', tag='') => `<div class="th ${cls}">${tag}${src?`<img src="${src}" alt="" loading="lazy" decoding="async" onerror="this.remove()">`:''}</div>`;
const priceHTML = c => c.p==='무료' ? '<span class="free-s">무료</span>' : c.p==='멤버십 전용' ? '<span class="mem-s">멤버십</span>' : c.p ? `<span class="price-s num">${c.p}</span>` : '';
const metaHTML = c => [priceHTML(c), c.t, c.n?`${c.n}명 학습`:''].filter(Boolean).join('<span class="dot"></span>');
const typeTag = c => `<span class="tag">${c.type}</span>`;

// 세로 카드: 유형은 썸네일 위, 가격·시간·인원은 한 줄 메타 → 높이 압축
const card = c => `<article class="card" data-c="${c.id}" tabindex="0">${th(c.img,'',typeTag(c))}<div class="card-b"><h3 class="card-t clamp2">${c.title}</h3><p class="card-m">${metaHTML(c)}</p></div></article>`;
// 가로 컴팩트 카드
const hcard = (c, lg=false) => `<article class="hc ${lg?'lg':''}" data-c="${c.id}" tabindex="0">${th(c.img)}<div class="card-b"><p class="card-m" style="gap:6px"><span class="tag">${c.type}</span>${c.cat}</p><h3 class="card-t clamp2">${c.title}</h3>${lg&&c.d?`<p class="desc clamp1">${c.d}</p>`:''}<p class="card-m">${metaHTML(c)}</p>${lg?`<div class="chips-s">${c.sk.slice(0,3).map(k=>`<span class="chip-s">${k}</span>`).join('')}</div>`:''}</div></article>`;
const chg = ['▲2','NEW','▲1','–','▼1'];
const chgCls = x => x.startsWith('▲')?'up':x.startsWith('▼')?'dn':x==='NEW'?'new':'';
const rank = (c,i) => `<article class="rk" data-c="${c.id}" tabindex="0"><span class="rk-no">${i+1}</span>${th(c.img)}<div class="card-b"><h3 class="card-t clamp2">${c.title}</h3><p class="card-m">${metaHTML(c)}<span class="dot"></span><span class="chg ${chgCls(chg[i]||'')}">${chg[i]||''}</span></p></div></article>`;
const skChip = (s, n=false) => `<button class="sk-chip" data-s="${s.id}">${skIco(s)}<span><b>${s.k}</b><small>${s.e}</small></span>${n?`<span class="sk-n num">${s.n.toLocaleString()}명</span>`:''}</button>`;
const skPill = s => `<button class="sk-pill" data-s="${s.id}">${skIco(s)}${s.k}</button>`;
const secHead = (t, d='', more='') => `<div class="sh"><div><h2 class="st">${t}</h2>${d?`<p class="sd">${d}</p>`:''}</div>${more}</div>`;
const more = (label, attr) => `<a class="more" href="javascript:void 0" ${attr}>${label}</a>`;
const note = t => `<div class="note"><b>설계 의도</b><span>${t}</span></div>`;
const priceCard = o => `<article class="pc">${th(o.img)}<div class="pc-b"><span class="card-m">${o.meta}</span><h3 class="pc-t">${o.t}</h3><p class="pc-d">${o.d}</p>
  <div class="pc-row">${o.price?`<del>${o.price.was}</del><span class="off">${o.price.off}</span><span class="amt">${o.price.now}</span>`:`<span class="amt" style="font-size:18px">가격 문의</span><span class="card-m">상담 후 안내</span>`}</div>
  <div class="pc-act"><button class="btn btn-p btn-sm" data-login>${o.price?'수강 신청':'상담 신청'}</button><button class="btn btn-s btn-sm" data-toast="프리미엄 과정 상세는 시안 범위 밖이에요">과정 소개</button></div></div></article>`;
const memberBand = (compact=false) => `<div class="member"><div><span class="kicker">HU 멤버십</span><h2>모든 스킬을<br>무제한으로 배우세요</h2><div class="pts"><span>1,200+ 콘텐츠</span><span>커리어 로드맵</span><span>언제든 해지</span></div></div><div><button class="btn btn-p btn-lg ${compact?'btn-w':''}" data-login>멤버십 시작하기</button></div></div>`;
const careerCard = c => `<button class="cc" data-career="${c.id}">${th(c.img)}<div class="cc-b"><b>${c.k}</b><small>${c.e}</small></div></button>`;
const carMini = c => `<div class="car-mini" data-toast="커리어 페이지는 시안 범위 밖이에요">${th(c.img)}<div><b>${c.k}</b><small>필요 스킬 ${c.sk.length}개</small></div></div>`;

// 콘텐츠 필터 (목록 페이지 공통)
function filtered(){
  let list = CONTENTS.filter(c =>
    (F.cat==='전체' || c.cat===F.cat) &&
    (F.type==='전체' || c.type===F.type) &&
    (F.price==='전체' || (F.price==='무료' ? c.p==='무료' : F.price==='멤버십' ? c.p==='멤버십 전용' : (c.p && c.p.endsWith('원')))) &&
    (!F.q || (c.title+c.cat+c.sk.join()).toLowerCase().includes(F.q.toLowerCase())));
  if (F.sort==='pop') list = [...list].sort((a,b)=>b.n-a.n || a.id-b.id);
  if (F.sort==='new') list = [...list].sort((a,b)=>b.id-a.id);
  return list;
}

// ---------- 콘텐츠 상세 조각 ----------
const buyFacts = c => {
  const facts = [['형태', c.type==='과정'?'온라인':c.type], ['학습 시간', c.t], ['수강 기간', c.type==='과정'?'제한 없음':'-'], ['수료', c.type==='과정'?'이수증 발급':'-']];
  return `<div class="facts">${facts.map(([k,v])=>`<div class="fact"><small>${k}</small><b>${v}</b></div>`).join('')}</div>`;
};
const buyPrice = c => c.p==='무료'
  ? `<div class="buy-price"><span class="amt free-big">무료</span>${c.was?`<del>${c.was}</del>`:''}</div>`
  : c.p==='멤버십 전용' ? `<div class="buy-price"><span class="amt">멤버십 전용</span></div>`
  : c.p ? `<div class="buy-price"><span class="amt">${c.p}</span></div>` : `<div class="buy-price"><span class="amt">바로 읽기</span></div>`;
const skillPtsHTML = c => `<div class="skpt">${skillPts(c).map(({s,pt})=>`<button data-s="${s.id}">${skIco(s)}<span><b>${s.k}</b><span class="bar"><i style="width:${Math.min(100,pt)}%"></i></span></span><span class="pt">+${pt}pt</span></button>`).join('')}</div>`;
const currHTML = c => `<ol class="curr">${CURRICULUM(c).map((t,i)=>`<li>${t}<span>${c.type==='과정'?`${18+i*7}분`:''}</span></li>`).join('')}</ol>`;
const descOf = c => c.d || `${c.title}에서 다루는 핵심 내용을 ${c.type==='과정'?'단계별 강의와 실습으로':'짧고 밀도 있게'} 정리했어요. 실무에 바로 적용할 수 있는 관점과 사례를 함께 담았어요.`;
const relatedOf = (c, n=4) => CONTENTS.filter(x=>x.id!==c.id && (x.cat===c.cat || x.sk.some(k=>c.sk.includes(k)))).slice(0,n);

// ---------- 스킬 상세 조각 ----------
const skillDesc = s => s.id===1
  ? '기업의 목표와 시장 환경을 반영해 장기적인 브랜드 방향과 차별화된 가치를 설계하는 역량이에요. 타깃 고객, 경쟁 구도, 브랜드 약속을 정의하고 이를 커뮤니케이션과 경험 전반에 일관되게 녹여내요.'
  : GROUP_DESC[s.g];
const relatedSkills = s => {
  const fromContents = [...new Set(contentsOfSkill(s).flatMap(c=>c.sk))].filter(k=>k!==s.k).map(skillByName).filter(Boolean);
  const same = SKILLS.filter(x=>x.g===s.g && x.id!==s.id && !fromContents.includes(x));
  return [...fromContents, ...same].slice(0,8);
};

// ---------- 셸 (GNB · 사이드바) ----------
function renderShell(){
  $('#gnb').innerHTML = `
    <a class="logo" href="${href({page:'home',id:null,o:null})}"><span class="mark"></span>Hunet University</a>
    <form class="gsearch" id="gsearch" role="search">${I.search}<input name="q" placeholder="나에게 필요한 학습을 검색해보세요" autocomplete="off"></form>
    <nav class="gnav">
      <div class="hp">
        <button class="gl hide-sm" id="hpBtn" aria-expanded="false" aria-haspopup="menu">HU Plus ${I.down}</button>
        <div class="hp-menu" id="hpMenu" role="menu">${HU_PLUS.map(x=>`<a role="menuitem" href="${x.href}" target="_blank" rel="noopener"><span class="hp-ico">${x.k.slice(0,2)}</span><span><b>${x.k}</b><small>${x.d}</small></span><span class="ext">${I.ext}</span></a>`).join('')}</div>
      </div>
      <a class="gl hide-sm" href="${HRD_URL}" target="_blank" rel="noopener">기업교육 ${I.ext}</a>
      <button class="btn btn-p btn-sm" data-login style="margin-left:8px">로그인</button>
    </nav>`;
  $('#side').innerHTML = `
    <a data-nav="home">${I.home}홈</a>
    <a data-nav="contents">${I.play}콘텐츠</a>
    <a data-toast="커리어 페이지는 시안 범위 밖이에요">${I.brief}커리어</a>
    <a data-nav="skills">${I.bolt}스킬</a>
    <div class="side-sep"></div>
    <a data-login>${I.note}마이클래스</a>
    <a data-toast="프리미엄 콘텐츠는 시안 범위 밖이에요">${I.trophy}프리미엄 콘텐츠</a>
    <a class="side-foot" data-toast="설정은 시안 범위 밖이에요">${I.gear}설정</a>`;
  $('#gsearch').addEventListener('submit', e => { e.preventDefault(); F.q = e.target.q.value.trim(); F.cat='전체'; F.type='전체'; F.price='전체'; go({page:'contents', id:null, o:null}); });
  $('#hpBtn').addEventListener('click', e => { e.stopPropagation(); const m=$('#hpMenu'); const on=!m.classList.contains('open'); m.classList.toggle('open',on); e.currentTarget.setAttribute('aria-expanded',on); });
  document.addEventListener('click', e => { if(!e.target.closest('.hp')){ $('#hpMenu')?.classList.remove('open'); $('#hpBtn')?.setAttribute('aria-expanded','false'); } });
}
function syncShell(){
  const navKey = {home:'home',contents:'contents',content:'contents',skills:'skills',skill:'skills'}[S.page];
  $$('#side [data-nav]').forEach(a=>a.classList.toggle('on', a.dataset.nav===navKey && S.v!=='cur'));
  $$('.proto [data-view]').forEach(b=>b.setAttribute('aria-selected', b.dataset.view===S.v));
  const gi = $('#gsearch input'); if (gi && document.activeElement!==gi) gi.value = F.q;
  const login = S.page==='login' && S.v!=='cur';
  $('#side').style.display = login ? 'none' : '';
  $('.layout').style.gridTemplateColumns = login ? '1fr' : '';
}

// ---------- 오버레이 ----------
function renderOverlay(){
  const root = $('#ov');
  if (!S.o || S.v==='cur'){ root.innerHTML=''; document.body.classList.remove('lock'); return; }
  const [kind, id] = S.o.split(':');
  document.body.classList.add('lock');
  if (kind==='galaxy'){ root.innerHTML = galaxyOverlay(); mountGalaxy($('#gxFull'), +id||2); return; }
  const P = PAGES[S.v];
  let html = '';
  if (kind==='content' && byId(id)) html = P.contentOverlay(byId(id));
  else if (kind==='skill' && skillById(id)) html = P.skillOverlay(skillById(id));
  else if (kind==='login') html = `<div class="scrim" data-close></div><div class="modal sm" role="dialog" aria-modal="true"><button class="x md-x" data-close aria-label="닫기">${I.x}</button><div class="md-b">${loginCard()}</div></div>`;
  root.innerHTML = html;
  $$('#ov [data-gx-mini]').forEach(el=>mountGalaxy(el, +el.dataset.gxMini, {mini:true}));
  root.querySelector('.dr-b,.md-b')?.scrollTo(0,0);
}

const loginCard = () => `<div class="login-card">
  <span class="logo"><span class="mark"></span>Hunet University</span>
  <h1>배움이 커리어가 되는 곳,<br>휴넷 유니버시티</h1>
  <p>새 계정을 만들거나 SNS 계정으로 간편하게 시작하세요.</p>
  <div class="sns">
    <button class="kakao" data-toast="프로토타입이라 실제 로그인은 동작하지 않아요"><span class="ico">●</span>카카오로 계속하기</button>
    <button class="naver" data-toast="프로토타입이라 실제 로그인은 동작하지 않아요"><span class="ico">N</span>네이버로 계속하기</button>
    <button class="google" data-toast="프로토타입이라 실제 로그인은 동작하지 않아요"><span class="ico">G</span>Google로 계속하기</button>
    <button class="apple" data-toast="프로토타입이라 실제 로그인은 동작하지 않아요"><span class="ico"></span>Apple로 계속하기</button>
  </div>
  <div class="or">또는</div>
  <button class="btn btn-p btn-lg btn-w" data-toast="프로토타입이라 실제 로그인은 동작하지 않아요">이메일로 계속하기</button>
  <p class="login-foot">계속하면 <a href="javascript:void 0">이용약관</a> 및 <a href="javascript:void 0">개인정보 처리방침</a>에 동의하는 것으로 간주돼요.</p>
</div>`;

// =========================================================
// 스킬 갤럭시 — 중심 스킬 + 관련 스킬(내곽) + 콘텐츠·커리어(외곽)
// =========================================================
const GX_COLOR = {skill:'#34D399', content:'#60A5FA', career:'#FBBF24'};
function galaxyModel(sid){
  const s = skillById(sid) || SKILLS[1];
  const skills = relatedSkills(s).slice(0,8);
  const cs = contentsOfSkill(s).slice(0,8);
  const cars = careersOfSkill(s).slice(0,4);
  const nodes = [];
  skills.forEach((x,i)=>{ const a=(i/skills.length)*Math.PI*2 - Math.PI/2 + .2; nodes.push({t:'skill', id:x.id, label:x.k, sub:x.e, a, r:178}); });
  const outer = [...cs.map(c=>({t:'content', id:c.id, label:c.title, sub:`${c.type} · ${c.t}`, img:c.img})), ...cars.map(c=>({t:'career', id:c.id, label:c.k, sub:c.e, img:c.img}))];
  // 콘텐츠와 커리어를 섞어 고르게 배치
  const mixed = []; const cc=[...outer.filter(o=>o.t==='content')], cr=[...outer.filter(o=>o.t==='career')];
  const step = cr.length ? Math.max(1, Math.round(cc.length/cr.length)) : 99;
  while (cc.length || cr.length){ for(let k=0;k<step && cc.length;k++) mixed.push(cc.shift()); if(cr.length) mixed.push(cr.shift()); }
  mixed.forEach((o,i)=>{ o.a=(i/mixed.length)*Math.PI*2 - Math.PI/2; o.r = 330 + (i%2?28:-6); nodes.push(o); });
  nodes.forEach(n=>{ n.x=Math.cos(n.a)*n.r; n.y=Math.sin(n.a)*n.r; });
  return {s, nodes, counts:{skill:skills.length, content:cs.length, career:cars.length}};
}
const trunc = (t,n) => t.length>n ? t.slice(0,n-1)+'…' : t;
function galaxySVG(m, uid){
  const link = n => { const mx=n.x/2 - n.y*.18, my=n.y/2 + n.x*.18; return `<path class="gl-link l-${n.t}" data-for="${n.t}:${n.id}" d="M0 0 Q${mx.toFixed(1)} ${my.toFixed(1)} ${n.x.toFixed(1)} ${n.y.toFixed(1)}"/>`; };
  const node = (n,i) => {
    const col = GX_COLOR[n.t];
    if (n.t==='skill'){
      const s = skillById(n.id);
      return `<g class="gn gn-skill" data-gt="skill" data-gid="${n.id}" transform="translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})">
        <circle class="halo" r="34" fill="${col}" opacity=".18"/><circle class="core" r="24"/><circle class="ring" r="24"/>
        <g transform="translate(-10 -10) scale(.84)" color="${col}">${GI[gIdx(s)].replace('<svg ','<svg width="24" height="24" ')}</g>
        <text y="44">${trunc(n.label,10)}</text></g>`;
    }
    const r = n.t==='content' ? 27 : 25;
    return `<g class="gn gn-${n.t}" data-gt="${n.t}" data-gid="${n.id}" transform="translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})">
      <defs><clipPath id="cp${uid}-${i}"><circle r="${r}"/></clipPath></defs>
      <circle class="halo" r="${r+10}" fill="${col}" opacity=".2"/><circle r="${r}" fill="#1B1B22"/>
      <image href="${n.img}" x="${-r*1.6}" y="${-r}" width="${r*3.2}" height="${r*2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#cp${uid}-${i})"/>
      <circle class="ring" r="${r}"/>
      <text y="${r+18}">${trunc(n.label,12)}</text></g>`;
  };
  return `<svg viewBox="-600 -455 1200 950" preserveAspectRatio="xMidYMid meet" aria-label="${m.s.k} 스킬 갤럭시">
    <defs><radialGradient id="cg${uid}"><stop offset="0" stop-color="#34D399" stop-opacity=".35"/><stop offset="1" stop-color="#34D399" stop-opacity="0"/></radialGradient></defs>
    <g class="gz">
      <circle r="178" fill="none" stroke="rgba(255,255,255,.05)"/><circle r="340" fill="none" stroke="rgba(255,255,255,.04)"/>
      ${m.nodes.map(link).join('')}
      ${m.nodes.map(node).join('')}
      <g class="gn gn-center" data-gt="center" data-gid="${m.s.id}">
        <circle r="120" fill="url(#cg${uid})"/><circle class="pulse" r="46" stroke-width="2"/><circle class="pulse p2" r="46" stroke-width="2"/>
        <circle r="46" fill="#0F2A20" stroke="#34D399" stroke-width="3"/>
        <g transform="translate(-19 -19) scale(1.6)" color="#6EE7B7">${GI[gIdx(m.s)].replace('<svg ','<svg width="24" height="24" ')}</g>
        <text y="72">${m.s.k}</text></g>
    </g></svg>`;
}
const galaxyOverlay = () => `<div class="gx" role="dialog" aria-modal="true" aria-label="스킬 갤럭시">
  <div class="gx-h"><h2>스킬 갤럭시</h2><span class="crumbs" id="gxCrumbs"></span><span class="sp"></span><button class="x" data-close aria-label="닫기">${I.x}</button></div>
  <div class="gx-embed gx-bg" id="gxFull" style="position:absolute;inset:0"></div></div>`;

let gxSeq = 0;
function mountGalaxy(el, sid, opts={}){
  const uid = ++gxSeq;
  const st = {sid, k:1, x:0, y:0, hide:{}};
  if (opts.mini) el.classList.add('gx-mini');
  el.classList.add('gx-embed','gx-bg');
  el.innerHTML = `<div class="gx-stage"></div>${opts.mini?'':`
    <div class="gx-legend">${['skill','content','career'].map(t=>`<button data-leg="${t}"><i style="background:${GX_COLOR[t]}"></i>${{skill:'스킬',content:'콘텐츠',career:'커리어'}[t]} <small></small></button>`).join('')}</div>
    <div class="gx-tools">
      <form class="gsrch">${I.search}<input list="gxl${uid}" placeholder="스킬 검색" aria-label="스킬 검색"><datalist id="gxl${uid}">${SKILLS.map(s=>`<option value="${s.k}">`).join('')}</datalist></form>
      <span class="sep"></span>
      <button data-act="out" aria-label="축소">${I.minus}</button><button data-act="in" aria-label="확대">${I.plus}</button>
      <button data-act="fit" aria-label="가운데로">${I.target}</button><button data-act="home" aria-label="처음 스킬로">${I.reset}</button>
    </div>
    <div class="gx-info"></div>`}`;
  const stage = $('.gx-stage', el), info = $('.gx-info', el);
  const firstSid = sid;
  const apply = () => { const g=$('.gz',stage); if(g) g.setAttribute('transform',`translate(${st.x} ${st.y}) scale(${st.k})`); };
  const draw = () => {
    const m = galaxyModel(st.sid);
    stage.innerHTML = galaxySVG(m, uid);
    apply();
    if (!opts.mini){
      $$('[data-leg]', el).forEach(b=>{ b.querySelector('small').textContent = m.counts[b.dataset.leg]; b.classList.toggle('off', !!st.hide[b.dataset.leg]); });
      Object.keys(st.hide).forEach(t=>st.hide[t] && $$(`.gn-${t}, .l-${t}`, stage).forEach(n=>n.style.display='none'));
      const cr = $('#gxCrumbs'); if (cr && el.id==='gxFull') cr.innerHTML = `· <b>${m.s.k}</b> 중심으로 보는 중`;
      info.classList.remove('on');
    }
  };
  draw();
  if (opts.mini) return;

  // 노드 하이라이트 & 정보 카드
  const showInfo = (t, id) => {
    let h='';
    if (t==='skill'){ const s=skillById(id); h=`<span class="k" style="color:${GX_COLOR.skill}">스킬</span><h4>${s.k}</h4><p>${s.e} · 학습자 ${s.n.toLocaleString()}명</p><button class="btn" data-gx-go="skill:${id}">이 스킬 중심으로 보기</button>`; }
    if (t==='content'){ const c=byId(id); h=`${th(c.img)}<span class="k" style="color:${GX_COLOR.content}">${c.type}</span><h4>${c.title}</h4><p>${[c.p,c.t].filter(Boolean).join(' · ')}</p><button class="btn" data-c="${c.id}">콘텐츠 보기</button>`; }
    if (t==='career'){ const c=CAREERS.find(x=>x.id==id); h=`${th(c.img)}<span class="k" style="color:${GX_COLOR.career}">커리어</span><h4>${c.k}</h4><p>${c.e} · 필요 스킬 ${c.sk.length}개</p><button class="btn" data-toast="커리어 페이지는 시안 범위 밖이에요">커리어 보기</button>`; }
    info.innerHTML = h; info.classList.add('on');
  };
  stage.addEventListener('pointerover', e => {
    const n = e.target.closest('.gn'); if (!n || n.dataset.gt==='center') return;
    stage.classList.add('gx-dim'); n.classList.add('hl');
    $(`.gl-link[data-for="${n.dataset.gt}:${n.dataset.gid}"]`, stage)?.classList.add('hl');
  });
  stage.addEventListener('pointerout', e => {
    const n = e.target.closest('.gn'); if (!n) return;
    stage.classList.remove('gx-dim'); n.classList.remove('hl'); $$('.gl-link.hl', stage).forEach(l=>l.classList.remove('hl'));
  });
  // 드래그 이동
  let drag=null, moved=false;
  stage.addEventListener('pointerdown', e => { drag={x:e.clientX, y:e.clientY, ox:st.x, oy:st.y}; moved=false; });
  addEventListener('pointermove', e => { if(!drag) return; const svg=$('svg',stage); if(!svg) return; const sc=1120/svg.clientWidth; const dx=(e.clientX-drag.x)*sc, dy=(e.clientY-drag.y)*sc; if(Math.abs(dx)+Math.abs(dy)>4){ moved=true; stage.classList.add('drag'); } st.x=drag.ox+dx; st.y=drag.oy+dy; apply(); });
  addEventListener('pointerup', () => { drag=null; stage.classList.remove('drag'); });
  stage.addEventListener('click', e => {
    if (moved) return;
    const n = e.target.closest('.gn'); if (!n) { info.classList.remove('on'); return; }
    const t=n.dataset.gt, id=+n.dataset.gid;
    if (t==='center') return;
    if (t==='skill' && info.classList.contains('on') && info.dataset.cur===`skill:${id}`){ recenter(id); return; }
    info.dataset.cur = `${t}:${id}`; showInfo(t, id);
  });
  stage.addEventListener('dblclick', e => { const n=e.target.closest('.gn-skill'); if(n) recenter(+n.dataset.gid); });
  stage.addEventListener('wheel', e => { e.preventDefault(); st.k=Math.min(2.2,Math.max(.5,st.k*(e.deltaY<0?1.1:.9))); stage.classList.add('wheel'); apply(); clearTimeout(st.wt); st.wt=setTimeout(()=>stage.classList.remove('wheel'),120); }, {passive:false});
  const recenter = id => { st.sid=id; st.x=0; st.y=0; st.k=1; stage.style.opacity=0; setTimeout(()=>{ draw(); stage.style.transition='opacity 220ms'; stage.style.opacity=1; },140); };
  el.addEventListener('click', e => {
    const a = e.target.closest('[data-act]'); if (a){ const k=a.dataset.act; if(k==='in') st.k=Math.min(2.2,st.k*1.2); if(k==='out') st.k=Math.max(.5,st.k/1.2); if(k==='fit'){st.k=1;st.x=0;st.y=0;} if(k==='home') return recenter(firstSid); apply(); }
    const g = e.target.closest('[data-gx-go]'); if (g) recenter(+g.dataset.gxGo.split(':')[1]);
    const l = e.target.closest('[data-leg]'); if (l){ st.hide[l.dataset.leg]=!st.hide[l.dataset.leg]; draw(); }
  });
  $('.gsrch', el).addEventListener('submit', e => { e.preventDefault(); const v=e.target.querySelector('input').value.trim(); const s=SKILLS.find(x=>x.k===v)||SKILLS.find(x=>x.k.includes(v)); if(s){ recenter(s.id); e.target.reset(); } else toast('일치하는 스킬이 없어요'); });
  $('.gsrch input', el).addEventListener('change', e => { const s=SKILLS.find(x=>x.k===e.target.value); if(s){ recenter(s.id); e.target.value=''; } });
}

// ---------- 토스트 ----------
let toastT;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),1800); }

// ---------- 렌더 ----------
function render(){
  S = parse();
  // B/C는 상세를 오버레이로 보여주므로 상세 페이지 주소는 목록 + 오버레이로 바꿈
  if (S.v!=='a' && S.v!=='cur' && (S.page==='content'||S.page==='skill')){ return go({page:S.page==='content'?'contents':'skills', id:null, o:`${S.page}:${S.id}`}); }
  if (S.v==='c' && S.page==='login'){ return go({page:'home', id:null, o:'login'}); }
  store.set('hu2-v', S.v);
  document.body.dataset.v = S.v;
  const key = `${S.v}/${S.page}/${S.id}`;
  const P = S.v==='cur' ? null : PAGES[S.v];
  $('#main').innerHTML = S.v==='cur' ? renderCur() : (P[S.page] ? P[S.page](S.id) : P.home());
  if (key!==lastPageKey){ scrollTo(0,0); lastPageKey=key; }
  syncShell();
  $$('#main [data-gx-mini]').forEach(el=>mountGalaxy(el, +el.dataset.gxMini, {mini:true}));
  $$('#main [data-gx-embed]').forEach(el=>mountGalaxy(el, +el.dataset.gxEmbed));
  P?.after?.();
  renderOverlay();
  updBar();
}
const updBar = () => $('#cBar')?.classList.toggle('show', S.v==='c' && S.page==='home' && !S.o && scrollY>520);

// ---------- 전역 이벤트 (위임) ----------
document.addEventListener('click', e => {
  const t = e.target;
  const c = t.closest('[data-c]'); if (c && !t.closest('.gx-stage')) { e.preventDefault(); return openContent(+c.dataset.c); }
  const s = t.closest('[data-s]'); if (s) { e.preventDefault(); return openSkill(+s.dataset.s); }
  if (t.closest('[data-login]')) { e.preventDefault(); return openLogin(); }
  const g = t.closest('[data-galaxy]'); if (g) { e.preventDefault(); return openGalaxy(+g.dataset.galaxy||2); }
  if (t.closest('[data-close]')) { e.preventDefault(); return closeOv(); }
  const n = t.closest('[data-nav]'); if (n) { e.preventDefault(); if(n.dataset.nav==='contents'){F.q='';} return go({page:n.dataset.nav, id:null, o:null}); }
  const ts = t.closest('[data-toast]'); if (ts) { e.preventDefault(); return toast(ts.dataset.toast); }
  const f = t.closest('[data-f]'); if (f) { const [k,v]=f.dataset.f.split('='); F[k]=v; return render(); }
});
document.addEventListener('keydown', e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
  if (e.key==='Escape' && S.o) return closeOv();
  if (e.key==='Enter' && document.activeElement?.matches('[data-c]')) return openContent(+document.activeElement.dataset.c);
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  const i = '1234'.indexOf(e.key); if (i>-1) go({v:VIEWS[i]});
});
document.addEventListener('change', e => { const f=e.target.closest('[data-fsel]'); if(f){ F[f.dataset.fsel]=f.value; render(); } });
addEventListener('hashchange', render);
addEventListener('scroll', updBar, {passive:true});

// ---------- 툴바 ----------
function initProto(){
  $('.proto .tabs').addEventListener('click', e => { const b=e.target.closest('[data-view]'); if(b) go({v:b.dataset.view, o:null}); });
  const setNotes = on => { document.body.classList.toggle('notes', on); $('#tgNotes').setAttribute('aria-pressed', on); store.set('hu2-notes', on?'1':'0'); };
  const setTheme = t => { document.documentElement.dataset.theme = t; $('#tgTheme').setAttribute('aria-pressed', t==='dark'); store.set('hu2-theme', t); };
  $('#tgNotes').onclick = () => setNotes(!document.body.classList.contains('notes'));
  $('#tgTheme').onclick = () => setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
  setNotes(store.get('hu2-notes')==='1');
  setTheme(store.get('hu2-theme')||'light');
}
