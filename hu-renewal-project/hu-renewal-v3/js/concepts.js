// HU 리뉴얼 v2 — 컨셉 제안 목업 3종 (궤도 · 스킬 도감 · 질문)
// 이미지는 모두 course()로 꺼낸 AI 강의 썸네일, 제목은 강의명 그대로.

const SK = {
  coach:   { k: '코칭',          c: 'var(--sk-coach)',   d: '구성원이 스스로 답을 찾도록 묻고 듣는 힘' },
  comm:    { k: '커뮤니케이션',  c: 'var(--sk-comm)',    d: '상대에 맞춰 생각을 전하고 설득하는 힘' },
  culture: { k: '조직문화',      c: 'var(--sk-culture)', d: '팀이 같은 방향으로 일하게 만드는 분위기' },
  ai:      { k: '생성형 AI 활용', c: 'var(--sk-ai)',      d: 'AI에게 일을 맡기고 결과를 다듬는 힘' },
};
// 강의별 스킬 연관도 (목업용 예시 값)
const W = {
  HLSP91107: { coach: .92, ai: .81, culture: .74, comm: .66 },
  HLAP08209: { coach: .95, comm: .58, culture: .31, ai: .08 },
  HLSP08657: { coach: .90, culture: .46, comm: .40, ai: .05 },
  HLAP02003: { coach: .86, comm: .44, culture: .30, ai: .06 },
  HLSP38380: { coach: .82, culture: .52, comm: .48, ai: .12 },
  HLAP01419: { ai: .96, comm: .22, culture: .06, coach: .04 },
  HLSP88622: { ai: .92, comm: .18, culture: .08, coach: .05 },
  HLAP21002: { ai: .84, comm: .36, coach: .10, culture: .08 },
  HLAP00417: { ai: .72, coach: .26, comm: .24, culture: .12 },
  HLSP18120: { culture: .91, coach: .44, comm: .30, ai: .04 },
  HLSP78181: { culture: .90, comm: .28, coach: .20, ai: .10 },
  HLSP40578: { culture: .83, comm: .42, coach: .38, ai: .16 },
  HLSP28153: { comm: .92, culture: .18, coach: .16, ai: .06 },
  HLAP00612: { comm: .88, culture: .24, coach: .10, ai: .04 },
  HLSP78178: { comm: .84, culture: .34, coach: .28, ai: .05 },
};
const CAREERS = [
  { k: '팀장',        sk: { coach: 1, culture: .8, comm: .6 } },
  { k: '조직개발(OD)', sk: { culture: 1, coach: .5 } },
  { k: 'HRD 담당자',   sk: { coach: .7, comm: .6, ai: .4 } },
  { k: '전략기획',     sk: { ai: .9, comm: .6 } },
];
const pct = v => Math.round(v * 100);
const skOrder = cd => Object.entries(W[cd]).sort((a, b) => b[1] - a[1]).map(([s]) => s);
const careerScore = (cd, c) => Object.entries(c.sk).reduce((t, [s, v]) => t + v * (W[cd][s] || 0), 0);

/* ---------- 공통 ---------- */
const tb = (on, dark) => `
  <div class="tb">
    <div class="tb-logo"><i></i>Hunet University</div>
    <div class="tb-nav">${['홈', '탐험', '콘텐츠', '마이클래스'].map(t => `<span class="${t === on ? 'on' : ''}">${t}</span>`).join('')}</div>
    <div class="tb-sp"></div>
    <div class="tb-search">나에게 필요한 학습을 검색해 보세요</div>
    <div class="tb-me"></div>
  </div>`;

/* ---------- 01 궤도 ---------- */
const ORBIT = { cx: 440, cy: 360, r1: [230, 150], r2: [340, 245] };
const ORBIT_IDS = Object.keys(W);
let orbitCenter = 'HLSP91107';
let orbitTrail = [{ t: '팀장', k: '커리어' }, { t: '코칭', k: '스킬' }];

function orbitLayout(center) {
  const order = skOrder(center);               // 연관도 높은 스킬부터 위 → 오른쪽 → 아래 → 왼쪽
  const ang = [-90, 0, 90, 180];
  const pos = {}, skills = {}, used = new Set([center]);
  order.forEach((s, i) => {
    const a = ang[i] * Math.PI / 180;
    skills[s] = { x: ORBIT.cx + ORBIT.r1[0] * Math.cos(a), y: ORBIT.cy + ORBIT.r1[1] * Math.sin(a), a: ang[i], w: W[center][s] };
    const picks = ORBIT_IDS.filter(cd => !used.has(cd)).sort((p, q) => W[q][s] - W[p][s]).slice(0, 2);
    picks.forEach((cd, j) => {
      used.add(cd);
      const b = (ang[i] + (j ? 20 : -20)) * Math.PI / 180;
      pos[cd] = { x: ORBIT.cx + ORBIT.r2[0] * Math.cos(b), y: ORBIT.cy + ORBIT.r2[1] * Math.sin(b), s };
    });
  });
  return { order, skills, pos };
}

function renderOrbit(root) {
  root.className = 'mk o';
  root.innerHTML = `${tb('탐험')}
    <div class="o-body">
      <div class="o-stage" id="oStage">
        <svg class="o-rings" viewBox="0 0 880 704" preserveAspectRatio="none">
          <ellipse cx="${ORBIT.cx}" cy="${ORBIT.cy}" rx="${ORBIT.r1[0]}" ry="${ORBIT.r1[1]}"/>
          <ellipse cx="${ORBIT.cx}" cy="${ORBIT.cy}" rx="${ORBIT.r2[0]}" ry="${ORBIT.r2[1]}"/>
          <ellipse class="out" cx="${ORBIT.cx}" cy="${ORBIT.cy}" rx="420" ry="330"/>
          <g id="oLines"></g>
        </svg>
        <div class="o-trail" id="oTrail"></div>
        ${ORBIT_IDS.map(cd => { const c = course(cd); return `<div class="o-n o-c" data-cd="${cd}" style="left:${ORBIT.cx}px;top:${ORBIT.cy}px;opacity:0">${thumb(c)}<p>${c.title}</p></div>`; }).join('')}
        ${Object.entries(SK).map(([s, v]) => `<div class="o-n o-s" data-sk="${s}" style="--k:${v.c};left:${ORBIT.cx}px;top:${ORBIT.cy}px"><i></i>${v.k}<small></small></div>`).join('')}
        ${CAREERS.map((c, i) => `<div class="o-n o-k" data-car="${i}" style="left:${[112, 768, 112, 768][i]}px;top:${[116, 116, 620, 620][i]}px"><b>커리어</b>${c.k}</div>`).join('')}
        <div class="o-legend"><span>가까울수록 관련이 깊어요</span>${Object.values(SK).map(v => `<span><i style="background:${v.c}"></i>${v.k}</span>`).join('')}</div>
      </div>
      <aside class="o-panel" id="oPanel"></aside>
    </div>`;
  root.querySelectorAll('.o-c').forEach(n => n.addEventListener('click', () => {
    const cd = n.dataset.cd;
    if (cd === orbitCenter) return;
    orbitTrail.push({ t: course(orbitCenter).title, k: '강의' });
    orbitCenter = cd;
    updateOrbit(root);
  }));
  updateOrbit(root);
}

function updateOrbit(root) {
  const L = orbitLayout(orbitCenter);
  root.querySelectorAll('.o-c').forEach(n => {
    const cd = n.dataset.cd, p = L.pos[cd], ctr = cd === orbitCenter;
    n.classList.toggle('ctr', ctr);
    n.style.left = (ctr ? ORBIT.cx : p ? p.x : ORBIT.cx) + 'px';
    n.style.top = (ctr ? ORBIT.cy : p ? p.y : ORBIT.cy) + 'px';
    n.style.opacity = ctr || p ? 1 : 0;
    n.style.pointerEvents = ctr || p ? 'auto' : 'none';
    if (p) n.style.setProperty('--k', SK[p.s].c);
  });
  root.querySelectorAll('.o-s').forEach(n => {
    const s = L.skills[n.dataset.sk];
    n.style.left = s.x + 'px'; n.style.top = s.y + 'px';
    n.querySelector('small').textContent = `연관 ${pct(s.w)}%`;
  });
  const top2 = CAREERS.map((c, i) => [i, careerScore(orbitCenter, c)]).sort((a, b) => b[1] - a[1]).slice(0, 2).map(x => x[0]);
  root.querySelectorAll('.o-k').forEach(n => { n.style.opacity = top2.includes(+n.dataset.car) ? 1 : .35; });
  root.querySelector('#oLines').innerHTML =
    Object.entries(L.skills).map(([s, p]) => `<line x1="${ORBIT.cx}" y1="${ORBIT.cy}" x2="${p.x}" y2="${p.y}" stroke="${SK[s].c}" stroke-opacity="${.3 + p.w * .6}"/>`).join('') +
    Object.entries(L.pos).map(([, p]) => { const q = L.skills[p.s]; return `<line x1="${q.x}" y1="${q.y}" x2="${p.x}" y2="${p.y}" stroke="${SK[p.s].c}" stroke-opacity=".5" stroke-dasharray="3 4"/>`; }).join('');
  const trail = orbitTrail.slice(-4);
  root.querySelector('#oTrail').innerHTML = `<em>탐험 경로</em>` + trail.map(x => `<span title="${x.k}">${x.t}</span><b>→</b>`).join('') + `<span class="now">${course(orbitCenter).title}</span>`;
  const c = course(orbitCenter);
  root.querySelector('#oPanel').innerHTML = `
    <div class="lbl">궤도의 중심</div>
    ${thumb(c)}
    <div><h3>${c.title}</h3><div class="meta">${c.cat2} · ${c.cat3} · ${c.cp}</div></div>
    <div><div class="lbl" style="margin-bottom:10px">이 강의가 키우는 스킬</div>
      <div class="o-bars">${L.order.map(s => `<div class="o-bar" style="--k:${SK[s].c}"><span>${SK[s].k}</span><u><i style="width:${pct(W[orbitCenter][s])}%"></i></u><b>${pct(W[orbitCenter][s])}</b></div>`).join('')}</div></div>
    <div><div class="lbl" style="margin-bottom:8px">이어지는 커리어</div>
      <div class="o-cars">${top2.map(i => `<span>${CAREERS[i].k}</span>`).join('')}</div></div>
    <div class="o-btns"><span class="btn pri">학습 시작</span><span class="btn sec">탐험 저장</span></div>`;
}

/* ---------- 02 스킬 도감 ---------- */
function renderCollect(root) {
  root.className = 'mk c';
  const filled = [['coach', 72], ['comm', 54], ['culture', 38], ['ai', 21]];
  const empty = [['데이터 기반 의사결정', 14], ['목표 설정', 22], ['갈등 관리', 9], ['변화 관리', 17]];
  const quests = [['HLSP38380', 'coach', 120, 3, 8], ['HLAP21002', 'ai', 80, 1, 5], ['HLSP18120', 'culture', 100, 0, 6]];
  const C = 2 * Math.PI * 70;
  root.innerHTML = `${tb('홈')}
    <div class="c-body">
      <aside class="c-card c-me">
        <div><div class="lbl">나의 목표 커리어</div><div class="c-goal">팀장</div></div>
        <div class="c-ring"><svg viewBox="0 0 168 168"><circle class="bg" cx="84" cy="84" r="70"/><circle class="fg" cx="84" cy="84" r="70" stroke-dasharray="${C * .83} ${C}"/></svg>
          <div><b>Lv.3</b><small>1,240 / 1,500 pt</small></div></div>
        <p class="c-next">다음 레벨까지 <b>260</b>pt</p>
        <div class="c-stars"><span>★★★<em>★★</em></span><small>이번 달 별 3개</small></div>
        <div class="c-badges">
          <div class="c-badge got"><i>1</i>첫 강의 완주</div>
          <div class="c-badge got"><i>7</i>연속 학습 7일</div>
          <div class="c-badge"><i>8</i>스킬 8칸 채우기</div>
        </div>
      </aside>
      <div class="c-main">
        <section class="c-card c-dex">
          <div class="c-sh"><h3>나의 스킬 도감</h3><span>채운 스킬 <b>4</b> / 8 · 팀장에게 필요한 스킬</span></div>
          <div class="c-grid">
            ${filled.map(([s, v]) => `<div class="c-tile" style="--k:${SK[s].c}"><b>${SK[s].k}</b><p>${SK[s].d}</p><div class="g"><u><i style="width:${v}%"></i></u><em>${v}%</em></div></div>`).join('')}
            ${empty.map(([k, n]) => `<div class="c-tile off"><b>${k}</b><p>아직 비어 있어요</p><div class="g">채울 수 있는 강의 ${n}개</div></div>`).join('')}
          </div>
        </section>
        <section class="c-card c-quest">
          <div class="c-sh"><h3>이번 주 퀘스트</h3><span>3개 중 <b>0</b>개 완료 · 일요일까지</span></div>
          <div class="c-qs">${quests.map(([cd, s, rw, d, t]) => { const c = course(cd); return `
            <article class="c-q" style="--k:${SK[s].c}">${thumb(c, '', `<span class="rw">+${rw}pt</span>`)}
              <div class="chips"><span>${SK[s].k} +${Math.round(rw / 4)}%</span></div>
              <h4 class="clamp2">${c.title}</h4>
              <div class="pg"><u><i style="width:${d / t * 100}%"></i></u><b>${d}/${t}</b>차시</div>
            </article>`; }).join('')}</div>
        </section>
      </div>
    </div>`;
}

/* ---------- 03 질문 ---------- */
function renderAsk(root) {
  root.className = 'mk a';
  const blocks = [['coach', ['HLAP08209', 'HLSP38380']], ['comm', ['HLSP28153', 'HLAP00612']], ['ai', ['HLAP21002', 'HLSP88622']]];
  const plan = [['HLSP91107', 'coach'], ['HLAP08209', 'coach'], ['HLSP28153', 'comm'], ['HLAP21002', 'ai']];
  root.innerHTML = `${tb('홈')}
    <div class="a-ask">
      <div class="a-box"><p>팀장이 되면 어떤 스킬부터 키워야 할까요?</p><span>↑</span></div>
      <div class="a-chips"><span class="q">이어서 물어보기</span><span>MZ 팀원과 일하는 법이 궁금해요</span><span>하루 30분만 쓸 수 있어요</span><span>AI도 같이 배우고 싶어요</span></div>
    </div>
    <div class="a-body">
      <div class="a-ans">
        <p class="intro">팀장에게 가장 먼저 필요한 건 <b>사람을 성장시키는 힘</b>이에요. 그다음은 그 생각을 팀에 전하는 힘, 그리고 일을 덜어 줄 AI예요. 세 스킬과 바로 들을 수 있는 강의를 골랐어요.</p>
        <div class="a-sks">${blocks.map(([s, cds], i) => `
          <div class="a-sk" style="--k:${SK[s].c}">
            <div><h4><i></i>${SK[s].k}<small>0${i + 1}</small></h4><p>${SK[s].d}. ${['팀원이 스스로 답을 찾게 돕는 대화법부터 시작해요.', '같은 말도 팀원에 따라 다르게 전하는 법을 익혀요.', '보고서 초안이나 회의 정리를 AI에게 맡겨 봐요.'][i]}</p></div>
            <div class="a-cs">${cds.map(cd => { const c = course(cd); return `<div class="a-c">${thumb(c)}<h5>${c.title}</h5></div>`; }).join('')}</div>
          </div>`).join('')}</div>
      </div>
      <aside class="a-plan">
        <div class="lbl">바로 시작하는 학습 플랜</div>
        <h3>팀장 첫걸음 4단계</h3>
        <ol class="a-steps">${plan.map(([cd, s], i) => { const c = course(cd); return `<li style="--k:${SK[s].c}"><b>${i + 1}</b>${thumb(c)}<div><h5>${c.title}</h5><small><i></i>${SK[s].k}</small></div></li>`; }).join('')}</ol>
        <div class="a-sum"><span>4단계 · 주 2회 추천</span><span>스킬 <b>3</b>개</span></div>
        <span class="btn">플랜 저장하기</span>
        <div class="a-car">이어지는 커리어 <span>팀장</span><span>조직개발(OD)</span><span>HRD 담당자</span></div>
      </aside>
    </div>`;
}

/* ---------- 렌더 + 축소 ---------- */
renderOrbit(document.getElementById('mkOrbit'));
renderCollect(document.getElementById('mkCollect'));
renderAsk(document.getElementById('mkAsk'));
const fit = () => document.querySelectorAll('.mk-wrap').forEach(w => w.querySelector('.mk').style.setProperty('--s', w.clientWidth / 1280));
fit();
new ResizeObserver(fit).observe(document.body);
