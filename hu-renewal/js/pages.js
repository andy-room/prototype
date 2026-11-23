// =========================================================
// 안별 화면 — A(가치 제안형·상세 페이지) / B(탐색형·드로어) / C(매거진형·모달)
// =========================================================
const C = id => byId(id);
const pick = HOME.pick.map(C), trend = HOME.trend.map(C), free = HOME.free.map(C);
const topSkills = n => [...SKILLS].sort((a,b)=>b.n-a.n).slice(0,n);
const countBy = (k, v) => CONTENTS.filter(c => v==='전체' || c[k]===v).length;
F.homeAx = 'skill'; F.skTab = 'info';
const careerReco = car => {
  const hit = [...CONTENTS].map(c=>({c, w:c.sk.filter(k=>car.sk.includes(k)).length})).filter(x=>x.w).sort((a,b)=>b.w-a.w || b.c.n-a.c.n).map(x=>x.c);
  // 매칭이 4개 미만이면 인기 콘텐츠로 채움
  const pad = [...CONTENTS].sort((a,b)=>b.n-a.n).filter(c=>!hit.includes(c));
  return [...hit, ...pad].slice(0,4);
};
const qChip = () => F.q ? `<button class="chip on" data-f="q=">‘${F.q}’ 검색 결과 ✕</button>` : '';
const searchBox = (id, ph) => `<form class="input-ico" data-qform style="min-width:260px">${I.search}<input class="input" id="${id}" name="q" placeholder="${ph}" value="${F.q}" autocomplete="off"></form>`;
const listCards = list => list.length ? (F.view==='list' ? `<div class="vstack" style="gap:8px">${list.map(c=>hcard(c,true)).join('')}</div>` : `<div class="g4">${list.map(card).join('')}</div>`) : `<div class="empty">조건에 맞는 콘텐츠가 없어요. 필터를 바꿔보세요.</div>`;
const skc = s => `<button class="skc" data-s="${s.id}">${skIco(s)}<div><b>${s.k}</b><small>${s.e}</small><div class="stat"><span>학습자 ${s.n.toLocaleString()}</span><span>콘텐츠 ${contentsOfSkill(s).length}</span></div></div></button>`;
const sortSel = () => `<select class="select" data-fsel="sort" aria-label="정렬">${[['pop','인기순'],['new','최신순']].map(([v,l])=>`<option value="${v}" ${F.sort===v?'selected':''}>${l}</option>`).join('')}</select>`;

const PAGES = {};

// =========================================================
// A안 — 가치 제안형 / 상세는 별도 페이지
// =========================================================
PAGES.a = {
  home(){
    return `
    <section class="blk">${note('첫 화면에서 서비스 정체성과 가입 이유를 전달. CTA 2단계(가입 / 무료 체험)')}
      <div class="wrap a-hero">
        <div>
          <span class="kicker">Hunet University</span>
          <h1 class="t-hero" style="margin-top:14px">직무에 필요한 스킬,<br>실무로 바로 배우세요</h1>
          <p class="lead">커리어별 로드맵부터 오늘 볼 아티클까지. HU 멤버십 하나로 모든 콘텐츠를 무제한으로 학습해요.</p>
          <div class="acts"><button class="btn btn-p btn-lg" data-login>멤버십 시작하기</button><button class="btn btn-s btn-lg" data-navf="contents|price=무료">무료 콘텐츠 둘러보기</button></div>
          <div class="nums"><div><strong class="num">13,072</strong><span>콘텐츠</span></div><div><strong class="num">24</strong><span>커리어 로드맵</span></div><div><strong class="num">180+</strong><span>직무 스킬</span></div></div>
        </div>
        <div class="stack">${pick.slice(0,3).map((c,i)=>`<div class="s s${i+1}" data-c="${c.id}">${th(c.img,'',typeTag(c))}<h3 class="card-t clamp1">${c.title}</h3><p class="card-m">${metaHTML(c)}</p></div>`).join('')}</div>
      </div>
    </section>
    <section class="blk tight">
      <div class="wrap explore">
        <h2>어떤 걸 배우고 싶으세요?</h2>
        <div class="seg" role="tablist"><button role="tab" aria-selected="${F.homeAx==='skill'}" data-f="homeAx=skill">스킬로 찾기</button><button role="tab" aria-selected="${F.homeAx==='career'}" data-f="homeAx=career">커리어로 찾기</button></div>
        <div class="chips">${F.homeAx==='skill'
          ? topSkills(9).map(skPill).join('') + `<button class="chip" data-galaxy="2">${I.galaxy}스킬 갤럭시로 보기</button>`
          : CAREERS.map(c=>`<button class="chip" data-toast="커리어 페이지는 시안 범위 밖이에요">${c.k}</button>`).join('')}</div>
      </div>
    </section>
    <section class="blk">
      <div class="wrap">${secHead('Weekly Top Pick','이번 주 에디터가 고른 콘텐츠', more('전체보기','data-nav="contents"'))}
        <div class="feat">
          <article class="feat-big" data-c="${pick[0].id}">${th(pick[0].img,'',typeTag(pick[0]))}<div><h3>${pick[0].title}</h3><p style="margin-top:8px">${pick[0].d}</p><p class="card-m" style="margin-top:10px">${metaHTML(pick[0])}</p></div></article>
          <div class="feat-list">${pick.slice(1).map(c=>hcard(c)).join('')}</div>
        </div>
      </div>
    </section>
    <section class="blk band">
      <div class="wrap">${secHead('지금 뜨고 있는 콘텐츠','최근 7일 학습자 기준', more('전체보기','data-nav="contents"'))}
        <div class="rank-row">${trend.map((c,i)=>`<article class="rr" data-c="${c.id}">${th(c.img)}<div class="rr-top"><span class="rr-no">${i+1}</span><span class="chg ${chgCls(chg[i])}">${chg[i]}</span></div><h3 class="card-t clamp2">${c.title}</h3><p class="card-m">${metaHTML(c)}</p></article>`).join('')}</div>
      </div>
    </section>
    <section class="blk">
      <div class="wrap">${secHead('무료로 시작하기','가입 없이 바로 볼 수 있어요', more('전체보기','data-navf="contents|price=무료"'))}<div class="g4">${free.map(card).join('')}</div></div>
    </section>
    <section class="blk band">
      <div class="wrap">${secHead('프리미엄 과정','학위·자격 수준의 심화 과정')}<div class="g2">${PREMIUM.map(priceCard).join('')}</div></div>
    </section>
    <section class="blk"><div class="wrap">${memberBand()}</div></section>`;
  },

  contents(){
    const list = filtered();
    const showPop = F.cat==='전체' && F.type==='전체' && F.price==='전체' && !F.q;
    return `
    <section class="blk" style="padding-bottom:32px">${note('카테고리(탭) → 유형·정렬·보기 방식(툴바) 2단 구조. 인기 콘텐츠는 띠로 분리')}
      <div class="wrap">
        <div class="pg-head"><div><h1 class="pt">콘텐츠</h1><p class="pd">강의, 아티클, 영상, 카드뉴스를 한곳에서</p></div>${searchBox('aq','콘텐츠 검색')}</div>
        <div class="cat-tabs">${CATS.map(c=>`<button class="chip ${F.cat===c?'on':''}" data-f="cat=${c}">${c}</button>`).join('')}</div>
      </div>
    </section>
    ${showPop?`<section class="blk band" style="padding-top:40px;padding-bottom:40px"><div class="wrap">${secHead('인기 콘텐츠','지금 가장 많이 학습하는 콘텐츠')}<div class="g4">${[...CONTENTS].sort((a,b)=>b.n-a.n).slice(0,4).map(card).join('')}</div></div></section>`:''}
    <section class="blk" style="padding-top:32px">
      <div class="wrap">
        <div class="toolbar">
          <div class="seg" role="tablist">${['전체',...TYPES].map(t=>`<button role="tab" aria-selected="${F.type===t}" data-f="type=${t}">${t}</button>`).join('')}</div>
          ${F.price!=='전체'?`<button class="chip on" data-f="price=전체">${F.price} ✕</button>`:''}${qChip()}
          <span class="sp"></span><span class="count">총 <b class="num">${list.length}</b>개</span>${sortSel()}
          <div class="seg"><button aria-selected="${F.view==='grid'}" data-f="view=grid">카드</button><button aria-selected="${F.view==='list'}" data-f="view=list">리스트</button></div>
        </div>
        ${listCards(list)}
      </div>
    </section>`;
  },

  content(id){
    const c = C(id) || CONTENTS[0];
    return `
    <section class="blk tight">${note('상세는 독립 페이지. 우측 구매 박스 고정, 섹션 탭은 스크롤 이동')}
      <div class="wrap">
        <nav class="crumb"><a href="${href({page:'contents',id:null})}">${I.back}콘텐츠</a><span>/</span><span>${c.cat}</span></nav>
        <div class="cd">
          <div>
            ${th(c.img,'cd-img')}
            <div class="cd-head"><div class="tags">${typeTag(c)}<span class="tag">${c.cat}</span></div><h1>${c.title}</h1><p>${descOf(c)}</p></div>
            <div class="cd-tabs">${[['intro','소개'],['skills','얻는 스킬'],['curr','커리큘럼'],['review','리뷰']].map(([k,l],i)=>`<a href="javascript:void 0" data-scroll="sec-${k}" class="${i===0?'on':''}">${l}</a>`).join('')}</div>
            <div class="cd-sec" id="sec-intro"><h2>이런 분께 추천해요</h2><ol class="curr" style="counter-reset:none">${['현업에서 바로 쓸 수 있는 방법을 찾는 분','체계적으로 기본기를 다지고 싶은 분','짧은 시간에 핵심만 익히고 싶은 분'].map(t=>`<li style="counter-increment:none">✓ ${t}</li>`).join('')}</ol></div>
            <div class="cd-sec" id="sec-skills"><h2>학습하면 얻는 스킬 <small>${c.sk.length}개</small></h2>${skillPtsHTML(c)}</div>
            <div class="cd-sec" id="sec-curr"><h2>커리큘럼 <small>${CURRICULUM(c).length}개 차시</small></h2>${currHTML(c)}</div>
            <div class="cd-sec" id="sec-review"><h2>리뷰 <small>0</small></h2><div class="review-empty">아직 리뷰가 없어요. 학습을 마치고 첫 리뷰를 남겨주세요.</div></div>
          </div>
          <aside class="buy">
            ${buyPrice(c)}${buyFacts(c)}
            <div class="buy-act"><button class="btn btn-p btn-lg" data-login>${c.type==='과정'?'학습하기':'바로 보기'}</button><button class="icon-btn" data-toast="찜 목록에 담았어요" aria-label="찜">${I.heart}</button><button class="icon-btn" data-toast="링크를 복사했어요" aria-label="공유">${I.share}</button></div>
            <p class="buy-note">${c.n?`${c.n}명이 학습하고 있어요`:'새로 열린 콘텐츠예요'}</p>
          </aside>
        </div>
      </div>
    </section>
    <section class="blk band"><div class="wrap">${secHead('함께 보면 좋은 콘텐츠')}<div class="g4">${relatedOf(c).map(card).join('')}</div></div></section>`;
  },

  skills(){
    return `
    <section class="blk" style="padding-bottom:32px">${note('그룹(분야)별로 묶어 탐색 부담을 줄임. 갤럭시는 상단 버튼과 스킬 상세에서 진입')}
      <div class="wrap">
        <div class="pg-head"><div><h1 class="pt">스킬</h1><p class="pd">직무에 필요한 스킬을 분야별로 살펴보세요</p></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap"><div class="input-ico" style="min-width:240px">${I.search}<input class="input" id="skq" placeholder="스킬 검색" autocomplete="off"></div><button class="btn btn-p" data-galaxy="2">${I.galaxy}스킬 갤럭시</button></div></div>
      </div>
    </section>
    <section class="blk band" style="padding-top:36px;padding-bottom:36px"><div class="wrap">${secHead('인기 스킬 TOP 5','이번 달 학습자가 가장 많이 선택했어요')}
      <div class="top-skills">${topSkills(5).map((s,i)=>`<button class="ts" data-s="${s.id}"><span class="no">${i+1}</span>${skIco(s)}<div><b>${s.k}</b><small class="num">학습자 ${s.n.toLocaleString()}명</small></div></button>`).join('')}</div></div></section>
    <section class="blk" id="skList"><div class="wrap">
      ${GROUPS.map(g=>{ const list=SKILLS.filter(s=>s.g===g); return `<div class="sk-group"><div class="sk-group-h">${skIco(list[0])}<h3>${g}</h3><small>${list.length}개</small></div><div class="sk-grid">${list.map(s=>skChip(s,true)).join('')}</div></div>`; }).join('')}
    </div></section>`;
  },

  skill(id){
    const s = skillById(id) || SKILLS[0];
    const cs = contentsOfSkill(s);
    return `
    <section class="blk tight">${note('스킬 상세 = 설명 + 미니 갤럭시. 관련 콘텐츠·커리어·연관 스킬로 이어짐')}
      <div class="wrap">
        <nav class="crumb"><a href="${href({page:'skills',id:null})}">${I.back}스킬</a><span>/</span><span>${s.g}</span></nav>
        <div class="sd-head">
          <div class="sd-l">${skIco(s,'lg')}<span class="tag">${s.g}</span><h1>${s.k}</h1><span class="en">${s.e}</span><p>${skillDesc(s)}</p>
            <div class="sd-acts"><button class="btn btn-p" data-scroll="sk-contents">관련 콘텐츠 보기</button><button class="icon-btn" data-toast="관심 스킬에 추가했어요" aria-label="관심 스킬">${I.heart}</button></div>
            <div class="sd-stats"><div><b>${s.n.toLocaleString()}</b><small>학습자</small></div><div><b>${cs.length}</b><small>관련 콘텐츠</small></div><div><b>${careersOfSkill(s).length}</b><small>연결된 커리어</small></div></div>
          </div>
          <div class="sd-gx"><div data-gx-mini="${s.id}" style="position:absolute;inset:0"></div><button class="btn btn-sm" data-galaxy="${s.id}">${I.galaxy}갤럭시에서 보기</button></div>
        </div>
      </div>
    </section>
    <section class="blk" id="sk-contents" style="padding-top:24px"><div class="wrap">${secHead('이 스킬을 배울 수 있는 콘텐츠', `${cs.length}개`)}<div class="g4">${cs.map(card).join('')}</div></div></section>
    <section class="blk band"><div class="wrap">
      ${secHead('이 스킬이 필요한 커리어')}<div class="g4" style="gap:12px">${careersOfSkill(s).map(carMini).join('')}</div>
      <div style="margin-top:40px">${secHead('함께 배우면 좋은 스킬')}<div class="chips">${relatedSkills(s).map(skPill).join('')}</div></div>
    </div></section>`;
  },

  login(){ return `<div class="login-wrap">${loginCard()}</div>`; },
  contentOverlay: c => PAGES.c.contentOverlay(c),
  skillOverlay: s => PAGES.c.skillOverlay(s),
  after: bindInputs
};

// =========================================================
// B안 — 탐색형 / 상세는 우측 드로어 (목록 맥락 유지)
// =========================================================
PAGES.b = {
  home(){
    const car = CAREERS.find(c=>c.id===F.career) || CAREERS[0];
    return `
    <section class="blk">${note('히어로 = 검색. "내가 원하는 것"부터 시작하는 탐색 진입')}
      <div class="wrap b-hero">
        <span class="kicker">Hunet University</span>
        <h1 class="t-hero" style="margin-top:12px">무엇을 배우고 싶으세요?</h1>
        <p class="pd">직무, 스킬, 키워드로 나에게 맞는 학습을 찾아보세요</p>
        <form class="bsearch" data-qform>${I.search}<input name="q" placeholder="예: 데이터 분석, 기획서 작성, 리더십" autocomplete="off"><button class="btn btn-p">검색</button></form>
        <div class="kw"><span>인기 검색어</span>${['데이터','AI','리더십','영업','브랜드','영어'].map(k=>`<button class="chip" data-q="${k}">${k}</button>`).join('')}</div>
      </div>
    </section>
    <section class="blk band">
      <div class="wrap">${note('커리어 카드를 고르면 아래 추천이 바뀜 (직접 눌러보세요)')}${secHead('커리어로 찾기','직무를 고르면 필요한 스킬과 콘텐츠를 추천해요', more('전체 커리어','data-toast="커리어 페이지는 시안 범위 밖이에요"'))}
        <div class="career5">${CAREERS.map(c=>careerCard(c).replace('class="cc"', `class="cc" aria-pressed="${c.id===car.id}"`)).join('')}</div>
        <div class="reco"><div class="reco-h"><span class="tag">${car.k}</span>직무에 추천하는 콘텐츠</div><div class="g4">${careerReco(car).map(card).join('')}</div>
          <div class="chips" style="margin-top:20px"><span class="count" style="align-self:center;margin-right:4px">필요 스킬</span>${car.sk.map(skillByName).filter(Boolean).map(skPill).join('')}</div></div>
      </div>
    </section>
    <section class="blk">
      <div class="wrap">${secHead('많이 찾는 스킬','이번 달 학습자가 가장 많이 선택한 스킬', `<div style="display:flex;gap:4px">${more('갤럭시로 보기','data-galaxy="2"')}${more('전체 스킬','data-nav="skills"')}</div>`)}
        <div class="skill6">${topSkills(6).map(skc).join('')}</div></div>
    </section>
    <section class="blk band">
      <div class="wrap split">
        <div class="pane">${secHead('Weekly Top Pick','', more('전체보기','data-nav="contents"'))}<div class="vstack">${pick.map(c=>hcard(c)).join('')}</div></div>
        <div class="pane">${secHead('지금 뜨는 TOP 5','', more('전체보기','data-nav="contents"'))}<div class="rk-list">${trend.map(rank).join('')}</div></div>
      </div>
    </section>
    <section class="blk"><div class="wrap">${secHead('무료로 시작하기','가입 없이 바로 볼 수 있어요', more('전체보기','data-navf="contents|price=무료"'))}<div class="g4">${free.map(card).join('')}</div></div></section>
    <section class="blk band"><div class="wrap b-bottom">
      <div>${secHead('프리미엄 과정')}<div class="vstack">${PREMIUM.map(priceCard).join('')}</div></div>
      ${memberBand(true)}
    </div></section>`;
  },

  contents(){
    const list = filtered();
    const opt = (k, v, cnt) => `<button class="f-opt ${F[k]===v?'on':''}" data-f="${k}=${v}">${v}${cnt!=null?`<small>${cnt}</small>`:''}</button>`;
    return `
    <section class="blk">${note('좌측 필터 패널 + 리스트형 결과. 상세는 드로어로 열려 목록 맥락이 유지됨')}
      <div class="wrap">
        <div class="pg-head"><div><h1 class="pt">콘텐츠</h1><p class="pd">조건을 좁혀 나에게 맞는 콘텐츠를 찾아보세요</p></div></div>
        <div class="b-list">
          <aside class="filters">
            <form class="input-ico" data-qform>${I.search}<input class="input" name="q" placeholder="검색" value="${F.q}" autocomplete="off"></form>
            <div class="f-group"><h4>카테고리</h4><div class="f-opts">${CATS.map(c=>opt('cat',c,countBy('cat',c))).join('')}</div></div>
            <div class="f-group"><h4>유형</h4><div class="f-opts">${['전체',...TYPES].map(t=>opt('type',t,countBy('type',t))).join('')}</div></div>
            <div class="f-group"><h4>가격</h4><div class="f-opts">${['전체','무료','멤버십','유료'].map(t=>opt('price',t)).join('')}</div></div>
          </aside>
          <div>
            <div class="toolbar" style="margin-top:0">${qChip()}<span class="count">총 <b class="num">${list.length}</b>개</span><span class="sp"></span>${sortSel()}</div>
            <div class="results">${list.length ? list.map(c=>hcard(c,true)).join('') : '<div class="empty">조건에 맞는 콘텐츠가 없어요.</div>'}</div>
          </div>
        </div>
      </div>
    </section>`;
  },

  skills(){
    const list = SKILLS.filter(s=>F.group==='전체'||s.g===F.group);
    return `
    <section class="blk">${note('목록 ↔ 갤럭시를 한 페이지에서 전환. 스킬 상세는 드로어')}
      <div class="wrap">
        <div class="pg-head"><div><h1 class="pt">스킬</h1><p class="pd">스킬을 목록으로 보거나, 갤럭시에서 연결 관계로 탐색하세요</p></div>
          <div class="seg" role="tablist"><button role="tab" aria-selected="${F.skView==='list'}" data-f="skView=list">목록</button><button role="tab" aria-selected="${F.skView==='galaxy'}" data-f="skView=galaxy">${'갤럭시'}</button></div></div>
        ${F.skView==='galaxy'
          ? `<div data-gx-embed="2" style="height:min(680px,calc(100vh - 260px));min-height:480px;border-radius:20px"></div><p class="count" style="margin-top:12px">노드를 누르면 정보가 열리고, 스킬은 한 번 더 누르면 중심으로 이동해요. 드래그로 이동, 휠로 확대할 수 있어요.</p>`
          : `<div class="toolbar"><div class="chips">${['전체',...GROUPS].map(g=>`<button class="chip ${F.group===g?'on':''}" data-f="group=${g}">${g}</button>`).join('')}</div><span class="sp"></span><div class="input-ico" style="min-width:220px">${I.search}<input class="input" id="skq" placeholder="스킬 검색" autocomplete="off"></div></div>
             <div class="skill-cards" id="skList">${list.map(skc).join('')}</div>`}
      </div>
    </section>`;
  },

  login(){
    return `<div class="login-split">
      <div class="ls-l"><span class="kicker">HU 멤버십</span><h1>배움이 커리어가 되는 곳</h1><p>직무 스킬 진단부터 커리어 로드맵, 1,200개 이상의 실무 콘텐츠까지 한 번에 시작하세요.</p>
        <div class="pts"><span>✓ 커리어별 필요 스킬과 학습 경로 추천</span><span>✓ 학습할수록 쌓이는 스킬 포인트</span><span>✓ 언제든 해지 가능한 멤버십</span></div>
        <div class="mosaic">${[1,3,5,13,14,17].map(id=>th(C(id).img)).join('')}</div></div>
      <div class="ls-r">${loginCard()}</div></div>`;
  },

  contentOverlay(c){
    return `<div class="scrim" data-close></div>
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="${c.title}">
      <div class="dr-h"><span class="ttl">${c.cat} · ${c.type}</span><button class="x" data-toast="찜 목록에 담았어요" aria-label="찜">${I.heart}</button><button class="x" data-close aria-label="닫기">${I.x}</button></div>
      <div class="dr-b">
        ${th(c.img,'cd-img')}
        <div class="cd-head" style="margin-top:20px"><h1 style="font-size:24px;margin-top:0">${c.title}</h1><p>${descOf(c)}</p></div>
        <div style="margin-top:20px">${buyFacts(c)}</div>
        <div class="cd-sec"><h2>학습하면 얻는 스킬 <small>${c.sk.length}개</small></h2>${skillPtsHTML(c)}</div>
        <div class="cd-sec"><h2>커리큘럼</h2>${currHTML(c)}</div>
        <div class="cd-sec"><h2>함께 보면 좋은 콘텐츠</h2><div class="vstack">${relatedOf(c,3).map(x=>hcard(x)).join('')}</div></div>
      </div>
      <div class="dr-f"><div><div class="card-m">${c.t}${c.n?` · ${c.n}명 학습`:''}</div><div class="amt">${c.p||'바로 보기'}</div></div><button class="btn btn-p btn-lg" data-login>${c.type==='과정'?'학습하기':'바로 보기'}</button></div>
    </aside>`;
  },

  skillOverlay(s){
    const cs = contentsOfSkill(s), cars = careersOfSkill(s);
    const tab = F.skTab;
    return `<div class="scrim" data-close></div>
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="${s.k}">
      <div class="dr-h"><span class="ttl">스킬 · ${s.g}</span><button class="x" data-toast="관심 스킬에 추가했어요" aria-label="관심 스킬">${I.heart}</button><button class="x" data-close aria-label="닫기">${I.x}</button></div>
      <div class="dr-b">
        <div style="display:flex;gap:16px;align-items:center">${skIco(s,'lg')}<div><h1 class="pt" style="font-size:26px">${s.k}</h1><span class="count">${s.e}</span></div></div>
        <div class="sd-stats" style="padding-top:20px"><div><b>${s.n.toLocaleString()}</b><small>학습자</small></div><div><b>${cs.length}</b><small>관련 콘텐츠</small></div><div><b>${cars.length}</b><small>커리어</small></div></div>
        <div class="dr-tabs seg" style="display:flex">${[['info','스킬 정보'],['contents',`콘텐츠 ${cs.length}`],['careers',`커리어 ${cars.length}`]].map(([k,l])=>`<button style="flex:1" aria-selected="${tab===k}" data-f="skTab=${k}">${l}</button>`).join('')}</div>
        ${tab==='info' ? `<p style="font-size:15px;color:var(--text-2);line-height:1.7;margin-top:16px">${skillDesc(s)}</p>
          <div style="position:relative;height:280px;border-radius:14px;overflow:hidden;margin-top:20px"><div data-gx-mini="${s.id}" style="position:absolute;inset:0"></div><button class="btn btn-sm" style="position:absolute;right:12px;bottom:12px;background:#fff;color:#17171A" data-galaxy="${s.id}">${I.galaxy}갤럭시에서 보기</button></div>
          <div class="cd-sec"><h2>함께 배우면 좋은 스킬</h2><div class="chips">${relatedSkills(s).slice(0,6).map(skPill).join('')}</div></div>`
        : tab==='contents' ? `<div class="vstack" style="margin-top:20px">${cs.map(c=>hcard(c)).join('')}</div>`
        : `<div class="vstack" style="margin-top:20px;gap:8px">${cars.map(carMini).join('')}</div>`}
      </div>
    </aside>`;
  },
  after: bindInputs
};

// =========================================================
// C안 — 매거진형 / 상세는 모달
// =========================================================
PAGES.c = {
  home(){
    const h = pick[0];
    return `
    <section class="blk">${note('히어로 = 이번 주 대표 콘텐츠. 매거진 커버처럼 편집된 추천')}
      <div class="wrap c-feat">
        <article class="hero-card" data-c="${h.id}">${th(h.img)}
          <div class="hc-cap"><span class="kicker">Weekly Top Pick · ${h.type}</span><h1>${h.title}</h1><p class="clamp2">${h.d}</p><p class="card-m" style="margin-top:12px">${metaHTML(h)}</p><button class="btn btn-p btn-lg">지금 학습하기</button></div>
        </article>
        <aside class="c-side"><span class="kicker">이번 주 추천</span>
          ${pick.slice(1).map(c=>hcard(c)).join('')}
        </aside>
      </div>
    </section>
    <section class="blk band">
      <div class="wrap c-two">
        <div class="top5">${secHead('지금 뜨는 TOP 5','최근 7일 학습자 기준', more('전체보기','data-nav="contents"'))}<div class="rk-list">${trend.map(rank).join('')}</div></div>
        <div>${secHead('많이 보는 스킬','이번 달 인기 스킬', more('전체보기','data-nav="skills"'))}
          <div class="sk-rank">${topSkills(6).map((s,i)=>`<button data-s="${s.id}"><span class="n">${i+1}</span>${skIco(s)}<b>${s.k}</b><small>${s.n.toLocaleString()}명</small></button>`).join('')}</div></div>
      </div>
    </section>
    <section class="blk dark">
      <div class="wrap gal-teaser">
        <div><span class="kicker" style="color:#6EE7B7">Skill Galaxy</span><h2>스킬 사이의 연결을<br>한눈에 탐색하세요</h2><p>하나의 스킬에서 출발해 연관 스킬, 배울 수 있는 콘텐츠, 필요한 커리어까지 우주처럼 펼쳐 보여드려요.</p>
          <div class="acts"><button class="btn btn-p btn-lg" data-galaxy="2">${I.galaxy}갤럭시 열기</button><button class="btn btn-s btn-lg" data-nav="skills">스킬 둘러보기</button></div></div>
        <div data-gx-mini="2" data-galaxy="2" style="cursor:pointer"></div>
      </div>
    </section>
    <section class="blk">
      <div class="wrap">${secHead('지금 시작하기 좋은 커리어','직무별 로드맵으로 차근차근', more('전체보기','data-toast="커리어 페이지는 시안 범위 밖이에요"'))}
        <div class="hscroll">${CAREERS.map(c=>`<div class="c-career" data-toast="커리어 페이지는 시안 범위 밖이에요">${th(c.img,'r34')}<div class="cap"><small>${c.e}</small><b>${c.k}</b><small>필요 스킬 ${c.sk.length}개</small></div></div>`).join('')}</div></div>
    </section>
    <section class="blk band"><div class="wrap">${secHead('무료로 시작하기','가입 없이 바로 볼 수 있어요', more('전체보기','data-navf="contents|price=무료"'))}<div class="g4">${free.map(card).join('')}</div></div></section>
    <section class="blk"><div class="wrap">${secHead('프리미엄 과정','학위·자격 수준의 심화 과정')}<div class="g2">${PREMIUM.map(priceCard).join('')}</div></div></section>
    <div class="sticky-bar" id="cBar"><b>HU 멤버십</b><span>모든 스킬을 무제한으로</span><button class="btn btn-sm" data-login>멤버십 시작하기</button></div>`;
  },

  contents(){
    const list = filtered();
    const [hero, ...rest] = list;
    return `
    <section class="blk" style="padding-bottom:24px">${note('카테고리 밑줄 탭 + 대표 콘텐츠 1개를 크게. 상세는 모달')}
      <div class="wrap">
        <div class="pg-head"><div><h1 class="pt">콘텐츠</h1><p class="pd">에디터가 고른 이야기부터 차근차근</p></div>${searchBox('cq','콘텐츠 검색')}</div>
        <div class="uline-tabs">${CATS.map(c=>`<button class="${F.cat===c?'on':''}" data-f="cat=${c}">${c}</button>`).join('')}</div>
      </div>
    </section>
    <section class="blk" style="padding-top:24px"><div class="wrap">
      ${hero ? `<article class="c-hero-item" data-c="${hero.id}">${th(hero.img)}<div><div style="display:flex;gap:6px">${typeTag(hero)}<span class="tag">${hero.cat}</span></div><h2>${hero.title}</h2><p class="clamp2">${descOf(hero)}</p><p class="card-m">${metaHTML(hero)}</p><button class="btn btn-p" style="margin-top:20px">자세히 보기</button></div></article>` : ''}
      <div class="toolbar" style="margin-top:0"><div class="chips">${['전체',...TYPES].map(t=>`<button class="chip ${F.type===t?'on':''}" data-f="type=${t}">${t}</button>`).join('')}</div>${F.price!=='전체'?`<button class="chip on" data-f="price=전체">${F.price} ✕</button>`:''}${qChip()}<span class="sp"></span><span class="count">총 <b class="num">${list.length}</b>개</span>${sortSel()}</div>
      ${list.length ? `<div class="g3">${rest.map(card).join('')}</div>` : '<div class="empty">조건에 맞는 콘텐츠가 없어요.</div>'}
    </div></section>`;
  },

  skills(){
    const max = SKILLS[0].n, min = SKILLS[SKILLS.length-1].n;
    const list = SKILLS.filter(s=>F.group==='전체'||s.g===F.group);
    return `
    <section class="blk dark">${note('스킬 페이지 첫 화면 = 갤럭시. 탐색 경험 자체를 메인으로')}
      <div class="wrap">
        <div class="pg-head"><div><span class="kicker" style="color:#6EE7B7">Skill Galaxy</span><h1 class="pt" style="color:#fff;margin-top:8px">스킬 갤럭시</h1><p class="pd" style="color:var(--dark-ink-2)">스킬을 중심으로 연관 스킬, 콘텐츠, 커리어의 연결을 탐색해보세요</p></div><button class="btn btn-lg" style="background:#fff;color:#17171A" data-galaxy="2">전체 화면으로 보기</button></div>
        <div data-gx-embed="2" style="height:560px;border-radius:20px;box-shadow:0 0 0 1px rgba(255,255,255,.06)"></div>
      </div>
    </section>
    <section class="blk band"><div class="wrap">${secHead('인기 스킬 TOP 10','이번 달 학습자 기준')}
      <div class="c-top10">${[0,1].map(col=>`<div class="sk-rank">${topSkills(10).slice(col*5,col*5+5).map((s,i)=>`<button data-s="${s.id}"><span class="n">${col*5+i+1}</span>${skIco(s)}<b>${s.k}</b><small>${s.n.toLocaleString()}명</small></button>`).join('')}</div>`).join('')}</div></div></section>
    <section class="blk"><div class="wrap">${secHead('전체 스킬','글자 크기는 인기도를 나타내요')}
      <div class="chips" style="margin-bottom:24px">${['전체',...GROUPS].map(g=>`<button class="chip ${F.group===g?'on':''}" data-f="group=${g}">${g}</button>`).join('')}</div>
      <div class="cloud">${list.map(s=>{ const r=(s.n-min)/(max-min); return `<button data-s="${s.id}" style="font-size:${(13+r*7).toFixed(1)}px"><i style="background:var(--g${gIdx(s)}i)"></i>${s.k}</button>`; }).join('')}</div>
    </div></section>`;
  },

  contentOverlay(c){
    return `<div class="scrim" data-close></div>
    <div class="modal" role="dialog" aria-modal="true" aria-label="${c.title}"><button class="x md-x" data-close aria-label="닫기">${I.x}</button>
      <div class="md-b">
        <div class="md-grid">
          <div class="l">${th(c.img)}<div class="cd-sec" style="padding-bottom:0"><h2>학습하면 얻는 스킬 <small>${c.sk.length}개</small></h2>${skillPtsHTML(c)}</div></div>
          <div class="r">
            <div style="display:flex;gap:6px">${typeTag(c)}<span class="tag">${c.cat}</span></div>
            <h1 style="font-size:24px;font-weight:700;letter-spacing:-.03em;line-height:1.35;color:var(--ink);margin-top:12px">${c.title}</h1>
            <p style="font-size:14.5px;color:var(--text-2);line-height:1.7;margin-top:10px">${descOf(c)}</p>
            <div style="margin:20px 0 14px">${buyPrice(c)}</div>${buyFacts(c)}
            <div class="buy-act" style="margin-top:16px"><button class="btn btn-p btn-lg" data-login>${c.type==='과정'?'학습하기':'바로 보기'}</button><button class="icon-btn" data-toast="찜 목록에 담았어요" aria-label="찜">${I.heart}</button></div>
            <div class="cd-sec"><h2>커리큘럼</h2>${currHTML(c)}</div>
          </div>
        </div>
        <div style="padding:28px;background:var(--band)">${secHead('함께 보면 좋은 콘텐츠')}<div class="g4">${relatedOf(c).map(card).join('')}</div></div>
      </div>
    </div>`;
  },

  skillOverlay(s){
    const cs = contentsOfSkill(s), cars = careersOfSkill(s);
    return `<div class="scrim" data-close></div>
    <div class="modal md" role="dialog" aria-modal="true" aria-label="${s.k}"><button class="x md-x" data-close aria-label="닫기">${I.x}</button>
      <div class="md-b">
        <div style="padding:32px 32px 0">
          <div style="display:flex;gap:16px;align-items:center">${skIco(s,'lg')}<div><span class="tag">${s.g}</span><h1 class="pt" style="margin-top:6px">${s.k}</h1><span class="count">${s.e}</span></div></div>
          <p style="font-size:15px;color:var(--text-2);line-height:1.7;margin-top:16px">${skillDesc(s)}</p>
          <div class="sd-stats"><div><b>${s.n.toLocaleString()}</b><small>학습자</small></div><div><b>${cs.length}</b><small>관련 콘텐츠</small></div><div><b>${cars.length}</b><small>커리어</small></div></div>
          <div style="position:relative;height:300px;border-radius:16px;overflow:hidden;margin-top:24px"><div data-gx-mini="${s.id}" style="position:absolute;inset:0"></div><button class="btn btn-sm" style="position:absolute;right:12px;bottom:12px;background:#fff;color:#17171A" data-galaxy="${s.id}">${I.galaxy}갤럭시에서 보기</button></div>
        </div>
        <div style="padding:28px 32px">${secHead('이 스킬을 배울 수 있는 콘텐츠')}<div class="g3">${cs.slice(0,6).map(card).join('')}</div></div>
        <div style="padding:28px 32px 32px;background:var(--band)">${secHead('필요한 커리어')}<div class="g2" style="gap:10px">${cars.map(carMini).join('')}</div>
          <div style="margin-top:28px">${secHead('함께 배우면 좋은 스킬')}<div class="chips">${relatedSkills(s).slice(0,6).map(skPill).join('')}</div></div></div>
      </div>
    </div>`;
  },
  after: bindInputs
};

// =========================================================
// 현행 진단
// =========================================================
function renderCur(){
  // 로컬(hu-renewal/mockup/)과 배포(prototype/hu-renewal/) 모두에서 캡처 경로가 맞도록
  const REF = location.pathname.includes('/mockup/') ? '../reference/current' : 'reference/current';
  const H = [['히어로',270],['Weekly Top Pick',444],['뜨는 콘텐츠',416],['커리어',358],['스킬',276],['무료 콘텐츠',416],['프리미엄 과정',1305],['멤버십 CTA',186]];
  const shots = [['01-hero-toppick','히어로 · Weekly Top Pick',['섹션·카드 제목 동일 크기','카드 높이 과다']],['02-career-skill-free','커리어 · 스킬 · 무료',['라인 구분 과다','구역 구분 어려움']],['03-premium','프리미엄 과정',['1,305px · 이미지 위주']],['04-membership-footer','멤버십 · 푸터',['CTA가 맨 아래','MBA 0원 표기']],['05-skill-galaxy','스킬 갤럭시',['구조 유지, 스타일 개선 대상']]];
  return `<section class="blk"><div class="wrap">
    <div class="pg-head"><div><h1 class="pt">현행 진단</h1><p class="pd">hu.dev.hunet.com 기준 · 시안 A·B·C는 상단 탭에서 비교하세요 (키보드 1~4)</p></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${[['홈','/'],['콘텐츠','/contents'],['스킬','/skills'],['로그인','/login']].map(([k,p])=>`<a class="btn btn-s btn-sm" href="https://hu.dev.hunet.com${p}" target="_blank" rel="noopener">현행 ${k} ${I.ext}</a>`).join('')}</div></div>
    <div class="cur-grid">
      <div class="panel"><h2>앤디 피드백 → 시안 반영</h2><ul>
        <li><b>카드 높이가 너무 높다</b> → 유형은 썸네일 위, 가격·시간·인원은 메타 한 줄로 압축</li>
        <li><b>라인 구분이 복잡하다</b> → 구분선 제거, 면·여백·글자 위계로 구분</li>
        <li><b>구역 구분이 어렵다</b> → 섹션마다 배경 띠를 번갈아 적용</li>
        <li><b>완성도가 떨어진다</b> → 그림자·라운드·호버·정렬 규칙 통일</li></ul></div>
      <div class="panel"><h2>레이아웃 진단</h2><ol>
        <li><b>위계 동일</b>: 섹션 제목 = 카드 제목 (20px/700)</li><li><b>형태 동일</b>: 큐레이션·인기·무료가 같은 4열 카드</li>
        <li><b>탐색 매몰</b>: 커리어·스킬이 콘텐츠 사이에 묻힘</li><li><b>비중 불균형</b>: 프리미엄 1,305px, 멤버십 CTA는 맨 아래</li></ol></div>
      <div class="panel"><h2>섹션별 세로 높이 (px)</h2>${H.map(([k,v])=>`<div class="hbar"><span style="text-align:left">${k}</span><i class="${v>1000?'hot':''}" style="width:${Math.round(v/1305*100)}%"></i><span>${v.toLocaleString()}</span></div>`).join('')}</div>
    </div>
    <div class="cur-shots" style="margin-top:32px">${shots.map(([f,t,tags])=>`<figure class="cur-shot"><figcaption>${t} ${tags.map(x=>`<span class="ptag">${x}</span>`).join('')}</figcaption><img src="${REF}/${f}.jpg" alt="현행 ${t} 화면" loading="lazy"></figure>`).join('')}</div>
  </div></section>`;
}

// =========================================================
// 입력 바인딩 (렌더 후 호출)
// =========================================================
function bindInputs(){
  // 스킬 실시간 검색 (DOM 필터링 — 포커스 유지)
  const skq = $('#skq');
  if (skq) skq.addEventListener('input', () => {
    const q = skq.value.trim().toLowerCase();
    $$('#skList [data-s]').forEach(b => b.style.display = !q || b.textContent.toLowerCase().includes(q) ? '' : 'none');
    $$('#skList .sk-group').forEach(g => g.style.display = $$('[data-s]', g).some(b=>b.style.display!=='none') ? '' : 'none');
  });
  $$('[data-qform]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); F.q = (f.q?.value ?? f.querySelector('input').value).trim(); F.cat='전체'; F.type='전체'; F.price='전체'; go({page:'contents', id:null, o:null}); render(); }));
}
document.addEventListener('click', e => {
  const t = e.target;
  const q = t.closest('[data-q]'); if (q) { F.q=q.dataset.q; F.cat='전체'; F.type='전체'; F.price='전체'; return go({page:'contents', id:null, o:null}); }
  const nf = t.closest('[data-navf]'); if (nf) { const [page, kv] = nf.dataset.navf.split('|'); const [k,v] = kv.split('='); F.cat='전체'; F.type='전체'; F.price='전체'; F.q=''; F[k]=v; return go({page, id:null, o:null}); }
  const car = t.closest('[data-career]'); if (car) { F.career=+car.dataset.career; return render(); }
  const sc = t.closest('[data-scroll]'); if (sc) { e.preventDefault(); $$('.cd-tabs a').forEach(a=>a.classList.toggle('on', a===sc)); document.getElementById(sc.dataset.scroll)?.scrollIntoView({behavior:'smooth', block:'start'}); }
});

// 시작
renderShell(); initProto(); render();
