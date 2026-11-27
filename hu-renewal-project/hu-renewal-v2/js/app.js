// HU 리뉴얼 v2 · 1차 — V2 톤앤매너(검토 중) 위에 HU V1(Figma HU-project)의 서비스 구조·내용을 담은 시안
//   V2 톤: 위쪽 텍스트 메뉴 · 페이지 머리 + 회색 정보 패널 · 밑줄 탭 · 회색 면 숫자 카드 · 인사이트 박스 · 흰 패널(순위 배지·상태 점·막대·선 그래프)
//   V1 구조: [E03] 홈(비로그인 · 마이커리어 있음) [E02] 로그인 → 온보딩 진입 → 마이커리어 → 맞춤 홈 생성
//            [E05] 콘텐츠 목록·상세 [E07] 스킬 [E08] 커리어 [E09] 프리미엄 [E10] 마이클래스 [E11] 통합검색
// 이미지는 모두 course()로 꺼낸 AI 강의 썸네일, 제목은 강의명 그대로. 학습자 수·가격 등 수치는 예시 값.

/* ---------- 아이콘 (선 아이콘) ---------- */
const ic = (d, w = 20) => `<svg class="ic" width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  home: ic('<path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4z"/>'),
  grid: ic('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
  career: ic('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'),
  skill: ic('<path d="M13 3 5 14h6l-1 7 8-11h-6z"/>'),
  myclass: ic('<path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h9"/>'),
  premium: ic('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 20h8"/>'),
  bell: ic('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  gear: ic('<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>'),
  search: ic('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>'),
  down: ic('<path d="m6 9 6 6 6-6"/>', 16),
  x: ic('<path d="M7 7l10 10M17 7 7 17"/>', 18),
  out: ic('<path d="M7 17 17 7M9 7h8v8"/>', 16),
  filter: ic('<path d="M4 6h16M7 12h10M10 18h4"/>', 16),
  bm: ic('<path d="M7 4h10v16l-5-4-5 4z"/>', 16),
  share: ic('<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/>'),
  heart: ic('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
  galaxy: ic('<circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/>', 16),
  reset: ic('<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/>', 16),
};

/* ---------- 커리어·스킬 데이터 (skill-galaxy-v2에서 가져온 구조) ---------- */
const TAG = { problem: '문제해결', collab: '협업', work: '업무관리', self: '자기관리', writing: '글쓰기', lead: '리더십', perform: '성과관리', strategy: '경영기획', hr: 'HR', finance: '재무', data: '데이터', ai: 'AI', pm: 'PM', design: '디자인', marketing: '마케팅', cs: '고객 서비스', scm: '공급망', journalism: '콘텐츠', edu: '교육', health: '헬스케어' };
const SK = {
  problem: ['논리적 사고', '문제 정의', '가설 설정', '디자인 씽킹', '아이디어 발상', '비판적 사고'],
  collab: ['비즈니스 커뮤니케이션', '회의 퍼실리테이션', '협상', '갈등 관리', '피드백', '협업 툴 활용'],
  work: ['우선순위 관리', '시간 관리', 'OKR 설정', '업무 자동화', '일정 관리'],
  self: ['학습 전략', '스트레스 관리', '커리어 설계', '셀프 브랜딩'],
  writing: ['보고서 작성', '기획서 작성', '비즈니스 이메일', '핵심 요약', '발표 자료 작성', '스토리텔링'],
  lead: ['코칭', '1on1 미팅', '동기 부여', '신뢰 구축', '위임'],
  perform: ['성과 관리', '목표 합의', '평가 면담', '의사결정'],
  strategy: ['사업 기획', '경영 분석', '시장 조사', 'KPI 설계', '예산 관리'],
  hr: ['채용 면접', '온보딩 설계', '교육 기획', '노무 관리', '조직 문화'],
  finance: ['재무제표 분석', '원가 관리', '세무 기초', '자금 관리', '재무 모델링'],
  data: ['SQL', '파이썬 데이터 분석', '통계 분석', '머신러닝 기초', '데이터 엔지니어링', '데이터 시각화'],
  ai: ['생성형 AI 업무 활용', 'AI 서비스 기획', 'AI 윤리', 'LLM 이해', 'ChatGPT 활용', '프롬프트 엔지니어링'],
  pm: ['프로젝트 관리', '애자일 스크럼', '요구사항 정의', '리스크 관리', '로드맵 수립'],
  design: ['UX 리서치', 'UI 디자인', '브랜드 디자인', '모션 그래픽', '디자인 시스템'],
  marketing: ['퍼포먼스 마케팅', 'CRM 마케팅', 'B2B 영업', '그로스 해킹', '시장 세분화', '광고 기획', '콘텐츠 전략'],
  cs: ['고객 응대', 'VOC 분석', 'CS 프로세스 설계'],
  scm: ['수요 예측', '재고 관리', '구매 협상'],
  journalism: ['콘텐츠 기획', '영상 편집', '카피라이팅'],
  edu: ['교수 설계', '이러닝 콘텐츠 개발', '강의 스킬'],
  health: ['헬스케어 서비스 기획', '의료 데이터 이해'],
};
const CAREERS = [
  ['팀장', 'lead collab perform'], ['파트장', 'lead collab perform'], ['조직 리더', 'perform lead work'],
  ['경영기획 담당자', 'strategy problem data'], ['전략 컨설턴트', 'strategy problem data'],
  ['HR 담당자', 'hr lead edu'], ['HRD 담당자', 'hr edu lead'], ['채용 담당자', 'hr collab'],
  ['재무 담당자', 'finance data strategy'], ['회계 담당자', 'finance data'],
  ['데이터 분석가', 'data problem ai'], ['데이터 엔지니어', 'data ai'], ['BI 분석가', 'data strategy'],
  ['AI 기획자', 'ai data writing'], ['AI 프로덕트 매니저', 'ai pm data'],
  ['프로젝트 매니저', 'pm work collab'], ['서비스 기획자', 'pm problem design'], ['프로덕트 오너', 'pm data collab'],
  ['UX 디자이너', 'design problem'], ['그래픽 디자이너', 'design journalism'],
  ['퍼포먼스 마케터', 'marketing data'], ['영업 관리자', 'marketing collab'], ['그로스 마케터', 'marketing data ai'],
  ['CS 매니저', 'cs collab marketing'], ['SCM 담당자', 'scm data strategy'], ['구매 담당자', 'scm collab'],
  ['콘텐츠 기획자', 'journalism writing marketing'], ['교육 기획자', 'edu writing hr'], ['사내 강사', 'edu collab writing'],
  ['헬스케어 기획자', 'health data strategy'], ['카피라이터', 'writing journalism marketing'],
].map(([k, t]) => { const tags = t.split(' '); return { k, tags, fam: TAG[tags[0]], pool: [...new Set(tags.flatMap((g, i) => i ? SK[g].slice(0, 4) : SK[g]))] }; });
const careerOf = k => CAREERS.find(c => c.k === k);
const SKILLS = Object.entries(SK).flatMap(([g, ks]) => ks.map(k => ({ k, g, fam: TAG[g] }))).filter((s, i, a) => a.findIndex(x => x.k === s.k) === i);
const skillOf = k => SKILLS.find(s => s.k === k);
const FAMS = [...new Set(CAREERS.map(c => c.fam))];
const josa = (w, a, b) => { const c = w.charCodeAt(w.length - 1); return c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 ? a : b; };

/* ---------- 강의 목록 가공 (V1 콘텐츠 카테고리 · 카드 정보) ---------- */
const CATS = ['전체', '리더십', '비즈니스', '업무생산성', 'AI', '데이터 사이언스', '인문/교양', '어학', '라이프', '커리어'];
const CAT_SK = { 리더십: 'lead', 비즈니스: 'strategy', 업무생산성: 'work', AI: 'ai', '데이터 사이언스': 'data', '인문/교양': 'self', 어학: 'collab', 라이프: 'self', 커리어: 'self' };
const hash = s => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };
function catOf(c) {
  const n = c.name;
  if (c.cat1 === '외국어') return '어학';
  if (c.cat3 === 'AI' || /AI|ChatGPT|GPT|인공지능|생성형/.test(n)) return 'AI';
  if (/데이터|파이썬|SQL|통계|머신러닝|엑셀 분석/.test(n)) return '데이터 사이언스';
  if (c.cat1 === '리더십' || /리더/.test(c.cat3)) return '리더십';
  if (c.cat1 === '인문교양') return '인문/교양';
  if (c.cat1 === '자격' || c.cat2 === '전직지원') return '커리어';
  if (['자기관리', '재테크', '가정친화'].includes(c.cat2)) return '라이프';
  if (['비즈니스 스킬', 'OA', 'IT/OA', 'IT'].includes(c.cat2)) return '업무생산성';
  return '비즈니스';
}
const ALL = HU_COURSES.map(c => { const h = hash(c.cd); return { ...c, cat: catOf(c), h }; });
const META = new Map(ALL.map(c => [c.cd, c]));
function info(cd) {   // 카드에 쓰는 예시 정보(과정코드에서 정해지는 고정 값)
  const m = META.get(cd), h = m.h;
  const pr = h % 5 === 0 ? { t: 'free' } : h % 5 === 1 ? { t: 'mem' } : { t: 'paid', was: (h % 9 + 4) * 20000, off: [10, 20, 30][h % 3] };
  if (pr.t === 'paid') pr.now = Math.round(pr.was * (100 - pr.off) / 100 / 1000) * 1000;
  const g = CAT_SK[m.cat], hit = SKILLS.filter(s => m.name.includes(s.k.split(' ')[0]) && s.k.length > 1).map(s => s.k);
  const sks = [...new Set([...hit, SK[g][h % SK[g].length], SK[g][(h >> 3) % SK[g].length]])].slice(0, 3);
  return { cat: m.cat, pr, hours: h % 14 + 2, chap: h % 12 + 4, users: (h % 9000 + 300), rate: (4.3 + (h % 7) / 10).toFixed(1), pt: h % 30 + 8, sks };
}
const won = n => n.toLocaleString() + '원';
const priceHTML = p => p.t === 'free' ? '<span class="free">무료</span>' : p.t === 'mem' ? '<span class="chip ac">멤버십 전용</span>' : `<s>${won(p.was)}</s><em>${p.off}%</em><b>${won(p.now)}</b>`;
const POOL = ALL.filter(x => x.cp === '휴넷' && !/도서|교재/.test(x.name) && !['외국어', '자격', '산업별전문직무'].includes(x.cat1));
const tokens = arr => [...new Set(arr.flatMap(w => w.split(/[\s·/()]+/)).filter(w => w.length >= 2))];
function match(words, n, used = new Set(), from = POOL) {
  const ws = tokens(words), out = [], keys = new Set();
  from.map(x => ({ x, s: ws.reduce((t, w) => t + (x.name.includes(w) ? w.length : 0), 0) })).filter(r => r.s).sort((a, b) => b.s - a.s || a.x.h - b.x.h)
    .forEach(r => { const key = r.x.name.replace(/\[[^\]]*\]\s*/g, '').slice(0, 6); if (out.length < n && !used.has(r.x.cd) && !keys.has(key)) { keys.add(key); used.add(r.x.cd); out.push(course(r.x.cd)); } });
  return out;
}
const countFor = k => { const w = tokens([k]).sort((a, b) => b.length - a.length)[0] || k; return ALL.filter(x => x.name.includes(w)).length || hash(k) % 40 + 6; };   // 강의명에 낱말이 없으면 예시 값
const skillContents = (k, n = 6) => { const r = match([k], n); if (r.length < n) { const s = skillOf(k); match([s ? s.fam : k], n - r.length, new Set(r.map(c => c.cd))).forEach(c => r.push(c)); } return r; };

/* ---------- 상태 · 공통 ---------- */
const NAME = '김휴넷';
const S = { auth: false, careers: [], q: '', cat: '전체', lq: '', shown: 24, liked: new Set(['코칭', '데이터 시각화']), fam: '전체', srTab: '전체', pFilter: '전체', skDom: '전체', homeTab: 0 };
const view = document.getElementById('view');
const go = h => { if (location.hash !== '#' + h) location.hash = h; else render(); };
let toastT;
const toast = m => { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2400); };
const today = new Date(), D8 = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

/* ---------- V2 조각: 페이지 머리 · 탭 · 숫자 카드 · 인사이트 · 패널 ---------- */
const head = ({ lead, title, chips = [], sub = '', info = [], act = '' }) => `<div class="ph">
  <div class="ph-me">${lead}<div><div class="ph-name"><h1>${title}</h1>${chips.join('')}</div>${sub ? `<div class="ph-sub">${sub}</div>` : ''}${act ? `<div class="ph-act">${act}</div>` : ''}</div></div>
  ${info.length ? `<dl class="ph-info">${info.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>` : ''}</div>`;
const pic = icon => `<span class="pic">${I[icon]}</span>`;
const tabsBar = (items, on, attr = 'data-tab') => `<nav class="tabs">${items.map((t, i) => { const [label, n] = Array.isArray(t) ? t : [t]; return `<a ${attr}="${esc(label)}" class="${(typeof on === 'number' ? i === on : label === on) ? 'on' : ''}">${label}${n !== undefined ? ` <span class="n">${n}</span>` : ''}</a>`; }).join('')}</nav>`;
const kpis = arr => `<section class="kpis">${arr.map(([k, v, u = '', side = '', cap = '', mute]) => `<article class="kpi"><div class="top"><span>${k}</span>${side}</div><div class="v ${mute ? 'mute' : ''}">${v}${u ? `<small>${u}</small>` : ''}</div>${cap ? `<p class="cap">${cap}</p>` : ''}</article>`).join('')}</section>`;
const insight = (t, items, right = '') => `<section class="insight"><div><h3>✦ ${t}</h3><ul>${items.map(x => `<li>${x}</li>`).join('')}</ul></div>${right}</section>`;
const pn = (t, sub, link, inner, cls = '') => `<article class="pn ${cls}"><div class="pn-h"><div><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${link ? `<a href="#${link[1]}">${link[0]} ›</a>` : ''}</div>${inner}</article>`;
const side = t => `<small>${t}</small>`;

const cc = (c, opt = {}) => {
  const f = info(c.cd);
  return `<article class="cc ${opt.big ? 'big' : ''}" data-go="c/${c.cd}">${thumb(c)}
    <div class="cc-t"><h3 class="clamp2">${esc(c.title)}</h3><button class="bm" aria-label="저장">${I.bm}</button></div>
    ${opt.lite ? `<div class="meta">${esc(c.cat2)} · ${esc(c.cp)}</div>` : `<div class="price">${priceHTML(f.pr)}</div><div class="stat">${opt.tag || '과정'} · ${f.chap}차시 · ${f.hours}시간 · 학습자 ${f.users.toLocaleString()}명 · ★ ${f.rate}</div><div class="sks">${f.sks.slice(0, 2).map(k => `<span class="chip">${esc(k)}</span>`).join('')}${f.sks.length > 2 ? `<span class="chip">+${f.sks.length - 2}</span>` : ''}</div>`}
  </article>`;
};
const rankRows = (list, valFn) => `<div class="rows">${list.map((c, i) => { const f = info(c.cd); return `<div class="rr" data-go="c/${c.cd}"><span class="rkb ${i < 3 ? 'top' : ''}">${i + 1}위</span>${thumb(c)}<div class="t"><b>${esc(c.title)}</b><small>${esc(f.cat)} · ${f.chap}차시 · ★ ${f.rate}</small></div><div class="v">${valFn ? valFn(c, f, i) : `<b>${f.users.toLocaleString()}</b>학습자`}</div></div>`; }).join('')}</div>`;
const carKpi = c => `<a class="kpi" href="#careers/${encodeURIComponent(c.k)}"><div class="top"><span>${esc(c.fam)}</span>${side(`필요 스킬 ${c.pool.length}`)}</div><div class="v" style="font-family:var(--font-default)">${esc(c.k)}</div><p class="cap">콘텐츠 ${countFor(c.pool[0]).toLocaleString()}개 · 보유자 ${(hash(c.k) % 5000 + 800).toLocaleString()}명</p><div class="sk">${c.pool.slice(0, 3).map(k => `<i>${esc(k)}</i>`).join('')}</div></a>`;
const PREM = ALL.filter(x => x.cat2 === 'MBA' || /MBA/.test(x.name)).filter(x => !/도서/.test(x.name)).slice(0, 12).map(x => x.cd);
const premInfo = cd => { const h = META.get(cd).h; const st = ['모집중', '마감임박 D-2', '모집예정'][h % 3]; return { st, price: [1250000, 900000, 2500000, 700000, 1000000][h % 5], months: h % 5 + 2, lect: h % 10 + 12, period: ['10.05~10.19 · 10.26 개강', '11.02~11.16 · 11.23 개강', '12.01~12.14 · 12.21 개강'][h % 3] }; };
const prc = cd => { const c = course(cd), p = premInfo(cd); return `<article class="cc" data-go="c/${cd}">${thumb(c)}<div class="price" style="margin-top:var(--spacing-3)"><span class="chip ${p.st.startsWith('마감') ? 'red' : 'dark'}">${p.st}</span><span class="chip">온라인</span><span class="chip">${p.lect}강 · ${p.months}개월</span></div><div class="cc-t"><h3 class="clamp2">${esc(c.title)}</h3><button class="bm" aria-label="저장">${I.bm}</button></div><div class="price"><b>${won(p.price)}</b></div><div class="stat">모집 ${p.period}</div></article>`; };
const plusPn = t => pn(t, '휴넷의 구독 서비스를 HU에서 이어 볼 수 있어요', null, `<div class="grid3">${[['휴넷CEO', '오늘의 비즈니스 인사이트', 'TODAY · 리더십의 기술'], ['위즈덤스프링', '최근 테마 · 인문학 기반 인사이트', '이번 주 테마 · 철학과 혁신'], ['리더십저니', '리더의 성장을 위한 맞춤형 솔루션', '매일의 리더십 팁']].map(([k, a, b]) => `<a class="plus" href="javascript:void 0"><div><span class="chip dark">${k}</span><b>${a}</b><small>${b}</small></div>${I.out}</a>`).join('')}</div>`);
const origPn = () => pn('HU+ 오리지널 콘텐츠', '', null, `<div class="grid3">${[['리더십저니', '요즘 CEO, 업의 본질을 이해하며 전략을 수립합니다.'], ['리더십저니', '리더, 리더를 평가하지 않습니다. 리더십을 진단합니다.'], ['위즈덤스프링', '논어, 시대를 초월한 리더십과 조직 운영의 지혜를 만납니다.']].map(([b, t]) => `<a class="orig" href="javascript:void 0"><span class="chip">${b}</span><p>${t}</p></a>`).join('')}</div>`);
const memBox = () => `<section class="insight row"><div><h3>✦ HU 멤버십</h3><p class="big">HU 멤버십으로 모든 스킬을 무제한으로</p><ul><li>멤버십 전용 콘텐츠와 HU+ 구독 서비스를 함께 볼 수 있어요</li></ul></div><a class="btn ac" href="javascript:void 0">멤버십 가입하기</a></section>`;
const foot = () => `<footer class="foot"><div class="l1"><b>hunet</b><span>휴넷 서비스</span><span>휴넷 패밀리</span><span>이용약관</span><b>개인정보 처리방침</b><span>고객행복센터 1588-6559 ›</span></div><p>(주)휴넷 · 서울시 구로구 디지털로 26길 5 에이스하이엔드타워 1차 8층<br>© HUNET Corp.</p></footer>`;
const TOTAL = ALL.length, FREE_N = ALL.filter(x => info(x.cd).pr.t === 'free').length;

/* ---------- 메뉴 (V2 위쪽 텍스트 메뉴 / 모바일 아래 탭바) ---------- */
const SECTION = { guest: 'home', home: 'home', contents: 'contents', c: 'contents', skills: 'skills', careers: 'careers', myclass: 'myclass', premium: 'premium' };
function renderNav(page) {
  const authed = S.auth, on = SECTION[page] || '';
  const items = [['home', authed ? '#home' : '#guest', 'home', '홈'], ['contents', '#contents', 'grid', '콘텐츠'], ['careers', '#careers', 'career', '커리어'], ['skills', '#skills', 'skill', '스킬'], ['myclass', authed ? '#myclass' : '#login', 'myclass', '마이클래스'], ['premium', '#premium', 'premium', '프리미엄']];
  document.getElementById('lnb').innerHTML = items.slice(0, 5).map(([k, h, ic, l]) => `<a href="${h}" class="${on === k ? 'on' : ''}">${I[ic]}<span>${l}</span></a>`).join('');
  document.getElementById('gnb').innerHTML = `<div class="wrap">
    <a class="logo" href="#${authed ? 'home' : 'guest'}"><i>HU</i>Hunet University</a>
    <nav class="gnav">${items.map(([k, h, , l]) => `<a href="${h}" class="${on === k ? 'on' : ''}">${l}</a>`).join('')}</nav>
    <span class="gsp"></span>
    <label class="gsearch">${I.search}<input id="gq" placeholder="원하는 콘텐츠를 검색해 보세요" autocomplete="off" value="${page === 'search' ? esc(S.q) : ''}"><div class="ac-box" id="acBox"></div></label>
    <div class="gright"><a class="m-only" href="#search/AI" aria-label="검색">${I.search}</a><a class="pc" href="javascript:void 0">HU Plus</a><a class="pc" href="javascript:void 0">기업교육 ↗</a>
      ${authed ? `<a class="av a0 gme" href="#myclass">${NAME[0]}</a>` : `<a class="btn line sm" href="#login">로그인</a>`}</div>
  </div>`;
  const gq = document.getElementById('gq'), box = document.getElementById('acBox');
  const mark = (t, q) => { const i = t.indexOf(q); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<mark>' + esc(q) + '</mark>' + esc(t.slice(i + q.length)); };
  gq.oninput = () => {
    const q = gq.value.trim(); if (!q) { box.classList.remove('on'); return; }
    const sk = SKILLS.filter(s => s.k.includes(q)).slice(0, 3), cr = CAREERS.filter(c => c.k.includes(q)).slice(0, 2), ct = ALL.filter(c => c.name.includes(q)).slice(0, 4);
    box.innerHTML = (sk.length ? '<p>스킬</p>' + sk.map(s => `<a href="#skills/${encodeURIComponent(s.k)}">${I.skill}<span>${mark(s.k, q)}</span><span class="chip">스킬</span></a>`).join('') : '')
      + (cr.length ? '<p>직무</p>' + cr.map(c => `<a href="#careers/${encodeURIComponent(c.k)}">${I.career}<span>${mark(c.k, q)}</span><span class="chip">커리어</span></a>`).join('') : '')
      + (ct.length ? '<p>콘텐츠</p>' + ct.map(c => `<a href="#c/${c.cd}">${I.grid}<span class="clamp1">${mark(c.name, q)}</span></a>`).join('') : '')
      + `<a href="#search/${encodeURIComponent(q)}">${I.search}<span>‘${esc(q)}’ 전체 결과 보기</span></a>`;
    box.classList.add('on');
  };
  gq.onkeydown = e => { if (e.key === 'Enter' && !e.isComposing && gq.value.trim()) go('search/' + encodeURIComponent(gq.value.trim())); };
  gq.onblur = () => setTimeout(() => box.classList.remove('on'), 150);
}

/* ---------- [E03-01] 비로그인 홈 ---------- */
function renderGuest() {
  const trend = courses('HLAP01419', 'HLSP88622', 'HLAP00417', 'HLSP76039', 'HLAP21002'), free = courses('HLSP28153', 'HLAP00612', 'HLSP20337', 'HLAP08209');
  const popSk = ['생성형 AI 업무 활용', '코칭', '데이터 시각화', '프로젝트 관리', '보고서 작성', '퍼포먼스 마케팅'];
  view.innerHTML = `<div class="page wrap">
    ${head({ lead: pic('galaxy'), title: '배운 만큼 성장이 눈에 보이는 HU', chips: ['<span class="chip ac">Expansion and galaxy</span>'], sub: '스킬로 이어진 콘텐츠와 커리어를 한 번에 둘러보고, 로그인하면 나에게 맞춰 추천해 드려요.', act: '<a class="btn ac" href="#login">로그인하고 시작하기</a><a class="btn line" href="#skills">스킬 갤럭시 둘러보기</a>', info: [['콘텐츠', `${TOTAL.toLocaleString()}개`], ['스킬', `${SKILLS.length}개`], ['커리어', `${CAREERS.length}개`], ['무료 콘텐츠', `${FREE_N.toLocaleString()}개`]] })}
    ${tabsBar(['추천', '지금 뜨는 콘텐츠', '커리어', '스킬', '무료', '프리미엄', 'HU+'], 0, 'data-jump')}
    <div class="g-2-1 row" id="j1">${pn('지금 뜨고 있는 콘텐츠', '이번 주 학습자가 가장 많이 늘어난 콘텐츠', ['전체보기', 'contents'], rankRows(trend, (c, f, i) => `<span class="up">▲ ${[24, 18, 11, 9, 6][i]}%</span>`))}
      ${pn('요즘 많이 보는 스킬', '최근 7일 · 스킬별 학습 콘텐츠 수', ['전체보기', 'skills'], `<div class="rk">${popSk.map((k, i) => `<a href="#skills/${encodeURIComponent(k)}"><span>${esc(k)}</span><small>${countFor(k).toLocaleString()}개</small><em class="rkb ${i < 2 ? 'top' : ''}">${i + 1}위</em></a>`).join('')}</div><div class="foot-line"><div><span>스킬 갤럭시에서 연결 보기</span><span class="num">${SKILLS.length}</span></div><span class="bar"><i style="width:64%"></i></span></div>`)}</div>
    <div class="row" id="j2">${pn('지금 시작하기 좋은 커리어', '커리어를 고르면 필요한 스킬과 콘텐츠를 보여 드려요', ['전체보기', 'careers'], `<div class="grid4">${['팀장', '데이터 분석가', '서비스 기획자', '퍼포먼스 마케터'].map(k => carKpi(careerOf(k))).join('')}</div>`)}</div>
    <div class="row" id="j4">${pn('무료 콘텐츠', '로그인 없이 바로 볼 수 있어요', ['전체보기', 'contents'], `<div class="grid4">${free.map(c => cc(c, { tag: '무료' })).join('')}</div>`)}</div>
    <div class="row" id="j5">${pn('프리미엄 과정', '학위·자격 수준의 심화 과정', ['전체보기', 'premium'], `<div class="grid4">${PREM.slice(0, 4).map(prc).join('')}</div>`)}</div>
    <div class="row" id="j6">${plusPn('HU+ (구독서비스)')}</div><div class="row">${origPn()}</div>
    ${memBox()}${foot()}</div>`;
  jumpTabs();
}
function jumpTabs() {
  const tabs = [...view.querySelectorAll('[data-jump]')];
  tabs.forEach((a, i) => a.onclick = () => { const el = document.getElementById('j' + i) || view.querySelector('.ph'); tabs.forEach(x => x.classList.toggle('on', x === a)); window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' }); });
}

/* ---------- [E03-01] 로그인 홈 · 마이커리어 있음 (콜드 스타트) ---------- */
function renderHome() {
  const cs = S.careers.map(careerOf), main = cs[0], used = new Set();
  const weekly = courses('HLSP91107', 'HLAP21002', 'HLSP18120', 'HLSP78181'); weekly.forEach(c => used.add(c.cd));
  const need = main ? [...new Set(cs.flatMap(c => c.pool.slice(0, 6)))] : [];
  const lack = need.slice(0, 4);
  const lackRec = main ? match(lack, 4, used) : [], relRec = main ? match(cs.flatMap(c => c.pool.slice(4, 8)), 5, used) : [], carRec = main ? match([main.k, ...main.pool.slice(0, 3)], 2, used) : [];
  const trend = courses('HLAP01419', 'HLSP88622', 'HLAP00417', 'HLSP76039', 'HLAP00612').filter(c => !used.has(c.cd)), free = courses('HLSP28153', 'HLAP00612', 'HLSP20337', 'HLAP08209').filter(c => !used.has(c.cd));
  const relCar = main ? CAREERS.filter(c => !S.careers.includes(c.k) && c.tags.some(t => main.tags.includes(t))).slice(0, 4) : ['팀장', '데이터 분석가', '서비스 기획자', '퍼포먼스 마케터'].map(careerOf);
  view.innerHTML = `<div class="page wrap">
    ${head({ lead: `<span class="av a0">${NAME[0]}</span>`, title: `${NAME}님의 홈`, chips: ['<span class="chip">HU 멤버</span>'], sub: main ? `마이커리어 ${cs.map(c => `<span class="chip ac">${esc(c.k)}</span>`).join('')}` : '마이커리어를 고르면 홈이 나에게 맞춰져요 <a class="chip ac" href="#mycareer">마이커리어 고르기</a>', info: [['마이커리어', `${cs.length}개`], ['필요 스킬', `${need.length}개`], ['학습한 콘텐츠', '0개'], ['시작한 날', `<span class="num">${D8}</span>`]] })}
    ${tabsBar(main ? ['추천', '부족한 스킬', '커리어 인기', '지금 뜨는', '커리어', '무료', '프리미엄'] : ['추천', '지금 뜨는', '커리어', '무료', '프리미엄'], 0, 'data-jump')}
    ${main ? insight('맞춤 추천 기준', [`마이커리어 <b>${cs.map(c => esc(c.k)).join(', ')}</b>에 필요한 스킬 ${need.length}개를 기준으로 콘텐츠를 골랐어요.`, `아직 학습 기록이 없어서 같은 마이커리어 학습자가 많이 들은 콘텐츠부터 보여 드려요.`], `<a class="btn ac" href="#c/${weekly[0].cd}">첫 학습 시작하기</a>`) : ''}
    <div class="row" id="j0">${pn('Weekly Top Pick', '이번 주 HU가 고른 콘텐츠', ['전체보기', 'contents'], `<div class="grid4">${weekly.map(c => cc(c)).join('')}</div>`)}</div>
    ${main ? `<div class="g-2-1 row" id="j1">${pn('부족한 스킬 보완하기', `마이커리어에 필요한 스킬 · ${lack.map(esc).join(', ')}`, ['전체보기', 'skills'], `<div class="grid2">${lackRec.map(c => cc(c)).join('')}</div>`)}
      ${pn('마이커리어 필요 스킬', '학습하면 채워져요', ['스킬 보기', 'skills'], `<div class="rk">${need.slice(0, 8).map((k, i) => `<a href="#skills/${encodeURIComponent(k)}"><span>${esc(k)}</span><small>0pt</small><em class="rkb">${i < 4 ? '보완' : '-'}</em></a>`).join('')}</div><div class="foot-line"><div><span>필요 스킬 달성도</span><span class="num">0%</span></div><span class="bar"><i style="width:2%"></i></span></div>`)}</div>
      <div class="row" id="j2">${pn(`${esc(main.k)} 인기 콘텐츠`, `${esc(main.k)}${josa(main.k, '을', '를')} 목표로 한 학습자가 많이 들은 콘텐츠`, ['전체보기', 'contents'], `<div class="grid2">${carRec.map(c => cc(c, { big: true })).join('')}</div>`)}</div>
      <div class="row">${pn('스킬 연관성 높은 콘텐츠', '마이커리어 스킬과 이어지는 콘텐츠', ['전체보기', 'contents'], rankRows(relRec, (c, f) => `<b>+${f.pt}pt</b>스킬 포인트`))}</div>` : ''}
    <div class="row" id="j${main ? 3 : 1}">${pn('지금 뜨고 있는 콘텐츠', '이번 주 학습자가 가장 많이 늘어난 콘텐츠', ['전체보기', 'contents'], rankRows(trend.slice(0, 4), (c, f, i) => `<span class="up">▲ ${[24, 18, 11, 9][i]}%</span>`))}</div>
    <div class="row" id="j${main ? 4 : 2}">${pn(main ? '함께 보면 좋은 커리어' : '지금 시작하기 좋은 커리어', main ? `${esc(main.k)}${josa(main.k, '과', '와')} 스킬이 겹치는 커리어` : '', ['전체보기', 'careers'], `<div class="grid4">${relCar.map(carKpi).join('')}</div>`)}</div>
    <div class="row" id="j${main ? 5 : 3}">${pn('무료 콘텐츠', '', ['전체보기', 'contents'], `<div class="grid4">${free.map(c => cc(c, { tag: '무료' })).join('')}</div>`)}</div>
    <div class="row" id="j${main ? 6 : 4}">${pn('프리미엄 과정', '학위·자격 수준의 심화 과정', ['전체보기', 'premium'], `<div class="grid4">${PREM.slice(0, 4).map(prc).join('')}</div>`)}</div>
    <div class="row">${plusPn('구독서비스 데일리 콘텐츠')}</div><div class="row">${origPn()}</div>
    ${memBox()}${foot()}</div>`;
  jumpTabs();
}

/* ---------- [E02] 로그인 · 온보딩 ---------- */
function renderLogin() {
  view.innerHTML = `<div class="auth"><div class="ob center"><div class="mark">HU</div><h2>이메일로 로그인</h2>
    <div class="fld"><label><small>이메일 또는 기존 휴넷 아이디</small><input value="hunet1234" aria-label="이메일"></label><label><small>비밀번호</small><input type="password" value="demo-pass" aria-label="비밀번호"></label></div>
    <div class="chk"><i>✓</i>이메일 저장</div>
    <button class="btn ac lg full" style="margin-top:var(--spacing-6)" id="loginGo">로그인</button>
    <div class="links"><a href="javascript:void 0">비밀번호 재설정</a><span>|</span><a href="javascript:void 0">회원가입</a></div>
    <p class="note">프로토타입이라 실제 로그인은 하지 않아요.</p></div></div>`;
  document.getElementById('loginGo').onclick = () => { S.auth = true; go('onboard'); };
}
function renderOnboard() {
  view.innerHTML = `<div class="auth"><div class="ob center"><div class="mark">!</div><h2>${NAME}님만의<br>학습을 준비할게요</h2><p class="sub">몇 가지만 고르면<br>맞춤 콘텐츠·스킬·커리어를 추천해요.</p>
    <div class="row" style="display:flex;gap:var(--spacing-2)"><button class="btn line" id="later" style="flex:0 0 120px">나중에 하기</button><a class="btn ac" href="#mycareer" style="flex:1">시작하기</a></div></div></div>`;
  document.getElementById('later').onclick = () => { S.careers = []; go('building'); };
}
const SUGGEST = ['팀장', '데이터 분석가', '서비스 기획자', '퍼포먼스 마케터', 'HRD 담당자', 'UX 디자이너', 'AI 기획자'];
function renderMyCareer() {
  view.innerHTML = `<div class="auth"><div class="ob"><h2>마이커리어를 선택하세요</h2>
    <p class="lbl">선택한 마이커리어</p><div class="picked" id="picked"></div><p class="hint">총 3개까지 복수 선택할 수 있어요</p>
    <label class="srch">${I.search}<input id="cq" placeholder="커리어를 검색해요" value="${esc(S.lq)}" autocomplete="off"></label><div id="sugg"></div>
    <p class="hint">원하는 커리어를 알려 주면 알맞은 콘텐츠를 찾아 드릴게요.</p>
    <div class="row" style="display:flex;gap:var(--spacing-2)"><a class="btn line" href="#onboard" style="flex:0 0 120px">닫기</a><button class="btn ac" id="cGo" style="flex:1">HU 시작하기</button></div></div></div>`;
  const inp = document.getElementById('cq');
  inp.oninput = () => { S.lq = inp.value; careerParts(); };   // 입력 칸은 그대로 두고 목록만 다시 그린다(한글 조합 유지)
  document.getElementById('cGo').onclick = () => go('building');
  careerParts();
}
function careerParts() {
  const q = S.lq.trim(), list = q ? CAREERS.filter(c => c.k.includes(q) || c.fam.includes(q) || c.pool.some(k => k.includes(q))).slice(0, 12) : SUGGEST.map(careerOf);
  document.getElementById('picked').innerHTML = S.careers.map(k => `<span class="p">${esc(k)}<button data-rm="${esc(k)}" aria-label="${esc(k)} 빼기">${I.x}</button></span>`).join('') + Array.from({ length: 3 - S.careers.length }, () => '<span class="e">비어 있음</span>').join('');
  document.getElementById('sugg').innerHTML = list.length ? `<div class="sugg">${list.map(c => { const on = S.careers.includes(c.k); return `<button class="${on ? 'on' : ''}" data-k="${esc(c.k)}" ${!on && S.careers.length >= 3 ? 'disabled' : ''}>${on ? '✓ ' : ''}${esc(c.k)}<i>${esc(c.fam)}</i></button>`; }).join('')}</div>` : `<div class="empty">'${esc(q)}'에 맞는 커리어가 없어요. 다른 말로 찾아보세요.</div>`;
  document.getElementById('cGo').disabled = !S.careers.length;
  view.querySelectorAll('.sugg button').forEach(x => x.onclick = () => { const k = x.dataset.k; if (S.careers.includes(k)) S.careers = S.careers.filter(y => y !== k); else if (S.careers.length < 3) S.careers.push(k); else toast('마이커리어는 3개까지 고를 수 있어요'); careerParts(); });
  view.querySelectorAll('[data-rm]').forEach(x => x.onclick = () => { S.careers = S.careers.filter(y => y !== x.dataset.rm); careerParts(); });
}
let buildT = [];
function renderBuilding() {
  const custom = S.careers.length > 0, items = custom ? ['관심 커리어 분석', '맞춤 콘텐츠 매칭', '나만의 홈 구성'] : ['인기 콘텐츠 모으기', '무료 콘텐츠 고르기', '홈 구성'];
  view.innerHTML = `<div class="auth"><div class="ob center"><div class="ring" id="ring" style="--p:8%"></div>
    <h2>${NAME}님,<br>${custom ? '맞춤 홈을 만들고 있어요' : '홈을 준비하고 있어요'}</h2><p class="sub">${custom ? '관심 커리어를 반영해 콘텐츠를 고르고 있어요' : '인기 콘텐츠로 홈을 꾸리고 있어요'}</p>
    ${custom ? `<p class="lbl">선택한 마이커리어</p><div class="picked">${S.careers.map(k => `<span class="p">${esc(k)}</span>`).join('')}</div>` : ''}
    <ul class="checks">${items.map(t => `<li><i>✓</i>${t}</li>`).join('')}</ul></div></div>`;
  buildT.forEach(clearTimeout); buildT = [];
  const lis = view.querySelectorAll('.checks li'), ring = document.getElementById('ring');
  lis.forEach((li, i) => buildT.push(setTimeout(() => { li.classList.add('on'); ring.style.setProperty('--p', `${(i + 1) / lis.length * 100}%`); }, 500 + i * 650)));
  buildT.push(setTimeout(() => { if (location.hash === '#building') go('home'); }, 500 + lis.length * 650 + 400));
}

/* ---------- [E05-01] 콘텐츠 목록 ---------- */
const contentList = () => { const q = S.lq.trim(); return ALL.filter(c => (S.cat === '전체' || c.cat === S.cat) && (!q || c.name.includes(q))).sort((a, b) => a.h - b.h); };
function renderContents() {
  const catN = k => k === '전체' ? TOTAL : ALL.filter(c => c.cat === k).length;
  view.innerHTML = `<div class="page wrap">
    ${head({ lead: pic('grid'), title: '콘텐츠', chips: ['<span class="chip">과정 · 영상 · 아티클 · 카드뉴스 · 시리즈</span>'], sub: '카테고리와 유형으로 좁혀 보고, 스킬 갤럭시로 연결을 둘러볼 수 있어요.', info: [['전체', `${TOTAL.toLocaleString()}개`], ['무료', `${FREE_N.toLocaleString()}개`], ['이번 주 신규', '128개'], ['스킬 연결', `${SKILLS.length}개`]] })}
    ${tabsBar(CATS.map(k => [k, catN(k).toLocaleString()]), S.cat, 'data-cat')}
    <div class="pbar"><div class="l"><div class="seg">${['전체', '과정', '영상', '아티클', '카드뉴스', '시리즈'].map((t, i) => `<button class="${i ? '' : 'on'}">${t}</button>`).join('')}</div><p id="cnt"></p></div>
      <div class="r"><label class="lsearch">${I.search}<input id="lq" placeholder="이 목록에서 검색" value="${esc(S.lq)}"></label><button class="sel">${I.filter}필터</button><button class="sel">인기순 ${I.down}</button><a class="sel" href="#skills">${I.galaxy}갤럭시 바로가기</a></div></div>
    <div id="clist" class="row"></div>${foot()}</div>`;
  view.querySelectorAll('[data-cat]').forEach(a => a.onclick = () => { S.cat = a.dataset.cat; S.shown = 24; renderContents(); });
  const lq = document.getElementById('lq'); lq.oninput = () => { S.lq = lq.value; S.shown = 24; listPart(); };
  listPart();
}
function listPart() {
  const list = contentList();
  document.getElementById('cnt').textContent = `${S.cat} · ${list.length.toLocaleString()}개 · 인기순`;
  document.getElementById('clist').innerHTML = list.length ? `<div class="list-grid">${list.slice(0, S.shown).map(x => cc(course(x.cd))).join('')}</div>${list.length > S.shown ? `<div class="more-wrap"><button class="btn line" id="more">더 보기 (${S.shown}/${list.length.toLocaleString()})</button></div>` : ''}` : `<div class="nores">‘${esc(S.lq)}’에 맞는 콘텐츠가 없어요. 다른 말로 찾아보세요.</div>`;
  const m = document.getElementById('more'); if (m) m.onclick = () => { S.shown += 24; listPart(); };
}

/* ---------- [E05] 과정 상세 ---------- */
function renderContent(cd) {
  const c = course(cd); if (!c) return go('contents');
  const f = info(cd), h = META.get(cd).h, rel = match([c.cat3, ...f.sks], 4, new Set([cd]));
  const chapters = [['오리엔테이션', 1], ['핵심 개념 이해하기', Math.max(2, Math.round(f.chap * .35))], ['현업 사례로 적용하기', Math.max(2, Math.round(f.chap * .4))], ['정리와 실천 계획', 1]];
  const jobs = [[S.careers[0] || '팀장', 34], ['HRD 담당자', 21], ['서비스 기획자', 14], ['기타', 31]];
  const nrv = h % 40 + 12;
  view.innerHTML = `<div class="page wrap">
    <div class="cd-head">${thumb(c)}
      <div><div class="ph-name"><span class="chip dark">과정</span><span class="chip">${esc(f.cat)}</span><span class="chip">${esc(c.cat3)}</span></div>
        <h1>${esc(c.title)}</h1>
        <p class="desc">${esc(c.cat2)} 분야에서 바로 쓰는 ${esc(c.cat3)} 역량을 ${f.chap}차시로 정리한 과정이에요. 현업 사례와 실습으로 배운 내용을 바로 적용해 볼 수 있어요.</p>
        <dl class="ph-info"><div><dt>차시</dt><dd>${f.chap}차시</dd></div><div><dt>학습 시간</dt><dd>약 ${f.hours}시간</dd></div><div><dt>평점</dt><dd>★ ${f.rate}</dd></div><div><dt>제공</dt><dd>${esc(c.cp)}</dd></div></dl>
        <div class="cd-price">${f.pr.t === 'free' ? '<b>무료</b>' : f.pr.t === 'mem' ? '<b>멤버십 전용</b>' : `<b>${won(f.pr.now)}</b><s>${won(f.pr.was)}</s><em>${f.pr.off}%</em>`}</div>
        <div class="cd-act"><button class="ib" aria-label="저장">${I.bm}</button><button class="ib" aria-label="공유">${I.share}</button><button class="btn ac lg" id="apply">${S.auth ? '수강 신청하기' : '로그인하고 신청하기'}</button></div></div></div>
    <div class="stick">${tabsBar(['과정 소개', '커리큘럼', '강사 정보', ['리뷰', nrv], '추천'], 0, 'data-jump')}</div>
    ${kpis([['누적 학습자', f.users.toLocaleString(), '명', side('지난 달 +6%')], ['학습 만족도', 88 + h % 10, '%', side('5점 만점 ' + f.rate)], ['수료율', 62 + h % 25, '%', side('평균 71%')], ['획득 스킬 포인트', '+' + f.pt * 3, 'pt', '<span class="up">수료 시</span>']])}
    ${insight('이 과정으로 얻는 스킬', [`${f.sks.map(k => `<a href="#skills/${encodeURIComponent(k)}"><b>${esc(k)}</b></a>`).join(' · ')} 스킬 포인트가 쌓여요.`, '수료하면 마이클래스의 스킬 성장 분석에 바로 반영돼요.'])}
    <div class="g-2-1 row" id="j0">${pn('과정 소개', '', null, `<p class="txt">「${esc(c.title)}」은(는) ${esc(c.cat3)} 영역에서 자주 부딪히는 문제를 단계별로 풀어 보는 과정이에요. 개념을 짧게 익히고, 실제 업무 장면에 대입해 보는 실습으로 이어져요. 매 차시 끝에는 바로 써먹을 수 있는 체크리스트를 정리해 드려요.</p>`)}
      ${pn('핵심 요약', '', null, `<div class="ratio"><div><b>이런 것을 배울 수 있어요</b><span></span><p>${esc(c.cat3)}의 핵심 개념 · 현업 적용 포인트 · 실행 계획</p></div><div><b>이런 분께 추천해요</b><span></span><p>${esc(c.cat3)} 업무를 처음 맡은 분, 팀에 전하고 싶은 분</p></div><div><b>이런 점이 특별해요</b><span></span><p>차시마다 체크리스트 · 수료 시 스킬 포인트</p></div></div>`)}</div>
    <div class="g-2-1 row">${pn('이런 분들이 함께 학습해요', '학습자 마이커리어 비율', null, `<div class="hbars">${jobs.map(([k, v]) => `<div><span>${esc(k)}</span><span class="bar"><i style="width:${v * 2}%"></i></span><b>${v}%</b></div>`).join('')}</div>`)}
      ${pn('강사 정보', '', null, `<div class="ph-me"><span class="av a1" style="width:56px;height:56px">${esc(c.cp)[0]}</span><div><b>${esc(c.cp)} 전문 강사진</b><p class="txt" style="font-size:var(--fs-s)">${esc(c.cat2)} 분야 현업 경력 10년 이상 · 기업 교육 다수 진행</p></div></div>`)}</div>
    <div class="row" id="j1">${pn(`커리큘럼`, `${f.chap}차시 · 약 ${f.hours}시간`, null, `<div class="cur">${chapters.map(([t, n], i) => `<details ${i < 2 ? 'open' : ''}><summary>${i + 1}장. ${t}<span>${n}차시</span></summary><ul>${Array.from({ length: Math.min(n, 3) }, (_, j) => `<li>${i + 1}-${j + 1}. ${t} ${j ? `실습 ${j}` : '들어가기'}<span>${8 + (h + j) % 14}:00</span></li>`).join('')}</ul></details>`).join('')}</div>`)}</div>
    <div class="row" id="j2"></div>
    <div class="row" id="j3">${pn('리뷰', `${nrv}개`, null, `<div class="score"><b>${f.rate}</b><div class="hbars">${[[5, 78], [4, 15], [3, 5], [2, 1], [1, 1]].map(([s, p]) => `<div><span>${s}점</span><span class="bar thin"><i style="width:${p}%"></i></span><b>${p}%</b></div>`).join('')}</div></div>${[['박○○', '실무에 바로 쓸 수 있는 내용이라 좋았어요. 체크리스트가 특히 유용해요.'], ['이○○', '사례가 많아 이해가 쉬웠어요. 팀원들에게도 추천했어요.'], ['최○○', '차시가 짧아서 출퇴근길에 듣기 좋았어요.']].map(([n, t], i) => `<div class="rv"><div class="h"><b>${n}</b><span class="stars">★★★★${i === 2 ? '☆' : '★'}</span><span>2026.11.${20 - i * 3}</span></div><p>${t}</p></div>`).join('')}`)}</div>
    <div class="row" id="j4">${pn('이런 콘텐츠는 어때요?', '같은 스킬을 키우는 콘텐츠', ['전체보기', 'contents'], `<div class="grid4">${rel.map(x => cc(x)).join('')}</div>`)}</div>
    ${foot()}</div>`;
  document.getElementById('j2').remove();
  document.getElementById('apply').onclick = () => S.auth ? toast('수강 신청 화면으로 이어져요 (시안)') : go('login');
  const tabs = [...view.querySelectorAll('[data-jump]')], ids = ['j0', 'j1', 'j0', 'j3', 'j4'];
  tabs.forEach((a, i) => a.onclick = () => { const el = document.getElementById(ids[i]); window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 140, behavior: 'smooth' }); tabs.forEach(x => x.classList.toggle('on', x === a)); });
}

/* ---------- [E07] 스킬 목록 + 상세 패널 ---------- */
function renderSkills(sel) {
  const doms = ['전체', ...new Set(SKILLS.map(s => s.fam))];
  const q = S.lq.trim(), list = SKILLS.filter(s => (S.skDom === '전체' || s.fam === S.skDom) && (!q || s.k.includes(q)));
  const s = sel && skillOf(sel), max = Math.max(...SKILLS.map(x => countFor(x.k)));
  view.innerHTML = `<div class="page wrap">
    ${head({ lead: pic('skill'), title: '스킬', chips: [S.auth ? `<span class="chip ac">관심 스킬 ${S.liked.size}개</span>` : ''], sub: '스킬을 누르면 배울 수 있는 콘텐츠와 이 스킬을 쓰는 커리어를 보여 드려요.', info: [['전체 스킬', `${SKILLS.length}개`], ['스킬 도메인', `${doms.length - 1}개`], ['평균 포인트', '890pt'], ['연결 콘텐츠', `${TOTAL.toLocaleString()}개`]] })}
    ${tabsBar(doms, S.skDom, 'data-dom')}
    <div class="pbar"><div class="l"><p>${esc(S.skDom)} · ${list.length}개 · 콘텐츠 많은 순</p></div><div class="r"><label class="lsearch">${I.search}<input id="lq" placeholder="이 목록에서 검색" value="${esc(S.lq)}"></label><button class="sel">${I.galaxy}갤럭시맵 열기</button><button class="sel">인기순 ${I.down}</button></div></div>
    <div class="split ${s ? 'open' : ''}">${pn(`${esc(S.skDom)} 스킬`, '스킬별 연결된 콘텐츠 수', null, `<div class="rows">${list.sort((a, b) => countFor(b.k) - countFor(a.k)).map(x => `<div class="skrow ${s && s.k === x.k ? 'on' : ''}" data-go="skills/${encodeURIComponent(x.k)}"><span class="ico">${esc(x.k[0])}</span><div><b>${esc(x.k)}</b><small>${esc(x.fam)}${S.auth && S.liked.has(x.k) ? ' · 내 스킬' : ''}</small></div><span class="bar thin"><i style="width:${Math.max(3, countFor(x.k) / max * 100)}%"></i></span><span class="c">${countFor(x.k).toLocaleString()}개</span><button class="heart ${S.liked.has(x.k) ? 'on' : ''}" data-like="${esc(x.k)}" aria-label="관심 스킬">${I.heart}</button></div>`).join('')}</div>`)}
    ${s ? skillPanel(s) : ''}</div>${foot()}</div>`;
  view.querySelectorAll('[data-dom]').forEach(a => a.onclick = () => { S.skDom = a.dataset.dom; renderSkills(sel); });
  const lq = document.getElementById('lq'); lq.onchange = () => { S.lq = lq.value; renderSkills(sel); };
  view.querySelectorAll('[data-like]').forEach(b => b.onclick = e => { e.stopPropagation(); const k = b.dataset.like; if (!S.auth) { toast('로그인하면 관심 스킬로 담을 수 있어요'); return; } S.liked.has(k) ? S.liked.delete(k) : S.liked.add(k); renderSkills(sel); });
}
function skillPanel(s) {
  const cs = skillContents(s.k, 6), crs = CAREERS.filter(c => c.pool.includes(s.k)).slice(0, 6);
  return `<aside class="rp"><a class="rp-x" href="#skills" aria-label="닫기">${I.x}</a>
    <div class="rp-top"><span class="ico">${esc(s.k[0])}</span><div><h2>${esc(s.k)}</h2><small>${esc(s.fam)} 스킬</small></div></div>
    <dl class="ph-info"><div><dt>평균 포인트</dt><dd>${hash(s.k) % 600 + 400}pt</dd></div><div><dt>콘텐츠</dt><dd>${countFor(s.k).toLocaleString()}개</dd></div><div><dt>커리어</dt><dd>${crs.length}개</dd></div></dl>
    ${tabsBar(['스킬 정보', '콘텐츠', '커리어'], 0, 'data-x')}
    <div class="rp-sec"><p class="txt">${esc(s.k)}${josa(s.k, '은', '는')} ${esc(s.fam)} 영역의 스킬이에요. 업무에서 ${esc(s.k)}${josa(s.k, '을', '를')} 쓰면 판단이 빨라지고, 팀과 결과를 맞추기 쉬워져요.</p></div>
    <div class="rp-sec"><h3>이 스킬을 학습할 수 있는 콘텐츠<a href="#search/${encodeURIComponent(s.k)}">전체보기 ›</a></h3><div class="rows">${cs.map(c => { const f = info(c.cd); return `<div class="rr" data-go="c/${c.cd}">${thumb(c)}<div class="t"><b>${esc(c.title)}</b><small>학습자 ${f.users.toLocaleString()}명</small></div><div class="v"><b>+${f.pt}pt</b></div></div>`; }).join('')}</div></div>
    ${crs.length ? `<div class="rp-sec"><h3>이 스킬을 쓰는 커리어</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${crs.map(c => `<a class="chip" href="#careers/${encodeURIComponent(c.k)}">${esc(c.k)}</a>`).join('')}</div></div>` : ''}
  </aside>`;
}

/* ---------- [E08] 커리어 목록 + 상세 패널 ---------- */
function renderCareers(sel) {
  const list = CAREERS.filter(c => S.fam === '전체' || c.fam === S.fam), c = sel && careerOf(sel);
  view.innerHTML = `<div class="page wrap">
    ${head({ lead: pic('career'), title: '커리어', chips: S.careers.length ? [`<span class="chip ac">마이커리어 ${S.careers.length}개</span>`] : [], sub: '커리어를 누르면 필요한 스킬과 많이 학습하는 콘텐츠를 보여 드려요.', info: [['전체 커리어', `${CAREERS.length}개`], ['직무군', `${FAMS.length}개`], ['마이커리어', `${S.careers.length}개`], ['평균 필요 스킬', '11개']] })}
    ${tabsBar(['전체', ...FAMS], S.fam, 'data-fam')}
    <div class="split ${c ? 'open' : ''}"><div class="cargrid">${list.map(x => carKpi(x).replace('class="kpi"', `class="kpi ${c && c.k === x.k ? 'on' : ''}"`)).join('')}</div>
    ${c ? careerPanel(c) : ''}</div>${foot()}</div>`;
  view.querySelectorAll('[data-fam]').forEach(b => b.onclick = () => { S.fam = b.dataset.fam; renderCareers(sel); });
  const my = document.getElementById('myc'); if (my) my.onclick = () => { if (!S.auth) return go('login'); if (!S.careers.includes(c.k) && S.careers.length < 3) S.careers.push(c.k); toast(`${c.k}${josa(c.k, '을', '를')} 마이커리어에 담았어요`); renderCareers(sel); };
}
function careerPanel(c) {
  const cs = match([c.k, ...c.pool.slice(0, 4)], 4), mine = S.careers.includes(c.k);
  return `<aside class="rp"><a class="rp-x" href="#careers" aria-label="닫기">${I.x}</a>
    <div class="rp-top"><span class="ico">${I.career}</span><div><h2>${esc(c.k)}</h2><small>${esc(c.fam)}</small></div></div>
    <dl class="ph-info"><div><dt>콘텐츠</dt><dd>${countFor(c.pool[0]) + countFor(c.pool[1])}개</dd></div><div><dt>보유자</dt><dd>${(hash(c.k) % 5000 + 800).toLocaleString()}명</dd></div><div><dt>필요 스킬</dt><dd>${c.pool.length}개</dd></div></dl>
    <div class="rp-sec"><p class="txt">${esc(c.k)}${josa(c.k, '은', '는')} ${c.pool.slice(0, 3).map(esc).join(', ')} 같은 스킬로 ${esc(c.fam)} 업무를 이끄는 커리어예요.</p><button class="btn ${mine ? 'line' : 'ac'} full" style="margin-top:var(--spacing-4)" id="myc">${mine ? '마이커리어에 담겨 있어요' : '마이커리어로 담기'}</button></div>
    ${tabsBar(['콘텐츠', '스킬'], 0, 'data-x')}
    <div class="rp-sec"><h3>이 커리어에서 많이 학습하는 콘텐츠</h3><div class="rows">${cs.map(x => { const f = info(x.cd); return `<div class="rr" data-go="c/${x.cd}">${thumb(x)}<div class="t"><b>${esc(x.title)}</b><small>학습자 ${f.users.toLocaleString()}명 · +${f.pt}pt</small></div></div>`; }).join('')}</div></div>
    <div class="rp-sec"><h3>필요 스킬</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${c.pool.map(k => `<a class="chip" href="#skills/${encodeURIComponent(k)}">${esc(k)}</a>`).join('')}</div></div>
  </aside>`;
}

/* ---------- [E09-01] 프리미엄 목록 ---------- */
function renderPremium() {
  const ST = ['전체', '모집중', '마감임박 D-2', '모집예정'], list = PREM.filter(cd => S.pFilter === '전체' || premInfo(cd).st === S.pFilter);
  const f0 = course(PREM[0]), p0 = premInfo(PREM[0]);
  view.innerHTML = `<div class="page wrap">
    ${head({ lead: pic('premium'), title: '프리미엄 과정', chips: ['<span class="chip dark">심화 교육</span>'], sub: '리더십, MBA, AI, 직무 전문성까지 휴넷이 대표하는 심화 교육과정이에요.', info: [['전체', `${PREM.length}개`], ['모집중', `${PREM.filter(cd => premInfo(cd).st === '모집중').length}개`], ['마감 임박', `${PREM.filter(cd => premInfo(cd).st.startsWith('마감')).length}개`], ['다음 개강', '12.21']] })}
    <div class="g-2-1 row">${pn('이번 달 대표 과정', p0.period, null, `<div class="cd-head" style="gap:var(--spacing-6)">${thumb(f0)}<div><div class="ph-name"><span class="chip ${p0.st.startsWith('마감') ? 'red' : 'dark'}">${p0.st}</span><span class="chip">온라인</span></div><h1 style="font-size:var(--fs-l)">${esc(f0.title)}</h1><p class="desc">조직을 움직이는 의사결정과 커뮤니케이션을 현직 경영진 케이스로 학습해요.</p><div class="cd-price"><b>${won(p0.price)}</b></div><div class="cd-act"><a class="btn ac" href="#c/${PREM[0]}">자세히 보기</a></div></div></div>`)}
      ${pn('추천 프리미엄 과정', '', null, `<div class="rk">${PREM.slice(1, 6).map((cd, i) => `<a href="#c/${cd}"><span>${esc(course(cd).title)}</span><small>${won(premInfo(cd).price)}</small><em class="rkb ${i < 2 ? 'top' : ''}">${premInfo(cd).st.slice(0, 4)}</em></a>`).join('')}</div>`)}</div>
    ${tabsBar(ST.map(s => [s === '전체' ? '전체' : s, s === '전체' ? PREM.length : PREM.filter(cd => premInfo(cd).st === s).length]), S.pFilter, 'data-st')}
    <div class="pbar"><div class="l"><div class="seg"><button class="on">가격대 전체</button><button>100만 원 이하</button><button>100만 원 이상</button></div></div><div class="r"><button class="sel" id="rst">${I.reset}초기화</button><label class="lsearch">${I.search}<input placeholder="이 목록에서 검색"></label><button class="sel">개강 임박순 ${I.down}</button></div></div>
    <div class="list-grid row">${list.map(prc).join('')}</div>${foot()}</div>`;
  view.querySelectorAll('[data-st]').forEach(b => b.onclick = () => { S.pFilter = b.dataset.st; renderPremium(); });
  document.getElementById('rst').onclick = () => { S.pFilter = '전체'; renderPremium(); };
}

/* ---------- [E11-02] 통합검색 결과 ---------- */
function renderSearch(q) {
  S.q = q;
  const ct = ALL.filter(c => c.name.includes(q)).sort((a, b) => a.h - b.h), sk = SKILLS.filter(s => s.k.includes(q) || s.fam.includes(q)), cr = CAREERS.filter(c => c.k.includes(q) || c.fam.includes(q) || c.pool.some(k => k.includes(q)));
  const T = S.srTab, tabs = [['전체', ct.length + sk.length + cr.length], ['콘텐츠', ct.length], ['스킬', sk.length], ['커리어', cr.length]];
  const ctP = n => ct.length ? `<div class="row">${pn('콘텐츠', `${ct.length.toLocaleString()}개`, null, `<div class="list-grid">${ct.slice(0, n).map(x => cc(course(x.cd))).join('')}</div>`)}</div>` : '';
  const skP = n => sk.length ? pn('스킬', `${sk.length}개`, null, `<div class="rk">${sk.slice(0, n).map((x, i) => `<a href="#skills/${encodeURIComponent(x.k)}"><span>${esc(x.k)}</span><small>${countFor(x.k).toLocaleString()}개</small><em class="rkb ${i < 1 ? 'top' : ''}">${esc(x.fam)}</em></a>`).join('')}</div>`) : '';
  const crP = n => cr.length ? pn('커리어', `${cr.length}개`, null, `<div class="rk">${cr.slice(0, n).map(x => `<a href="#careers/${encodeURIComponent(x.k)}"><span>${esc(x.k)}</span><small>스킬 ${x.pool.length}개</small><em class="rkb">${esc(x.fam)}</em></a>`).join('')}</div>`) : '';
  view.innerHTML = `<div class="page wrap">
    ${head({ lead: pic('search'), title: `‘${esc(q)}’ 검색 결과`, sub: '콘텐츠·스킬·커리어에서 함께 찾았어요.', info: tabs.map(([t, n]) => [t, `${n.toLocaleString()}개`]) })}
    ${tabsBar(tabs, T, 'data-tab')}
    ${tabs[0][1] ? (T === '전체' ? `${ctP(8)}<div class="grid2 row">${skP(8)}${crP(8)}</div>` : T === '콘텐츠' ? ctP(48) : `<div class="row">${T === '스킬' ? skP(60) : crP(60)}</div>`) : `<div class="nores">‘${esc(q)}’에 맞는 결과가 없어요. 검색어를 바꿔 보세요.</div>`}
    ${foot()}</div>`;
  view.querySelectorAll('[data-tab]').forEach(a => a.onclick = () => { S.srTab = a.dataset.tab; renderSearch(q); });
}

/* ---------- [E10-01] 마이클래스 · HU라운지 ---------- */
function renderMyclass() {
  if (!S.careers.length) S.careers = ['서비스 기획자'];
  const c = careerOf(S.careers[0]), ax = c.pool.slice(0, 5), me = [78, 52, 64, 40, 70], avg = [60, 66, 55, 58, 50];
  const R = 140, cx = 220, cy = 180, pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [cx + Math.cos(a) * R * v / 100, cy + Math.sin(a) * R * v / 100]; };
  const poly = vs => vs.map((v, i) => pt(i, v).map(n => n.toFixed(1)).join(',')).join(' ');
  const journey = [['HLSP91107', 45, '중'], ['HLAP21002', 12, '중'], ['HLAP01419', 27, '중'], ['HLSP28153', 61, '중'], ['HLSP78181', 100, '완'], ['HLSP38380', 100, '완']];
  const months = [6, 9, 7, 10, 12, 9, 13, 11, 15, 12, 17, 14];
  view.innerHTML = `<div class="page wrap">
    ${head({ lead: `<span class="av a0">${NAME[0]}</span>`, title: NAME, chips: ['<span class="chip">HU 멤버</span>', '<span class="chip ac">Lv.3</span>'], sub: `마이커리어 ${S.careers.map(k => `<span class="chip ac">${esc(k)}</span>`).join('')}`, info: [['학습 중', '7개'], ['학습 완료', '8개'], ['성장 포인트', '4,740pt'], ['증명서', '5개']] })}
    ${tabsBar(['HU라운지', '학습현황', '관심 목록', '스킬현황', '마이커리어', '증명서관리'], 0, 'data-x')}
    <div class="pbar"><div class="l"><div class="seg"><button class="on">이번 주</button><button>이번 달</button><button>올해</button></div><p>11월 4주(11.23–11.29) 기록 기준이에요</p></div><div class="r"><a class="sel" href="#skills">${I.galaxy}내 스킬 네트워크 ›</a></div></div>
    ${kpis([['학습 시간', '6.4', '시간', side('지난 주 5.7'), '하루 평균 55분'], ['완료한 콘텐츠', '3', '개', side('지난 주 2'), '이번 달 9개 완료'], ['스킬 포인트', '1,240', 'pt', '<span class="up">▲ 94</span>', `같은 마이커리어 학습자 중 상위 8%`], ['연속 학습', '5', '일', side('최장 16일'), '내일도 들으면 6일째예요']])}
    <p class="fn">▲▼ 증감은 지난 주와 비교한 값이에요</p>
    ${insight('학습 인사이트', ['지난주보다 학습 시간이 0.7시간 늘었어요.', `${esc(ax[0])} 스킬이 ${esc(c.k)} 학습자 중 상위 8%예요.`, `${esc(ax[3])}는 아직 비어 있어요. 다음 성장 제안을 확인해 보세요.`])}
    <div class="grid2 row">${pn('스킬 성장 분석', `${esc(c.k)} · 나와 커리어 평균 비교`, ['전체보기', 'skills'], `<div class="radar"><svg viewBox="0 0 440 360">${[100, 75, 50, 25].map(v => `<polygon points="${poly([v, v, v, v, v])}" fill="none" stroke="var(--line-layout)"/>`).join('')}
            ${ax.map((_, i) => { const [x, y] = pt(i, 100); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line-layout)"/>`; }).join('')}
            <polygon points="${poly(avg)}" fill="none" stroke="var(--line-strong)" stroke-dasharray="4 4"/>
            <polygon points="${poly(me)}" fill="color-mix(in srgb,var(--ac) 14%,transparent)" stroke="var(--ac)" stroke-width="2"/>
            ${ax.map((k, i) => { const [x, y] = pt(i, 122); return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${esc(k)}</text>`; }).join('')}</svg>
          <div class="lg"><span><i></i>나</span><span><i class="p"></i>커리어 평균</span></div></div>`)}
      ${pn('다음 성장 제안', `${esc(ax[3])} · 아직 학습하지 않은 스킬`, null, `<div class="sug"><div><small>성장 진단</small>커리어 평균은 480pt예요. 지금 시작하기 좋은 영역이에요.</div>${skillContents(ax[3], 3).map(x => `<div data-go="c/${x.cd}" style="cursor:pointer"><small>${esc(x.cat2)}</small>${esc(x.title)}</div>`).join('')}</div><div class="foot-line"><div><span>${esc(ax[3])} 달성도</span><span class="num">40%</span></div><span class="bar"><i style="width:40%"></i></span></div>`)}</div>
    <div class="row">${pn('나의 학습 여정', '최근 학습한 콘텐츠 · 진행률', ['전체보기', 'myclass'], `<div class="rows">${journey.map(([cd, p, st]) => { const x = course(cd); return `<div class="rr" data-go="c/${cd}"><span class="dot ${st === '중' ? 'ing' : ''}">${st}</span>${thumb(x)}<div class="t"><b>${esc(x.title)}</b><small>${esc(x.cat2)} · ${p}% 학습</small></div><div class="v" style="width:160px"><span class="bar thin"><i style="width:${p}%"></i></span></div></div>`; }).join('')}</div>`)}</div>
    <div class="grid3 row">
      ${pn('최근 1년', '총 11시간 45분', null, `<div class="mbars">${months.map(v => `<i style="height:${v / 17 * 100}%"></i>`).join('')}</div><div class="mbars-x">${['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map(m => `<span>${m}</span>`).join('')}</div>`)}
      ${pn('2026년 11월', '학습한 날 11일', null, `<div class="cal">${['월', '화', '수', '목', '금', '토', '일'].map(d => `<span>${d}</span>`).join('')}${Array.from({ length: 42 }, (_, i) => { const d = i - 5; if (i >= 35 && d > 30) return ''; if (d < 1 || d > 30) return '<i class="x"></i>'; const l = [3, 4, 10, 11, 17, 18, 19, 23, 24, 25, 26].includes(d) ? (d % 3 ? 'l2' : 'l1') : ''; return `<i class="${l}">${d}</i>`; }).join('')}</div>`)}
      ${pn('오늘 · 11월 27일', '3일 연속 목표를 달성하면 +300pt', null, `<div class="streak">${[1, 1, 1, 0, 0, 0, 0].map(v => `<i class="${v ? 'on' : ''}"></i>`).join('')}</div><div class="ratio" style="margin-top:var(--spacing-4)">${[['학습일', '11일'], ['학습 시간', '4시간 22분'], ['획득 포인트', '+176pt'], ['완료 콘텐츠', '3개']].map(([k, v]) => `<div><b>${k}</b><span><strong>${v}</strong></span></div>`).join('')}</div>`)}
    </div>${foot()}</div>`;
}

/* ---------- 라우팅 ---------- */
function render() {
  const [page, ...rest] = location.hash.slice(1).split('/'), arg = rest.length ? decodeURIComponent(rest.join('/')) : '';
  if (page !== 'building') { buildT.forEach(clearTimeout); buildT = []; }
  if (['home', 'myclass', 'onboard', 'mycareer', 'building'].includes(page)) S.auth = true;
  if (page === 'guest' || page === 'login') S.auth = false;
  const R = { guest: renderGuest, home: renderHome, login: renderLogin, onboard: renderOnboard, mycareer: renderMyCareer, building: renderBuilding, contents: renderContents, c: () => renderContent(arg), skills: () => renderSkills(arg), careers: () => renderCareers(arg), premium: renderPremium, search: () => renderSearch(arg || 'AI'), myclass: renderMyclass };
  const key = R[page] ? page : 'guest';
  renderNav(key);
  R[key]();
  document.querySelectorAll('.tool-scenes a').forEach(a => a.classList.toggle('on', a.getAttribute('href').split('/')[0] === '#' + key));
  if (!(key === 'skills' || key === 'careers') || !arg) window.scrollTo(0, 0);
}
view.addEventListener('click', e => { const t = e.target.closest('[data-go]'); if (t && !e.target.closest('a,button')) go(t.dataset.go); });
addEventListener('hashchange', render);
render();

/* ---------- 시안 도구: 강조색 ---------- */
const setAccent = a => {
  document.documentElement.dataset.accent = a;
  document.querySelectorAll('.tool-ac button').forEach(b => b.classList.toggle('on', b.dataset.accent === a));
  try { localStorage.setItem('hu2-accent-v3', a); } catch (e) {}
};
let savedAc = 'blue';
try { savedAc = localStorage.getItem('hu2-accent-v3') || 'blue'; } catch (e) {}
setAccent(savedAc);
document.querySelectorAll('.tool-ac button').forEach(b => b.addEventListener('click', () => setAccent(b.dataset.accent)));
