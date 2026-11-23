// =========================================================
// 안별 화면 — 같은 스킬 기반 학습 개념, 다른 스타일
// A Quiet Index(흰 색인·상세=페이지) / B Night Atlas(다크 지도·상세=드로어) / C Bold Folio(잡지·상세=모달)
// =========================================================
const C = id => byId(id);
const pick = HOME.pick.map(C), trend = HOME.trend.map(C), free = HOME.free.map(C);
const RANK9 = [5,13,14,17,18,3,1,10,12].map(C);
const countBy = (k, v) => CONTENTS.filter(c => v==='전체' || c[k]===v).length;
const qChip = () => F.q ? `<button class="chip selected option" data-f="q=">‘${F.q}’ ✕</button>` : '';
const sortSel = () => `<select class="select" data-fsel="sort" aria-label="정렬">${[['pop','인기순'],['new','최신순'],['time','짧은 순']].map(([v,l])=>`<option value="${v}" ${F.sort===v?'selected':''}>${l}</option>`).join('')}</select>`;
const priceChips = (opt='option') => ['무료','멤버십','유료'].map(p=>`<button class="chip ${opt} ${F.price===p?'selected':''}" data-f="price=${F.price===p?'전체':p}">${p}</button>`).join('');
const typeChips = (opt='') => ['전체',...TYPES].map(t=>`<button class="chip ${opt} ${F.type===t?'selected':''}" data-f="type=${t}">${t}</button>`).join('');
const groupChips = () => ['전체',...GROUPS].map(g=>`<button class="chip option ${F.group===g?'selected':''}" data-f="group=${g}">${g}</button>`).join('');
const skillsOfGroup = () => SKILLS.filter(s=>F.group==='전체'||s.g===F.group);
const skillSearch = (ph='스킬 이름으로 찾기') => `<div class="input">${I.search}<input id="skq" placeholder="${ph}" autocomplete="off"></div>`;
const firstPt = c => skillPts(c)[0]?.pt || 0;
const sec = (inner, attr='') => `<section class="sec" ${attr}>${inner}</section>`;
const sh = (t, d='', right='') => `<div class="sh"><div><h2>${t}</h2>${d?`<p>${d}</p>`:''}</div>${right}</div>`;
const moreLink = (l, attr) => `<a class="ghost more" href="javascript:void 0" ${attr}>${l}</a>`;

const PAGES = {};

// 안별 서비스 컨셉 · 디자인 컨셉 (툴바 [컨셉] 패널)
const CONCEPTS = {
  a: {name:'A · Quiet Index', sub:'조용한 색인',
    service:'"찾는 사람"을 위한 학습 서점. 이미 배우고 싶은 것이 있는 학습자가 카테고리와 스킬 색인에서 빠르게 고르고, 상세 페이지에서 충분히 비교한 뒤 학습을 시작해요.',
    flow:['홈: 이번 주 추천 + 스킬 바로가기 + 3열 순위','콘텐츠: 아이콘 카테고리 → 칩 필터 → 카드/리스트','스킬: 분야별 디렉터리 색인','상세: 별도 페이지 (오른쪽 고정 구매 박스)'],
    design:'흰 바탕 위에 상자 없는 썸네일 격자. 색은 콘텐츠 이미지에서만 오고, 휴넷 레드는 학습 시작·무료·상승 순위에만 써요. 구분은 선 대신 여백과 글자 크기 차이로 해요.',
    ref:'리디 메인 · 인프런 메인'},
  b: {name:'B · Night Atlas', sub:'밤의 지도',
    service:'"탐험하는 사람"을 위한 스킬 지도. 무엇을 배울지 아직 모르는 학습자가 스킬 갤럭시에서 출발해 연결된 콘텐츠와 커리어를 따라가며 학습 경로를 발견해요.',
    flow:['홈: 갤럭시 히어로 + 스킬 칩으로 중심 이동','콘텐츠: 좌측 필터 + 정렬 가능한 데이터 표 (학습 시간·학습자·스킬 포인트)','스킬: 왼쪽 목록 ↔ 오른쪽 지도 동기화','상세: 오른쪽 드로어 (목록 맥락 유지)'],
    design:'HDS 다크 테마 고정. 스킬=초록, 콘텐츠=파랑, 커리어=주황처럼 HDS 상태색을 범례로만 써요. 숫자는 SUIT로 계기판처럼 정렬해요.',
    ref:'인프런 강의 상세 · 현행 HU 스킬 갤럭시'},
  c: {name:'C · Bold Folio', sub:'굵은 화첩',
    service:'"영감을 얻는 사람"을 위한 학습 매거진. 에디터가 고른 이야기와 큰 순위, 인기도가 보이는 스킬 구름으로 가볍게 둘러보다가 관심이 생기면 모달에서 바로 시작해요.',
    flow:['홈: 커버 스토리 + 거대한 순위 + 스킬 구름','콘텐츠: 64px 제목 + 글자 탭 + 대표 1편 + 3열','스킬: TOP 10 색면 + 그룹별 타이포 색인 (글자 크기 = 인기)','상세: 모달 (페이지 이동 없이 바로 확인)'],
    design:'잡지 펼침면처럼 HDS 최대 크기(48·64) 제목과 큰 이미지로 긴장을 만들어요. 브랜드 faint와 회색 색면으로 섹션을 칠하고, 카드 상자 없이 펼침면 단위로 구성해요.',
    ref:'퍼블리 메인 · 리디 메인 대표 타일'}
};
function renderConcept(){
  const p = $('#concept'), c = CONCEPTS[S.v];
  if (!c){ p.classList.remove('open'); $('#tgConcept').disabled = true; return; }
  $('#tgConcept').disabled = false;
  p.innerHTML = `<button class="gicon cp-x" data-cp aria-label="닫기">${I.x}</button>
    <span class="badge brand">${c.sub}</span><h3>${c.name}</h3>
    <h4>서비스 컨셉</h4><p>${c.service}</p><ul>${c.flow.map(f=>`<li>${f}</li>`).join('')}</ul>
    <h4>디자인 컨셉</h4><p>${c.design}</p>
    <h4>레퍼런스</h4><p class="c60">${c.ref} (uibowl)</p>`;
  p.classList.toggle('open', store.get('hu3-concept')!=='0');
  $('#tgConcept').setAttribute('aria-pressed', p.classList.contains('open'));
}

// =========================================================
// A · Quiet Index
// =========================================================
const aCard = c => `<article class="a-card" data-c="${c.id}" tabindex="0">${th(c.img,'',typeBadge(c))}<div class="b"><h3 class="clamp2">${c.title}</h3><div class="meta">${metaHTML(c,true)}</div></div></article>`;
const aRow = c => `<article class="a-row" data-c="${c.id}" tabindex="0">${th(c.img)}<div style="display:flex;flex-direction:column;gap:var(--spacing-1)"><div>${typeBadge(c)}</div><h3 class="clamp2">${c.title}</h3><div class="meta">${metaHTML(c,true)}</div></div></article>`;
const aCareer = c => `<article class="a-card" data-toast="커리어 페이지는 시안 범위 밖이에요">${th(c.img,'r43')}<div class="b"><h3>${c.k}</h3><div class="meta">${c.e}<span class="dot"></span>필요 스킬 <span class="num">${c.sk.length}</span>개</div></div></article>`;
const aSc = s => `<button class="a-sc" data-s="${s.id}">${si(s,'lg')}<span>${s.k}</span></button>`;

PAGES.a = {
  home(){
    const h = pick[0];
    return `<div class="wrap">
      <section class="a-hero">
        <article class="big" data-c="${h.id}" tabindex="0">${th(h.img)}<div><div class="tags">${badge('이번 주 추천','brand')}${typeBadge(h)}</div>
          <h2 class="t28 w7" style="margin-top:var(--spacing-3)">${h.title}</h2><p class="t16 c60" style="margin-top:var(--spacing-2)">${h.d}</p><div class="meta" style="margin-top:var(--spacing-3)">${metaHTML(h,true)}</div></div></article>
        <div class="side"><h4>함께 많이 본 콘텐츠</h4>${pick.slice(1).map(aRow).join('')}</div>
      </section>
      ${sec(sh('스킬로 찾기','배우고 싶은 스킬을 고르면 관련 콘텐츠를 모아 보여드려요', moreLink('전체 스킬','data-nav="skills"'))
        + `<div class="a-shortcuts">${topSkills(8).map(aSc).join('')}<button class="a-sc" data-galaxy="2"><span class="si lg gi4">${I.galaxy}</span><span>스킬 갤럭시</span></button></div>`)}
      ${sec(sh('지금 많이 보는 콘텐츠','최근 7일 학습자 기준', moreLink('전체보기','data-nav="contents"'))
        + `<div class="a-rank">${RANK9.map((c,i)=>`<article class="a-rk" data-c="${c.id}" tabindex="0">${th(c.img)}<span class="n">${i+1}</span><div><h3 class="clamp2">${c.title}</h3><div class="meta" style="margin-top:var(--spacing-1)">${priceHTML(c)}<span class="dot"></span>${chgBadge(chg[i])}</div></div></article>`).join('')}</div>`)}
      ${sec(sh('무료로 시작하기','가입 없이 바로 볼 수 있어요', moreLink('전체보기','data-navf="contents|price=무료"')) + `<div class="a-g4">${free.map(aCard).join('')}</div>`)}
      ${sec(sh('프리미엄 과정','학위·자격 수준의 심화 과정') + `<div class="a-list">${PREMIUM.map(p=>`<article class="a-li" data-toast="프리미엄 과정 상세는 시안 범위 밖이에요">${th(p.img)}<div><div>${badge('프리미엄','normal')}</div><h3 style="margin-top:var(--spacing-2)">${p.t}</h3><p>${p.d}</p><div class="meta" style="margin-top:var(--spacing-2)">${p.meta}</div></div><div class="r">${p.price?`<div class="t14 c45" style="text-decoration:line-through">${p.price.was}</div><div><span class="t16 w7 cred">${p.price.off}</span> <span class="pr">${p.price.now}</span></div>`:'<span class="pr mem">가격 문의</span>'}</div></article>`).join('')}</div>`)}
      ${sec(`<div class="a-member"><div><h2>HU 멤버십으로 모든 스킬을 무제한으로</h2><p>콘텐츠 전체와 커리어 로드맵을 한 번에. 언제든 해지할 수 있어요.</p></div><button class="btn primary md" data-login>멤버십 시작하기</button></div>`)}
    </div>`;
  },

  // 콘텐츠 목록 (핵심): 아이콘 카테고리 → 칩 필터 → 카드/리스트
  contents(){
    const list = filtered();
    return `<div class="wrap">
      <div class="a-pt"><h1>콘텐츠</h1><p class="t16 c60" style="margin-top:var(--spacing-1)">강의, 아티클, 영상, 카드뉴스를 한곳에서</p></div>
      <nav class="a-cats">${CATS.map((c,i)=>`<button class="a-cat ${F.cat===c?'on':''}" data-f="cat=${c}">${CAT_ICO[i]}<span>${c}</span></button>`).join('')}</nav>
      <div class="a-bar"><div class="chips">${typeChips()}</div><span style="width:var(--border-1);height:16px;background:var(--line-strong);margin:0 var(--spacing-2)"></span><div class="chips">${priceChips('')}${qChip()}</div>
        <span class="sp"></span>${sortSel()}<div class="vsw"><button class="gicon ${F.view==='grid'?'on':''}" data-f="view=grid" aria-label="카드로 보기">${I.grid}</button><button class="gicon ${F.view==='list'?'on':''}" data-f="view=list" aria-label="리스트로 보기">${I.list}</button></div></div>
      <p class="a-count">총 <b>${list.length}</b>개</p>
      ${!list.length ? '<p class="empty">조건에 맞는 콘텐츠가 없어요. 필터를 바꿔보세요.</p>'
        : F.view==='list' ? `<div class="a-list">${list.map(c=>`<article class="a-li" data-c="${c.id}" tabindex="0">${th(c.img)}<div><div class="tags">${typeBadge(c)}${badge(c.cat,'normal')}</div><h3 class="clamp2" style="margin-top:var(--spacing-2)">${c.title}</h3><p class="clamp2">${descOf(c)}</p><div class="meta" style="margin-top:var(--spacing-2)">${metaHTML(c)}</div><div style="margin-top:var(--spacing-3)">${skTags(c,3)}</div></div><div class="r">${priceHTML(c)}</div></article>`).join('')}</div>`
        : `<div class="a-g4">${list.map(aCard).join('')}</div>`}
      <div style="height:var(--spacing-24)"></div></div>`;
  },

  content(id){
    const c = C(id) || CONTENTS[0];
    return `<div class="wrap">
      <nav class="crumb"><a href="${href({page:'contents',id:null})}">콘텐츠</a>›<span>${c.cat}</span></nav>
      <div class="a-pdp"><div>
        <div class="a-pdp-hero"><div><div class="tags">${typeBadge(c)}${badge(c.cat,'normal')}</div><h1>${c.title}</h1><p>${descOf(c)}</p><div class="meta" style="margin-top:var(--spacing-4)">${metaHTML(c)}</div><div class="tags" style="margin-top:var(--spacing-4)">${c.sk.map(k=>`<span class="tag lg">${k}</span>`).join('')}</div></div>${th(c.img)}</div>
        <nav class="a-tabs"><div class="tabs">${[['intro','소개'],['skills','얻는 스킬'],['curr','커리큘럼'],['review','수강평']].map(([k,l],i)=>`<a class="tab ${i?'':'on'}" href="javascript:void 0" data-scroll="sec-${k}">${l}</a>`).join('')}</div></nav>
        <section class="a-psec" id="sec-intro"><h2>이런 분께 추천해요</h2><ol class="curr">${['현업에서 바로 쓸 수 있는 방법을 찾는 분','기본기를 체계적으로 다지고 싶은 분','짧은 시간에 핵심만 익히고 싶은 분'].map((t,i)=>`<li><span class="n">${String(i+1).padStart(2,'0')}</span><span>${t}</span><span></span></li>`).join('')}</ol></section>
        <section class="a-psec" id="sec-skills"><h2>학습하면 얻는 스킬 <span class="c45 w4 num">${c.sk.length}</span></h2>${skillPtsHTML(c)}</section>
        <section class="a-psec" id="sec-curr"><h2>커리큘럼 <span class="c45 w4 num">${CURRICULUM(c).length}</span></h2>${currHTML(c)}</section>
        <section class="a-psec" id="sec-review"><h2>수강평 <span class="c45 w4 num">0</span></h2><p class="t14 c45">아직 수강평이 없어요. 학습을 마치고 첫 수강평을 남겨주세요.</p></section>
      </div>
      <aside class="a-buy"><div class="price">${bigPrice(c)}</div><button class="btn primary lg full" data-login>${c.type==='과정'?'학습하기':'바로 보기'}</button>
        <div class="acts"><button class="btn outline" data-toast="찜 목록에 담았어요">${I.heart}찜하기</button><button class="btn outline" data-toast="링크를 복사했어요">${I.share}공유</button></div>${factsKV(c)}</aside></div>
      ${sec(sh('함께 보면 좋은 콘텐츠') + `<div class="a-g4">${relatedOf(c).map(aCard).join('')}</div>`)}
    </div>`;
  },

  // 스킬 목록 (핵심): 디렉터리 색인 — 그룹 제목 고정 + 3열 항목
  skills(){
    const groups = F.group==='전체' ? GROUPS : [F.group];
    return `<div class="wrap">
      <div class="a-pt"><h1>스킬</h1><p class="t16 c60" style="margin-top:var(--spacing-1)">직무에 필요한 스킬 <span class="num">${SKILLS.length}</span>개를 분야별로 정리했어요</p></div>
      <div class="a-skbar">${skillSearch()}<span class="sp"></span><button class="btn outline" data-galaxy="2">${I.galaxy}스킬 갤럭시로 보기</button></div>
      <div class="chips" style="margin-top:var(--spacing-4)">${groupChips()}</div>
      ${F.group==='전체' ? `<section style="padding-top:var(--spacing-10)">${sh('인기 스킬','이번 달 학습자가 가장 많이 선택했어요')}<div class="a-top">${topSkills(5).map((s,i)=>`<button class="a-tsk" data-s="${s.id}"><span class="n">${String(i+1).padStart(2,'0')}</span>${si(s)}<div><b>${s.k}</b><div class="t14 c45"><span class="num">${s.n.toLocaleString()}</span>명 학습</div></div></button>`).join('')}</div></section>`:''}
      <div id="skList" style="margin-top:var(--spacing-12)">${groups.map(g=>{ const l=SKILLS.filter(s=>s.g===g); return `<section class="a-grp"><h3>${g}<small>${l.length}개 스킬</small></h3><div class="a-dir">${l.map(s=>`<button class="a-sk" data-s="${s.id}">${si(s)}<span><b>${s.k}</b><small>${s.e}</small></span><span class="u">${s.n.toLocaleString()}</span></button>`).join('')}</div></section>`; }).join('')}</div>
      <div style="height:var(--spacing-24)"></div></div>`;
  },

  skill(id){
    const s = skillById(id) || SKILLS[0], cs = contentsOfSkill(s), cars = careersOfSkill(s);
    return `<div class="wrap">
      <nav class="crumb"><a href="${href({page:'skills',id:null})}">스킬</a>›<span>${s.g}</span></nav>
      <div class="a-sdp"><div>${si(s,'xl')}<h1>${s.k}</h1><div style="display:flex;align-items:center;gap:var(--spacing-2);margin-top:var(--spacing-1)"><span class="en">${s.e}</span>${badge(s.g,'normal')}</div>
        <p class="d">${skillDesc(s)}</p>
        <div class="stats"><div><b>${s.n.toLocaleString()}</b><small>학습자</small></div><div><b>${cs.length}</b><small>관련 콘텐츠</small></div><div><b>${cars.length}</b><small>연결된 커리어</small></div></div>
        <div style="display:flex;gap:var(--spacing-2);margin-top:var(--spacing-8)"><button class="btn primary md" data-scroll="sk-c">관련 콘텐츠 보기</button><button class="btn outline md" data-toast="관심 스킬에 추가했어요">${I.heart}관심 스킬</button></div></div>
        <div class="gxw"><div data-gx-mini="${s.id}" style="position:absolute;inset:0"></div><button class="btn outline xs" data-galaxy="${s.id}">${I.galaxy}갤럭시에서 보기</button></div></div>
      ${sec(sh('이 스킬을 배울 수 있는 콘텐츠', `${cs.length}개`) + `<div class="a-g4">${cs.map(aCard).join('')}</div>`, 'id="sk-c"')}
      ${sec(sh('이 스킬이 필요한 커리어') + `<div class="a-g4">${cars.map(aCareer).join('')}</div>`)}
      ${sec(sh('함께 배우면 좋은 스킬') + `<div class="a-shortcuts">${relatedSkills(s).map(aSc).join('')}</div>`)}
    </div>`;
  },
  login(){ return `<div class="a-login">${loginBody()}</div>`; },
  contentOverlay: c => PAGES.c.contentOverlay(c),
  skillOverlay: s => PAGES.c.skillOverlay(s),
  after(){ bindSkq(); }
};

// =========================================================
// B · Night Atlas
// =========================================================
const bHead = () => `<div class="b-thead"><span>콘텐츠</span><button class="r hide-md ${F.sort==='time'?'on':''}" data-f="sort=time">학습 시간</button><button class="r ${F.sort==='pop'?'on':''}" data-f="sort=pop">학습자</button><span class="r">스킬 포인트</span></div>`;
const bRow = c => { const pt=firstPt(c); return `<article class="b-tr" data-c="${c.id}" tabindex="0"><div class="c">${th(c.img)}<div><div class="meta">${typeBadge(c)}<span>${c.cat}</span><span class="dot"></span>${priceHTML(c)}</div><h3 class="clamp2" style="margin-top:var(--spacing-1)">${c.title}</h3>${skTags(c,3)}</div></div><span class="v r hide-md">${c.t}</span><span class="v r">${c.n}명</span><div class="ptbar"><i><b style="width:${Math.min(100,pt)}%"></b></i><span>+${pt}</span></div></article>`; };
const bSummary = s => { const cs=contentsOfSkill(s), cars=careersOfSkill(s); return `<div style="display:flex;gap:var(--spacing-3);align-items:center">${si(s)}<div><h3>${s.k}</h3><small>${s.e} · ${s.g}</small></div></div>
  <div class="row"><div><b>${s.n.toLocaleString()}</b><span>학습자</span></div><div><b>${cs.length}</b><span>콘텐츠</span></div><div><b>${cars.length}</b><span>커리어</span></div></div>
  <div style="display:flex;gap:var(--spacing-2)"><button class="btn primary xs" data-s="${s.id}">스킬 상세</button><button class="btn outline xs" data-galaxy="${s.id}">전체 화면</button></div>`; };

PAGES.b = {
  home(){
    return `<div class="wrap">
      <section class="b-hero"><div data-gx-home style="position:absolute;inset:0"></div>
        <div class="b-hero-l"><h1>오늘은 어떤 스킬을<br>탐험할까요?</h1><p>스킬을 고르면 배울 콘텐츠와 연결된 커리어가 펼쳐져요</p>
          <div class="chips">${topSkills(6).map(s=>`<button class="chip option ${F.bsk===s.id?'selected':''}" data-bhome="${s.id}">${s.k}</button>`).join('')}</div></div></section>
      <div class="b-stat">${[['탐색할 수 있는 스킬',SKILLS.length,'개'],['연결된 콘텐츠',CONTENTS.length,'개'],['커리어 로드맵',CAREERS.length,'개'],['가장 많이 배우는 스킬',topSkills(1)[0].k,'']].map(([l,v,u])=>`<div class="b-panel"><small>${l}</small><b>${v}${u?`<span>${u}</span>`:''}</b></div>`).join('')}</div>
      ${sec(sh('지금 뜨는 콘텐츠','최근 7일 학습자 기준', moreLink('전체보기','data-nav="contents"')) + `<div class="b-table">${bHead()}${trend.concat([C(1)]).map(bRow).join('')}</div>`)}
      ${sec(sh('커리어 좌표','직무를 고르면 필요한 스킬이 지도에 표시돼요') + `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--spacing-3)">${CAREERS.map(c=>`<article class="b-panel" style="padding:var(--spacing-3);cursor:pointer" data-toast="커리어 페이지는 시안 범위 밖이에요">${th(c.img,'r43')}<div style="padding:var(--spacing-3) var(--spacing-1) 0"><b class="t16">${c.k}</b><div class="t12 c45">필요 스킬 <span class="num">${c.sk.length}</span>개</div></div></article>`).join('')}</div>`)}
      ${sec(`<div class="b-panel" style="display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-6);padding:var(--spacing-8)"><div><h2 class="t24 w7">HU 멤버십으로 지도의 모든 길을</h2><p class="t14 c60" style="margin-top:var(--spacing-1)">콘텐츠 전체와 커리어 로드맵. 언제든 해지할 수 있어요.</p></div><button class="btn primary md" data-login>멤버십 시작하기</button></div>`)}
    </div>`;
  },

  // 콘텐츠 목록 (핵심): 좌측 필터 + 데이터 표 (정렬 가능한 열)
  contents(){
    const list = filtered();
    const opt = (k, v, cnt) => `<button class="b-fopt ${F[k]===v?'on':''}" data-f="${k}=${v}">${v}${cnt!=null?`<small>${cnt}</small>`:''}</button>`;
    return `<div class="wrap">
      <div class="b-h"><h1>콘텐츠</h1><span class="num">${list.length} / ${CONTENTS.length}</span>${qChip()}</div>
      <div class="b-list">
        <aside class="b-filter"><form class="input" data-qform>${I.search}<input name="q" placeholder="콘텐츠 검색" autocomplete="off"></form>
          <div><h4>카테고리</h4>${CATS.map(c=>opt('cat',c,countBy('cat',c))).join('')}</div>
          <div><h4>유형</h4>${['전체',...TYPES].map(t=>opt('type',t,countBy('type',t))).join('')}</div>
          <div><h4>가격</h4>${['전체','무료','멤버십','유료'].map(t=>opt('price',t)).join('')}</div></aside>
        <div class="b-table">${bHead()}${list.length ? list.map(bRow).join('') : '<p class="empty">조건에 맞는 콘텐츠가 없어요.</p>'}</div>
      </div><div style="height:var(--spacing-24)"></div></div>`;
  },

  // 스킬 목록 (핵심): 왼쪽 목록 ↔ 오른쪽 지도 동기화
  skills(){
    const list = skillsOfGroup(), max = SKILLS[0].n;
    return `<div class="wrap">
      <div class="b-h"><h1>스킬 지도</h1><span class="num">${list.length}개</span></div>
      <div class="b-atlas">
        <div class="b-skl"><div class="top">${skillSearch('스킬 검색')}<div class="chips">${groupChips()}</div></div>
          <div class="rows" id="skList">${list.map(s=>`<button class="b-sk ${F.bsk===s.id?'on':''}" data-bsk="${s.id}">${si(s,'sm')}<span><b>${s.k}</b><small>${s.e}</small></span><span class="u">${s.n.toLocaleString()}<i><b style="width:${Math.round(s.n/max*100)}%"></b></i></span></button>`).join('')}</div></div>
        <div class="b-map"><div data-gx-atlas style="position:absolute;inset:0"></div><div class="b-sum" id="bSum"></div></div>
      </div><div style="height:var(--spacing-16)"></div></div>`;
  },

  login(){
    return `<div class="b-login"><div data-gx-mini="2" style="min-height:100%"></div><div class="r">${loginBody()}</div></div>`;
  },

  contentOverlay(c){
    return `<div class="dim" data-close></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="${c.title}">
      <div class="dr-h"><span class="t">${c.cat} · ${c.type}</span><button class="gicon" data-toast="찜 목록에 담았어요" aria-label="찜">${I.heart}</button><button class="gicon" data-close aria-label="닫기">${I.x}</button></div>
      <div class="dr-b">${th(c.img)}<h1 class="t24 w7" style="margin-top:var(--spacing-5)">${c.title}</h1><p class="t16 c60" style="margin-top:var(--spacing-2)">${descOf(c)}</p><div class="meta" style="margin-top:var(--spacing-3)">${metaHTML(c)}</div>
        <section style="margin-top:var(--spacing-8)"><h2 class="t18 w7" style="margin-bottom:var(--spacing-3)">학습하면 얻는 스킬</h2>${skillPtsHTML(c)}</section>
        <section style="margin-top:var(--spacing-8)"><h2 class="t18 w7" style="margin-bottom:var(--spacing-2)">커리큘럼</h2>${currHTML(c)}</section>
        <section style="margin-top:var(--spacing-8)"><h2 class="t18 w7" style="margin-bottom:var(--spacing-3)">정보</h2>${factsKV(c)}</section>
        <section style="margin-top:var(--spacing-8)"><h2 class="t18 w7" style="margin-bottom:var(--spacing-2)">함께 보면 좋은 콘텐츠</h2>${relatedOf(c,3).map(aRow).join('')}</section></div>
      <div class="dr-f"><div>${priceHTML(c).replace('class="pr','class="t20 pr')}</div><button class="btn primary md" data-login>${c.type==='과정'?'학습하기':'바로 보기'}</button></div></aside>`;
  },

  skillOverlay(s){
    const cs = contentsOfSkill(s), cars = careersOfSkill(s), tab = F.bskTab;
    return `<div class="dim" data-close></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="${s.k}">
      <div class="dr-h"><span class="t">스킬 · ${s.g}</span><button class="gicon" data-toast="관심 스킬에 추가했어요" aria-label="관심 스킬">${I.heart}</button><button class="gicon" data-close aria-label="닫기">${I.x}</button></div>
      <div class="dr-b"><div style="display:flex;gap:var(--spacing-4);align-items:center">${si(s,'lg')}<div><h1 class="t28 w7">${s.k}</h1><span class="t14 c45">${s.e}</span></div></div>
        <div class="stats" style="margin-top:var(--spacing-6)"><div><b>${s.n.toLocaleString()}</b><small>학습자</small></div><div><b>${cs.length}</b><small>콘텐츠</small></div><div><b>${cars.length}</b><small>커리어</small></div></div>
        <div class="tabs" style="margin-top:var(--spacing-6);box-shadow:inset 0 calc(-1 * var(--border-1)) 0 var(--line-layout)">${[['info','스킬 정보'],['contents',`콘텐츠 ${cs.length}`],['careers',`커리어 ${cars.length}`]].map(([k,l])=>`<button class="tab ${tab===k?'on':''}" data-f="bskTab=${k}">${l}</button>`).join('')}</div>
        ${tab==='info' ? `<p class="t16 c80" style="margin-top:var(--spacing-5)">${skillDesc(s)}</p><div style="position:relative;height:280px;border-radius:var(--radius-lg);overflow:hidden;margin-top:var(--spacing-5)"><div data-gx-mini="${s.id}" style="position:absolute;inset:0"></div><button class="btn outline xs" style="position:absolute;right:var(--spacing-3);bottom:var(--spacing-3);z-index:2" data-galaxy="${s.id}">${I.galaxy}갤럭시에서 보기</button></div>
            <h2 class="t18 w7" style="margin:var(--spacing-8) 0 var(--spacing-3)">함께 배우면 좋은 스킬</h2><div class="chips">${relatedSkills(s).slice(0,6).map(x=>`<button class="chip option" data-s="${x.id}">${x.k}</button>`).join('')}</div>`
          : tab==='contents' ? `<div style="margin-top:var(--spacing-3)">${cs.map(aRow).join('')}</div>`
          : `<div style="display:flex;flex-direction:column;gap:var(--spacing-2);margin-top:var(--spacing-4)">${cars.map(c=>`<div class="b-panel" style="display:grid;grid-template-columns:64px 1fr;gap:var(--spacing-3);align-items:center;padding:var(--spacing-3);background:var(--bg-strong);cursor:pointer" data-toast="커리어 페이지는 시안 범위 밖이에요">${th(c.img,'sq')}<div><b class="t16">${c.k}</b><div class="t12 c45">필요 스킬 ${c.sk.length}개</div></div></div>`).join('')}</div>`}
      </div></aside>`;
  },

  after(){
    bindSkq();
    // 홈 히어로: 칩으로 갤럭시 중심 이동
    const hero = $('[data-gx-home]');
    if (hero){ const g = mountGalaxy(hero, F.bsk, {onChange:s=>{ F.bsk=s.id; $$('[data-bhome]').forEach(b=>b.classList.toggle('selected', +b.dataset.bhome===s.id)); }});
      $$('[data-bhome]').forEach(b=>b.onclick=()=>g.recenter(+b.dataset.bhome)); }
    // 스킬 지도: 목록 ↔ 지도 동기화
    const atlas = $('[data-gx-atlas]');
    if (atlas){ const g = mountGalaxy(atlas, F.bsk, {onChange:s=>{ F.bsk=s.id; $('#bSum').innerHTML=bSummary(s); $$('.b-sk').forEach(b=>{ const on=+b.dataset.bsk===s.id; b.classList.toggle('on',on); if(on) b.scrollIntoView({block:'nearest'}); }); }});
      $$('[data-bsk]').forEach(b=>b.onclick=()=>g.recenter(+b.dataset.bsk)); }
    // 로그인 왼쪽 갤럭시 위 문구
    const bl = $('.b-login [data-gx-mini]');
    if (bl){ bl.style.position='relative'; bl.insertAdjacentHTML('beforeend', `<div class="l-cap"><h2>배움이 커리어가 되는 지도</h2><p>스킬 하나에서 시작해 콘텐츠와 커리어로 이어지는 길을 따라가 보세요.</p></div>`); }
  }
};

// =========================================================
// C · Bold Folio
// =========================================================
const cCard = c => `<article class="c-card" data-c="${c.id}" tabindex="0">${th(c.img)}<div><span class="k">${c.cat} · ${c.type}</span><h3 class="clamp2">${c.title}</h3><div class="meta" style="margin-top:var(--spacing-2)">${metaHTML(c,true)}</div></div></article>`;
const cSh = (t, d='', right='') => `<div class="c-sh"><div><h2>${t}</h2>${d?`<p>${d}</p>`:''}</div>${right}</div>`;
const cWord = s => { const max=SKILLS[0].n, min=SKILLS[SKILLS.length-1].n, r=(s.n-min)/(max-min); const sz=[18,20,24,28,32,40][Math.min(5,Math.floor(r*6))]; return `<button data-s="${s.id}" style="font-size:var(--text-${sz});letter-spacing:var(--tracking-${sz})">${s.k}<sup>${s.n.toLocaleString()}</sup></button>`; };

PAGES.c = {
  home(){
    const h = pick[0];
    return `<section class="c-field"><div class="wrap c-cover"><div><span class="k">이번 주의 한 편 · ${h.type}</span><h1>${h.title}</h1><p>${h.d}</p>
        <div class="acts"><button class="btn primary lg" data-c="${h.id}">지금 학습하기</button><button class="btn outline lg" data-nav="contents">콘텐츠 둘러보기</button></div></div>
        <div data-c="${h.id}">${th(h.img)}</div></div></section>
      <div class="wrap">${sec(cSh('지금 가장 많이 보는','최근 7일 학습자 기준', moreLink('전체보기','data-nav="contents"'))
        + `<div class="c-big-rank">${RANK9.slice(0,6).map((c,i)=>`<article class="c-br" data-c="${c.id}" tabindex="0"><span class="n">${i+1}</span><div><h3 class="clamp2">${c.title}</h3><div class="meta" style="margin-top:var(--spacing-1)">${metaHTML(c,true)}</div></div>${th(c.img)}</article>`).join('')}</div>`)}</div>
      <section class="c-gray" style="margin-top:var(--spacing-24)"><div class="wrap" style="padding-top:var(--spacing-24);padding-bottom:var(--spacing-24)">${cSh('스킬로 찾기','글자가 클수록 많이 배우는 스킬이에요', `<button class="btn neutral md" data-galaxy="2">${I.galaxy}스킬 갤럭시</button>`)}<div class="c-cloud">${SKILLS.slice(0,24).map(cWord).join('')}</div></div></section>
      <div class="wrap">${sec(cSh('무료로 시작하기','가입 없이 바로 볼 수 있어요', moreLink('전체보기','data-navf="contents|price=무료"')) + `<div class="c-g3">${free.slice(0,3).map(cCard).join('')}</div>`)}</div>
      <section class="c-ink" style="margin-top:var(--spacing-24)"><div class="wrap c-band"><div><h2>모든 스킬을,<br>하나의 멤버십으로</h2><p>콘텐츠 전체와 커리어 로드맵. 언제든 해지할 수 있어요.</p></div><button class="btn primary lg" data-login>멤버십 시작하기</button></div></section>`;
  },

  // 콘텐츠 목록 (핵심): 거대한 타이틀 + 글자 탭 + 대표 1편 + 3열
  contents(){
    const list = filtered(); const [hero, ...rest] = list;
    return `<div class="wrap">
      <div class="c-pt"><h1>콘텐츠<span class="num">${list.length}</span></h1><nav class="c-cats">${CATS.map(c=>`<button class="${F.cat===c?'on':''}" data-f="cat=${c}">${c}</button>`).join('')}</nav></div>
      <div class="c-filter"><div class="chips">${typeChips('option')}</div><div class="chips">${priceChips()}${qChip()}</div><span class="sp"></span><form class="input" data-qform style="width:280px">${I.search}<input name="q" placeholder="콘텐츠 검색" autocomplete="off"></form>${sortSel()}</div>
      ${hero ? `<article class="c-feature" data-c="${hero.id}" tabindex="0">${th(hero.img)}<div><span class="k">${hero.cat} · ${hero.type}</span><h2>${hero.title}</h2><p class="clamp3">${descOf(hero)}</p><div class="meta" style="margin-top:var(--spacing-4)">${metaHTML(hero,true)}</div><button class="btn neutral md" style="margin-top:var(--spacing-6)">자세히 보기</button></div></article>
        <div class="c-g3">${rest.map(cCard).join('')}</div>` : '<p class="empty">조건에 맞는 콘텐츠가 없어요.</p>'}
      <div style="height:var(--spacing-24)"></div></div>`;
  },

  // 스킬 목록 (핵심): TOP 10 색면 + 그룹별 타이포 색인 (크기 = 인기)
  skills(){
    const groups = F.group==='전체' ? GROUPS : [F.group];
    return `<div class="wrap"><div class="c-skhead"><div><h1>스킬</h1><p>직무에 필요한 <span class="num">${SKILLS.length}</span>개의 스킬. 글자가 클수록 많이 배워요.</p></div>
        <div class="acts">${skillSearch('스킬 찾기')}<button class="btn neutral" data-galaxy="2">${I.galaxy}갤럭시</button></div></div>
      <div class="chips">${groupChips()}</div></div>
      ${F.group==='전체' ? `<section class="c-field" style="margin-top:var(--spacing-12)"><div class="wrap" style="padding-top:var(--spacing-16);padding-bottom:var(--spacing-16)">${cSh('인기 스킬 TOP 10','이번 달 학습자 기준')}<div class="c-top10">${topSkills(10).map((s,i)=>`<button class="c-t" data-s="${s.id}"><span class="n">${String(i+1).padStart(2,'0')}</span><b>${s.k}</b><small>${s.n.toLocaleString()}명</small></button>`).join('')}</div></div></section>`:''}
      <div class="wrap" id="skList" style="margin-top:var(--spacing-16)">${groups.map(g=>{ const l=SKILLS.filter(s=>s.g===g); return `<section class="c-idx"><h3>${g}<small>${l.length}</small></h3><div class="c-words">${l.map(cWord).join('')}</div></section>`; }).join('')}
      <div style="height:var(--spacing-24)"></div></div>`;
  },

  contentOverlay(c){
    return `<div class="dim" data-close></div><div class="modal" role="dialog" aria-modal="true" aria-label="${c.title}"><button class="gicon md-x" data-close aria-label="닫기">${I.x}</button>
      <div class="md-b"><div class="c-modal-hero">${th(c.img)}<div class="r"><div class="tags">${typeBadge(c)}${badge(c.cat,'normal')}</div><h1>${c.title}</h1><p class="t16 c60" style="margin-top:var(--spacing-3)">${descOf(c)}</p>
          <div style="display:flex;align-items:baseline;gap:var(--spacing-2);margin-top:var(--spacing-6)">${bigPrice(c)}</div>
          <div style="display:flex;gap:var(--spacing-2);margin-top:var(--spacing-4)"><button class="btn primary lg" style="flex:1" data-login>${c.type==='과정'?'학습하기':'바로 보기'}</button><button class="btn outline lg icon" data-toast="찜 목록에 담았어요" aria-label="찜">${I.heart}</button></div>
          <div style="margin-top:var(--spacing-6)">${factsKV(c)}</div></div></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--spacing-10);padding:var(--spacing-10) var(--spacing-8)"><section><h2 class="t20 w7" style="margin-bottom:var(--spacing-3)">학습하면 얻는 스킬</h2>${skillPtsHTML(c)}</section><section><h2 class="t20 w7" style="margin-bottom:var(--spacing-1)">커리큘럼</h2>${currHTML(c)}</section></div>
        <div class="c-gray" style="padding:var(--spacing-10) var(--spacing-8)"><h2 class="t24 w7" style="margin-bottom:var(--spacing-6)">함께 보면 좋은 콘텐츠</h2><div class="c-g3">${relatedOf(c,3).map(cCard).join('')}</div></div></div></div>`;
  },

  skillOverlay(s){
    const cs = contentsOfSkill(s), cars = careersOfSkill(s);
    return `<div class="dim" data-close></div><div class="modal md" role="dialog" aria-modal="true" aria-label="${s.k}"><button class="gicon md-x" data-close aria-label="닫기">${I.x}</button>
      <div class="md-b"><div class="c-field" style="padding:var(--spacing-12) var(--spacing-10) var(--spacing-10)">${si(s,'lg')}<h1 class="t40 w7" style="margin-top:var(--spacing-4)">${s.k}</h1><div class="t16 c45">${s.e} · ${s.g}</div><p class="t16 c80" style="margin-top:var(--spacing-4)">${skillDesc(s)}</p>
          <div class="stats"><div><b>${s.n.toLocaleString()}</b><small>학습자</small></div><div><b>${cs.length}</b><small>관련 콘텐츠</small></div><div><b>${cars.length}</b><small>커리어</small></div></div></div>
        <div style="padding:var(--spacing-8) var(--spacing-10)"><div style="position:relative;height:300px;border-radius:var(--radius-lg);overflow:hidden"><div data-gx-mini="${s.id}" style="position:absolute;inset:0"></div><button class="btn outline xs" style="position:absolute;right:var(--spacing-3);bottom:var(--spacing-3);z-index:2" data-galaxy="${s.id}">${I.galaxy}갤럭시에서 보기</button></div>
          <h2 class="t24 w7" style="margin:var(--spacing-10) 0 var(--spacing-6)">이 스킬을 배울 수 있는 콘텐츠</h2><div class="c-g3" style="grid-template-columns:repeat(2,minmax(0,1fr))">${cs.slice(0,4).map(cCard).join('')}</div>
          <h2 class="t24 w7" style="margin:var(--spacing-12) 0 var(--spacing-4)">함께 배우면 좋은 스킬</h2><div class="c-words">${relatedSkills(s).slice(0,6).map(cWord).join('')}</div></div></div></div>`;
  },
  after(){ bindSkq(); }
};

// =========================================================
// 현행 진단
// =========================================================
function renderCur(){
  const REF = location.pathname.includes('/mockup/') ? '../reference/current' : 'reference/current';
  const H = [['히어로',270],['Weekly Top Pick',444],['뜨는 콘텐츠',416],['커리어',358],['스킬',276],['무료 콘텐츠',416],['프리미엄 과정',1305],['멤버십 CTA',186]];
  const shots = [['01-hero-toppick','히어로 · Weekly Top Pick',['위계 동일','카드 높이 과다']],['02-career-skill-free','커리어 · 스킬 · 무료',['라인 구분 과다','구역 구분 어려움']],['03-premium','프리미엄 과정',['1,305px · 이미지 위주']],['04-membership-footer','멤버십 · 푸터',['CTA가 맨 아래']],['05-skill-galaxy','스킬 갤럭시',['구조 유지, 스타일 개선']]];
  return `<div class="wrap" style="padding-bottom:var(--spacing-24)">
    <div class="a-pt"><h1>현행 진단</h1><p class="t16 c60" style="margin-top:var(--spacing-1)">hu.dev.hunet.com 기준 · 상단 탭에서 A·B·C와 비교하세요 (키보드 1~4)</p>
      <div class="chips" style="margin-top:var(--spacing-4)">${[['홈','/'],['콘텐츠','/contents'],['스킬','/skills'],['로그인','/login']].map(([k,p])=>`<a class="chip option" href="https://hu.dev.hunet.com${p}" target="_blank" rel="noopener">현행 ${k} ${I.ext}</a>`).join('')}</div></div>
    <div class="cur-grid">
      <div class="p"><h2>앤디 피드백</h2><ul><li>리스팅 카드가 너무 높다</li><li>정보가 라인으로 구분되어 복잡하다</li><li>구역 구분이 어렵다</li><li>완성도가 떨어져 보인다</li><li>AI 작업물 같고 스타일이 별로다 (v1)</li></ul></div>
      <div class="p"><h2>v2 방향</h2><ul><li>HDS 토큰·컴포넌트 전면 적용</li><li>uibowl 레퍼런스(리디·퍼블리·인프런) 기반</li><li>세 안을 서로 다른 스타일로 분리</li><li>스킬·콘텐츠 목록을 핵심 화면으로</li></ul></div>
      <div class="p"><h2>현행 섹션 높이 (px)</h2>${H.map(([k,v])=>`<div class="hb"><span>${k}</span><i class="${v>1000?'hot':''}" style="width:${Math.round(v/1305*100)}%"></i><span>${v.toLocaleString()}</span></div>`).join('')}</div>
    </div>
    <div class="cur-shots">${shots.map(([f,t,tags])=>`<figure><figcaption>${t} ${tags.map(x=>badge(x,'brand')).join('')}</figcaption><img src="${REF}/${f}.jpg" alt="현행 ${t} 화면" loading="lazy"></figure>`).join('')}</div></div>`;
}

// =========================================================
// 입력 바인딩
// =========================================================
function bindSkq(){
  const q = $('#skq'); if (!q) return;
  q.addEventListener('input', () => {
    const v = q.value.trim().toLowerCase();
    $$('#skList [data-s], #skList [data-bsk]').forEach(b => b.style.display = !v || b.textContent.toLowerCase().includes(v) ? '' : 'none');
    $$('#skList .a-grp, #skList .c-idx').forEach(g => g.style.display = $$('[data-s]', g).some(b=>b.style.display!=='none') ? '' : 'none');
  });
}
document.addEventListener('click', e => {
  const t = e.target;
  const nf = t.closest('[data-navf]'); if (nf) { e.preventDefault(); const [page, kv] = nf.dataset.navf.split('|'); const [k,v] = kv.split('='); F.cat='전체'; F.type='전체'; F.price='전체'; F.q=''; F[k]=v; return go({page, id:null, o:null}); }
  if (t.closest('[data-cp]') || t.closest('#tgConcept')) { const on = !$('#concept').classList.contains('open'); store.set('hu3-concept', on?'1':'0'); return renderConcept(); }
  const sc = t.closest('[data-scroll]'); if (sc) { e.preventDefault(); $$('.a-tabs .tab').forEach(a=>a.classList.toggle('on', a===sc)); document.getElementById(sc.dataset.scroll)?.scrollIntoView({behavior:'smooth', block:'start'}); }
});

// 시작
addEventListener('hashchange', renderConcept);
initProto(); render(); renderConcept();
