// HU 리뉴얼 v3 — 레퍼런스(AUTO ULTIMATE) 톤으로 다시 잡는 시안. 구조·화면·콘텐츠는 V2와 같다(V1 기준).
//   세 단 고정 틀: 왼쪽 메뉴(LNB) │ 두 번째 패널 = 마이 대시보드(모든 페이지에서 고정) │ 오른쪽 콘텐츠 영역(페이지마다 바뀜)
// 이미지는 모두 course()로 꺼낸 AI 강의 썸네일, 제목은 강의명 그대로. 수치는 예시 값.

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

/* ---------- V3 추가 아이콘 ---------- */
Object.assign(I, {
  clock: ic('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  pin: ic('<path d="M20 4 4 11l7 2 2 7z"/>'),
  star: '<svg class="ic star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  time: ic('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12h4"/>'),
  up: ic('<path d="m6 15 6-6 6 6"/>', 18),
  chev: ic('<path d="m6 9 6 6 6-6"/>', 18),
  left: ic('<path d="m14 6-6 6 6 6"/>', 18),
  expand: ic('<path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5"/>', 18),
  shrink: ic('<path d="M4 14h6v6M20 10h-6V4M14 10l6.5-6.5M10 14l-6.5 6.5"/>', 18),
  close: ic('<path d="M6 6l12 12M18 6 6 18"/>', 18),
  right: ic('<path d="m10 6 6 6-6 6"/>', 18),
  play: ic('<path d="M21.58 7.2a2.53 2.53 0 0 0-1.76-1.82C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.53 2.53 0 0 0 2.42 7.24 26.4 26.4 0 0 0 2 12.05a26.4 26.4 0 0 0 .42 4.85 2.53 2.53 0 0 0 1.76 1.74c1.57.42 7.82.42 7.82.42s6.25 0 7.82-.42a2.53 2.53 0 0 0 1.76-1.82 26.4 26.4 0 0 0 .42-4.77 26.4 26.4 0 0 0-.42-4.85"/><path d="M9.75 9.47c0-.48 0-.72.1-.85a.5.5 0 0 1 .36-.2c.17-.01.37.12.77.38l3.94 2.53c.35.22.52.34.58.48a.5.5 0 0 1 0 .39c-.06.14-.23.26-.58.48l-3.94 2.53c-.4.26-.6.39-.77.38a.5.5 0 0 1-.36-.2c-.1-.13-.1-.37-.1-.85z"/>'),   // HDS 아이콘(Untitled UI Youtube)
  logout: ic('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>', 18),
  pencil: ic('<path d="M4 20h4L19 9l-4-4L4 16z"/>', 16),
  user: ic('<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>', 16),
});

/* ---------- 상태 · 공통 ---------- */
const NAME = '김휴넷';
const S = { auth: false, fresh: false, careers: [], q: '', cat: '전체', lq: '', shown: 24, liked: new Set(['코칭', '데이터 시각화']), saved: new Set(['HLAP21002']), fam: '전체', skDom: '전체', pFilter: '전체', srTab: '전체', period: '이번 주', alarm: true, open: { skill: true, learning: true, saved: true }, dash: 'open' };
try { const d = localStorage.getItem('hu-v3-dash'); if (['open', 'full', 'closed'].includes(d)) S.dash = d; } catch (e) {}
const view = document.getElementById('view'), mainEl = document.getElementById('main');
const AV = 'data/avatar.webp', AV_DEF = 'data/avatar-default.webp';   // 스킬 갤럭시 가운데 '나' 이미지(사용자 지정 예외)
const go = h => { if (location.hash !== '#' + h) location.hash = h; else render(); };
let toastT;
const toast = m => { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2400); };
const TOTAL = ALL.length;
const PREM = ALL.filter(x => x.cat2 === 'MBA' || /MBA/.test(x.name)).filter(x => !/도서/.test(x.name)).slice(0, 12).map(x => x.cd);
const premInfo = cd => { const h = META.get(cd).h; const st = ['모집중', '마감임박 D-2', '모집예정'][h % 3]; return { st, price: [1250000, 900000, 2500000, 700000, 1000000][h % 5], months: h % 5 + 2, lect: h % 10 + 12, period: ['10.05~10.19 · 10.26 개강', '11.02~11.16 · 11.23 개강', '12.01~12.14 · 12.21 개강'][h % 3] }; };

/* ---------- 목록 카드 (레퍼런스: 위 아이콘/이미지 영역 → 얇은 구분선 → 제목·설명, 테두리는 아주 옅게) ---------- */
/* 스킬 군집(TAG 그룹)마다 플랫 아이콘 하나 — 스킬·커리어 목록이 같은 아이콘을 쓴다 */
const FAM_IC = {
  problem: '<path d="M8 12H16a4 4 0 0 1 8 0H31V20a4 4 0 0 1 0 8V34H8Z" fill="#FF8A1F"/>',
  collab: '<circle cx="15" cy="20" r="9.5" fill="#2F6BFF"/><circle cx="25" cy="20" r="9.5" fill="#21C3B3" fill-opacity=".85"/>',
  work: '<rect x="8" y="6" width="24" height="28" rx="4" fill="#17B26A"/><path d="M13 15l3 3 6-6M13 25h14" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  self: '<path d="M8 32C8 17 18 9 33 7c0 15-9 25-25 25z" fill="#3CC46B"/><path d="M9 31L24 16" stroke="#1E8E4A" stroke-width="2.4" stroke-linecap="round"/>',
  writing: '<path d="M20 5l11 13-11 17L9 18z" fill="#6E4BFF"/><circle cx="20" cy="19" r="2.8" fill="#fff"/><path d="M20 22v11" stroke="#fff" stroke-width="2"/>',
  lead: '<rect x="9" y="5" width="3.2" height="30" rx="1.6" fill="#1E1E24"/><path d="M12 7h19l-4.5 6.5L31 20H12z" fill="#F0453A"/>',
  perform: '<rect x="6" y="22" width="7.5" height="12" rx="2" fill="#BFD3FF"/><rect x="16.25" y="14" width="7.5" height="20" rx="2" fill="#6E98FF"/><rect x="26.5" y="6" width="7.5" height="28" rx="2" fill="#2F6BFF"/>',
  strategy: '<circle cx="20" cy="20" r="14" fill="#F0453A"/><circle cx="20" cy="20" r="9" fill="#fff"/><circle cx="20" cy="20" r="4.6" fill="#F0453A"/>',
  hr: '<circle cx="27" cy="15" r="4.2" fill="#C4B5FD"/><path d="M20 33c.6-5.5 3.2-8.6 7-8.6s7.4 3.1 8 8.6z" fill="#C4B5FD"/><circle cx="15" cy="13" r="5.4" fill="#8B5CF6"/><path d="M5 33c0-6.5 4.2-10.6 10-10.6S25 26.5 25 33z" fill="#8B5CF6"/>',
  finance: '<rect x="9" y="27" width="22" height="6" fill="#D99500"/><ellipse cx="20" cy="33" rx="11" ry="3.5" fill="#D99500"/><ellipse cx="20" cy="27" rx="11" ry="3.5" fill="#FFC93C"/><rect x="9" y="19" width="22" height="7" fill="#D99500"/><ellipse cx="20" cy="19" rx="11" ry="3.5" fill="#FFC93C"/><rect x="9" y="11" width="22" height="7" fill="#D99500"/><ellipse cx="20" cy="11" rx="11" ry="3.5" fill="#FFD966"/>',
  data: '<circle cx="20" cy="20" r="14" fill="#2F6BFF"/><path d="M20 20V6a14 14 0 0 1 14 14z" fill="#FF8A1F"/>',
  ai: '<path d="M18 6c1.6 8.4 6.4 13.4 15 15-8.6 1.6-13.4 6.6-15 15-1.6-8.4-6.4-13.4-15-15 8.6-1.6 13.4-6.6 15-15z" fill="#5B4BFF"/><path d="M31 4c.6 2.6 2 4 4.6 4.6-2.6.6-4 2-4.6 4.6-.6-2.6-2-4-4.6-4.6 2.6-.6 4-2 4.6-4.6z" fill="#A99BFF"/>',
  pm: '<rect x="5" y="7" width="8.5" height="24" rx="2" fill="#2F6BFF"/><rect x="15.75" y="7" width="8.5" height="15" rx="2" fill="#FFC93C"/><rect x="26.5" y="7" width="8.5" height="19" rx="2" fill="#FF6B9A"/>',
  design: '<circle cx="13" cy="13" r="7.5" fill="#FF5C5C"/><path d="M28 6l8 14H20z" fill="#FFC93C"/><rect x="16" y="22" width="13" height="13" rx="2.5" fill="#2F6BFF"/>',
  marketing: '<path d="M7 15h7l15-8v26l-15-8H7z" fill="#FF5C8A"/><rect x="10" y="24" width="5.5" height="10" rx="2" fill="#C2185B"/><path d="M33 16c2 2 2 6 0 8" stroke="#FF5C8A" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
  cs: '<path d="M6 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H17l-7 6v-6a4 4 0 0 1-4-4z" fill="#14B8A6"/><circle cx="13.5" cy="16.5" r="2" fill="#fff"/><circle cx="20" cy="16.5" r="2" fill="#fff"/><circle cx="26.5" cy="16.5" r="2" fill="#fff"/>',
  scm: '<path d="M20 5l14 7.5-14 7.5-14-7.5z" fill="#F4B26A"/><path d="M6 12.5l14 7.5V36L6 28.5z" fill="#D9822B"/><path d="M34 12.5L20 20v16l14-7.5z" fill="#B8651B"/>',
  journalism: '<rect x="5" y="9" width="30" height="22" rx="6" fill="#FF3B30"/><path d="M17 14.5v11l9.5-5.5z" fill="#fff"/>',
  edu: '<path d="M20 7l16 8-16 8-16-8z" fill="#1F3A8A"/><path d="M11 19.5V27c3.5 3.5 14.5 3.5 18 0v-7.5L20 24z" fill="#3B5BDB"/><path d="M34 16v10" stroke="#1F3A8A" stroke-width="2.2" stroke-linecap="round"/>',
  health: '<path d="M20 34S5 25.5 5 15a7.5 7.5 0 0 1 15-2.5A7.5 7.5 0 0 1 35 15c0 10.5-15 19-15 19z" fill="#FF4D6D"/><path d="M20 15v9M15.5 19.5h9" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>',
  plus: '<rect x="5" y="5" width="30" height="30" rx="8" fill="#17171A"/><path d="M20 13v14M13 20h14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
};
const FAM_COLOR = { problem: '#FF8A1F', collab: '#2F6BFF', work: '#17B26A', self: '#2FAE5E', writing: '#6E4BFF', lead: '#F0453A', perform: '#2F6BFF', strategy: '#E5483D', hr: '#8B5CF6', finance: '#D99500', data: '#2F6BFF', ai: '#5B4BFF', pm: '#2F6BFF', design: '#FF5C5C', marketing: '#FF4F86', cs: '#14B8A6', scm: '#D9822B', journalism: '#FF3B30', edu: '#1F3A8A', health: '#FF4D6D' };
/* 커리어 아이콘 = 사원증 배지(사람 + 목걸이 줄). 스킬 아이콘(자유로운 모양)과 달리 모양은 모두 같고, 색만 그 커리어의 주력 스킬 군집 색 */
/* 커리어 깃발 색 — 직무군(커리어 목록 위 필터)마다 서로 다른 색 */
const CAREER_C = { lead: '#EF4444', perform: '#2563EB', strategy: '#0D9488', hr: '#8B5CF6', finance: '#D97706', data: '#0284C7', ai: '#4F46E5', pm: '#EA580C', design: '#DB2777', marketing: '#C026D3', cs: '#059669', scm: '#92400E', journalism: '#475569', edu: '#1E3A8A', health: '#65A30D', writing: '#9F1239' };
const CI = (g, s = 40) => { const c = CAREER_C[g] || FAM_COLOR[g] || '#17171A'; return `<svg class="fi ci" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><rect x="9.5" y="4.5" width="3.2" height="31" rx="1.6" fill="${c}"/><path d="M12.7 6.5H33l-5.2 7.4 5.2 7.4H12.7z" fill="${c}"/><path d="M12.7 6.5H33l-5.2 7.4H12.7z" fill="#fff" fill-opacity=".16"/></svg>`; };   // 커리어 = 깃발(모양은 같고 직무군 색만 다름)
const FI = (g, s = 40) => `<svg class="fi" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">${FAM_IC[g] || FAM_IC.plus}</svg>`;
const heartBtn = (key, on) => `<button class="hrt ${on ? 'on' : ''}" data-save="${esc(key)}" aria-label="저장">${I.heart}</button>`;
const priceR = f => f.pr.t === 'free' ? '<span class="pr free">무료</span>' : f.pr.t === 'mem' ? '<span class="pr free">멤버십</span>' : `<span class="pr">${f.pr.now.toLocaleString()}<small>원</small></span>`;
const card = (c, opt = {}) => { const f = info(c.cd); return `<article class="card ${opt.on ? 'on' : ''}" data-go="c/${c.cd}">
  <div class="media">${thumb(c)}</div>
  <div class="cb"><div class="ct"><h3>${esc(c.title)}</h3></div><p class="sub">${opt.sub || `${esc(c.cat2)} · ${esc(c.cp)}`}</p>
  <div class="cf"><span class="mt">${I.time}${f.hours}시간 · ${f.chap}차시<i></i><span class="star">${I.star}</span>${f.rate}</span>${opt.right !== undefined ? opt.right : priceR(f)}</div>
  ${opt.prog !== undefined ? `<div class="pg"><span class="prog"><i style="width:${opt.prog}%"></i></span>${opt.prog}%</div>` : ''}</div>
</article>`; };
const iconCard = ({ go, g, ico, title, sub, left = '', right = '', save = '', on = false, cls = '' }) => `<article class="card ic-card ${cls} ${on ? 'on' : ''}" ${go ? `data-go="${go}"` : ''}>
  <div class="media icon">${ico || FI(g)}</div>
  <div class="cb"><div class="ct"><h3>${title}</h3>${save}</div><p class="sub two">${sub}</p>${left || right ? `<div class="cf"><span class="mt">${left}</span>${right}</div>` : ''}</div>
</article>`;
const skillCard = (s, on) => iconCard({ go: `skills/${encodeURIComponent(s.k)}`, g: s.g, title: esc(s.k), on,
  sub: (n => `${esc(s.fam)} 스킬${n ? ` · 커리어 ${n}개에서 써요` : ' · 여러 업무에 두루 쓰여요'}`)(CAREERS.filter(c => c.pool.includes(s.k)).length),
  left: `콘텐츠 ${countFor(s.k).toLocaleString()}개`, right: `<span class="pr">+${hash(s.k) % 30 + 8}<small>pt</small></span>` });
const careerCard = (c, on) => iconCard({ go: `careers/${encodeURIComponent(c.k)}`, ico: CI(c.tags[0]), title: esc(c.k), on,
  sub: `${c.pool.slice(0, 3).map(esc).join(' · ')} 스킬로 일해요`,
  left: `<span class="mi" title="필요 스킬">${I.skill}필요 스킬 ${c.pool.length}개</span><span class="mi" title="보유자">${I.user}${(hash(c.k) % 5000 + 800).toLocaleString()}명</span>`, right: `<span class="chip">${esc(c.fam)}</span>` });
const premCard = cd => { const c = course(cd), p = premInfo(cd); return card(c, { sub: `${p.lect}강 · ${p.months}개월 · ${p.st}`, right: `<span class="pr">${(p.price / 10000).toLocaleString()}<small>만원</small></span>` }); };
/* 홈 가로 목록: 8개를 한 줄로 — 화면 폭에 맞춰 1~7열이 오른쪽 여백 없이 꽉 차고, 넘치는 것은 좌우로 넘겨 본다 */
const rail = items => `<div class="rail"><div class="rail-track">${items.join('')}</div></div>`;
const secR = (t, p = '', link) => `<div class="sec-h"><div><h2>${t}</h2>${p ? `<p>${p}</p>` : ''}</div><div class="sec-r"><span class="rail-nav"><button data-rail="-1" aria-label="이전">${I.left}</button><button data-rail="1" aria-label="다음">${I.right}</button></span>${link ? `<a href="#${link}">전체보기 ›</a>` : ''}</div></div>`;
const upto = (list, n, words, used) => { const out = list.slice(0, n); out.forEach(c => used.add(c.cd)); if (out.length < n) match(words, n - out.length, used).forEach(c => { out.push(c); used.add(c.cd); }); return out; };
const FREE = POOL.filter(x => info(x.cd).pr.t === 'free');
const freeList = (base, n, used) => { const out = base.filter(c => !used.has(c.cd)).slice(0, n); out.forEach(c => used.add(c.cd)); for (const x of FREE) { if (out.length >= n) break; if (!used.has(x.cd)) { out.push(course(x.cd)); used.add(x.cd); } } return out; };
const careersTo = (names, n, skip = []) => { const out = names.map(careerOf).filter(Boolean).filter(c => !skip.includes(c.k)); for (const c of CAREERS) { if (out.length >= n) break; if (!out.includes(c) && !skip.includes(c.k)) out.push(c); } return out.slice(0, n); };
function railSync(tr) { const sec = tr.closest('.sec'); if (!sec) return; const max = tr.scrollWidth - tr.clientWidth - 2; sec.querySelectorAll('[data-rail]').forEach(b => { b.disabled = +b.dataset.rail < 0 ? tr.scrollLeft <= 2 : tr.scrollLeft >= max; }); sec.classList.toggle('rail-fit', max <= 0); }
function railGo(tr, dir) {   // 한 화면만큼 넘긴다 — 직접 움직이고(브라우저마다 다른 부드러운 스크롤 대신) 끝나면 자석 정렬을 되돌린다
  const max = tr.scrollWidth - tr.clientWidth, from = tr.scrollLeft, to = Math.max(0, Math.min(max, from + dir * tr.clientWidth));
  if (Math.abs(to - from) < 1) return;
  const t0 = performance.now(), D = 420, ease = x => 1 - Math.pow(1 - x, 3);
  tr.style.scrollSnapType = 'none';
  const step = now => { const k = Math.min(1, (now - t0) / D); tr.scrollLeft = from + (to - from) * ease(k); if (k < 1) requestAnimationFrame(step); else { tr.style.scrollSnapType = ''; railSync(tr); } };
  requestAnimationFrame(step);
}
const railsSync = () => document.querySelectorAll('.rail-track').forEach(railSync);
document.addEventListener('scroll', e => { if (e.target.classList && e.target.classList.contains('rail-track')) railSync(e.target); }, true);
new ResizeObserver(railsSync).observe(document.getElementById('main'));
const secH = (t, p = '', link) => `<div class="sec-h"><div><h2>${t}</h2>${p ? `<p>${p}</p>` : ''}</div>${link ? `<a href="#${link}">전체보기 ›</a>` : ''}</div>`;
const mh = (title, sub = '', right = '') => `<div class="mh"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${right ? `<div class="r">${right}</div>` : ''}</div>`;
const pills = (items, on, attr) => `<div class="pills">${items.map(t => `<button class="pill ${t === on ? 'on' : ''}" ${attr}="${esc(t)}">${t}</button>`).join('')}</div>`;

/* ---------- 홈: HU의 세 개념(스킬 · 콘텐츠 · 커리어)을 알려 주는 구역 — 레퍼런스의 검은 그림 카드 3장 배치 ---------- */
/* 세 개념 카드의 대표 그림 — 빛·깊이를 살린 SVG. 이미지가 오면 INTRO_IMG에 주소만 넣으면 그림 대신 이미지가 들어간다 */
const INTRO_IMG = { skill: '', content: '', career: '' };
const stars = (seed, n, op = .55) => { let s = seed, o = ''; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280; for (let i = 0; i < n; i++) o += `<circle cx="${(r() * 400).toFixed(1)}" cy="${(r() * 160).toFixed(1)}" r="${(r() * .9 + .3).toFixed(2)}" fill="#fff" fill-opacity="${(r() * op + .1).toFixed(2)}"/>`; return o; };
/* 갤럭시 기호(스킬 = 주황 육각형 + 번개, 콘텐츠 = 초록 원 + 재생, 커리어 = 파란 사각 + 깃발) — 갤럭시 노드와 같은 색·모양 */
const DOMC = { skill: '#F28C00', content: '#17B26A', career: '#2F7BFF' };
const hexPts = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 180 * (60 * i - 90); return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`; }).join(' ');
const symShape = (k, cx, cy, r, fill) => k === 'skill'
  ? `<polygon points="${hexPts(cx, cy, r)}" fill="${fill}" stroke="${fill}" stroke-width="${r * .18}" stroke-linejoin="round"/><path d="M${cx + r * .12} ${cy - r * .62}L${cx - r * .42} ${cy + r * .1}H${cx - r * .02}L${cx - r * .14} ${cy + r * .62}L${cx + r * .42} ${cy - r * .1}H${cx + r * .02}Z" fill="#fff"/>`
  : k === 'content'
    ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/><path d="M${cx - r * .26} ${cy - r * .38}V${cy + r * .38}L${cx + r * .42} ${cy}Z" fill="#fff"/>`
    : `<rect x="${cx - r * .9}" y="${cy - r * .9}" width="${r * 1.8}" height="${r * 1.8}" rx="${r * .42}" fill="${fill}"/><path d="M${cx - r * .34} ${cy - r * .5}V${cy + r * .52}" stroke="#fff" stroke-width="${r * .14}" stroke-linecap="round"/><path d="M${cx - r * .3} ${cy - r * .48}H${cx + r * .46}L${cx + r * .24} ${cy - r * .22}L${cx + r * .46} ${cy + r * .04}H${cx - r * .3}Z" fill="#fff"/>`;
/* 왼쪽 메뉴용: 평소엔 회색 선 기호, 고르면 갤럭시 색으로 채운 기호 */
const NAVDOM = { contents: 'content', careers: 'career', skills: 'skill' };
const NAV_D = { skill: 'M13.6 2.8 5.6 13.6h5.9l-1.1 7.6 8-10.8h-5.9z', content: 'M7.5 4.8v14.4L19 12z', career: 'M6.5 4.5h11.5l-3 4.3 3 4.3H6.5z' };
const NAV_FILL = { home: '<path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  myclass: '<path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M5.6 17a2.6 2.6 0 0 1 2.6-2.6H16" fill="none" stroke="#F3F3F5" stroke-width="1.6" stroke-linecap="round"/>',
  premium: '<path d="M7 4h10v5a5 5 0 0 1-10 0z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 20h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 20a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  gear: '<path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M5.6 18.4l1.7-1.7M16.7 7.3l1.7-1.7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="12" r="5.2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="#F3F3F5"/>' };
const navIco = k => `<span class="ni">${I[k].replace('class="ic"', 'class="ic l"')}<svg class="f" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">${NAV_FILL[k] || ''}</svg></span>`;
const navSym = k => `<span class="ni"><svg class="l" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${NAV_D[k]}"/>${k === 'career' ? '<path d="M6.5 3.5v17"/>' : ''}</svg><svg class="f" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="${NAV_D[k]}" fill="${DOMC[k]}" stroke="${DOMC[k]}" stroke-width="1.4" stroke-linejoin="round"/>${k === 'career' ? `<path d="M6.5 3.5v17" stroke="${DOMC[k]}" stroke-width="2" stroke-linecap="round"/>` : ''}</svg></span>`;
const SYM = k => `<svg class="sym" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">${symShape(k, 12, 12, 10, DOMC[k])}</svg>`;
/* 세 개념 카드 그림 — 같은 바탕(남색 우주·옅은 격자·별) 위에 각자의 기호가 빛나는 한 장 */
function artBase(k, inner) {
  const c = DOMC[k];
  return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice"><defs>
    <radialGradient id="ab-${k}" cx="50%" cy="50%" r="80%"><stop offset="0" stop-color="#171D3F"/><stop offset=".6" stop-color="#0A0D1F"/><stop offset="1" stop-color="#05060D"/></radialGradient>
    <radialGradient id="ah-${k}"><stop offset="0" stop-color="${c}" stop-opacity=".55"/><stop offset=".5" stop-color="${c}" stop-opacity=".14"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
    <pattern id="ag-${k}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern>
    <filter id="af-${k}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7"/></filter></defs>
    <rect width="400" height="160" fill="url(#ab-${k})"/><rect width="400" height="160" fill="url(#ag-${k})"/>${stars(k.length * 7 + 3, 55, .45)}
    <ellipse cx="200" cy="80" rx="130" ry="66" fill="url(#ah-${k})"/>
    <g fill="none" stroke="#fff" stroke-opacity=".1"><circle cx="200" cy="80" r="46"/><circle cx="200" cy="80" r="72" stroke-dasharray="2 5"/></g>${inner}</svg>`;
}
const glowSym = (k, r) => `<g filter="url(#af-${k})" opacity=".85">${symShape(k, 200, 80, r * 1.05, DOMC[k])}</g>${symShape(k, 200, 80, r, DOMC[k])}`;
const sat = (k, pts, r, op = .55) => pts.map(([x, y]) => `<path d="M200 80L${x} ${y}" stroke="#fff" stroke-opacity=".16"/>`).join('') + pts.map(([x, y], i) => `<g opacity="${i % 2 ? op : 1}">${symShape(k, x, y, r, DOMC[k])}</g>`).join('');
const artSkill = () => artBase('skill', sat('skill', [[118, 44], [104, 112], [286, 40], [300, 116], [246, 140], [156, 22]], 7) + glowSym('skill', 26));   // 번개 육각형이 중심, 이어진 작은 스킬들
const artContent = () => artBase('content', sat('content', [[124, 50], [116, 114], [284, 46], [292, 110]], 7) + glowSym('content', 24));
const artCareer = () => artBase('career', `<path d="M70 140L118 118 160 104 200 80" fill="none" stroke="#fff" stroke-opacity=".35" stroke-dasharray="3 5"/>${[[70, 140], [118, 118], [160, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${DOMC.career}"/><circle cx="${x}" cy="${y}" r="9" fill="${DOMC.career}" fill-opacity=".18"/>`).join('')}` + sat('career', [[290, 42], [300, 114]], 7) + glowSym('career', 24));
function introSec() {
  if (S.introOff) return '';
  const items = [['skill', '스킬', INTRO_IMG.skill ? `<img src="${INTRO_IMG.skill}" alt="">` : artSkill(), '스킬로 성장을 확인해요', '배운 만큼 스킬 포인트가 쌓여요. 스킬 갤럭시에서 스킬·콘텐츠·커리어가 어떻게 이어지는지 볼 수 있어요.', 'skills', '스킬 둘러보기'],
    ['content', '콘텐츠', INTRO_IMG.content ? `<img src="${INTRO_IMG.content}" alt="">` : artContent(), `${TOTAL.toLocaleString()}개 콘텐츠로 배워요`, '강의마다 키워 주는 스킬이 붙어 있어요. 필요한 스킬부터 골라 들을 수 있어요.', 'contents', '콘텐츠 보기'],
    ['career', '커리어', INTRO_IMG.career ? `<img src="${INTRO_IMG.career}" alt="">` : artCareer(), '커리어를 목표로 정해요', '마이커리어를 정하면 필요한 스킬과 같은 목표의 학습자가 많이 듣는 콘텐츠를 추천해요.', 'careers', '커리어 찾기']];
  return `<section class="sec intro"><div class="sec-h"><div><h2>${S.auth ? 'HU를 이렇게 쓰면 좋아요' : 'HU가 처음이세요? 세 가지만 알면 돼요'}</h2></div><button class="lk" id="introX">닫기</button></div>
    <div class="intro-grid">${items.map(([key, k, art, t, d, h, b], i) => `<article class="ic3"><div class="art">${art}</div><div class="ib"><span class="eb" style="color:${DOMC[key]}">${String(i + 1).padStart(2, '0')} · ${k}</span><h3>${t}</h3><p>${d}</p><a class="btn ${i ? 'line' : 'ink'} sm" href="#${h}">${b}</a></div></article>`).join('')}</div></section>`;
}
function bindIntro() { const x = document.getElementById('introX'); if (x) x.onclick = () => { S.introOff = true; x.closest('.intro').remove(); }; }

/* ---------- 위쪽 바 · 왼쪽 메뉴 ---------- */
const SECTION = { guest: 'home', home: 'home', contents: 'contents', c: 'contents', skills: 'skills', careers: 'careers', myclass: 'myclass', premium: 'premium' };
function renderChrome(page) {
  const authed = S.auth, on = SECTION[page] || '';
  const now = new Date(), hhmm = now.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' });
  document.getElementById('top').innerHTML = `<a class="brand" href="#${authed ? 'home' : 'guest'}"><i>HU</i><b>HUNET<br>UNIVERSITY</b></a>
    <label class="tsearch">${I.search}<input id="gq" placeholder="원하는 콘텐츠를 검색해 보세요" autocomplete="off" value="${page === 'search' ? esc(S.q) : ''}"><div class="ac-box" id="acBox"></div></label>
    <div class="tright"><a class="pc" href="javascript:void 0">HU Plus</a><a class="pc" href="javascript:void 0">기업교육 ↗</a>${authed ? '' : '<a class="btn ink sm" href="#login">로그인</a>'}</div>`;
  const nav = [['home', authed ? '#home' : '#guest', 'home', '홈'], ['contents', '#contents', 'play', '콘텐츠'], ['careers', '#careers', 'career', '커리어'], ['skills', '#skills', 'skill', '스킬'], ['myclass', authed ? '#myclass' : '#login', 'myclass', '마이클래스'], ['premium', '#premium', 'premium', '프리미엄']];
  document.getElementById('lnb').innerHTML = `<div class="lp on ${lpCur() ? 'cur' : ''}"><button class="lp-btn" id="lpBtn" aria-label="${authed ? '마이 대시보드' : '로그인'}"><img class="lp-av" src="${authed ? AV : AV_DEF}" alt=""><span>${authed ? NAME : '로그인'}</span></button></div>` + nav.map(([k, h, icn, l], i) => { const d = NAVDOM[k]; return `<a href="${h}" class="${on === k ? 'on' : ''} ${i === 5 ? 'pc' : ''}" ${d ? `data-dom="${d}"` : ''}>${d ? navSym(d) : navIco(icn)}<span>${l}</span></a>`; }).join('') + `<hr><a class="pc ${authed && S.panel === 'noti' ? 'on' : ''}" href="javascript:void 0" data-panel="noti">${navIco('bell')}<span>알림</span><em class="nbadge" ${authed && unread() ? '' : 'hidden'}>${unread()}</em></a><a class="pc ${authed && S.panel === 'set' ? 'on' : ''}" href="javascript:void 0" data-panel="set">${navIco('gear')}<span>설정</span></a>`;
  document.querySelectorAll('.lnb [data-panel]').forEach(a => a.onclick = e => { e.preventDefault(); openPanel(a.dataset.panel); });
  document.getElementById('lpBtn').onclick = () => { if (!S.auth) return go('login'); if (S.panel !== 'dash') { S.panel = 'dash'; if (S.dash === 'closed') setDash('open'); else renderDash(); syncLnbPanel(); return; } setDash(S.dash === 'closed' ? 'open' : 'closed'); };   // 프로필 = 마이 대시보드 열기·닫기
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

/* ---------- 두 번째 패널: 마이 대시보드 (모든 페이지에서 고정) ---------- */
const fold = (key, label, body, extra = '') => `<section class="ds ${S.open[key] ? '' : 'closed'} ${extra}"><div class="lbl fold" data-fold="${key}">${label}${S.open[key] ? I.up : I.chev}</div><div class="bd">${body}</div></section>`;
const wide = () => innerWidth > 900;   // 접기·전체 보기는 데스크톱에서만(모바일은 위아래로 쌓는다)
/* 프로필 아래 '지금 수준' — 레벨·포인트·상위 % + 스킬 갤럭시의 목표 커리어·가진 스킬(갤럭시와 연동) */
function levelHTML() {   // 레벨은 없애고 '나의 스킬 포인트' + 같은 커리어 학습자 중 상위 %
  const fresh = S.fresh, m = GX.me, pt = fresh ? 0 : 4740;
  return `<div class="lv-h"><b>나의 스킬 포인트</b><span class="lv-pt num">${pt.toLocaleString()}pt</span></div>
    <p class="lv-note">${fresh ? '첫 학습을 마치면 포인트가 쌓이기 시작해요' : '같은 커리어 학습자 중 <b>상위 18%</b>'}</p>
    <dl class="lv-g"><div><dt>목표 커리어</dt><dd>${m && m.goal && m.goal !== '-' ? esc(m.goal) : '-'}</dd></div><div><dt>가진 스킬</dt><dd class="num">${m ? esc(m.own) : '0개'}</dd></div><div><dt>목표까지</dt><dd class="num">${m ? esc(m.to) : '-'}</dd></div></dl>
    ${m && m.need ? `<div class="lv-bar thin"><i style="width:${m.pct}%"></i></div>` : ''}`;
}
/* 스킬 갤럭시에서 지금 고른 노드 — 홈에서는 갤럭시를 누를 때마다 바뀌고, 다른 화면에서는 마지막으로 본 곳 */
const GX_DOM = { skill: '스킬', career: '커리어', content: '콘텐츠', me: '나 · 목표' };
const idDom = id => id === 'me' ? 'me' : { s: 'skill', c: 'career', k: 'content' }[String(id).replace(/^x/, '')[0]] || 'skill';   // 갤럭시 노드 id: s·c·k(확장 노드는 앞에 x)
const domIco = (dom, sz = 20) => { const k = dom === 'me' ? 'career' : dom; return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" aria-hidden="true"><path d="${NAV_D[k]}" fill="${DOMC[k]}" stroke="${DOMC[k]}" stroke-width="1.4" stroke-linejoin="round"/>${k === 'career' ? `<path d="M6.5 3.5v17" stroke="${DOMC[k]}" stroke-width="2" stroke-linecap="round"/>` : ''}</svg>`; };   // 콘텐츠 = 재생 · 커리어 = 깃발 · 스킬 = 번개
function gxNowHTML() {
  const c = GX.cur, live = (current[0] === 'home' || current[0] === 'guest') && !!document.querySelector('#gx iframe');
  const head = `<div class="lbl">스킬 갤럭시${live ? '<em class="live">연동 중</em>' : `<a class="lk" href="#${S.auth ? 'home' : 'guest'}">홈에서 열기 ›</a>`}</div>`;
  if (!c || (!S.auth && c.dom === 'me')) return `${head}<div class="bd"><p class="note">홈의 스킬 갤럭시에서 노드를 고르면 여기에 그 정보가 나와요.</p></div>`;
  const list = (c.list || []).slice(0, 4);
  return `${head}<div class="bd"><div class="gx-now d-${c.dom}"><span class="gi">${domIco(c.dom, 22)}</span>
    <div><small>${live ? '지금 보는 곳' : '마지막으로 본 곳'} · ${GX_DOM[c.dom]}</small><b>${esc(c.name)}</b>${c.sub ? `<p>${esc(c.sub)}</p>` : ''}</div></div>
    ${c.stats.length ? `<div class="tiles">${c.stats.map(([t, v]) => `<div>${esc(t)}<b>${esc(v)}</b></div>`).join('')}</div>` : ''}
    ${list.length ? `<div class="gx-links"><p>${esc(c.note || '이어진 항목')}</p>${list.map(x => `<button class="gx-li" data-gxgo="${esc(x.id)}" ${live ? '' : 'data-gxhome'}><span class="gli">${domIco(idDom(x.id), 16)}</span><span class="gln">${esc(x.name)}</span>${I.right}</button>`).join('')}</div>` : ''}</div>`;
}
function syncGxDash() {
  if (document.getElementById('gx').classList.contains('gx-mini') && gxAdI % 3 === 0) gxAdDraw();   // 갤럭시가 바뀌면 대시보드의 두 곳만 다시 그린다(나머지는 그대로)
  const a = document.getElementById('gxNow'), b = document.getElementById('gxLv');
  if (a) a.innerHTML = gxNowHTML();
  if (b) b.innerHTML = levelHTML();
}
/* 마이 대시보드 상태: open(기본 패널) · full(콘텐츠 영역까지 넓게) · closed(접어서 왼쪽 메뉴 위 프로필로) — 로그인 전에는 열리지 않는다 */
/* ---------- 왼쪽 메뉴 알림 · 설정 — 마이 대시보드 자리(두 번째 패널)에서 연다 ---------- */
const NOTI = [
  { id: 'n1', type: '학습', title: '오늘의 학습을 아직 시작하지 않았어요', time: '오늘 09:00', cd: 'HLSP91107', read: false,
    body: ['어제까지 5일 연속으로 학습했어요. 오늘 10분만 이어 가면 연속 학습 6일이 돼요.', '이어서 볼 강의를 아래에 담아 두었어요. 지난번 멈춘 45% 지점부터 다시 시작해요.'] },
  { id: 'n2', type: '추천', title: '서비스 기획자에게 맞는 새 추천 강의가 도착했어요', time: '오늘 08:10', cd: 'HLAP21002', read: false,
    body: ['마이커리어 서비스 기획자에 필요한 스킬 중 아직 채우지 못한 요구사항 정의·로드맵 수립을 키우는 강의를 골랐어요.', '홈의 맞춤 커리어 추천 구역에서도 볼 수 있어요.'] },
  { id: 'n3', type: '스킬', title: '스킬 포인트 +24pt를 받았어요 — 요구사항 정의', time: '어제 21:40', read: false,
    body: ['「요구사항 정의」 스킬에 24pt가 쌓였어요. 이제 Lv.4까지 1,260pt 남았어요.', '스킬 갤럭시에서 이 스킬과 이어진 콘텐츠·커리어를 확인해 보세요.'] },
  { id: 'n4', type: '수강', title: '수강 신청이 완료됐어요', time: '11.25', cd: 'HLAP21002', read: true,
    body: ['신청한 강의를 마이클래스 > 학습 중에서 바로 시작할 수 있어요.', '학습 기간은 신청일부터 90일이에요.'] },
  { id: 'n5', type: '커리어', title: '프로덕트 오너 커리어와 스킬 6개가 겹쳐요', time: '11.24', read: true,
    body: ['지금 가진 스킬로 프로덕트 오너 커리어의 필요 스킬 중 6개를 채우고 있어요.', '마이커리어에 담으면 맞춤 추천에 함께 반영돼요.'] },
  { id: 'n6', type: '공지', title: '12월 HU 정기 점검 안내', time: '11.20', read: true,
    body: ['12월 3일(수) 02:00~05:00에 서비스 점검이 있어요. 점검 중에는 학습과 수강 신청을 이용할 수 없어요.', '점검이 끝나면 학습 기록은 그대로 이어져요.'] },
  { id: 'n7', type: '이벤트', title: '연말 학습 챌린지 — 30일 연속 학습하면 배지를 드려요', time: '11.18', read: true,
    body: ['12월 한 달 동안 매일 10분 이상 학습하면 「꾸준함」 스킬 배지를 드려요.', '참여는 자동이에요. 마이 대시보드의 연속 학습 일수로 확인할 수 있어요.'] },
];
const NOTI_IC = { 학습: 'time', 추천: 'star', 스킬: 'skill', 수강: 'myclass', 커리어: 'career', 공지: 'bell', 이벤트: 'premium' };
S.panel = 'dash'; S.nf = '전체'; S.set = { remind: true, rec: true, point: true, mkt: false, daily: '30분', autoplay: true, caption: false, theme: '라이트', font: '보통', open: true };
const unread = () => NOTI.filter(n => !n.read).length;
function openPanel(p) {   // 알림·설정을 누르면 대시보드 자리에서 열고, 다시 누르면 마이 대시보드로
  if (!S.auth) return go('login');
  S.panel = S.panel === p ? 'dash' : p;
  if (S.dash === 'closed') setDash('open'); else { if (S.dash === 'full') { S.dash = 'open'; saveDash(); } renderDash(); }
  syncLnbPanel();
}
function syncLnbPanel() { const lp = document.querySelector('.lp'); if (lp) lp.classList.toggle('cur', lpCur()); document.querySelectorAll('.lnb [data-panel]').forEach(a => a.classList.toggle('on', S.auth && S.panel === a.dataset.panel)); const b = document.querySelector('.lnb .nbadge'); if (b) { const n = unread(); b.textContent = n; b.hidden = !n || !S.auth; } }
const panelHead = (t, right = '') => `<button class="pback" data-panel-go="dash">${I.left}<span>마이 대시보드</span></button><div class="dh"><div class="dh-l"><h2>${t}</h2></div><span class="dh-r">${right}<button class="dtog" data-dmode="closed" title="접기" aria-label="패널 접기">${I.left}</button></span></div>`;
function notiPanel() {
  const F = ['전체', '안 읽음', '학습', '추천', '공지'], cur = current[0] === 'noti' ? (current[1] || NOTI[0].id) : '';
  const list = NOTI.filter(n => S.nf === '전체' || (S.nf === '안 읽음' ? !n.read : S.nf === '공지' ? ['공지', '이벤트'].includes(n.type) : S.nf === '학습' ? ['학습', '수강', '스킬'].includes(n.type) : ['추천', '커리어'].includes(n.type)));
  return `${panelHead(`알림 <em class="cnt-b">${unread() || ''}</em>`, unread() ? '<button class="lk" data-readall>모두 읽음</button>' : '')}
    <div class="nfilter">${pills(F, S.nf, 'data-nf')}</div>
    <div class="nlist">${list.map(n => `<button class="nt ${n.read ? '' : 'unread'} ${n.id === cur ? 'on' : ''}" data-noti="${n.id}"><span class="nt-ic t-${n.type}">${I[NOTI_IC[n.type]] || I.bell}</span><span class="nt-b"><b>${esc(n.title)}</b><small>${n.type} · ${n.time}</small></span>${n.read ? '' : '<i class="dot"></i>'}</button>`).join('') || '<p class="note">이 조건의 알림이 없어요.</p>'}</div>`;
}
const srow = (k, t, d = '') => `<div class="srow"><span>${t}${d ? `<small>${d}</small>` : ''}</span><span class="sw ${S.set[k] ? 'on' : ''}" role="switch" aria-checked="${!!S.set[k]}" data-set="${k}"></span></div>`;
function setPanel() {
  return `${panelHead('설정')}
    <section class="ds"><div class="lbl">계정</div><div class="bd"><div class="prof" style="margin-top:0"><div><b>${NAME}</b><small>HU 멤버 · 휴넷 통합 계정</small></div></div>
      <div class="kvl"><div><span>아이디</span><b>hunet1234</b></div><div><span>이메일</span><b>kim.hunet@example.com</b></div><div><span>소속</span><b>개인 회원</b></div></div><button class="lk" type="button">계정 정보 수정 ›</button></div></section>
    <section class="ds"><div class="lbl">알림 받기</div><div class="bd">${srow('remind', '학습 리마인드', '정해 둔 시간에 오늘의 학습을 알려 줘요')}${srow('rec', '새 추천 강의')}${srow('point', '스킬 포인트·레벨 변화')}${srow('mkt', '이벤트·혜택 소식', '선택 · 마케팅 정보 수신 동의')}</div></section>
    <section class="ds"><div class="lbl">학습</div><div class="bd"><div class="srow col"><span>하루 목표 학습 시간</span>${pills(['10분', '30분', '60분'], S.set.daily, 'data-daily')}</div>${srow('autoplay', '다음 차시 자동 재생')}${srow('caption', '자막 기본으로 켜기')}</div></section>
    <section class="ds"><div class="lbl">화면</div><div class="bd"><div class="srow col"><span>테마</span>${pills(['라이트', '다크', '시스템'], S.set.theme, 'data-theme')}</div><div class="srow col"><span>글자 크기</span>${pills(['보통', '크게'], S.set.font, 'data-font')}</div></div></section>
    <section class="ds"><div class="lbl">개인정보</div><div class="bd">${srow('open', '학습 기록 공개', '같은 커리어 학습자에게 내 스킬 순위를 보여 줘요')}<button class="lk" type="button">개인정보 처리방침 ›</button></div></section>
    <div class="logout-row">${logoutBtn}<p class="note">HU 프로토타입 · 버전 3</p></div>`;
}
function bindPanel(el) {
  el.querySelectorAll('[data-panel-go]').forEach(b => b.onclick = () => { S.panel = 'dash'; renderDash(); syncLnbPanel(); });
  el.querySelectorAll('[data-nf]').forEach(b => b.onclick = () => { S.nf = b.dataset.nf; renderDash(); });
  el.querySelectorAll('[data-noti]').forEach(b => b.onclick = () => { const n = NOTI.find(x => x.id === b.dataset.noti); n.read = true; go('noti/' + n.id); });
  el.querySelectorAll('[data-readall]').forEach(b => b.onclick = () => { NOTI.forEach(n => n.read = true); renderDash(); syncLnbPanel(); toast('알림을 모두 읽음으로 표시했어요'); });
  el.querySelectorAll('[data-set]').forEach(b => b.onclick = () => { const k = b.dataset.set; S.set[k] = !S.set[k]; renderDash(); });
  [['daily', 'data-daily'], ['theme', 'data-theme'], ['font', 'data-font']].forEach(([k, a]) => el.querySelectorAll(`[${a}]`).forEach(b => b.onclick = () => { S.set[k] = b.getAttribute(a); renderDash(); toast('설정을 바꿨어요 (시안)'); }));
}
function renderNoti(id) {   // 오른쪽 콘텐츠 영역: 고른 알림 메시지
  if (!S.auth) return go('login');
  const n = NOTI.find(x => x.id === id) || NOTI[0]; n.read = true; syncLnbPanel();
  const c = n.cd && course(n.cd);
  view.innerHTML = `<article class="msg"><div class="msg-h"><span class="nt-ic t-${n.type}">${I[NOTI_IC[n.type]] || I.bell}</span><span class="chip">${n.type}</span><span class="msg-t">${n.time}</span></div>
    <h1>${esc(n.title)}</h1><div class="msg-body">${n.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    ${c ? `<div class="msg-c">${card(c)}</div>` : ''}
    <div class="msg-act">${c ? `<a class="btn ink" href="#c/${n.cd}">강의 보러 가기</a>` : n.type === '스킬' ? '<a class="btn ink" href="#home">스킬 갤럭시에서 보기</a>' : n.type === '커리어' ? '<a class="btn ink" href="#careers/프로덕트 오너">커리어 보기</a>' : ''}<a class="btn line" href="#home">홈으로</a></div></article>`;
}
/* 안 읽은 알림이 있으면, 로그인 직후가 아니라 잠시 뒤 레벨 아래에서 펼쳐지며 눈길을 끈다 — 누르면 알림 패널로 */
let nudgeT;
function nudgeHTML() {
  const n = unread(); if (!n) return '';
  const last = NOTI.find(x => !x.read);
  return `<div class="nudge-n ${S.nudged ? 'show' : ''}" id="nudgeN"><button data-open-noti><span class="nn-ic">${I.bell}<i></i></span><span class="nn-b"><b>안 읽은 알림 ${n}개가 있어요</b><small>${esc(last.title)}</small></span>${I.right}</button></div>`;
}
function nudgeRun() {
  const el = document.getElementById('nudgeN'); if (!el) return;
  el.querySelector('[data-open-noti]').onclick = () => openPanel('noti');
  if (!S.nudged) { clearTimeout(nudgeT); nudgeT = setTimeout(() => { const e = document.getElementById('nudgeN'); if (e) { e.classList.add('show'); S.nudged = true; } }, 1400); }
}
const logoutBtn = `<button class="logout" data-logout>${I.logout}로그아웃</button>`;
const dashCtl = () => `<span class="dh-r"><a href="#myclass">편집 ${I.pencil}</a>${S.dash === 'full'
  ? `<button class="dtog" data-dmode="open" title="기본 크기로" aria-label="마이 대시보드 기본 크기로">${I.shrink}</button>`
  : `<button class="dtog" data-dmode="full" title="크게 보기" aria-label="마이 대시보드 크게 보기">${I.expand}</button>`}<button class="dtog" data-dmode="closed" title="접기" aria-label="마이 대시보드 접기">${I.left}</button></span>`;
function dashParts() {
  const fresh = S.fresh, cs = S.careers.length ? S.careers : ['서비스 기획자'], c = careerOf(cs[0]);
  const learning = fresh ? [] : [['HLSP91107', 45], ['HLAP21002', 12], ['HLAP01419', 27], ['HLSP28153', 61]];
  const owned = fresh ? new Set() : new Set(c.pool.slice(0, 3));
  return {
    cs, c,
    prof: `<div class="prof"><div><b>${NAME}</b><small>HU 멤버 · ${esc(cs[0])}</small></div></div>`,
    career: `<div class="lbl">마이커리어</div><div class="bd"><div class="pills">${cs.map((k, i) => `<a class="pill ${i ? '' : 'on'}" href="#careers/${encodeURIComponent(k)}">${esc(k)}</a>`).join('')}${cs.length < 3 ? `<a class="pill" href="#careers">+ 추가</a>` : ''}</div></div>`,
    tiles: `<div class="tiles"><div>학습 시간<b>${fresh ? 0 : 6.4}<small>시간</small></b></div><div>완료<b>${fresh ? 0 : 3}<small>개</small></b></div><div>스킬 포인트<b>${fresh ? 0 : '1,240'}<small>pt</small></b></div><div>연속 학습<b>${fresh ? 0 : 5}<small>일</small></b></div></div>`,
    alarm: `<div class="tog"><span class="lbl" style="flex:1">오늘의 학습 알림</span><span class="sw ${S.alarm ? 'on' : ''}" id="sw" role="switch" aria-checked="${S.alarm}"></span></div>`,
    hist: `${fresh ? '<p class="note">학습을 시작하면 날마다 쌓인 시간이 여기에 그려져요.</p>' + hist(26, 0, 0, true) : hist(26, 9, 24)}<div class="hist-ax"><span>11.02 시작</span><span>오늘 11.27</span></div>`,
    skills: `<div class="checks2">${c.pool.slice(0, 8).map(k => `<a class="ck ${owned.has(k) ? 'on' : ''}" href="#skills/${encodeURIComponent(k)}"><i>${owned.has(k) ? '✓' : ''}</i><span>${esc(k)}</span></a>`).join('')}</div><p class="note">${owned.size}/${Math.min(8, c.pool.length)}개 스킬을 갖고 있어요</p>`,
    learning: `<div class="mblock">${learning.length ? learning.map(([cd, p]) => { const x = course(cd); return `<div class="mini" data-go="c/${cd}">${thumb(x)}<div><b>${esc(x.title)}</b><small><span class="prog"><i style="width:${p}%"></i></span>${p}%</small></div></div>`; }).join('') : '<p class="note">아직 학습 중인 강의가 없어요. 오른쪽 추천에서 첫 강의를 골라 보세요.</p>'}</div>${learning.length ? '<button class="mmore" data-mctab="학습 중">전체 보기 ›</button>' : ''}`,   // 한 블록 안에 가로형 행으로 쌓는다
    saved: `<div class="mblock">${[...S.saved].map(cd => { const x = course(cd); return x ? `<div class="mini" data-go="c/${cd}">${thumb(x)}<div><b>${esc(x.title)}</b><small>${esc(x.cat2)}</small></div></div>` : ''; }).join('') || '<p class="note">카드의 상세에서 관심 목록에 담은 강의가 여기에 모여요.</p>'}</div>${S.saved.size ? '<button class="mmore" data-mctab="관심 목록">전체 보기 ›</button>' : ''}`,
  };
}
function renderDash(syncLp = true) {
  const el = document.getElementById('dash'), body = document.body, desk = wide();
  const mode = !S.auth ? 'none' : desk ? S.dash : 'open';
  body.classList.toggle('no-dash', mode === 'none');
  body.classList.toggle('dash-off', mode === 'closed');
  body.classList.toggle('dash-full', mode === 'full');
  const lp = document.querySelector('.lp'); if (lp) lp.classList.toggle('cur', lpCur());
  if (mode === 'none') { el.innerHTML = ''; return; }
  if (S.panel !== 'dash' && mode !== 'full') { el.innerHTML = S.panel === 'noti' ? notiPanel() : setPanel(); bindPanel(el); el.querySelectorAll('[data-dmode]').forEach(b => b.onclick = () => setDash(b.dataset.dmode)); el.querySelectorAll('[data-logout]').forEach(b => b.onclick = () => { S.auth = false; S.panel = 'dash'; S.nudged = false; S.careers = []; S.fresh = false; toast('로그아웃했어요'); go('guest'); }); el.scrollTop = 0; return; }
  const P = dashParts();
  if (mode === 'full') {
    el.innerHTML = `<div class="dh dh-plain">${dashCtl()}</div>
      <div class="fd"><section class="fbox fd-hero">${P.prof}<div class="lv" id="gxLv">${levelHTML()}</div><div class="fd-st"><div class="lbl">학습 현황</div>${pills(['이번 주', '이번 달', '올해'], S.period, 'data-period')}${P.tiles}</div></section>
      <div class="fd-grid">
        <section class="fbox" id="gxNow">${gxNowHTML()}</section>
        <section class="fbox">${P.career}<div class="lbl" style="margin-top:var(--spacing-6)">마이 스킬 · ${esc(P.c.k)}</div><div class="bd">${P.skills}</div></section>
        <section class="fbox"><div class="lbl">학습 시간 분포 · 최근 26일</div><div class="bd">${P.hist}</div></section>
        <section class="fbox span2"><div class="lbl">학습 중인 강의</div><div class="bd minis2">${P.learning}</div></section>
        <section class="fbox"><div class="lbl">관심 목록 · ${S.saved.size}</div><div class="bd">${P.saved}</div><div class="bd">${P.alarm}</div></section>
      </div><div class="logout-row">${logoutBtn}</div></div>`;
  } else {
    el.innerHTML = `<div class="dh dh-prof">${P.prof}${desk ? dashCtl() : `<span class="dh-r"><a href="#myclass">편집 ${I.pencil}</a></span>`}</div>
      <div class="lv" id="gxLv">${levelHTML()}</div>
      ${nudgeHTML()}
      <section class="ds" id="gxNow">${gxNowHTML()}</section>
      <section class="ds">${P.career}</section>
      <section class="ds"><div class="lbl">학습 현황</div><div class="bd">${pills(['이번 주', '이번 달', '올해'], S.period, 'data-period')}${P.tiles}</div></section>
      <section class="ds">${P.alarm}</section>
      <section class="ds m-hide"><div class="lbl">학습 시간 분포 · 최근 26일</div><div class="bd">${P.hist}</div></section>
      ${fold('skill', `마이 스킬 · ${esc(P.c.k)}`, P.skills, 'm-hide')}
      ${fold('learning', '학습 중인 강의', P.learning, 'm-hide')}
      ${fold('saved', `관심 목록 · ${S.saved.size}`, P.saved, 'm-hide')}
      <div class="logout-row">${logoutBtn}</div>`;
  }
  const sw = document.getElementById('sw'); if (sw) sw.onclick = () => { S.alarm = !S.alarm; renderDash(); };
  el.querySelectorAll('[data-period]').forEach(b => b.onclick = () => { S.period = b.dataset.period; renderDash(); });
  el.querySelectorAll('[data-dmode]').forEach(b => b.onclick = () => setDash(b.dataset.dmode));
  nudgeRun();
  el.querySelectorAll('[data-logout]').forEach(b => b.onclick = () => { S.auth = false; S.panel = 'dash'; S.nudged = false; S.careers = []; S.fresh = false; toast('로그아웃했어요'); go('guest'); });
  el.querySelectorAll('[data-fold]').forEach(b => b.onclick = () => { S.open[b.dataset.fold] = !S.open[b.dataset.fold]; renderDash(); });
}
const saveDash = () => { try { localStorage.setItem('hu-v3-dash', S.dash); } catch (e) {} };
let dashT;
const lpCur = () => S.auth && S.dash !== 'closed' && S.panel === 'dash';   // 왼쪽 메뉴 프로필 = 마이 대시보드 메뉴(열려 있으면 선택 표시)
function setDash(mode) {
  if (mode === 'full' && S.panel !== 'dash') { S.panel = 'dash'; syncLnbPanel(); }
  S.dash = mode; saveDash(); renderDash(); syncLnbPanel();
}
let wasWide = wide();
addEventListener('resize', () => { if (wide() !== wasWide) { wasWide = wide(); if (!document.body.classList.contains('bare')) renderDash(); } });

/* ---------- 스킬 갤럭시(iframe) — skill-galaxy-v2/index.html#me 를 그대로 넣고, 갤럭시 패널의 변화를 대시보드로 받아 온다 ---------- */
const GX_SRC = '../../skill-galaxy-v2/index.html#me', GX_SKEY = 'skill-galaxy-settings-v1';
const GX = { cur: null, me: null };
try { Object.assign(GX, JSON.parse(localStorage.getItem('hu-v3-gx') || '{}')); } catch (e) {}
let gxMode = null;
function gxPreset(member) {   // 갤럭시는 자기 설정(localStorage)을 읽고 시작한다 → 열기 전에 로그인 여부·목표를 맞춰 둔다
  let v = {}; try { v = JSON.parse(localStorage.getItem(GX_SKEY) || 'null') || {}; } catch (e) {}
  v.auth = member;
  if (member) { if (!v.goal) v.goal = 'c3'; if (!Array.isArray(v.owned) || !v.owned.length) v.owned = S.fresh ? [] : ['s23', 's20', 's22']; if (!v.avatar || v.avatar === 'default') v.avatar = 'photo'; }
  else { v.goal = null; v.owned = []; }
  try { localStorage.setItem(GX_SKEY, JSON.stringify(v)); } catch (e) {}
}
function mountGalaxy(show) {
  const box = document.getElementById('gx');
  box.hidden = !show;
  if (!show) { if (GXV.fs || GXV.tall) { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); if (GXV.tall) document.getElementById('gxF').style.height = gxPrevH; GXV.fs = GXV.tall = false; gxSync(); } return; }
  const mode = S.auth ? 'member' : 'guest';
  if (gxMode === mode && box.querySelector('iframe')) return;   // 같은 상태면 다시 불러오지 않는다(탐색 위치 유지)
  gxMode = mode; gxPreset(S.auth);
  document.getElementById('gxF').style.height = S.auth ? '' : GX_MIN + 'px';   // 로그인 전 = 배너로 시작, 로그인 후 = 펼친 갤럭시로 시작
  { const fr = document.getElementById('gxF'), old = fr.querySelector('iframe'); if (old) old.remove(); fr.insertAdjacentHTML('afterbegin', `<iframe src="${GX_SRC}" title="스킬 갤럭시"></iframe>`); }
  gxAdI = 0; gxAdDraw();
  const f = box.querySelector('iframe');
  f.addEventListener('load', () => gxBridge(f));
}
/* 갤럭시 크기: 기본은 화면 절반 높이 → 손잡이로 끌어 조절 · 크게 보기 · 전체 화면(Esc로 닫기) */
const GXV = { tall: false, fs: false };
/* 높이가 400px 아래로 내려가면(손잡이로 줄이면) 갤럭시는 배너로 바뀐다 — 최소 300px */
const GX_MIN = 300, GX_AD = 400;
function gxSync() {
  const box = document.getElementById('gx');
  box.classList.toggle('tall', GXV.tall); box.classList.toggle('fs', GXV.fs); document.body.classList.toggle('gx-big', GXV.tall || GXV.fs);
  const mini = box.classList.contains('gx-mini'), bt = box.querySelector('[data-gx="tall"]'), bf = box.querySelector('[data-gx="fs"]');
  bt.innerHTML = GXV.tall ? `${I.shrink}작게 보기` : `${I.expand}크게 보기`; bt.hidden = GXV.fs || mini;
  bf.innerHTML = GXV.fs ? `${I.close}전체 화면 닫기` : `${I.galaxy}전체 화면`;
}
let gxPrevH = '';
function gxFit() {   // 크게 보기: 콘텐츠 영역(main)의 아래 끝까지 정확히 — 여백이 줄어드는 애니메이션이 끝난 뒤의 위치로 계산
  if (!GXV.tall) return;
  const box = document.getElementById('gx'), fr = document.getElementById('gxF'), bar = box.querySelector('.gx-bar');
  const padTop = 12, barH = bar.offsetHeight + parseFloat(getComputedStyle(bar).marginBottom || 0);
  fr.style.height = Math.max(GX_MIN, mainEl.clientHeight - padTop - barH - 50) + 'px';   // 아래 50px 여유 — 갤럭시 밖을 잡고 페이지를 스크롤할 수 있게
}
addEventListener('resize', () => { if (GXV.tall) gxFit(); });
function gxOpen(node) {   // 배너에서 펼치기 — 고른 갤럭시(노드)가 있으면 그곳을 가운데로
  const fr = document.getElementById('gxF'); fr.style.height = ''; gxSync();
  if (node && node !== 'me') { const f = fr.querySelector('iframe'); try { setTimeout(() => { f.contentWindow.location.hash = node; }, 380); } catch (e) {} }
}
let gxAdI = 0, gxAdT;
function gxAdSlides() {   // 로그인 전에는 갤럭시 첫 화면(히어로)과 같은 문구 한 장
  if (!S.auth) return [{ eb: '스킬이 쌓이는 방식', t: '배운 만큼 성장이 눈에 보이는 새로운 경험을 만듭니다.', d: '목표를 정하고, 경로를 따라 학습하고, 실습으로 확인합니다. 확인된 스킬은 나의 스킬 기록에 쌓여 성장의 진척을 보여줍니다.', cta: '로그인하고 시작하기', login: true }];
  const m = GX.me;
  return [{ eb: '내 스킬 갤럭시', t: m && m.goal && m.goal !== '-' ? `${m.goal}까지 스킬 ${m.to}` : '나만의 스킬 갤럭시가 준비됐어요', d: m ? `가진 스킬 ${m.own} · 다음에 채울 스킬을 갤럭시에서 찾아보세요` : '목표 커리어를 정하면 필요한 스킬이 이어져요', cta: '내 갤럭시 펼치기', node: 'me' },
    { eb: '이번 주 주목할 갤럭시', t: '프롬프트 엔지니어링', d: '이번 주 학습자가 가장 많이 늘어난 스킬이에요. 이어진 콘텐츠와 커리어를 따라가 보세요', cta: '이 갤럭시 보기', node: 's20' },
    { eb: '함께 보면 좋은 갤럭시', t: '데이터 시각화', d: '숫자로 말하는 콘텐츠부터 데이터 저널리스트까지, 연결된 길을 확인해 보세요', cta: '이 갤럭시 보기', node: 's21' }];
}
let gaN = 0;
function gxGuestArt() {   // 같은 그림이 한 화면에 두 번 들어가도(숨은 배너 + 로그인) 그라데이션 id가 겹치지 않게 고유 id
  const u = 'ga' + (++gaN) + '-';   // 로그인 전 배너 그림: 프로필 자리 없이 스킬·콘텐츠·커리어 허브와 주변 노드가 서로 이어진 관계도
  const H = { skill: [118, 150, 22], content: [252, 60, 20], career: [338, 166, 20] };
  const sats = { skill: [[56, 118], [70, 196], [150, 212], [96, 92]], content: [[196, 28], [306, 24], [208, 102], [318, 92]], career: [[392, 128], [404, 206], [292, 214], [370, 104]] };
  const links = [['skill', 'content'], ['content', 'career'], ['career', 'skill']];
  const cx = (H.skill[0] + H.content[0] + H.career[0]) / 3, cy = (H.skill[1] + H.content[1] + H.career[1]) / 3;
  const grad = (a, b) => `<linearGradient id="${u}gl-${a}-${b}" gradientUnits="userSpaceOnUse" x1="${H[a][0]}" y1="${H[a][1]}" x2="${H[b][0]}" y2="${H[b][1]}"><stop offset="0" stop-color="${DOMC[a]}"/><stop offset="1" stop-color="${DOMC[b]}"/></linearGradient>`;
  const path = (a, b) => `M${H[a][0]} ${H[a][1]}L${H[b][0]} ${H[b][1]}`;
  return `<svg class="ad-art" viewBox="0 0 440 240" aria-hidden="true"><defs>${links.map(([a, b]) => grad(a, b)).join('')}
    ${Object.keys(H).map(k => `<radialGradient id="${u}gh-${k}"><stop offset="0" stop-color="${DOMC[k]}" stop-opacity=".6"/><stop offset="1" stop-color="${DOMC[k]}" stop-opacity="0"/></radialGradient>`).join('')}
    <radialGradient id="${u}core"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="#C9D3FF" stop-opacity=".35"/><stop offset="1" stop-color="#7C93FF" stop-opacity="0"/></radialGradient>
    <filter id="${u}blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter></defs>
    <g fill="none" stroke="#fff" stroke-opacity=".08"><ellipse cx="${cx}" cy="${cy}" rx="190" ry="104"/><ellipse cx="${cx}" cy="${cy}" rx="128" ry="70" stroke-dasharray="2 6"/></g>
    ${Object.keys(H).map(k => `<circle cx="${H[k][0]}" cy="${H[k][1]}" r="${H[k][2] * 3}" fill="url(#${u}gh-${k})"/>`).join('')}
    <circle cx="${cx}" cy="${cy}" r="34" fill="url(#${u}core)"/>
    ${Object.keys(H).map(k => `<path d="M${cx} ${cy}L${H[k][0]} ${H[k][1]}" stroke="${DOMC[k]}" stroke-opacity=".35" stroke-dasharray="2 4"/>`).join('')}
    ${links.map(([a, b]) => `<path d="${path(a, b)}" stroke="url(#${u}gl-${a}-${b})" stroke-width="5" stroke-opacity=".25" filter="url(#${u}blur)"/><path d="${path(a, b)}" stroke="url(#${u}gl-${a}-${b})" stroke-width="1.6" stroke-opacity=".9"/>`).join('')}
    ${Object.keys(sats).map(k => sats[k].map(([x, y]) => `<path d="M${H[k][0]} ${H[k][1]}L${x} ${y}" stroke="#fff" stroke-opacity=".16"/>`).join('')).join('')}
    <path d="M${sats.skill[3].join(' ')}L${sats.content[2].join(' ')}M${sats.content[3].join(' ')}L${sats.career[3].join(' ')}M${sats.career[2].join(' ')}L${sats.skill[2].join(' ')}" stroke="#fff" stroke-opacity=".08"/>
    ${Object.keys(sats).map(k => sats[k].map(([x, y], i) => `<g opacity="${i % 2 ? .6 : .9}">${symShape(k, x, y, 7, DOMC[k])}</g>`).join('')).join('')}
    ${links.map(([a, b], i) => `<circle r="2.4" fill="#fff" opacity="0"><animateMotion dur="${2.6 + i * .4}s" begin="${i * .6}s" repeatCount="indefinite" path="${path(a, b)}"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur="${2.6 + i * .4}s" begin="${i * .6}s" repeatCount="indefinite"/></circle>`).join('')}
    ${Object.keys(H).map(k => `<circle cx="${H[k][0]}" cy="${H[k][1]}" r="${H[k][2] + 6}" fill="none" stroke="${DOMC[k]}" stroke-opacity=".45"/>${symShape(k, H[k][0], H[k][1], H[k][2], DOMC[k])}`).join('')}
    <circle cx="${cx}" cy="${cy}" r="3" fill="#fff"/></svg>`;
}
function gxAdArt() {
  if (!S.auth) return gxGuestArt();
  const u = 'ad' + (++gaN) + '-';   // 배너 오른쪽: 갤럭시 첫 화면처럼 가운데 '나' + 스킬·콘텐츠·커리어 노드가 궤도 위에
  const N = [['skill', 120, 52], ['content', 300, 44], ['career', 318, 150], ['skill', 96, 156], ['content', 210, 196]];
  return `<svg class="ad-art" viewBox="0 0 420 240" aria-hidden="true"><defs><clipPath id="${u}c"><circle cx="210" cy="112" r="34"/></clipPath>
    <radialGradient id="${u}h"><stop offset="0" stop-color="#7C93FF" stop-opacity=".5"/><stop offset="1" stop-color="#7C93FF" stop-opacity="0"/></radialGradient></defs>
    <circle cx="210" cy="112" r="120" fill="url(#${u}h)"/><g fill="none" stroke="#fff" stroke-opacity=".12"><ellipse cx="210" cy="112" rx="150" ry="92"/><ellipse cx="210" cy="112" rx="100" ry="62" stroke-dasharray="2 5"/></g>
    ${N.map(([, x, y]) => `<path d="M210 112L${x} ${y}" stroke="#fff" stroke-opacity=".22"/>`).join('')}
    ${N.map(([k, x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="${DOMC[k]}" fill-opacity=".14"/>${symShape(k, x, y, 12, DOMC[k])}`).join('')}
    <circle cx="210" cy="112" r="42" fill="#fff" fill-opacity=".08"/><circle cx="210" cy="112" r="36" fill="#1B2034" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>
    <image href="${S.auth ? AV : AV_DEF}" x="176" y="78" width="68" height="68" clip-path="url(#${u}c)" preserveAspectRatio="xMidYMid slice"/></svg>`;
}
function gxAdDraw() {
  const el = document.getElementById('gxAd'); if (!el) return;
  const L = gxAdSlides(), x = L[gxAdI % L.length];
  el.innerHTML = `<div class="ad-in"><span class="ad-eb">${esc(x.eb)}</span><b class="ad-t">${esc(x.t)}</b><p class="ad-d">${esc(x.d)}</p>
    <div class="ad-row"><button class="ad-cta ${x.login ? 'text' : ''}" data-gxopen="${x.node || ''}" ${x.login ? 'data-login' : ''}>${esc(x.cta)} ${I.right}</button>${L.length > 1 ? `<span class="ad-dots">${L.map((_, i) => `<i class="${i === gxAdI % L.length ? 'on' : ''}" data-gxad="${i}"></i>`).join('')}</span>` : ''}</div></div>${gxAdArt()}`;
  el.querySelector('.ad-cta').onclick = e => { e.stopPropagation(); if (e.currentTarget.hasAttribute('data-login')) go('login'); else gxOpen(e.currentTarget.dataset.gxopen); };
  el.querySelectorAll('[data-gxad]').forEach(d => d.onclick = e => { e.stopPropagation(); gxAdI = +d.dataset.gxad; gxAdDraw(); gxAdRun(); });
}
function gxAdRun() { clearInterval(gxAdT); if (document.getElementById('gx').classList.contains('gx-mini') && gxAdSlides().length > 1) gxAdT = setInterval(() => { if (!document.getElementById('gxAd').matches(':hover')) { gxAdI++; gxAdDraw(); } }, 5000); }
(function gxControls() {
  const box = document.getElementById('gx'), fr = document.getElementById('gxF'), grip = document.getElementById('gxGrip');
  const setFs = on => { GXV.fs = on; if (on && box.requestFullscreen && !document.fullscreenElement) box.requestFullscreen().catch(() => {}); if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {}); gxSync(); };
  box.querySelectorAll('[data-gx]').forEach(b => b.onclick = () => {
    const k = b.dataset.gx;
    if (k === 'fs') return setFs(!GXV.fs);
    if (!GXV.tall) { gxPrevH = fr.style.height; GXV.tall = true; mainEl.scrollTop = 0; gxSync(); gxFit(); }
    else { GXV.tall = false; fr.style.height = gxPrevH; gxSync(); }   // 크게 보기 = 위쪽 바 아래를 브라우저 가로·세로 전체로
  });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && GXV.fs) { GXV.fs = false; gxSync(); } });
  document.getElementById('gxAd').onclick = () => gxOpen();
  addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (GXV.fs) setFs(false); else if (GXV.tall) { GXV.tall = false; fr.style.height = gxPrevH; gxSync(); } });
  let rz; const nudge = () => { clearTimeout(rz); rz = setTimeout(() => { const f = fr.querySelector('iframe'); try { f.contentWindow.dispatchEvent(new Event('resize')); } catch (e) {} }, 140); };   // 크기가 바뀐 뒤 갤럭시가 다시 재도록(별 배경·지도 깨짐 방지)
  new ResizeObserver(() => { nudge(); const mini = !GXV.fs && !GXV.tall && fr.getBoundingClientRect().height < GX_AD; if (mini !== box.classList.contains('gx-mini')) { box.classList.toggle('gx-mini', mini); if (mini) gxAdDraw(); try { fr.querySelector('iframe').contentDocument.documentElement.classList.toggle('hu-mini', mini); } catch (e) {} gxSync(); gxAdRun(); } }).observe(fr);
  let sy = null, sh = 0;
  grip.addEventListener('pointerdown', e => { sy = e.clientY; sh = fr.getBoundingClientRect().height; grip.setPointerCapture(e.pointerId); box.classList.add('dragging'); });
  grip.addEventListener('pointermove', e => { if (sy === null) return; const h = Math.max(GX_MIN, Math.min(innerHeight - 140, sh + e.clientY - sy)); fr.style.height = h + 'px'; });
  const end = () => { if (sy === null) return; sy = null; box.classList.remove('dragging'); gxSync(); };
  grip.addEventListener('pointerup', end); grip.addEventListener('pointercancel', end);
  gxSync();
})();
function gxBridge(f) {
  let d; try { d = f.contentDocument; } catch (e) { return; }
  if (!d || !d.getElementById('ptop')) return;
  const st = d.createElement('style');   // HU 틀 안에서는 겹치는 것(갤럭시 로고·검색·달라진 점·로그인·내 프로필 카드)을 숨긴다 — 프로필은 대시보드로 옮김
  st.textContent = '.top,#meCard{display:none!important}.app{grid-template-rows:auto minmax(0,1fr)!important}html.hu-guest .app,html.hu-mini .app{grid-template-rows:minmax(0,1fr)!important}'   // 머리 줄을 빼면 격자 행이 밀려 지도 아래가 비던 문제 → 행을 다시 지정
    + ''   // 갤럭시 머리 줄(로고·검색·탐색 기록·목표 프로필)은 HU 틀에서 뺀다
    + '.p-top{padding:12px 16px!important}.p-head{gap:10px;align-items:center}.p-ico{width:34px;height:34px;border-radius:10px}.p-ico svg{width:18px;height:18px}.p-name h2{font-size:16px}.p-name .sub{font-size:12px;margin-top:1px}'
    + '.stats{display:flex!important;gap:6px;margin:10px 0!important}.stat{flex:1;display:flex;align-items:baseline;justify-content:space-between;gap:6px;padding:7px 10px;border-radius:9px}.stat dd{margin:0!important;font-size:14px}.cta{height:36px;font-size:13px;border-radius:9px}.tabs{padding:10px 16px 0!important}'   // 오른쪽 패널 윗부분을 낮게
    + 'html.hu-mini .top,html.hu-mini .trailbar,html.hu-mini #panel,html.hu-mini .legend,html.hu-mini .hint,html.hu-mini .viewseg,html.hu-mini .tidybtn,html.hu-mini .gauge,html.hu-mini .nudge,html.hu-mini .resume,html.hu-mini .hero,html.hu-mini .tiltbadge{display:none!important}';   // 배너 모드에서는 별 지도만 남긴다
  st.textContent += 'html.hu-guest .scene,html.hu-guest #sEdges,html.hu-guest .legend,html.hu-guest .picker,html.hu-guest .uilayer,html.hu-guest .gauge,html.hu-guest .tiltbadge,html.hu-guest .lens,html.hu-guest .tip,html.hu-guest .trailbar{display:none!important}'
    + 'html.hu-guest .app.guest .hero{top:50%!important;transform:translate(-50%,-50%)!important;text-align:center;animation:none!important}html.hu-guest .hero-h{font-size:clamp(22px,2.4vw,30px)!important}html.hu-guest .hero-cta{background:none!important;color:#fff!important;height:auto!important;padding:6px 2px!important;border-radius:0!important;text-decoration:underline;text-underline-offset:6px;text-decoration-color:rgba(255,255,255,.45)}html.hu-guest .hero-cta::after{content:" →"}html.hu-guest .hero-cta:hover{text-decoration-color:#fff}';   // 로그인 전: 흐르는 우주 배경 + 가운데 안내 문구·흰 버튼만
  d.documentElement.classList.toggle('hu-guest', !S.auth);
  [60, 400].forEach(t => setTimeout(() => { try { f.contentWindow.dispatchEvent(new Event('resize')); } catch (e) {} }, t));   // 머리 줄을 숨긴 뒤 별 배경을 칸 높이에 맞춰 다시 그리게
  d.documentElement.classList.toggle('hu-mini', document.getElementById('gx').classList.contains('gx-mini'));
  d.head.appendChild(st);
  // 로그인은 HU 흐름(#login → 온보딩)으로 보낸다
  d.addEventListener('click', e => { if (e.target.closest('#heroGo,#loginBtn')) { e.preventDefault(); e.stopImmediatePropagation(); go('login'); } }, true);
  const lg = d.getElementById('login');
  if (lg) new MutationObserver(() => { if (!lg.hidden) { lg.hidden = true; go('login'); } }).observe(lg, { attributes: true, attributeFilter: ['hidden'] });
  const read = () => {
    const pt = d.getElementById('ptop'), mc = d.getElementById('meCard'), h2 = pt && pt.querySelector('h2');
    const stats = pt ? [...pt.querySelectorAll('.stat')].map(s => [(s.querySelector('dt') || {}).textContent || '', (s.querySelector('dd') || {}).textContent || '']) : [];
    const lab = stats.map(s => s[0]).join(' ');
    const dom = /커리어 보유자/.test(lab) ? 'career' : /스킬 보유자/.test(lab) ? 'skill' : /연관 커리어/.test(lab) ? 'content' : 'me';
    const items = [...d.querySelectorAll('#list .item')].slice(0, 4).map(it => ({ id: it.dataset.id, name: ((it.querySelector('.nm') || {}).textContent || '').trim() }));
    if (h2) GX.cur = { name: h2.textContent.trim(), sub: ((pt.querySelector('.sub') || {}).textContent || '').trim(), stats, dom, list: items, note: ((d.getElementById('listNote') || {}).textContent || '').trim() };
    const dd = mc ? [...mc.querySelectorAll('.mc-info dd')].map(x => x.textContent.trim()) : [];
    if (S.auth && dd.length === 3) { const bar = mc.querySelector('.mc-bar i'); GX.me = { goal: dd[0], own: dd[1], to: dd[2], need: dd[2] !== '0/0', pct: bar ? parseInt(bar.style.width, 10) || 0 : 0 }; }
    try { localStorage.setItem('hu-v3-gx', JSON.stringify({ cur: GX.cur, me: GX.me })); } catch (e) {}
    syncGxDash();
  };
  let t; const mo = new MutationObserver(() => { clearTimeout(t); t = setTimeout(read, 80); });
  GX.doc = d;
  ['ptop', 'meCard', 'list'].forEach(id => { const x = d.getElementById(id); if (x) mo.observe(x, { childList: true, subtree: true, characterData: true }); });
  read();
}
function hist(n, a, b, empty) {
  let sd = 11; const r = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
  const hs = Array.from({ length: n }, (_, i) => empty ? 6 : Math.round(20 + Math.sin(i / 3) * 18 + r() * 50));
  return `<div class="hist">${hs.map((h, i) => `<i class="${!empty && i >= a && i <= b ? 'in' : ''}" style="height:${h}%"></i>`).join('')}${empty ? '' : `<span class="rng" style="left:${a / n * 100}%;right:${100 - (b + 1) / n * 100}%"></span><span class="h" style="left:${a / n * 100}%"></span><span class="h" style="left:${(b + 1) / n * 100}%"></span>`}</div>`;
}

/* ---------- 오른쪽: 홈 ---------- */
function renderGuest() {
  const used = new Set();
  const trend = upto(courses('HLAP01419', 'HLSP88622', 'HLAP00417', 'HLSP76039'), 8, ['AI', 'ChatGPT', '생성형', '업무 자동화'], used);
  const free = freeList(courses('HLSP28153', 'HLAP00612', 'HLSP20337', 'HLAP08209'), 8, used);
  const skills = ['생성형 AI 업무 활용', '코칭', '데이터 시각화', '프로젝트 관리', '보고서 작성', '프롬프트 엔지니어링', '의사결정', '피드백'].map(skillOf).filter(Boolean);
  view.innerHTML = `${mh(`${TOTAL.toLocaleString()}개 콘텐츠로 시작하는 HU`, '배운 만큼 성장이 눈에 보이는 새로운 경험을 만듭니다.', '<a class="btn line" href="#skills">스킬 갤럭시 둘러보기</a><a class="btn ink" href="#login">로그인하고 맞춤 추천 받기</a>')}
    ${introSec()}
    <section class="sec">${secR('지금 뜨고 있는 콘텐츠', '이번 주 학습자가 가장 많이 늘어난 콘텐츠', 'contents')}${rail(trend.map(c => card(c)))}</section>
    <section class="sec">${secR('지금 시작하기 좋은 커리어', '', 'careers')}${rail(careersTo(['팀장', '데이터 분석가', '서비스 기획자', '퍼포먼스 마케터', 'HRD 담당자', 'UX 디자이너', 'AI 기획자', '프로젝트 매니저'], 8).map(c => careerCard(c)))}</section>
    <section class="sec">${secR('요즘 많이 보는 스킬', '', 'skills')}${rail(skills.map(k => skillCard(k)))}</section>
    <section class="sec">${secR('무료 콘텐츠', '로그인 없이 바로 볼 수 있어요', 'contents')}${rail(free.map(c => card(c)))}</section>
    <section class="sec">${secR('프리미엄 과정', '학위·자격 수준의 심화 과정', 'premium')}${rail(PREM.slice(0, 8).map(premCard))}</section>
    ${plusSec()}`;
  bindIntro(); railsSync();
}
function forMeSec(used) {   // 로그인하면 생기는 나만의 구역 — 마이커리어(없으면 기본 커리어)에 맞춘 강의 8개
  const c = careerOf(S.careers[0] || '서비스 기획자'); if (!c) return '';
  const list = match([c.k, ...c.pool.slice(0, 4)], 8, used); list.forEach(x => used.add(x.cd));
  return `<section class="sec forme"><div class="fm-box"><div class="sec-h"><div class="fm-h"><img class="fm-av" src="${AV}" alt="${NAME} 프로필"><div><h2>${NAME}님의 맞춤 커리어 <b>${esc(c.k)}</b>${josa(c.k, '으로', '로')} 추천드려요</h2><p>${c.pool.slice(0, 3).map(esc).join(' · ')} 스킬을 키우는 강의를 골랐어요</p></div></div>
    <div class="sec-r"><span class="rail-nav"><button data-rail="-1" aria-label="이전">${I.left}</button><button data-rail="1" aria-label="다음">${I.right}</button></span><a href="#careers/${encodeURIComponent(c.k)}">커리어 보기 ›</a></div></div>${rail(list.map(x => card(x)))}</div></section>`;
}
function renderHome() {
  const cs = S.careers.map(careerOf), main = cs[0], used = new Set();
  const forMe = forMeSec(used);
  const weekly = upto(courses('HLSP91107', 'HLAP21002', 'HLSP18120', 'HLSP78181').filter(c => !used.has(c.cd)), 8, ['리더십', '성과', '커뮤니케이션', '기획'], used);
  const lack = main ? [...new Set(cs.flatMap(c => c.pool.slice(0, 4)))].slice(0, 4) : [];
  const lackRec = main ? match(lack, 8, used) : []; lackRec.forEach(c => used.add(c.cd));
  const relRec = main ? match(cs.flatMap(c => c.pool.slice(4, 8)), 8, used) : []; relRec.forEach(c => used.add(c.cd));
  const carRec = main ? match([main.k, ...main.pool.slice(0, 3)], 8, used) : []; carRec.forEach(c => used.add(c.cd));
  const trend = upto(courses('HLAP01419', 'HLSP88622', 'HLAP00417', 'HLSP76039').filter(c => !used.has(c.cd)), 8, ['AI', 'ChatGPT', '생성형', '업무 자동화'], used);
  const free = freeList(courses('HLSP28153', 'HLAP00612', 'HLSP20337', 'HLAP08209'), 8, used);
  const crs = main ? careersTo(CAREERS.filter(c => !S.careers.includes(c.k) && c.tags.some(t => main.tags.includes(t))).map(c => c.k), 8, S.careers) : careersTo(['팀장', '데이터 분석가', '서비스 기획자', '퍼포먼스 마케터', 'HRD 담당자', 'UX 디자이너', 'AI 기획자', '프로젝트 매니저'], 8);
  view.innerHTML = `${mh(main ? `${NAME}님을 위한 추천` : `${NAME}님, 반가워요`, main ? `마이커리어 ${cs.map(c => esc(c.k)).join(', ')}에 맞춰 골랐어요` : '마이커리어를 고르면 추천이 나에게 맞춰져요', main ? '' : '<a class="btn ink" href="#mycareer">마이커리어 고르기</a>')}
    ${introSec()}
    ${forMe}
    <section class="sec">${secR('Weekly Top Pick', '이번 주 HU가 고른 콘텐츠', 'contents')}${rail(weekly.map(c => card(c)))}</section>
    ${main ? `<section class="sec">${secR('부족한 스킬 보완하기', lack.map(esc).join(' · '), 'skills')}${rail(lackRec.map(c => card(c)))}</section>
    <section class="sec">${secR('스킬 연관성 높은 콘텐츠', '마이커리어 스킬과 이어지는 콘텐츠', 'contents')}${rail(relRec.map(c => card(c)))}</section>
    <section class="sec">${secR(`${esc(main.k)} 인기 콘텐츠`, `${esc(main.k)}${josa(main.k, '을', '를')} 목표로 한 학습자가 많이 들은 콘텐츠`, 'contents')}${rail(carRec.map(c => card(c)))}</section>` : ''}
    <section class="sec">${secR('지금 뜨고 있는 콘텐츠', '', 'contents')}${rail(trend.map(c => card(c)))}</section>
    <section class="sec">${secR('지금 시작하기 좋은 커리어', '', 'careers')}${rail(crs.map(c => careerCard(c)))}</section>
    <section class="sec">${secR('무료 콘텐츠', '', 'contents')}${rail(free.map(c => card(c)))}</section>
    <section class="sec">${secR('프리미엄 과정', '학위·자격 수준의 심화 과정', 'premium')}${rail(PREM.slice(0, 8).map(premCard))}</section>
    ${plusSec()}`;
  bindIntro(); railsSync();
}
/* 위즈덤스프링 썸네일(직접 그린 일러스트) — 다른 HU+ AI 썸네일처럼 16:9 · 왼쪽 큰 제목 · 오른쪽 그림(펼친 책에서 돋아나는 새싹, 떠다니는 꽃잎, 옅은 물음표 = 오늘의 질문) */
function wisdomArt() {
  const petals = [[560, 92, 18, .9], [700, 70, -24, .75], [742, 168, 40, .6], [508, 150, -10, .5], [640, 40, 12, .55], [770, 250, -30, .45]];
  return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" role="img" aria-label="위즈덤스프링 인문학 구독"><defs>
    <linearGradient id="wsBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0E2621"/><stop offset=".55" stop-color="#173F34"/><stop offset="1" stop-color="#245A49"/></linearGradient>
    <radialGradient id="wsSun" cx="78%" cy="18%" r="60%"><stop offset="0" stop-color="#FBE3B4" stop-opacity=".55"/><stop offset=".45" stop-color="#F2C98A" stop-opacity=".16"/><stop offset="1" stop-color="#F2C98A" stop-opacity="0"/></radialGradient>
    <linearGradient id="wsPage" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBF4E6"/><stop offset="1" stop-color="#E6D6B8"/></linearGradient>
    <linearGradient id="wsLeaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B7E38D"/><stop offset="1" stop-color="#3F9E5A"/></linearGradient>
    <linearGradient id="wsStem" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#3F8A4F"/><stop offset="1" stop-color="#8FD07A"/></linearGradient>
    <filter id="wsSoft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter></defs>
    <rect width="800" height="450" fill="url(#wsBg)"/><rect width="800" height="450" fill="url(#wsSun)"/>
    <text x="640" y="250" text-anchor="middle" font-size="300" font-weight="800" fill="#FBE3B4" fill-opacity=".07" font-family="Pretendard Variable, Pretendard, sans-serif">?</text>
    <ellipse cx="628" cy="372" rx="190" ry="26" fill="#071612" fill-opacity=".55" filter="url(#wsSoft)"/>
    <path d="M628 352C582 332 528 328 470 338V250C528 240 582 244 628 266Z" fill="url(#wsPage)"/><path d="M628 352C674 332 728 328 786 338V250C728 240 674 244 628 266Z" fill="url(#wsPage)"/>
    <path d="M628 266V352" stroke="#C9B48E" stroke-width="2"/>
    ${[0, 1, 2, 3].map(i => `<path d="M${490 + i * 2} ${276 + i * 14}C${530} ${266 + i * 14} ${570} ${270 + i * 14} ${612} ${288 + i * 13}" fill="none" stroke="#C9B48E" stroke-opacity=".7" stroke-width="2"/><path d="M${644} ${288 + i * 13}C${684} ${270 + i * 14} ${728} ${266 + i * 14} ${768 - i * 2} ${276 + i * 14}" fill="none" stroke="#C9B48E" stroke-opacity=".7" stroke-width="2"/>`).join('')}
    <circle cx="628" cy="170" r="70" fill="#FBE3B4" fill-opacity=".18" filter="url(#wsSoft)"/>
    <path d="M628 266C626 226 630 196 640 168" fill="none" stroke="url(#wsStem)" stroke-width="7" stroke-linecap="round"/>
    <path d="M636 196C600 196 572 176 566 146C600 142 630 160 636 196Z" fill="url(#wsLeaf)"/><path d="M636 196C612 186 592 168 572 150" fill="none" stroke="#2F7A45" stroke-opacity=".5" stroke-width="2"/>
    <path d="M640 170C664 140 700 132 726 146C708 176 672 186 640 170Z" fill="url(#wsLeaf)"/><path d="M640 170C664 160 690 152 718 148" fill="none" stroke="#2F7A45" stroke-opacity=".5" stroke-width="2"/>
    <circle cx="641" cy="160" r="9" fill="#F7B6C8"/><circle cx="641" cy="160" r="4" fill="#FBE3B4"/>
    ${petals.map(([x, y, r, o]) => `<path d="M${x} ${y}c6-10 18-10 22 0c-4 10-16 12-22 0z" fill="#F7B6C8" fill-opacity="${o}" transform="rotate(${r} ${x + 11} ${y})"/>`).join('')}
    <g font-family="Pretendard Variable, Pretendard, sans-serif">
      <text x="56" y="118" font-size="22" font-weight="600" fill="#CFE8C9" letter-spacing="-.3">AI 시대, 질문하는 힘을 기르는</text>
      <text x="52" y="196" font-size="70" font-weight="800" fill="#FFFFFF" letter-spacing="-2">위즈덤스프링</text>
      <text x="54" y="270" font-size="58" font-weight="800" fill="#FBE3B4" letter-spacing="-1.5">인문학 구독</text>
      <rect x="56" y="306" width="262" height="48" rx="24" fill="#FBE3B4"/><text x="187" y="338" text-anchor="middle" font-size="22" font-weight="700" fill="#173F34">매주 하나의 인문학 주제</text>
    </g></svg>`;
}
const plusSec = () => `<section class="sec">${secH('HU+ 구독서비스', '휴넷의 구독 서비스를 HU에서 이어 볼 수 있어요')}<div class="cards">${[['휴넷CEO', 'HLAP00401', '성장의 인사이트, 비즈니스의 차이를 만듭니다', '경영자를 위한 오늘의 비즈니스 인사이트'], ['위즈덤스프링', '', '매주 하나의 인문학 주제로 생각하는 힘을', '영상·에세이와 오늘의 질문으로 이어 가는 인문학'], ['리더십저니', 'HLSP92371', '나를 성장시키는 가장 확실한 선택', '리더의 성장을 위한 맞춤형 솔루션']].map(([k, cd, a, b]) => `<article class="card plus"><div class="media">${cd ? thumb(course(cd)) : `<div class="th ok ws">${wisdomArt()}</div>`}</div><div class="cb"><div class="ct"><h3>${k}</h3><span class="hrt">${I.out}</span></div><p class="sub">${a}</p><div class="cf"><span class="mt">${b}</span></div></div></article>`).join('')}</div></section>
  <section class="sec"><div class="mh"><div><h1>HU 멤버십으로 모든 스킬을 무제한으로</h1><p>멤버십 전용 콘텐츠와 HU+ 구독 서비스를 함께 볼 수 있어요</p></div><div class="r"><a class="btn ink" href="javascript:void 0">멤버십 가입하기</a></div></div></section>`;

/* ---------- 오른쪽: 콘텐츠 목록 · 상세 ---------- */
function renderContents() {
  view.innerHTML = `${mh(`<b id="cntN"></b> 콘텐츠`, '', `<label class="tsearch" style="width:260px;background:var(--bg-surface)">${I.search}<input id="lq" placeholder="이 목록에서 검색" value="${esc(S.lq)}"></label>`)}
    <section class="sec list"><div class="bar-f">${pills(CATS, S.cat, 'data-cat')}<div class="pills"><button class="pill sm">${I.filter}필터</button><button class="pill sm">인기순 ${I.down}</button></div></div>
    <div id="clist"></div></section>`;
  view.querySelectorAll('[data-cat]').forEach(a => a.onclick = () => { S.cat = a.dataset.cat; S.shown = 24; renderContents(); });
  const lq = document.getElementById('lq'); lq.oninput = () => { S.lq = lq.value; S.shown = 24; listPart(); };
  listPart();
}
function listPart() {
  const q = S.lq.trim(), list = ALL.filter(c => (S.cat === '전체' || c.cat === S.cat) && (!q || c.name.includes(q))).sort((a, b) => a.h - b.h);
  document.getElementById('cntN').textContent = `${list.length.toLocaleString()}개`;
  document.getElementById('clist').innerHTML = list.length ? `<div class="cards">${list.slice(0, S.shown).map(x => card(course(x.cd))).join('')}</div>${list.length > S.shown ? `<div class="more"><button class="btn line" id="more">더 보기 (${S.shown}/${list.length.toLocaleString()})</button></div>` : ''}` : `<div class="nores">‘${esc(q)}’에 맞는 콘텐츠가 없어요.</div>`;
  const m = document.getElementById('more'); if (m) m.onclick = () => { S.shown += 24; listPart(); };
}
function renderContent(cd) {
  const c = course(cd); if (!c) return go('contents');
  const f = info(cd), h = META.get(cd).h, rel = match([c.cat3, ...f.sks], 3, new Set([cd]));
  const chapters = [['오리엔테이션', 1], ['핵심 개념 이해하기', Math.max(2, Math.round(f.chap * .35))], ['현업 사례로 적용하기', Math.max(2, Math.round(f.chap * .4))], ['정리와 실천 계획', 1]];
  view.innerHTML = `<a class="back" href="#contents">${I.left}콘텐츠 목록</a>
    <section class="dt">${thumb(c)}<div>
      <div class="chips"><span class="chip dom d-content">${domIco('content', 16)}콘텐츠</span><span class="chip">${esc(f.cat)}</span><span class="chip">${esc(c.cat3)}</span></div>
      <h1>${esc(c.title)}</h1>
      <p class="desc">${esc(c.cat2)} 분야에서 바로 쓰는 ${esc(c.cat3)} 역량을 ${f.chap}차시로 정리한 과정이에요.</p>
      <div class="kv"><div>차시<b>${f.chap}차시</b></div><div>학습 시간<b>약 ${f.hours}시간</b></div><div>평점<b>★ ${f.rate}</b></div><div>학습자<b>${f.users.toLocaleString()}명</b></div></div>
      <div class="price">${f.pr.t === 'free' ? '무료' : f.pr.t === 'mem' ? '멤버십 전용' : `${won(f.pr.now)}<s>${won(f.pr.was)}</s><em>${f.pr.off}%</em>`}</div>
      <div class="act"><button class="btn line" data-save="${cd}">${I.heart}</button><button class="btn line">${I.share}</button><button class="btn ink" id="apply">${S.auth ? '수강 신청하기' : '로그인하고 신청하기'}</button></div></div></section>
    <section class="box"><h2>이 과정으로 얻는 스킬</h2><div class="chips">${f.sks.map(k => `<a class="pill sm" href="#skills/${encodeURIComponent(k)}">${esc(k)} · +${f.pt}pt</a>`).join('')}</div></section>
    <section class="box"><h2>과정 소개</h2><p class="txt">「${esc(c.title)}」은(는) ${esc(c.cat3)} 영역에서 자주 부딪히는 문제를 단계별로 풀어 보는 과정이에요. 개념을 짧게 익히고, 실제 업무 장면에 대입해 보는 실습으로 이어져요.</p></section>
    <section class="box"><h2>이런 분들이 함께 학습해요</h2><div class="hb">${[[S.careers[0] || '팀장', 34], ['HRD 담당자', 21], ['서비스 기획자', 14], ['기타', 31]].map(([k, v], i) => `<div><span>${esc(k)}</span><span class="prog" style="height:8px"><i style="width:${v * 2}%;${i ? 'background:var(--bg-subtle)' : ''}"></i></span><b>${v}%</b></div>`).join('')}</div></section>
    <section class="box"><h2>커리큘럼 <small>${f.chap}차시</small></h2><div class="cur">${chapters.map(([t, n], i) => `<details ${i < 2 ? 'open' : ''}><summary>${i + 1}장. ${t}<span>${n}차시</span></summary><ul>${Array.from({ length: Math.min(n, 3) }, (_, j) => `<li>${i + 1}-${j + 1}. ${t} ${j ? `실습 ${j}` : '들어가기'}<span>${8 + (h + j) % 14}:00</span></li>`).join('')}</ul></details>`).join('')}</div></section>
    <section class="box"><h2>강사 정보</h2><div class="prof" style="margin-top:0"><span class="av">${esc(c.cp)[0]}</span><div><b>${esc(c.cp)} 전문 강사진</b><small>${esc(c.cat2)} 분야 현업 경력 10년 이상</small></div></div></section>
    <section class="box"><h2>리뷰 <small>★ ${f.rate} · ${h % 40 + 12}개</small></h2>${[['박○○', '실무에 바로 쓸 수 있는 내용이라 좋았어요.'], ['이○○', '사례가 많아 이해가 쉬웠어요.'], ['최○○', '차시가 짧아서 출퇴근길에 듣기 좋았어요.']].map(([n, t], i) => `<div class="rv"><div class="h"><b>${n}</b><span class="st">★★★★${i === 2 ? '☆' : '★'}</span><span>2026.11.${20 - i * 3}</span></div><p>${t}</p></div>`).join('')}</section>
    <section class="sec">${secH('이런 콘텐츠는 어때요?', '같은 스킬을 키우는 콘텐츠', 'contents')}<div class="cards">${rel.map(x => card(x)).join('')}</div></section>`;
  document.getElementById('apply').onclick = () => S.auth ? toast('수강 신청 화면으로 이어져요 (시안)') : go('login');
}

/* ---------- 오른쪽: 스킬 · 커리어 ---------- */
function renderSkills(sel) {
  const doms = ['전체', ...new Set(SKILLS.map(s => s.fam))], s = sel && skillOf(sel);
  if (s) {
    const cs = skillContents(s.k, 6), crs = CAREERS.filter(c => c.pool.includes(s.k));
    view.innerHTML = `<a class="back" href="#skills">${I.left}스킬 목록</a>
      <section class="dt"><div class="big-ic">${FI(s.g, 96)}<span>${esc(s.fam)} 스킬</span></div><div>
        <div class="chips"><span class="chip dom d-skill">${domIco('skill', 16)}스킬</span><span class="chip">${esc(s.fam)}</span></div><h1>${esc(s.k)}</h1>
        <p class="desc">${esc(s.k)}${josa(s.k, '은', '는')} ${esc(s.fam)} 영역의 스킬이에요. 업무에서 쓰면 판단이 빨라지고, 팀과 결과를 맞추기 쉬워져요.</p>
        <div class="kv"><div>평균 포인트<b>${hash(s.k) % 600 + 400}pt</b></div><div>콘텐츠<b>${countFor(s.k).toLocaleString()}개</b></div><div>쓰는 커리어<b>${crs.length}개</b></div><div>내 상태<b>${S.liked.has(s.k) ? '관심 스킬' : '-'}</b></div></div>
        <div class="act"><button class="btn ink" data-save="s:${esc(s.k)}">${S.liked.has(s.k) ? '관심 스킬에서 빼기' : '관심 스킬로 담기'}</button></div></div></section>
      ${crs.length ? `<section class="box"><h2>이 스킬을 쓰는 커리어</h2><div class="chips">${crs.map(c => `<a class="pill sm" href="#careers/${encodeURIComponent(c.k)}">${esc(c.k)}</a>`).join('')}</div></section>` : ''}
      <section class="sec">${secH('이 스킬을 학습할 수 있는 콘텐츠', '', `search/${encodeURIComponent(s.k)}`)}<div class="cards">${cs.map(c => card(c, { right: `<span class="pr">+${info(c.cd).pt}<small>pt</small></span>` })).join('')}</div></section>`;
    return;
  }
  const list = SKILLS.filter(x => S.skDom === '전체' || x.fam === S.skDom).sort((a, b) => countFor(b.k) - countFor(a.k));
  view.innerHTML = `${mh(`${list.length}개 스킬`, '스킬을 누르면 배울 수 있는 콘텐츠와 이 스킬을 쓰는 커리어를 보여 드려요', `<button class="btn line">${I.galaxy}갤럭시맵 열기</button>`)}
    <section class="sec list"><div class="bar-f">${pills(doms, S.skDom, 'data-dom')}</div>
    <div class="cards icons">${list.map(x => skillCard(x)).join('')}</div></section>`;
  view.querySelectorAll('[data-dom]').forEach(a => a.onclick = () => { S.skDom = a.dataset.dom; renderSkills(); });
}
function renderCareers(sel) {
  const c = sel && careerOf(sel);
  if (c) {
    const cs = match([c.k, ...c.pool.slice(0, 4)], 6), mine = S.careers.includes(c.k);
    view.innerHTML = `<a class="back" href="#careers">${I.left}커리어 목록</a>
      <section class="dt"><div class="big-ic">${CI(c.tags[0], 96)}<span>${esc(c.fam)} 커리어</span></div><div>
        <div class="chips"><span class="chip dom d-career">${domIco('career', 16)}커리어</span><span class="chip">${esc(c.fam)}</span></div><h1>${esc(c.k)}</h1>
        <p class="desc">${c.pool.slice(0, 3).map(esc).join(', ')} 같은 스킬로 ${esc(c.fam)} 업무를 이끄는 커리어예요.</p>
        <div class="kv"><div>필요 스킬<b>${c.pool.length}개</b></div><div>보유자<b>${(hash(c.k) % 5000 + 800).toLocaleString()}명</b></div><div>콘텐츠<b>${(countFor(c.pool[0]) + countFor(c.pool[1])).toLocaleString()}개</b></div><div>직무군<b>${esc(c.fam)}</b></div></div>
        <div class="act"><button class="btn ${mine ? 'line' : 'ink'}" id="myc">${mine ? '마이커리어에 담겨 있어요' : '마이커리어로 담기'}</button></div></div></section>
      <section class="box"><h2>필요 스킬</h2><div class="chips">${c.pool.map(k => `<a class="pill sm" href="#skills/${encodeURIComponent(k)}">${esc(k)}</a>`).join('')}</div></section>
      <section class="sec">${secH('이 커리어에서 많이 학습하는 콘텐츠', '', 'contents')}<div class="cards">${cs.map(x => card(x)).join('')}</div></section>`;
    document.getElementById('myc').onclick = () => { if (!S.auth) return go('login'); if (!mine && S.careers.length < 3) { S.careers.push(c.k); toast(`${c.k}${josa(c.k, '을', '를')} 마이커리어에 담았어요`); } renderAll(); };
    return;
  }
  const list = CAREERS.filter(x => S.fam === '전체' || x.fam === S.fam);
  view.innerHTML = `${mh(`${list.length}개 커리어`, '커리어를 누르면 필요한 스킬과 많이 학습하는 콘텐츠를 보여 드려요')}
    <section class="sec list"><div class="bar-f">${pills(['전체', ...FAMS], S.fam, 'data-fam')}</div>
    <div class="cards icons">${list.map(x => careerCard(x)).join('')}</div></section>`;
  view.querySelectorAll('[data-fam]').forEach(b => b.onclick = () => { S.fam = b.dataset.fam; renderCareers(); });
}

/* ---------- 오른쪽: 프리미엄 · 검색 · 마이클래스 ---------- */
function renderPremium() {
  const ST = ['전체', '모집중', '마감임박 D-2', '모집예정'], list = PREM.filter(cd => S.pFilter === '전체' || premInfo(cd).st === S.pFilter);
  view.innerHTML = `${mh(`${list.length}개 프리미엄 과정`, '리더십, MBA, AI, 직무 전문성까지 휴넷이 대표하는 심화 교육과정이에요', `<button class="btn line" id="rst">${I.reset}초기화</button>`)}
    <section class="sec list"><div class="bar-f">${pills(ST, S.pFilter, 'data-st')}<div class="pills"><button class="pill sm">가격대 ${I.down}</button><button class="pill sm">학습 기간 ${I.down}</button><button class="pill sm">개강 임박순 ${I.down}</button></div></div>
    <div class="cards">${list.map(premCard).join('')}</div></section>`;
  view.querySelectorAll('[data-st]').forEach(b => b.onclick = () => { S.pFilter = b.dataset.st; renderPremium(); });
  document.getElementById('rst').onclick = () => { S.pFilter = '전체'; renderPremium(); };
}
function renderSearch(q) {
  S.q = q;
  const ct = ALL.filter(c => c.name.includes(q)).sort((a, b) => a.h - b.h), sk = SKILLS.filter(s => s.k.includes(q) || s.fam.includes(q)), cr = CAREERS.filter(c => c.k.includes(q) || c.fam.includes(q) || c.pool.some(k => k.includes(q)));
  const T = S.srTab, tabs = [['전체', ct.length + sk.length + cr.length], ['콘텐츠', ct.length], ['스킬', sk.length], ['커리어', cr.length]];
  view.innerHTML = `${mh(`‘${esc(q)}’ 검색 결과 ${tabs[0][1].toLocaleString()}개`)}
    <div class="bar-f"><div class="pills">${tabs.map(([t, n]) => `<button class="pill ${T === t ? 'on' : ''}" data-tab="${t}">${t} ${n.toLocaleString()}</button>`).join('')}</div></div>
    ${(T === '전체' || T === '콘텐츠') && ct.length ? `<section class="sec">${T === '전체' ? secH('콘텐츠', `${ct.length.toLocaleString()}개`) : ''}<div class="cards">${ct.slice(0, T === '전체' ? 6 : 36).map(x => card(course(x.cd))).join('')}</div></section>` : ''}
    ${(T === '전체' || T === '스킬') && sk.length ? `<section class="sec">${T === '전체' ? secH('스킬', `${sk.length}개`) : ''}<div class="cards icons">${sk.slice(0, T === '전체' ? 3 : 60).map(x => skillCard(x)).join('')}</div></section>` : ''}
    ${(T === '전체' || T === '커리어') && cr.length ? `<section class="sec">${T === '전체' ? secH('커리어', `${cr.length}개`) : ''}<div class="cards icons">${cr.slice(0, T === '전체' ? 3 : 60).map(x => careerCard(x)).join('')}</div></section>` : ''}
    ${tabs[0][1] ? '' : `<div class="nores">‘${esc(q)}’에 맞는 결과가 없어요.</div>`}`;
  view.querySelectorAll('[data-tab]').forEach(a => a.onclick = () => { S.srTab = a.dataset.tab; renderSearch(q); });
}
function renderMyclass() {
  const tabs = ['학습 중', '학습 완료', '관심 목록', '증명서'];
  const T = S.mcTab || '학습 중';
  const data = { '학습 중': S.fresh ? [] : [['HLSP91107', 45], ['HLAP21002', 12], ['HLAP01419', 27], ['HLSP28153', 61]], '학습 완료': S.fresh ? [] : [['HLSP78181', 100], ['HLSP38380', 100], ['HLAP08209', 100]], '관심 목록': [...S.saved].map(cd => [cd, 0]), '증명서': S.fresh ? [] : [['HLSP78181', 100], ['HLSP38380', 100]] }[T];
  view.innerHTML = `${mh(`마이클래스 · ${T} ${data.length}개`, '왼쪽 마이 대시보드와 함께 나의 학습을 관리해요')}
    <section class="sec list"><div class="bar-f"><div class="pills">${tabs.map(t => `<button class="pill ${T === t ? 'on' : ''}" data-mc="${t}">${t}</button>`).join('')}</div><div class="pills"><button class="pill sm">최근 학습순 ${I.down}</button></div></div>
    ${data.length ? `<div class="cards">${data.map(([cd, p]) => card(course(cd), T === '관심 목록' ? {} : { prog: p, right: `<span class="pr">${p}<small>%</small></span>` })).join('')}</div>` : `<div class="nores">아직 ${T} 항목이 없어요. 홈의 추천에서 첫 강의를 골라 보세요.</div>`}</section>`;
  view.querySelectorAll('[data-mc]').forEach(b => b.onclick = () => { S.mcTab = b.dataset.mc; renderMyclass(); });
}

/* 로그인·맵 만드는 중 화면 배경 — 스킬 갤럭시(skill-galaxy-v2 새 스타일·다크)의 '흘러가는 별 공간'과 같은 그림·움직임 */
function skyMount() { document.querySelectorAll('canvas.au-sky:not([data-on])').forEach(skyRun); }
function skyRun(cv) {
  cv.dataset.on = '1';
  const ctx = cv.getContext('2d'), st = [], N = 300, TN = ['255,255,255', '236,238,242', '210,214,222'];
  let w = 0, h = 0, dust = null, last = performance.now();
  for (let i = 0; i < N; i++) { const z = Math.pow(Math.random(), 1.8) * .9 + .1; st.push({ x: Math.random(), y: Math.random(), z, tw: Math.random() * 6.28, ci: i, big: i % 29 === 0 }); }
  function makeNet() {   // 큰 구 윤곽과 고운 입자 — 한 번 그려 두고 매 프레임 바닥에 깐다
    const dpr = Math.min(2, devicePixelRatio || 1), c = document.createElement('canvas'); c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    const g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const ink = 'rgba(255,255,255,', cx = w * .47, cy = h * .5, R = Math.max(w, h) * .6; g.lineWidth = 1;
    g.strokeStyle = ink + '.07)'; g.beginPath(); g.ellipse(cx, cy, R, R * .96, 0, 0, Math.PI * 2); g.stroke();
    g.strokeStyle = ink + '.045)'; g.beginPath(); g.ellipse(cx, cy, R * .5, R * .96, 0, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.ellipse(cx, cy, R, R * .34, 0, 0, Math.PI * 2); g.stroke();
    const n = Math.round(w * h / 110); for (let i = 0; i < n; i++) { g.fillStyle = ink + (Math.random() * .035).toFixed(3) + ')'; g.fillRect(Math.random() * w, Math.random() * h, 1, 1); }
    dust = c;
  }
  function size() { const r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1); w = r.width; h = r.height; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); dust = null; }
  const ro = new ResizeObserver(size); ro.observe(cv); size();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, wrap = (v, m) => ((v + 6) % (m + 12) + (m + 12)) % (m + 12) - 6;
  function frame(now) {
    if (!cv.isConnected) { ro.disconnect(); return; }   // 화면이 바뀌면 멈춘다
    const dt = Math.min(50, now - last) / 1000; last = now;
    if (w < 1 || h < 1) return requestAnimationFrame(frame);
    ctx.clearRect(0, 0, w, h);
    if (!dust) makeNet(); ctx.drawImage(dust, 0, 0, w, h);
    for (const s of st) {
      let px = s.x * w, py = s.y * h;
      const mx = (reduce ? 0 : -16 * s.z) * dt, my = (reduce ? 0 : 5 * s.z) * dt;   // 깊이별 속도가 다른 일정한 흐름
      px += mx; py += my;
      if (px < -6 || px > w + 6 || py < -6 || py > h + 6) { px = wrap(px, w); py = wrap(py, h); }
      s.x = px / w; s.y = py / h; s.tw += dt * (.6 + s.z * 1.6);
      const a = (.14 + .5 * s.z) * (.6 + .4 * Math.sin(s.tw)), col = TN[s.ci % TN.length], sz = .6 + s.z * 1.8;
      if (s.big) { const r = sz * 3.5, rg = ctx.createRadialGradient(px, py, 0, px, py, r); rg.addColorStop(0, `rgba(${col},${Math.min(1, a * .6).toFixed(3)})`); rg.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = rg; ctx.fillRect(px - r, py - r, r * 2, r * 2); }
      ctx.fillStyle = `rgba(${col},${Math.min(1, a + .1).toFixed(3)})`; ctx.beginPath(); ctx.arc(px, py, sz / 2, 0, 6.2832); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
/* ---------- [E02] 로그인 · 온보딩 · 마이커리어 · 홈 만들기 — 왼쪽 갤럭시 그림 + 오른쪽 입력의 두 칸 화면 ---------- */
const AU_STEPS = ['로그인', '시작하기', '마이커리어', '내 갤럭시'];
const auLogo = `<a class="au-logo" href="#guest" aria-label="비로그인 홈으로"><i>HU</i><span>HUNET<br>UNIVERSITY</span></a>`;
function authShell(step, inner) {
  requestAnimationFrame(skyMount);
  return `<div class="au"><aside class="au-side"><canvas class="au-sky" aria-hidden="true"></canvas><div class="au-art">${gxGuestArt()}</div>
    <div class="au-copy"><span class="au-eb">Skill Galaxy</span><b>배운 만큼 성장이<br>눈에 보이는 HU</b><p>목표 커리어를 정하면 필요한 스킬과 콘텐츠가<br>하나의 지도로 이어져요.</p></div>
    </aside>
    <section class="au-main"><div class="au-card">${auLogo}${inner}</div></section></div>`;
}
const auEmblem = `<svg class="au-emb" viewBox="0 0 120 72" aria-hidden="true"><g stroke="#C9CBD3" stroke-width="1.2"><path d="M60 36L24 18M60 36L98 20M60 36L92 58"/></g>${symShape('skill', 24, 18, 11, DOMC.skill)}${symShape('content', 98, 20, 10, DOMC.content)}${symShape('career', 92, 58, 10, DOMC.career)}<circle cx="60" cy="36" r="16" fill="#171719"/><circle cx="60" cy="36" r="22" fill="none" stroke="#171719" stroke-opacity=".12"/><text x="60" y="41" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="SUIT Variable, Pretendard, sans-serif">HU</text></svg>`;
function renderLogin() {
  view.innerHTML = authShell(0, `<h1>다시 만나서 반가워요</h1><p class="sub">휴넷 계정으로 로그인하고 나의 스킬 갤럭시를 이어 가세요.</p>
    <div class="fld"><label><small>이메일 또는 기존 휴넷 아이디</small><input value="hunet1234" aria-label="이메일 또는 기존 휴넷 아이디"></label><label><small>비밀번호</small><input type="password" value="demo-pass" aria-label="비밀번호"></label></div>
    <div class="lrow"><span class="chk"><i>✓</i>이메일 저장</span><a href="javascript:void 0">비밀번호 재설정</a></div>
    <button class="btn au-go" id="loginGo">로그인</button>
    <p class="alt">아직 HU 계정이 없나요? <a href="javascript:void 0">회원가입</a></p>
    <p class="note">프로토타입이라 실제 로그인은 하지 않아요.</p>`);
  document.getElementById('loginGo').onclick = () => { S.auth = true; S.dash = 'open'; saveDash(); go('onboard'); };
}
function renderOnboard() {
  const B = [['content', '맞춤 콘텐츠', '마이커리어에 맞춘 강의를 매주 골라 드려요'], ['skill', '필요한 스킬', '목표까지 채워야 할 스킬을 보여 드려요'], ['career', '커리어 지도', '스킬 갤럭시에서 성장 경로를 따라가요']];
  view.innerHTML = authShell(1, `${auEmblem}<h1>${NAME}님만의<br>학습을 준비할게요</h1><p class="sub">마이커리어 하나만 고르면 바로 시작할 수 있어요.</p>
    <ul class="au-ben">${B.map(([k, t, d]) => `<li><span>${domIco(k, 20)}</span><div><b>${t}</b><small>${d}</small></div></li>`).join('')}</ul>
    <div class="au-row"><button class="btn au-sub" id="later">나중에 하기</button><a class="btn au-go" href="#mycareer">시작하기</a></div>`);
  document.getElementById('later').onclick = () => { S.careers = []; S.fresh = true; go('building'); };
}
const SUGGEST = ['팀장', '데이터 분석가', '서비스 기획자', '퍼포먼스 마케터', 'HRD 담당자', 'UX 디자이너', 'AI 기획자'];
function renderMyCareer() {
  view.innerHTML = authShell(2, `<h1>목표로 할<br>마이커리어를 골라 주세요</h1><p class="sub">최대 3개까지 고를 수 있어요. 고른 커리어에 맞춰 스킬 갤럭시와 추천이 만들어져요.</p>
    <div class="picked" id="picked"></div>
    <label class="srch">${I.search}<input id="cq" placeholder="커리어·직무·스킬로 검색" value="${esc(S.lq)}" autocomplete="off"></label><div id="sugg"></div>
    <div class="au-row"><a class="btn au-sub" href="#onboard">이전</a><button class="btn au-go" id="cGo">내 갤럭시 만들기</button></div>`);
  const inp = document.getElementById('cq');
  inp.oninput = () => { S.lq = inp.value; careerParts(); };
  document.getElementById('cGo').onclick = () => { S.fresh = true; go('building'); };
  careerParts();
}
function careerParts() {
  const q = S.lq.trim(), list = q ? CAREERS.filter(c => c.k.includes(q) || c.fam.includes(q) || c.pool.some(k => k.includes(q))).slice(0, 12) : SUGGEST.map(careerOf).filter(Boolean);
  document.getElementById('picked').innerHTML = S.careers.map(k => { const c = careerOf(k); return `<span class="p">${c ? CI(c.tags[0], 18) : ''}${esc(k)}<button data-rm="${esc(k)}" aria-label="${esc(k)} 빼기">${I.x}</button></span>`; }).join('') + Array.from({ length: 3 - S.careers.length }, (_, i) => `<span class="e">${S.careers.length + i + 1}</span>`).join('');
  document.getElementById('sugg').innerHTML = list.length ? `<div class="sugg">${list.map(c => { const on = S.careers.includes(c.k); return `<button class="${on ? 'on' : ''}" data-k="${esc(c.k)}" ${!on && S.careers.length >= 3 ? 'disabled' : ''}>${CI(c.tags[0], 18)}${esc(c.k)}<i>${esc(c.fam)}</i></button>`; }).join('')}</div>` : `<div class="empty">'${esc(q)}'에 맞는 커리어가 없어요.</div>`;
  document.getElementById('cGo').disabled = !S.careers.length;
  view.querySelectorAll('.sugg button').forEach(x => x.onclick = () => { const k = x.dataset.k; if (S.careers.includes(k)) S.careers = S.careers.filter(y => y !== k); else if (S.careers.length < 3) S.careers.push(k); else toast('마이커리어는 3개까지 고를 수 있어요'); careerParts(); });
  view.querySelectorAll('[data-rm]').forEach(x => x.onclick = () => { S.careers = S.careers.filter(y => y !== x.dataset.rm); careerParts(); });
}
let buildT = [];
/* 홈 만들기: 가운데 '나'에서 커리어 → 스킬 → 콘텐츠 노드가 차례로 뻗어 나가는 갤럭시 성장 모션 */
function buildArt(custom) {
  const W = 640, H = 420, cx = W / 2, cy = H / 2, cs = custom ? S.careers.map(careerOf).filter(Boolean) : [];
  const careers = cs.length ? cs : [careerOf('팀장'), careerOf('데이터 분석가'), careerOf('서비스 기획자')].filter(Boolean);
  const skills = [...new Set(careers.flatMap(c => c.pool.slice(0, careers.length === 1 ? 6 : 3)))].slice(0, 7);   // 커리어가 하나면 스킬을 더 많이 뻗는다
  const pos = (n, r, off, i) => { const a = (off + i * 360 / n) * Math.PI / 180; return [cx + Math.cos(a) * r * 1.35, cy + Math.sin(a) * r]; };
  const C = careers.map((c, i) => ({ k: 'career', label: c.k, p: pos(careers.length, 96, -90, i), from: [cx, cy], d: .35 + i * .25 }));
  const Sk = skills.map((s, i) => { const p = pos(skills.length, 150, -60, i), par = C[i % C.length].p; return { k: 'skill', label: s, p, from: par, d: 1.25 + i * .14 }; });
  const Ct = Array.from({ length: 8 }, (_, i) => { const p = pos(8, 196, -75, i), par = Sk[i % Sk.length].p; return { k: 'content', p, from: par, d: 2.35 + i * .1 }; });
  const all = [...C, ...Sk, ...Ct], len = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]).toFixed(1);
  return `<svg class="bd-art" viewBox="0 0 ${W} ${H}" aria-hidden="true"><defs><radialGradient id="bdHalo"><stop offset="0" stop-color="#7C93FF" stop-opacity=".45"/><stop offset="1" stop-color="#7C93FF" stop-opacity="0"/></radialGradient><radialGradient id="bdCore"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="#C9D3FF" stop-opacity=".45"/><stop offset="1" stop-color="#7C93FF" stop-opacity="0"/></radialGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="150" fill="url(#bdHalo)" class="bd-pulse"/>
    <g class="bd-orb" fill="none" stroke="#fff" stroke-opacity=".08"><ellipse cx="${cx}" cy="${cy}" rx="${96 * 1.35}" ry="96"/><ellipse cx="${cx}" cy="${cy}" rx="${150 * 1.35}" ry="150" stroke-dasharray="2 6"/><ellipse cx="${cx}" cy="${cy}" rx="${196 * 1.35}" ry="196" stroke-dasharray="1 8"/></g>
    ${all.map(n => `<line class="bd-l" x1="${n.from[0]}" y1="${n.from[1]}" x2="${n.p[0]}" y2="${n.p[1]}" stroke="${DOMC[n.k]}" stroke-opacity=".55" style="--len:${len(n.from, n.p)};--d:${n.d}s"/>`).join('')}
    ${all.map(n => `<g class="bd-n" style="--d:${(n.d + .25).toFixed(2)}s"><circle cx="${n.p[0]}" cy="${n.p[1]}" r="${n.k === 'content' ? 13 : 17}" fill="${DOMC[n.k]}" fill-opacity=".16"/>${symShape(n.k, n.p[0], n.p[1], n.k === 'content' ? 8 : n.k === 'career' ? 11 : 10, DOMC[n.k])}${n.label && n.k === 'career' ? `<text x="${n.p[0]}" y="${n.p[1] + 32}" text-anchor="middle" class="bd-t">${esc(n.label)}</text>` : ''}</g>`).join('')}
    <circle cx="${cx}" cy="${cy}" r="30" fill="url(#bdCore)" class="bd-pulse"/><circle cx="${cx}" cy="${cy}" r="9" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="16" fill="none" stroke="#fff" stroke-opacity=".35"/></svg>`;   // 아직 프로필이 없으니 사진 대신 빛나는 중심
}
function renderBuilding() {
  const custom = S.careers.length > 0, items = custom ? ['마이커리어 분석', '필요한 스킬 잇기', '맞춤 콘텐츠 매칭', '나만의 홈 구성'] : ['인기 커리어 모으기', '많이 보는 스킬 잇기', '추천 콘텐츠 고르기', '홈 구성'];
  view.innerHTML = `<div class="au-build"><canvas class="au-sky" aria-hidden="true"></canvas><div class="bd-vis">${gxGuestArt()}</div>
    <div class="bd-copy"><h1>${NAME}님의 스킬 갤럭시를<br>만들고 있어요</h1><p>${custom ? `${S.careers.map(esc).join(' · ')}에서 필요한 스킬과 콘텐츠로 뻗어 나가요` : '많이 찾는 커리어에서 스킬과 콘텐츠로 뻗어 나가요'}</p>
    <div class="bd-bar"><i id="bdBar"></i></div><ul class="bd-steps">${items.map(t => `<li><i>✓</i>${t}</li>`).join('')}</ul></div></div>`;
  skyMount();
  buildT.forEach(clearTimeout); buildT = [];
  const lis = view.querySelectorAll('.bd-steps li'), bar = document.getElementById('bdBar');
  lis.forEach((li, i) => buildT.push(setTimeout(() => { li.classList.add('on'); bar.style.width = `${(i + 1) / lis.length * 100}%`; }, 700 + i * 800)));
  buildT.push(setTimeout(() => { if (location.hash === '#building') go('home'); }, 700 + lis.length * 800 + 700));
}
/* ---------- 목록 오른쪽에서 밀려 나오는 정보 패널 — 카드를 누르면 화면을 바꾸지 않고, 그 흰 박스 안 오른쪽에 패널이 열리고 목록은 왼쪽으로 다시 정렬된다 ---------- */
let PK = null;   // { sec, keys, i, key }
const kvs = rows => `<div class="pk-kv">${rows.map(([t, v]) => `<div>${t}<b>${v}</b></div>`).join('')}</div>`;
const pkMini = c => `<button class="pk-mini" data-peek="c/${c.cd}">${thumb(c)}<span><b>${esc(c.title)}</b><small>${esc(c.cat2)}</small></span></button>`;
function peekContent(cd) {
  const c = course(cd); if (!c) return '';
  const f = info(cd), chapters = ['오리엔테이션', '핵심 개념 이해하기', '현업 사례로 적용하기', '정리와 실천 계획'];
  return `<div class="pk-media">${thumb(c)}</div>
    <div class="chips"><span class="chip dom d-content">${domIco('content', 16)}콘텐츠</span><span class="chip">${esc(f.cat)}</span><span class="chip">${esc(c.cat3)}</span></div>
    <h3 class="pk-t">${esc(c.title)}</h3><p class="pk-d">${esc(c.cat2)} 분야에서 바로 쓰는 ${esc(c.cat3)} 역량을 ${f.chap}차시로 정리한 과정이에요.</p>
    ${kvs([['차시', `${f.chap}차시`], ['학습 시간', `약 ${f.hours}시간`], ['평점', `★ ${f.rate}`], ['학습자', `${f.users.toLocaleString()}명`]])}
    <div class="pk-price">${f.pr.t === 'free' ? '무료' : f.pr.t === 'mem' ? '멤버십 전용' : `${won(f.pr.now)}<s>${won(f.pr.was)}</s><em>${f.pr.off}%</em>`}</div>
    <div class="pk-s"><div class="lbl">이 과정으로 얻는 스킬</div><div class="chips">${f.sks.map(k => `<button class="pill sm" ${skillOf(k) ? `data-peek="skills/${encodeURIComponent(k)}"` : ''}>${esc(k)} · +${f.pt}pt</button>`).join('')}</div></div>
    <div class="pk-s"><div class="lbl">커리큘럼</div><ol class="pk-cur">${chapters.map(t => `<li>${t}</li>`).join('')}</ol></div>
    <div class="pk-act"><button class="btn line hb ${S.saved.has(cd) ? 'on' : ''}" data-save="${cd}" aria-label="관심 목록">${I.heart}</button><button class="btn ink" data-apply>${S.auth ? '수강 신청하기' : '로그인하고 신청하기'}</button></div>`;
}
function peekSkill(k) {
  const s = skillOf(k); if (!s) return '';
  const crs = CAREERS.filter(c => c.pool.includes(s.k)), cs = skillContents(s.k, 3);
  return `<div class="pk-media icn">${FI(s.g, 72)}</div>
    <div class="chips"><span class="chip dom d-skill">${domIco('skill', 16)}스킬</span><span class="chip">${esc(s.fam)}</span></div>
    <h3 class="pk-t">${esc(s.k)}</h3><p class="pk-d">${esc(s.k)}${josa(s.k, '은', '는')} ${esc(s.fam)} 영역의 스킬이에요. 업무에서 쓰면 판단이 빨라지고, 팀과 결과를 맞추기 쉬워져요.</p>
    ${kvs([['평균 포인트', `${hash(s.k) % 600 + 400}pt`], ['콘텐츠', `${countFor(s.k).toLocaleString()}개`], ['쓰는 커리어', `${crs.length}개`], ['내 상태', S.liked.has(s.k) ? '관심 스킬' : '-']])}
    ${crs.length ? `<div class="pk-s"><div class="lbl">이 스킬을 쓰는 커리어</div><div class="chips">${crs.slice(0, 6).map(c => `<button class="pill sm" data-peek="careers/${encodeURIComponent(c.k)}">${esc(c.k)}</button>`).join('')}</div></div>` : ''}
    <div class="pk-s"><div class="lbl">이 스킬을 키우는 콘텐츠</div>${cs.map(pkMini).join('')}</div>
    <div class="pk-act"><button class="btn ink" data-save="s:${esc(s.k)}">${S.liked.has(s.k) ? '관심 스킬에서 빼기' : '관심 스킬로 담기'}</button></div>`;
}
function peekCareer(k) {
  const c = careerOf(k); if (!c) return '';
  const cs = match([c.k, ...c.pool.slice(0, 4)], 3), mine = S.careers.includes(c.k);
  return `<div class="pk-media icn">${CI(c.tags[0], 72)}</div>
    <div class="chips"><span class="chip dom d-career">${domIco('career', 16)}커리어</span><span class="chip">${esc(c.fam)}</span></div>
    <h3 class="pk-t">${esc(c.k)}</h3><p class="pk-d">${c.pool.slice(0, 3).map(esc).join(', ')} 같은 스킬로 ${esc(c.fam)} 업무를 이끄는 커리어예요.</p>
    ${kvs([['필요 스킬', `${c.pool.length}개`], ['보유자', `${(hash(c.k) % 5000 + 800).toLocaleString()}명`], ['콘텐츠', `${(countFor(c.pool[0]) + countFor(c.pool[1])).toLocaleString()}개`], ['직무군', esc(c.fam)]])}
    <div class="pk-s"><div class="lbl">필요 스킬</div><div class="chips">${c.pool.slice(0, 8).map(x => `<button class="pill sm" data-peek="skills/${encodeURIComponent(x)}">${esc(x)}</button>`).join('')}</div></div>
    <div class="pk-s"><div class="lbl">이 커리어에서 많이 학습하는 콘텐츠</div>${cs.map(pkMini).join('')}</div>
    <div class="pk-act"><button class="btn ${mine ? 'line' : 'ink'}" data-save="k:${esc(c.k)}">${mine ? '마이커리어에 담겨 있어요' : '마이커리어로 담기'}</button></div>`;
}
function peekBody(key) {
  const [t, ...r] = key.split('/'), a = decodeURIComponent(r.join('/'));
  return t === 'c' ? peekContent(a) : t === 'skills' ? peekSkill(a) : t === 'careers' ? peekCareer(a) : '';
}
function peekDraw() {
  const { sec, keys, i, key } = PK, pk = sec.querySelector(':scope > .peek');
  pk.innerHTML = `<div class="pk-h"><button class="pk-nav" data-pk="-1" ${i <= 0 ? 'disabled' : ''} aria-label="이전">${I.left}</button><span class="pk-n">${i >= 0 ? `<b>${i + 1}</b> / ${keys.length}` : '연결된 항목'}</span><button class="pk-nav" data-pk="1" ${i < 0 || i >= keys.length - 1 ? 'disabled' : ''} aria-label="다음">${I.right}</button><span class="sp"></span><button class="pk-nav" data-pk="full" title="상세 페이지로 크게 보기" aria-label="상세 페이지로 크게 보기">${I.expand}</button><button class="pk-nav" data-pk="x" aria-label="닫기">${I.close}</button></div><div class="pk-b">${peekBody(key)}</div>`;
  const act = pk.querySelector('.pk-b .pk-act'); if (act) { const f = act.cloneNode(true); f.classList.add('pk-foot'); pk.appendChild(f); }   // 하트·수강 신청은 패널 아래에 고정
  pk.scrollTop = 0;
  sec.querySelectorAll('.card.on').forEach(c => c.classList.remove('on'));
  const cur = i >= 0 ? sec.querySelector(`.sec-main .card[data-go="${CSS.escape(keys[i])}"]`) : null;
  if (cur) { cur.classList.add('on'); cur.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' }); }
}
function openPeek(sec, key) {
  document.querySelectorAll('.sec.peeking').forEach(x => { if (x !== sec) closePeek(x); });
  if (!sec.querySelector(':scope > .sec-main')) {
    const m = document.createElement('div'); m.className = 'sec-main';
    while (sec.firstChild) m.appendChild(sec.firstChild);
    const pk = document.createElement('aside'); pk.className = 'peek'; pk.setAttribute('aria-label', '선택한 항목 정보');
    const rz = document.createElement('div'); rz.className = 'pk-rz'; rz.title = '끌어서 목록·패널 너비 조절'; rz.innerHTML = '<i></i>';
    sec.append(m, pk, rz); sec.classList.add('pk-ready'); if (S.pkw) sec.style.setProperty('--pkw', S.pkw + 'px'); pkResize(sec, rz); void sec.offsetWidth;
  }
  const keys = [...sec.querySelectorAll('.sec-main .card[data-go]')].map(c => c.dataset.go).filter((k, j, a) => a.indexOf(k) === j);
  PK = { sec, keys, key, i: keys.indexOf(key) };
  peekDraw();
  sec.classList.add('peeking'); pkFit();
}
/* 패널 높이 = 패널 위 끝부터 브라우저 바닥까지(붙기 전에도 바닥에 닿게) */
function pkFit() {
  if (!PK || !PK.sec.isConnected || innerWidth <= 900) return;
  const pk = PK.sec.querySelector(':scope > .peek'); if (!pk) return;
  pk.style.height = Math.max(320, innerHeight - pk.getBoundingClientRect().top - 16) + 'px';   // 지금 위치에서 브라우저 바닥 16px 위까지(아래 둥근 모서리가 화면 안에)
}
let pkRaf; const pkFitSoon = () => { cancelAnimationFrame(pkRaf); pkRaf = requestAnimationFrame(() => { pkFit(); requestAnimationFrame(pkFit); }); };
mainEl.addEventListener('scroll', pkFitSoon, { passive: true }); addEventListener('resize', pkFitSoon);
/* 목록 ↔ 패널 경계 손잡이: 마우스를 올리면 나타나고, 끌면 패널 너비가 바뀐다(최소 320px, 최대는 목록이 카드 2열(약 440px)을 지킬 만큼·전체의 62%) */
try { const w = +localStorage.getItem('hu-v3-pkw'); if (w >= 320) S.pkw = w; } catch (e) {}
function pkResize(sec, rz) {
  let x0 = null, w0 = 0;
  rz.addEventListener('pointerdown', e => { x0 = e.clientX; w0 = sec.querySelector(':scope > .peek').getBoundingClientRect().width; rz.setPointerCapture(e.pointerId); sec.classList.add('rz'); e.preventDefault(); });
  rz.addEventListener('pointermove', e => {
    if (x0 === null) return;
    const W = sec.getBoundingClientRect().width, max = Math.max(320, Math.min(W * .62, W - 440 - 24));
    const w = Math.round(Math.max(320, Math.min(max, w0 + (x0 - e.clientX))));
    sec.style.setProperty('--pkw', w + 'px'); S.pkw = w;
  });
  const end = () => { if (x0 === null) return; x0 = null; sec.classList.remove('rz'); try { localStorage.setItem('hu-v3-pkw', S.pkw); } catch (e) {} };
  rz.addEventListener('pointerup', end); rz.addEventListener('pointercancel', end);
  rz.addEventListener('dblclick', () => { S.pkw = 0; sec.style.removeProperty('--pkw'); try { localStorage.removeItem('hu-v3-pkw'); } catch (e) {} });   // 두 번 누르면 기본 너비
}
function closePeek(sec) {
  sec.classList.remove('peeking'); sec.querySelectorAll('.card.on').forEach(c => c.classList.remove('on'));
  if (PK && PK.sec === sec) PK = null;
}
function stepPeek(d) { if (!PK || PK.i < 0) return; const j = PK.i + d; if (j < 0 || j >= PK.keys.length) return; PK.i = j; PK.key = PK.keys[j]; peekDraw(); }
addEventListener('keydown', e => {
  if (!PK || !PK.sec.isConnected || e.target.closest('input,textarea')) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); stepPeek(1); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); stepPeek(-1); }
  else if (e.key === 'Escape') closePeek(PK.sec);
});
const savedOn = k => k.startsWith('s:') ? S.liked.has(k.slice(2)) : k.startsWith('k:') ? S.careers.includes(k.slice(2)) : S.saved.has(k);

/* ---------- 라우팅 ---------- */
let current = ['guest', ''];
function renderAll() { const [page, arg] = current; renderChrome(page); if (!document.body.classList.contains('bare')) renderDash(); ROUTES[page](arg); mountGalaxy(page === 'home' || page === 'guest'); }
const ROUTES = { guest: renderGuest, home: renderHome, login: renderLogin, onboard: renderOnboard, mycareer: renderMyCareer, building: renderBuilding, contents: renderContents, c: renderContent, skills: renderSkills, careers: renderCareers, premium: renderPremium, search: a => renderSearch(a || 'AI'), myclass: renderMyclass, noti: renderNoti };
function render() {
  const [p, ...rest] = location.hash.slice(1).split('/'), arg = rest.length ? decodeURIComponent(rest.join('/')) : '';
  const page = ROUTES[p] ? p : 'guest';
  if (page !== 'building') { buildT.forEach(clearTimeout); buildT = []; }
  if (['home', 'myclass', 'onboard', 'mycareer', 'building'].includes(page)) S.auth = true;
  if (page === 'noti' && S.auth) S.panel = 'noti';
  if (page === 'guest' || page === 'login') S.auth = false;
  if (page === 'myclass' && !S.careers.length) S.careers = ['서비스 기획자'];
  document.body.classList.toggle('bare', ['login', 'onboard', 'mycareer', 'building'].includes(page));
  if (S.dash === 'full' && current[0] && (current[0] !== page || current[1] !== arg)) S.dash = 'open';   // 다른 화면으로 가면 크게 보기는 풀린다
  current = [page, arg];
  if (S.fromPeek && location.hash.slice(1) !== S.fromPeek.key && location.hash.slice(1) !== S.fromPeek.from) S.fromPeek = null;
  renderAll(); mainEl.scrollTop = 0; window.scrollTo(0, 0);
  if (S.fromPeek && location.hash.slice(1) === S.fromPeek.key) view.insertAdjacentHTML('afterbegin', `<div class="dt-tools"><button class="btn line sm" data-shrink title="목록 옆 패널로 돌아가기">${I.shrink}패널로 줄이기</button></div>`);   // 상세 = 줄이기 버튼
  if (S.reopen) { const f = S.reopen; S.reopen = null; requestAnimationFrame(() => {   // 목록으로 돌아오면 같은 항목의 패널을 다시 연다
    const card = document.querySelector(`.sec .card[data-go="${CSS.escape(f.key)}"]`), sec = card ? card.closest('.sec') : document.querySelector('.sec.list') || document.querySelector('.sec');
    if (!sec) return; mainEl.scrollTop = f.top || 0; openPeek(sec, f.key); }); }
  document.querySelectorAll('.tool-scenes a').forEach(a => a.classList.toggle('on', a.getAttribute('href').split('/')[0] === '#' + page));
}
document.addEventListener('click', e => {
  const sv = e.target.closest('[data-save]');
  if (sv) { e.stopPropagation(); const k = sv.dataset.save; if (!S.auth) { toast('로그인하면 관심 목록에 담을 수 있어요'); return; }
    if (k.startsWith('s:')) { const s = k.slice(2); S.liked.has(s) ? S.liked.delete(s) : S.liked.add(s); }
    else if (k.startsWith('k:')) { const c = k.slice(2); if (S.careers.includes(c)) S.careers = S.careers.filter(x => x !== c); else if (S.careers.length < 3) S.careers.push(c); else toast('마이커리어는 3개까지 담을 수 있어요'); }
    else { S.saved.has(k) ? S.saved.delete(k) : S.saved.add(k); }
    if (sv.closest('.sec, .peek')) {   // 목록·패널 안에서는 그 자리만 바꾼다(패널이 닫히지 않게)
      document.querySelectorAll('.card [data-save]').forEach(b => b.classList.toggle('on', savedOn(b.dataset.save)));
      if (PK && PK.sec.isConnected) peekDraw();
      renderDash();
    } else renderAll();
    return; }
  const gg = e.target.closest('[data-gxgo]');
  if (gg) { const id = gg.dataset.gxgo; if (gg.hasAttribute('data-gxhome') || !GX.doc) { go(S.auth ? 'home' : 'guest'); return; }   // 대시보드에서 고르면 갤럭시가 그 노드로 이동
    const it = GX.doc.querySelector(`#list .item[data-id="${CSS.escape(id)}"]`); if (it) it.click(); const fr = document.getElementById('gxF'); if (fr && document.getElementById('gx').classList.contains('gx-mini')) gxOpen(); mainEl.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const mt = e.target.closest('[data-mctab]'); if (mt) { S.mcTab = mt.dataset.mctab; if (current[0] === 'myclass') renderMyclass(); else go('myclass'); return; }
  const rb = e.target.closest('[data-rail]');
  if (rb) { const tr = rb.closest('.sec').querySelector('.rail-track'); if (tr) railGo(tr, +rb.dataset.rail); return; }
  const pn = e.target.closest('[data-pk]');
  if (pn) { const v = pn.dataset.pk; if (v === 'x') closePeek(PK.sec); else if (v === 'full') { S.fromPeek = { from: location.hash.slice(1) || 'contents', key: PK.key, top: mainEl.scrollTop }; go(PK.key); } else stepPeek(+v); return; }
  if (e.target.closest('[data-shrink]')) { const f = S.fromPeek; S.fromPeek = null; S.reopen = f; go(f.from); return; }
  const pp = e.target.closest('[data-peek]');
  if (pp && PK) { const key = pp.dataset.peek; PK.key = key; PK.i = PK.keys.indexOf(key); peekDraw(); return; }
  if (e.target.closest('[data-apply]')) { S.auth ? toast('수강 신청 화면으로 이어져요 (시안)') : go('login'); return; }
  const t = e.target.closest('[data-go]'); if (!t || e.target.closest('a,button')) return;
  const sec = t.classList.contains('card') && t.closest('.sec');
  if (sec && current[0] !== 'home' && current[0] !== 'guest') { if (PK && PK.sec === sec && PK.key === t.dataset.go && sec.classList.contains('peeking')) closePeek(sec); else openPeek(sec, t.dataset.go); return; }
  go(t.dataset.go);
});
/* 시안 도구: 사이트 톤 — 기본(지금) · 레드 · 블루 · 보라 */
(function toolAccent() {
  const set = a => { if (a && a !== 'base') document.documentElement.dataset.ac = a; else delete document.documentElement.dataset.ac; document.querySelectorAll('.tool-ac button').forEach(b => b.classList.toggle('on', b.dataset.accent === (a || 'base'))); try { localStorage.setItem('hu-v3-accent', a || 'base'); } catch (e) {} };
  let a = 'base'; try { a = localStorage.getItem('hu-v3-accent') || 'base'; } catch (e) {}
  document.querySelectorAll('.tool-ac button').forEach(b => b.onclick = () => set(b.dataset.accent));
  set(a);
})();
/* 시안 도구 막대: 평소에는 숨김 → 마우스를 화면 아래에 1.2초 두면 아래에서 올라온다(터치 화면은 '시안' 손잡이로) */
(function toolAuto() {
  const tool = document.querySelector('.tool'); if (!tool) return;
  let up = null, down = null; const show = () => tool.classList.add('show'), hide = () => tool.classList.remove('show');
  addEventListener('mousemove', e => {
    const near = e.clientY > innerHeight - 80 || tool.contains(e.target);
    if (near) { clearTimeout(down); down = null; if (!tool.classList.contains('show') && !up) up = setTimeout(() => { show(); up = null; }, 1200); }
    else { clearTimeout(up); up = null; if (tool.classList.contains('show') && !down) down = setTimeout(() => { hide(); down = null; }, 600); }
  });
  document.documentElement.addEventListener('mouseleave', () => { clearTimeout(up); up = null; });
  const tab = document.createElement('button'); tab.className = 'tool-tab'; tab.textContent = '시안'; tab.setAttribute('aria-label', '시안 도구 열기');
  tab.onclick = () => tool.classList.toggle('show'); document.body.appendChild(tab);
})();
addEventListener('hashchange', render);
render();
