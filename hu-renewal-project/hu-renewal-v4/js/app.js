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
  pencil: ic('<path d="M4 20h4L19 9l-4-4L4 16z"/>', 16),
  user: ic('<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>', 16),
});

/* ---------- 상태 · 공통 ---------- */
const NAME = '김휴넷';
const S = { auth: false, fresh: false, careers: [], q: '', cat: '전체', lq: '', shown: 24, liked: new Set(['코칭', '데이터 시각화']), saved: new Set(['HLAP21002']), fam: '전체', skDom: '전체', pFilter: '전체', srTab: '전체', period: '이번 주', alarm: true, open: { skill: true, learning: true, saved: false }, dash: 'open' };
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
const CI = (g, s = 40) => { const c = FAM_COLOR[g] || '#17171A'; return `<svg class="fi ci" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><path d="M15 3l5 7 5-7" fill="none" stroke="${c}" stroke-opacity=".45" stroke-width="2" stroke-linejoin="round"/><rect x="8" y="9" width="24" height="29" rx="5" fill="${c}"/><rect x="16" y="11.5" width="8" height="2.6" rx="1.3" fill="#fff" fill-opacity=".55"/><circle cx="20" cy="21" r="4.4" fill="#fff"/><path d="M12.5 33.5c.6-4.4 3.6-7 7.5-7s6.9 2.6 7.5 7z" fill="#fff"/></svg>`; };
const FI = (g, s = 40) => `<svg class="fi" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">${FAM_IC[g] || FAM_IC.plus}</svg>`;
const heartBtn = (key, on) => `<button class="hrt ${on ? 'on' : ''}" data-save="${esc(key)}" aria-label="저장">${I.heart}</button>`;
const priceR = f => f.pr.t === 'free' ? '<span class="pr free">무료</span>' : f.pr.t === 'mem' ? '<span class="pr free">멤버십</span>' : `<span class="pr">${f.pr.now.toLocaleString()}<small>원</small></span>`;
const card = (c, opt = {}) => { const f = info(c.cd); return `<article class="card ${opt.on ? 'on' : ''}" data-go="c/${c.cd}">
  <div class="media">${thumb(c)}</div>
  <div class="cb"><div class="ct"><h3>${esc(c.title)}</h3>${heartBtn(c.cd, S.saved.has(c.cd))}</div><p class="sub">${opt.sub || `${esc(c.cat2)} · ${esc(c.cp)}`}</p>
  <div class="cf"><span class="mt">${I.time}${f.hours}시간 · ${f.chap}차시<i></i><span class="star">${I.star}</span>${f.rate}</span>${opt.right !== undefined ? opt.right : priceR(f)}</div>
  ${opt.prog !== undefined ? `<div class="pg"><span class="prog"><i style="width:${opt.prog}%"></i></span>${opt.prog}%</div>` : ''}</div>
</article>`; };
const iconCard = ({ go, g, ico, title, sub, left = '', right = '', save = '', on = false, cls = '' }) => `<article class="card ic-card ${cls} ${on ? 'on' : ''}" ${go ? `data-go="${go}"` : ''}>
  <div class="media icon">${ico || FI(g)}</div>
  <div class="cb"><div class="ct"><h3>${title}</h3>${save}</div><p class="sub two">${sub}</p>${left || right ? `<div class="cf"><span class="mt">${left}</span>${right}</div>` : ''}</div>
</article>`;
const skillCard = (s, on) => iconCard({ go: `skills/${encodeURIComponent(s.k)}`, g: s.g, title: esc(s.k), on,
  sub: (n => `${esc(s.fam)} 스킬${n ? ` · 커리어 ${n}개에서 써요` : ' · 여러 업무에 두루 쓰여요'}`)(CAREERS.filter(c => c.pool.includes(s.k)).length), save: heartBtn('s:' + s.k, S.liked.has(s.k)),
  left: `콘텐츠 ${countFor(s.k).toLocaleString()}개`, right: `<span class="pr">+${hash(s.k) % 30 + 8}<small>pt</small></span>` });
const careerCard = (c, on) => iconCard({ go: `careers/${encodeURIComponent(c.k)}`, ico: CI(c.tags[0]), title: esc(c.k), on,
  sub: `${c.pool.slice(0, 3).map(esc).join(' · ')} 스킬로 일해요`, save: heartBtn('k:' + c.k, S.careers.includes(c.k)),
  left: `필요 스킬 ${c.pool.length}개 · 보유자 ${(hash(c.k) % 5000 + 800).toLocaleString()}명`, right: `<span class="chip">${esc(c.fam)}</span>` });
const premCard = cd => { const c = course(cd), p = premInfo(cd); return card(c, { sub: `${p.lect}강 · ${p.months}개월 · ${p.st}`, right: `<span class="pr">${(p.price / 10000).toLocaleString()}<small>만원</small></span>` }); };
const secH = (t, p = '', link) => `<div class="sec-h"><div><h2>${t}</h2>${p ? `<p>${p}</p>` : ''}</div>${link ? `<a href="#${link}">전체보기 ›</a>` : ''}</div>`;
const mh = (title, sub = '', right = '') => `<div class="mh"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${right ? `<div class="r">${right}</div>` : ''}</div>`;
const pills = (items, on, attr) => `<div class="pills">${items.map(t => `<button class="pill ${t === on ? 'on' : ''}" ${attr}="${esc(t)}">${t}</button>`).join('')}</div>`;

/* ---------- 홈: HU의 세 개념(스킬 · 콘텐츠 · 커리어)을 알려 주는 구역 — 레퍼런스의 검은 그림 카드 3장 배치 ---------- */
/* 세 개념 카드의 대표 그림 — 단순한 선 하나로. 나중에 이미지가 오면 INTRO_IMG에 주소만 넣으면 그림 대신 이미지가 들어간다 */
const INTRO_IMG = { skill: '', content: '', career: '' };
const artWrap = inner => `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="gGl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#3D63FF" stop-opacity=".22"/><stop offset="1" stop-color="#3D63FF" stop-opacity="0"/></radialGradient></defs><rect width="400" height="160" fill="#0C0C10"/><ellipse cx="200" cy="80" rx="150" ry="80" fill="url(#gGl)"/>${inner}</svg>`;
const artSkill = () => artWrap(`<g stroke="#fff" stroke-opacity=".5" stroke-width="1.2"><path d="M200 80L148 58M200 80L252 52M200 80L160 112M200 80L246 108"/></g><g fill="#fff"><circle cx="148" cy="58" r="4"/><circle cx="252" cy="52" r="4"/><circle cx="160" cy="112" r="4"/><circle cx="246" cy="108" r="4"/></g><circle cx="200" cy="80" r="11" fill="#3D63FF"/>`);
const artContent = () => artWrap(`<rect x="160" y="52" width="80" height="56" rx="12" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.6"/><path d="M194 69v22l18-11z" fill="#3D63FF"/>`);
const artCareer = () => artWrap(`<path d="M142 112h28v-18h28v-18h28v-18h32" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.6" stroke-linejoin="round"/><circle cx="258" cy="58" r="8" fill="#3D63FF"/>`);
function introSec() {
  if (S.introOff) return '';
  const items = [['스킬', INTRO_IMG.skill ? `<img src="${INTRO_IMG.skill}" alt="">` : artSkill(), '스킬로 성장을 확인해요', '배운 만큼 스킬 포인트가 쌓여요. 스킬 갤럭시에서 스킬·콘텐츠·커리어가 어떻게 이어지는지 볼 수 있어요.', 'skills', '스킬 둘러보기'],
    ['콘텐츠', INTRO_IMG.content ? `<img src="${INTRO_IMG.content}" alt="">` : artContent(), `${TOTAL.toLocaleString()}개 콘텐츠로 배워요`, '강의마다 키워 주는 스킬이 붙어 있어요. 필요한 스킬부터 골라 들을 수 있어요.', 'contents', '콘텐츠 보기'],
    ['커리어', INTRO_IMG.career ? `<img src="${INTRO_IMG.career}" alt="">` : artCareer(), '커리어를 목표로 정해요', '마이커리어를 정하면 필요한 스킬과 같은 목표의 학습자가 많이 듣는 콘텐츠를 추천해요.', 'careers', '커리어 찾기']];
  return `<section class="sec intro"><div class="sec-h"><div><h2>${S.auth ? 'HU를 이렇게 쓰면 좋아요' : 'HU가 처음이세요? 세 가지만 알면 돼요'}</h2></div><button class="lk" id="introX">닫기</button></div>
    <div class="intro-grid">${items.map(([k, art, t, d, h, b], i) => `<article class="ic3"><div class="art">${art}</div><div class="ib"><span class="eb">${String(i + 1).padStart(2, '0')} · ${k}</span><h3>${t}</h3><p>${d}</p><a class="btn ${i ? 'line' : 'ink'} sm" href="#${h}">${b}</a></div></article>`).join('')}</div></section>`;
}
function bindIntro() { const x = document.getElementById('introX'); if (x) x.onclick = () => { S.introOff = true; x.closest('.intro').remove(); }; }

/* ---------- 위쪽 바 · 왼쪽 메뉴 ---------- */
const SECTION = { guest: 'home', home: 'home', contents: 'contents', c: 'contents', skills: 'skills', careers: 'careers', myclass: 'myclass', premium: 'premium' };
function renderChrome(page) {
  const authed = S.auth, on = SECTION[page] || '';
  const now = new Date(), hhmm = now.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' });
  document.getElementById('top').innerHTML = `<a class="brand" href="#${authed ? 'home' : 'guest'}"><i>HU</i><b>HUNET<br>UNIVERSITY</b></a>
    <div class="top-meta"><span>${I.clock}${hhmm} (KST)</span><span class="opt">${I.pin}${authed && S.careers.length ? `마이커리어 · ${esc(S.careers[0])}` : '마이커리어를 골라 보세요'}</span></div>
    <span class="sp"></span>
    <label class="tsearch">${I.search}<input id="gq" placeholder="원하는 콘텐츠를 검색해 보세요" autocomplete="off" value="${page === 'search' ? esc(S.q) : ''}"><div class="ac-box" id="acBox"></div></label>
    <div class="tright"><a class="pc" href="javascript:void 0">HU Plus</a><a class="pc" href="javascript:void 0">기업교육 ↗</a>${authed ? '' : '<a class="btn ink sm" href="#login">로그인</a>'}</div>`;
  const nav = [['home', authed ? '#home' : '#guest', 'home', '홈'], ['contents', '#contents', 'grid', '콘텐츠'], ['careers', '#careers', 'career', '커리어'], ['skills', '#skills', 'skill', '스킬'], ['myclass', authed ? '#myclass' : '#login', 'myclass', '마이클래스'], ['premium', '#premium', 'premium', '프리미엄']];
  document.getElementById('lnb').innerHTML = `<div class="lp ${!authed || S.dash === 'closed' ? 'on' : ''}"><button class="lp-btn" id="lpBtn" aria-label="${authed ? '마이 대시보드 열기' : '로그인'}"><img class="lp-av" src="${authed ? AV : AV_DEF}" alt=""><span>${authed ? NAME : '로그인'}</span></button></div>` + nav.map(([k, h, icn, l], i) => `<a href="${h}" class="${on === k ? 'on' : ''} ${i === 5 ? 'pc' : ''}">${I[icn]}<span>${l}</span></a>`).join('') + `<hr><a class="pc" href="javascript:void 0">${I.bell}<span>알림</span></a><a class="pc" href="javascript:void 0">${I.gear}<span>설정</span></a>`;
  document.getElementById('lpBtn').onclick = () => { if (!S.auth) go('login'); else if (S.dash === 'closed') setDash('open'); else go('myclass'); };
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
function levelHTML() {
  const fresh = S.fresh, m = GX.me;
  const lv = fresh ? { n: 1, name: '새내기', pt: 0, next: 500, top: '-' } : { n: 3, name: '성장 단계', pt: 4740, next: 6000, top: '18%' };
  const pct = Math.round(lv.pt / lv.next * 100);
  return `<div class="lv-h"><span class="lv-n">Lv.${lv.n}</span><b>${lv.name}</b><span class="lv-pt num">${lv.pt.toLocaleString()}pt</span></div>
    <div class="lv-bar"><i style="width:${pct}%"></i></div>
    <p class="lv-note">${fresh ? '첫 학습을 마치면 포인트가 쌓이기 시작해요' : `Lv.${lv.n + 1}까지 ${(lv.next - lv.pt).toLocaleString()}pt · 같은 커리어 학습자 중 <b>상위 ${lv.top}</b>`}</p>
    <dl class="lv-g"><div><dt>목표 커리어</dt><dd>${m && m.goal && m.goal !== '-' ? esc(m.goal) : '-'}</dd></div><div><dt>가진 스킬</dt><dd class="num">${m ? esc(m.own) : '0개'}</dd></div><div><dt>목표까지</dt><dd class="num">${m ? esc(m.to) : '-'}</dd></div></dl>
    ${m && m.need ? `<div class="lv-bar thin"><i style="width:${m.pct}%"></i></div>` : ''}`;
}
/* 스킬 갤럭시에서 지금 고른 노드 — 홈에서는 갤럭시를 누를 때마다 바뀌고, 다른 화면에서는 마지막으로 본 곳 */
const GX_DOM = { skill: '스킬', career: '커리어', content: '콘텐츠', me: '나 · 목표' };
function gxNowHTML() {
  const c = GX.cur, live = (current[0] === 'home' || current[0] === 'guest') && !!document.querySelector('#gx iframe');
  const head = `<div class="lbl">스킬 갤럭시${live ? '<em class="live">연동 중</em>' : `<a class="lk" href="#${S.auth ? 'home' : 'guest'}">홈에서 열기 ›</a>`}</div>`;
  if (!c || (!S.auth && c.dom === 'me')) return `${head}<div class="bd"><p class="note">홈의 스킬 갤럭시에서 노드를 고르면 여기에 그 정보가 나와요.</p></div>`;
  return `${head}<div class="bd"><div class="gx-now d-${c.dom}"><span class="gi">${c.dom === 'me' ? `<img src="${S.auth ? AV : AV_DEF}" alt="">` : I[c.dom === 'content' ? 'grid' : c.dom] || ''}</span>
    <div><small>${live ? '지금 보는 곳' : '마지막으로 본 곳'} · ${GX_DOM[c.dom]}</small><b>${esc(c.name)}</b>${c.sub ? `<p>${esc(c.sub)}</p>` : ''}</div></div>
    ${c.stats.length ? `<div class="tiles">${c.stats.map(([t, v]) => `<div>${esc(t)}<b>${esc(v)}</b></div>`).join('')}</div>` : ''}</div>`;
}
function syncGxDash() {   // 갤럭시가 바뀌면 대시보드의 두 곳만 다시 그린다(나머지는 그대로)
  const a = document.getElementById('gxNow'), b = document.getElementById('gxLv');
  if (a) a.innerHTML = gxNowHTML();
  if (b) b.innerHTML = levelHTML();
}
/* 마이 대시보드 상태: open(기본 패널) · full(콘텐츠 영역까지 넓게) · closed(접어서 왼쪽 메뉴 위 프로필로) — 로그인 전에는 열리지 않는다 */
const dashCtl = () => `<span class="dh-r"><a href="#myclass">편집 ${I.pencil}</a>${S.dash === 'full'
  ? `<button class="dtog" data-dmode="open" title="기본 크기로" aria-label="마이 대시보드 기본 크기로">${I.shrink}</button>`
  : `<button class="dtog" data-dmode="full" title="크게 보기" aria-label="마이 대시보드 크게 보기">${I.expand}</button>`}<button class="dtog" data-dmode="closed" title="접기" aria-label="마이 대시보드 접기">${I.left}</button></span>`;
function dashParts() {
  const fresh = S.fresh, cs = S.careers.length ? S.careers : ['서비스 기획자'], c = careerOf(cs[0]);
  const learning = fresh ? [] : [['HLSP91107', 45], ['HLAP21002', 12], ['HLAP01419', 27], ['HLSP28153', 61]];
  const owned = fresh ? new Set() : new Set(c.pool.slice(0, 3));
  return {
    cs, c,
    prof: `<div class="prof"><img class="av" src="${AV}" alt="${NAME} 프로필"><div><b>${NAME}</b><small>HU 멤버 · ${esc(cs[0])}</small></div></div>`,
    career: `<div class="lbl">마이커리어</div><div class="bd"><div class="pills">${cs.map((k, i) => `<a class="pill ${i ? '' : 'on'}" href="#careers/${encodeURIComponent(k)}">${esc(k)}</a>`).join('')}${cs.length < 3 ? `<a class="pill" href="#careers">+ 추가</a>` : ''}</div></div>`,
    tiles: `<div class="tiles"><div>학습 시간<b>${fresh ? 0 : 6.4}<small>시간</small></b></div><div>완료<b>${fresh ? 0 : 3}<small>개</small></b></div><div>스킬 포인트<b>${fresh ? 0 : '1,240'}<small>pt</small></b></div><div>연속 학습<b>${fresh ? 0 : 5}<small>일</small></b></div></div>`,
    alarm: `<div class="tog"><span class="lbl" style="flex:1">오늘의 학습 알림</span><span class="sw ${S.alarm ? 'on' : ''}" id="sw" role="switch" aria-checked="${S.alarm}"></span></div>`,
    hist: `${fresh ? '<p class="note">학습을 시작하면 날마다 쌓인 시간이 여기에 그려져요.</p>' + hist(26, 0, 0, true) : hist(26, 9, 24)}<div class="fromto"><div>시작<b>11.02</b></div><div>오늘<b>11.27</b></div></div>`,
    skills: `<div class="checks2">${c.pool.slice(0, 8).map(k => `<a class="ck ${owned.has(k) ? 'on' : ''}" href="#skills/${encodeURIComponent(k)}"><i>${owned.has(k) ? '✓' : ''}</i><span>${esc(k)}</span></a>`).join('')}</div><p class="note">${owned.size}/${Math.min(8, c.pool.length)}개 스킬을 갖고 있어요</p>`,
    learning: learning.length ? learning.map(([cd, p]) => { const x = course(cd); return `<div class="mini" data-go="c/${cd}">${thumb(x)}<div><b>${esc(x.title)}</b><small><span class="prog"><i style="width:${p}%"></i></span>${p}%</small></div></div>`; }).join('') : '<p class="note">아직 학습 중인 강의가 없어요. 오른쪽 추천에서 첫 강의를 골라 보세요.</p>',
    saved: [...S.saved].map(cd => { const x = course(cd); return x ? `<div class="mini" data-go="c/${cd}">${thumb(x)}<div><b>${esc(x.title)}</b><small>${esc(x.cat2)}</small></div></div>` : ''; }).join('') || '<p class="note">하트를 누른 강의가 여기에 모여요.</p>',
  };
}
function renderDash() {
  const el = document.getElementById('dash'), body = document.body, desk = wide();
  const mode = !S.auth ? 'none' : desk ? S.dash : 'open';
  body.classList.toggle('no-dash', mode === 'none');
  body.classList.toggle('dash-off', mode === 'closed');
  body.classList.toggle('dash-full', mode === 'full');
  const lp = document.querySelector('.lp'); if (lp) lp.classList.toggle('on', !S.auth || mode === 'closed');
  if (mode === 'none') { el.innerHTML = ''; return; }
  const P = dashParts();
  if (mode === 'full') {
    el.innerHTML = `<div class="dh"><h2>마이 대시보드</h2>${dashCtl()}</div>
      <div class="fd"><section class="fbox fd-hero">${P.prof}<div class="lv" id="gxLv">${levelHTML()}</div><div class="fd-st"><div class="lbl">학습 현황</div>${pills(['이번 주', '이번 달', '올해'], S.period, 'data-period')}${P.tiles}</div></section>
      <div class="fd-grid">
        <section class="fbox" id="gxNow">${gxNowHTML()}</section>
        <section class="fbox">${P.career}<div class="lbl" style="margin-top:var(--spacing-6)">마이 스킬 · ${esc(P.c.k)}</div><div class="bd">${P.skills}</div></section>
        <section class="fbox"><div class="lbl">학습 시간 분포 · 최근 26일</div><div class="bd">${P.hist}</div></section>
        <section class="fbox span2"><div class="lbl">학습 중인 강의</div><div class="bd minis2">${P.learning}</div></section>
        <section class="fbox"><div class="lbl">관심 목록 · ${S.saved.size}</div><div class="bd">${P.saved}</div><div class="bd">${P.alarm}</div></section>
      </div></div>`;
  } else {
    el.innerHTML = `<div class="dh"><h2>마이 대시보드</h2>${desk ? dashCtl() : `<span class="dh-r"><a href="#myclass">편집 ${I.pencil}</a></span>`}</div>
      ${P.prof}
      <div class="lv" id="gxLv">${levelHTML()}</div>
      <section class="ds" id="gxNow">${gxNowHTML()}</section>
      <section class="ds">${P.career}</section>
      <section class="ds"><div class="lbl">학습 현황</div><div class="bd">${pills(['이번 주', '이번 달', '올해'], S.period, 'data-period')}${P.tiles}</div></section>
      <section class="ds">${P.alarm}</section>
      <section class="ds m-hide"><div class="lbl">학습 시간 분포 · 최근 26일</div><div class="bd">${P.hist}</div></section>
      ${fold('skill', `마이 스킬 · ${esc(P.c.k)}`, P.skills, 'm-hide')}
      ${fold('learning', '학습 중인 강의', P.learning, 'm-hide')}
      ${fold('saved', `관심 목록 · ${S.saved.size}`, P.saved, 'm-hide')}`;
  }
  const sw = document.getElementById('sw'); if (sw) sw.onclick = () => { S.alarm = !S.alarm; renderDash(); };
  el.querySelectorAll('[data-period]').forEach(b => b.onclick = () => { S.period = b.dataset.period; renderDash(); });
  el.querySelectorAll('[data-dmode]').forEach(b => b.onclick = () => setDash(b.dataset.dmode));
  el.querySelectorAll('[data-fold]').forEach(b => b.onclick = () => { S.open[b.dataset.fold] = !S.open[b.dataset.fold]; renderDash(); });
}
const saveDash = () => { try { localStorage.setItem('hu-v3-dash', S.dash); } catch (e) {} };
function setDash(mode) {   // 접기 ↔ 열기는 프로필 사진이 왼쪽 메뉴와 대시보드 사이를 부드럽게 오간다
  const from = S.dash, srcSel = from === 'closed' ? '.lp-av' : '.dash .prof .av', dstSel = mode === 'closed' ? '.lp-av' : '.dash .prof .av';
  const src = document.querySelector(srcSel), a = src && src.getBoundingClientRect(), url = src && src.src;   // 다시 그리기 전에 출발 위치를 잰다
  S.dash = mode; saveDash(); renderDash();
  if ((from === 'closed') !== (mode === 'closed')) flyAvatar(a, url, dstSel);
}
function flyAvatar(a, url, dstSel) {
  if (!a || !a.width || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const dst = document.querySelector(dstSel); if (!dst) return;
  const b = dst.getBoundingClientRect();
  const cl = document.createElement('img'); cl.src = url; cl.className = 'fly-av' + (dstSel === '.lp-av' ? ' to-lnb' : '');
  Object.assign(cl.style, { left: a.left + 'px', top: a.top + 'px', width: a.width + 'px', height: a.height + 'px' });
  document.body.appendChild(cl); dst.style.opacity = '0';
  const an = cl.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${b.left - a.left}px,${b.top - a.top}px) scale(${b.width / a.width})` }], { duration: 560, easing: 'cubic-bezier(.22,.9,.25,1)', fill: 'forwards' });
  an.onfinish = () => { dst.style.opacity = ''; cl.remove(); };
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
  if (!show) { if (GXV.fs) { GXV.fs = false; gxSync(); } return; }
  const mode = S.auth ? 'member' : 'guest';
  if (gxMode === mode && box.querySelector('iframe')) return;   // 같은 상태면 다시 불러오지 않는다(탐색 위치 유지)
  gxMode = mode; gxPreset(S.auth);
  document.getElementById('gxF').innerHTML = `<iframe src="${GX_SRC}" title="스킬 갤럭시"></iframe>`;
  const f = box.querySelector('iframe');
  f.addEventListener('load', () => gxBridge(f));
}
/* 갤럭시 크기: 기본은 화면 절반 높이 → 손잡이로 끌어 조절 · 크게 보기 · 전체 화면(Esc로 닫기) */
const GXV = { tall: false, fs: false };
function gxSync() {
  const box = document.getElementById('gx');
  box.classList.toggle('tall', GXV.tall); box.classList.toggle('fs', GXV.fs); document.body.classList.toggle('gx-fs', GXV.fs);
  box.querySelector('[data-gx="tall"]').innerHTML = GXV.tall ? `${I.shrink}작게 보기` : `${I.expand}크게 보기`;
  box.querySelector('[data-gx="tall"]').hidden = GXV.fs;
  box.querySelector('[data-gx="fs"]').innerHTML = GXV.fs ? `${I.close}전체 화면 닫기` : `${I.galaxy}전체 화면`;
}
(function gxControls() {
  const box = document.getElementById('gx'), fr = document.getElementById('gxF'), grip = document.getElementById('gxGrip');
  box.querySelectorAll('[data-gx]').forEach(b => b.onclick = () => { const k = b.dataset.gx; GXV[k] = !GXV[k]; if (k === 'tall') fr.style.height = ''; gxSync(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && GXV.fs) { GXV.fs = false; gxSync(); } });
  let sy = null, sh = 0;
  grip.addEventListener('pointerdown', e => { sy = e.clientY; sh = fr.getBoundingClientRect().height; grip.setPointerCapture(e.pointerId); box.classList.add('dragging'); });
  grip.addEventListener('pointermove', e => { if (sy === null) return; const h = Math.max(260, Math.min(innerHeight - 140, sh + e.clientY - sy)); fr.style.height = h + 'px'; GXV.tall = false; box.classList.remove('tall'); });
  const end = () => { if (sy === null) return; sy = null; box.classList.remove('dragging'); gxSync(); };
  grip.addEventListener('pointerup', end); grip.addEventListener('pointercancel', end);
  gxSync();
})();
function gxBridge(f) {
  let d; try { d = f.contentDocument; } catch (e) { return; }
  if (!d || !d.getElementById('ptop')) return;
  const st = d.createElement('style');   // HU 틀 안에서는 겹치는 것(갤럭시 로고·검색·달라진 점·로그인·내 프로필 카드)을 숨긴다 — 프로필은 대시보드로 옮김
  st.textContent = '.top .brand,.top .search,#openNotes,#loginBtn,#meCard{display:none!important}.top{justify-content:flex-end}';
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
    if (h2) GX.cur = { name: h2.textContent.trim(), sub: ((pt.querySelector('.sub') || {}).textContent || '').trim(), stats, dom };
    const dd = mc ? [...mc.querySelectorAll('.mc-info dd')].map(x => x.textContent.trim()) : [];
    if (S.auth && dd.length === 3) { const bar = mc.querySelector('.mc-bar i'); GX.me = { goal: dd[0], own: dd[1], to: dd[2], need: dd[2] !== '0/0', pct: bar ? parseInt(bar.style.width, 10) || 0 : 0 }; }
    try { localStorage.setItem('hu-v3-gx', JSON.stringify({ cur: GX.cur, me: GX.me })); } catch (e) {}
    syncGxDash();
  };
  let t; const mo = new MutationObserver(() => { clearTimeout(t); t = setTimeout(read, 80); });
  ['ptop', 'meCard'].forEach(id => { const x = d.getElementById(id); if (x) mo.observe(x, { childList: true, subtree: true, characterData: true }); });
  read();
}
function hist(n, a, b, empty) {
  let sd = 11; const r = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
  const hs = Array.from({ length: n }, (_, i) => empty ? 6 : Math.round(20 + Math.sin(i / 3) * 18 + r() * 50));
  return `<div class="hist">${hs.map((h, i) => `<i class="${!empty && i >= a && i <= b ? 'in' : ''}" style="height:${h}%"></i>`).join('')}${empty ? '' : `<span class="rng" style="left:${a / n * 100}%;right:${100 - (b + 1) / n * 100}%"></span><span class="h" style="left:${a / n * 100}%"></span><span class="h" style="left:${(b + 1) / n * 100}%"></span>`}</div>`;
}

/* ---------- 오른쪽: 홈 ---------- */
function renderGuest() {
  const trend = courses('HLAP01419', 'HLSP88622', 'HLAP00417', 'HLSP76039'), free = courses('HLSP28153', 'HLAP00612', 'HLSP20337', 'HLAP08209');
  view.innerHTML = `${mh(`${TOTAL.toLocaleString()}개 콘텐츠로 시작하는 HU`, '배운 만큼 성장이 눈에 보이는 새로운 경험을 만듭니다.', '<a class="btn line" href="#skills">스킬 갤럭시 둘러보기</a><a class="btn ink" href="#login">로그인하고 맞춤 추천 받기</a>')}
    ${introSec()}
    <section class="sec">${secH('지금 뜨고 있는 콘텐츠', '이번 주 학습자가 가장 많이 늘어난 콘텐츠', 'contents')}<div class="cards">${trend.map(c => card(c)).join('')}</div></section>
    <section class="sec">${secH('지금 시작하기 좋은 커리어', '', 'careers')}<div class="cards icons">${['팀장', '데이터 분석가'].map(k => careerCard(careerOf(k))).join('')}</div></section>
    <section class="sec">${secH('요즘 많이 보는 스킬', '', 'skills')}<div class="cards icons">${['생성형 AI 업무 활용', '코칭', '데이터 시각화', '프로젝트 관리'].map(k => skillCard(skillOf(k))).join('')}</div></section>
    <section class="sec">${secH('무료 콘텐츠', '로그인 없이 바로 볼 수 있어요', 'contents')}<div class="cards">${free.map(c => card(c)).join('')}</div></section>
    <section class="sec">${secH('프리미엄 과정', '학위·자격 수준의 심화 과정', 'premium')}<div class="cards">${PREM.slice(0, 4).map(premCard).join('')}</div></section>
    ${plusSec()}`;
  bindIntro();
}
function renderHome() {
  const cs = S.careers.map(careerOf), main = cs[0], used = new Set();
  const weekly = courses('HLSP91107', 'HLAP21002', 'HLSP18120', 'HLSP78181'); weekly.forEach(c => used.add(c.cd));
  const lack = main ? [...new Set(cs.flatMap(c => c.pool.slice(0, 4)))].slice(0, 4) : [];
  const lackRec = main ? match(lack, 4, used) : [], relRec = main ? match(cs.flatMap(c => c.pool.slice(4, 8)), 4, used) : [], carRec = main ? match([main.k, ...main.pool.slice(0, 3)], 4, used) : [];
  const trend = courses('HLAP01419', 'HLSP88622', 'HLAP00417', 'HLSP76039').filter(c => !used.has(c.cd)), free = courses('HLSP28153', 'HLAP00612', 'HLSP20337', 'HLAP08209').filter(c => !used.has(c.cd));
  view.innerHTML = `${mh(main ? `${NAME}님을 위한 추천` : `${NAME}님, 반가워요`, main ? `마이커리어 ${cs.map(c => esc(c.k)).join(', ')}에 맞춰 골랐어요` : '마이커리어를 고르면 추천이 나에게 맞춰져요', main ? '' : '<a class="btn ink" href="#mycareer">마이커리어 고르기</a>')}
    ${introSec()}
    <section class="sec">${secH('Weekly Top Pick', '이번 주 HU가 고른 콘텐츠', 'contents')}<div class="cards">${weekly.map(c => card(c)).join('')}</div></section>
    ${main ? `<section class="sec">${secH('부족한 스킬 보완하기', lack.map(esc).join(' · '), 'skills')}<div class="cards">${lackRec.map(c => card(c)).join('')}</div></section>
    <section class="sec">${secH('스킬 연관성 높은 콘텐츠', '마이커리어 스킬과 이어지는 콘텐츠', 'contents')}<div class="cards">${relRec.map(c => card(c)).join('')}</div></section>
    <section class="sec">${secH(`${esc(main.k)} 인기 콘텐츠`, `${esc(main.k)}${josa(main.k, '을', '를')} 목표로 한 학습자가 많이 들은 콘텐츠`, 'contents')}<div class="cards">${carRec.map(c => card(c)).join('')}</div></section>` : ''}
    <section class="sec">${secH('지금 뜨고 있는 콘텐츠', '', 'contents')}<div class="cards">${trend.map(c => card(c)).join('')}</div></section>
    <section class="sec">${secH('지금 시작하기 좋은 커리어', '', 'careers')}<div class="cards icons">${(main ? CAREERS.filter(c => !S.careers.includes(c.k) && c.tags.some(t => main.tags.includes(t))).slice(0, 2) : ['팀장', '데이터 분석가'].map(careerOf)).map(c => careerCard(c)).join('')}</div></section>
    <section class="sec">${secH('무료 콘텐츠', '', 'contents')}<div class="cards">${free.map(c => card(c)).join('')}</div></section>
    <section class="sec">${secH('프리미엄 과정', '학위·자격 수준의 심화 과정', 'premium')}<div class="cards">${PREM.slice(0, 4).map(premCard).join('')}</div></section>
    ${plusSec()}`;
  bindIntro();
}
const plusSec = () => `<section class="sec">${secH('HU+ 구독서비스', '휴넷의 구독 서비스를 HU에서 이어 볼 수 있어요')}<div class="cards icons">${[['휴넷CEO', '오늘의 비즈니스 인사이트', 'TODAY · 리더십의 기술'], ['위즈덤스프링', '인문학 기반 인사이트', '이번 주 테마 · 철학과 혁신'], ['리더십저니', '리더의 성장을 위한 맞춤형 솔루션', '매일의 리더십 팁']].map(([k, a, b]) => iconCard({ g: 'plus', title: k, sub: `${a} · ${b}`, left: 'HU+ 구독', right: `<span class="hrt">${I.out}</span>` })).join('')}</div></section>
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
      <div class="chips"><span class="chip ink">과정</span><span class="chip">${esc(f.cat)}</span><span class="chip">${esc(c.cat3)}</span></div>
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
        <div class="chips"><span class="chip ink">스킬</span><span class="chip">${esc(s.fam)}</span></div><h1>${esc(s.k)}</h1>
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
        <div class="chips"><span class="chip ink">커리어</span><span class="chip">${esc(c.fam)}</span></div><h1>${esc(c.k)}</h1>
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

/* ---------- [E02] 로그인 · 온보딩 (틀 없이) ---------- */
function renderLogin() {   // 레퍼런스(가입 화면): 흰 바탕 · 가운데 검은 로고 · 큰 제목 · 따로 떨어진 입력 칸 · 검은 버튼 · 아래 안내 줄
  view.innerHTML = `<div class="auth"><div class="ob login"><a class="mark sq" href="#guest" aria-label="비로그인 홈으로">HU</a>
    <h2>HU에 로그인</h2><p class="sub">휴넷 계정으로 HU를 시작하세요.</p>
    <div class="fld"><label><small>이메일 또는 기존 휴넷 아이디 *</small><input value="hunet1234" aria-label="이메일 또는 기존 휴넷 아이디"></label><label><small>비밀번호 *</small><input type="password" value="demo-pass" aria-label="비밀번호"></label></div>
    <div class="lrow"><span class="chk"><i>✓</i>이메일 저장</span><a href="javascript:void 0">비밀번호 재설정</a></div>
    <button class="btn ac lg full" id="loginGo">로그인</button>
    <p class="alt">아직 HU 계정이 없나요? <a href="javascript:void 0">회원가입</a></p>
    <p class="note">프로토타입이라 실제 로그인은 하지 않아요.</p></div></div>`;
  document.getElementById('loginGo').onclick = () => { S.auth = true; S.dash = 'open'; saveDash(); go('onboard'); };
}
function renderOnboard() {
  view.innerHTML = `<div class="auth"><div class="ob center"><div class="mark">!</div><h2>${NAME}님만의<br>학습을 준비할게요</h2><p class="sub">몇 가지만 고르면<br>맞춤 콘텐츠·스킬·커리어를 추천해요.</p>
    <div style="display:flex;gap:var(--spacing-2);margin-top:var(--spacing-6)"><button class="btn line" id="later" style="flex:0 0 120px">나중에 하기</button><a class="btn ac" href="#mycareer" style="flex:1">시작하기</a></div></div></div>`;
  document.getElementById('later').onclick = () => { S.careers = []; S.fresh = true; go('building'); };
}
const SUGGEST = ['팀장', '데이터 분석가', '서비스 기획자', '퍼포먼스 마케터', 'HRD 담당자', 'UX 디자이너', 'AI 기획자'];
function renderMyCareer() {
  view.innerHTML = `<div class="auth"><div class="ob"><h2>마이커리어를 선택하세요</h2>
    <p class="lbl" style="margin-top:var(--spacing-6)">선택한 마이커리어</p><div class="picked" id="picked" style="margin-top:var(--spacing-2)"></div><p class="hint">총 3개까지 복수 선택할 수 있어요</p>
    <label class="srch">${I.search}<input id="cq" placeholder="커리어를 검색해요" value="${esc(S.lq)}" autocomplete="off"></label><div id="sugg"></div>
    <p class="hint">원하는 커리어를 알려 주면 알맞은 콘텐츠를 찾아 드릴게요.</p>
    <div style="display:flex;gap:var(--spacing-2);margin-top:var(--spacing-6)"><a class="btn line" href="#onboard" style="flex:0 0 120px">닫기</a><button class="btn ac" id="cGo" style="flex:1">HU 시작하기</button></div></div></div>`;
  const inp = document.getElementById('cq');
  inp.oninput = () => { S.lq = inp.value; careerParts(); };
  document.getElementById('cGo').onclick = () => { S.fresh = true; go('building'); };
  careerParts();
}
function careerParts() {
  const q = S.lq.trim(), list = q ? CAREERS.filter(c => c.k.includes(q) || c.fam.includes(q) || c.pool.some(k => k.includes(q))).slice(0, 12) : SUGGEST.map(careerOf);
  document.getElementById('picked').innerHTML = S.careers.map(k => `<span class="p">${esc(k)}<button data-rm="${esc(k)}" aria-label="${esc(k)} 빼기">${I.x}</button></span>`).join('') + Array.from({ length: 3 - S.careers.length }, () => '<span class="e">비어 있음</span>').join('');
  document.getElementById('sugg').innerHTML = list.length ? `<div class="sugg">${list.map(c => { const on = S.careers.includes(c.k); return `<button class="${on ? 'on' : ''}" data-k="${esc(c.k)}" ${!on && S.careers.length >= 3 ? 'disabled' : ''}>${on ? '✓ ' : ''}${esc(c.k)}<i>${esc(c.fam)}</i></button>`; }).join('')}</div>` : `<div class="empty">'${esc(q)}'에 맞는 커리어가 없어요.</div>`;
  document.getElementById('cGo').disabled = !S.careers.length;
  view.querySelectorAll('.sugg button').forEach(x => x.onclick = () => { const k = x.dataset.k; if (S.careers.includes(k)) S.careers = S.careers.filter(y => y !== k); else if (S.careers.length < 3) S.careers.push(k); else toast('마이커리어는 3개까지 고를 수 있어요'); careerParts(); });
  view.querySelectorAll('[data-rm]').forEach(x => x.onclick = () => { S.careers = S.careers.filter(y => y !== x.dataset.rm); careerParts(); });
}
let buildT = [];
function renderBuilding() {
  const custom = S.careers.length > 0, items = custom ? ['관심 커리어 분석', '맞춤 콘텐츠 매칭', '나만의 홈 구성'] : ['인기 콘텐츠 모으기', '무료 콘텐츠 고르기', '홈 구성'];
  view.innerHTML = `<div class="auth"><div class="ob center"><div class="ring" id="ring" style="--p:8%"></div>
    <h2>${NAME}님,<br>${custom ? '맞춤 홈을 만들고 있어요' : '홈을 준비하고 있어요'}</h2><p class="sub">${custom ? '관심 커리어를 반영해 콘텐츠를 고르고 있어요' : '인기 콘텐츠로 홈을 꾸리고 있어요'}</p>
    ${custom ? `<div class="picked" style="margin-top:var(--spacing-5)">${S.careers.map(k => `<span class="p">${esc(k)}</span>`).join('')}</div>` : ''}
    <ul class="checks">${items.map(t => `<li><i>✓</i>${t}</li>`).join('')}</ul></div></div>`;
  buildT.forEach(clearTimeout); buildT = [];
  const lis = view.querySelectorAll('.checks li'), ring = document.getElementById('ring');
  lis.forEach((li, i) => buildT.push(setTimeout(() => { li.classList.add('on'); ring.style.setProperty('--p', `${(i + 1) / lis.length * 100}%`); }, 500 + i * 650)));
  buildT.push(setTimeout(() => { if (location.hash === '#building') go('home'); }, 500 + lis.length * 650 + 400));
}

/* ---------- 목록 오른쪽에서 밀려 나오는 정보 패널 — 카드를 누르면 화면을 바꾸지 않고, 그 흰 박스 안 오른쪽에 패널이 열리고 목록은 왼쪽으로 다시 정렬된다 ---------- */
let PK = null;   // { sec, keys, i, key }
const kvs = rows => `<div class="pk-kv">${rows.map(([t, v]) => `<div>${t}<b>${v}</b></div>`).join('')}</div>`;
const pkMini = c => `<button class="pk-mini" data-peek="c/${c.cd}">${thumb(c)}<span><b>${esc(c.title)}</b><small>${esc(c.cat2)}</small></span></button>`;
function peekContent(cd) {
  const c = course(cd); if (!c) return '';
  const f = info(cd), chapters = ['오리엔테이션', '핵심 개념 이해하기', '현업 사례로 적용하기', '정리와 실천 계획'];
  return `<div class="pk-media">${thumb(c)}</div>
    <div class="chips"><span class="chip ink">콘텐츠</span><span class="chip">${esc(f.cat)}</span><span class="chip">${esc(c.cat3)}</span></div>
    <h3 class="pk-t">${esc(c.title)}</h3><p class="pk-d">${esc(c.cat2)} 분야에서 바로 쓰는 ${esc(c.cat3)} 역량을 ${f.chap}차시로 정리한 과정이에요.</p>
    ${kvs([['차시', `${f.chap}차시`], ['학습 시간', `약 ${f.hours}시간`], ['평점', `★ ${f.rate}`], ['학습자', `${f.users.toLocaleString()}명`]])}
    <div class="pk-price">${f.pr.t === 'free' ? '무료' : f.pr.t === 'mem' ? '멤버십 전용' : `${won(f.pr.now)}<s>${won(f.pr.was)}</s><em>${f.pr.off}%</em>`}</div>
    <div class="pk-s"><div class="lbl">이 과정으로 얻는 스킬</div><div class="chips">${f.sks.map(k => `<button class="pill sm" ${skillOf(k) ? `data-peek="skills/${encodeURIComponent(k)}"` : ''}>${esc(k)} · +${f.pt}pt</button>`).join('')}</div></div>
    <div class="pk-s"><div class="lbl">커리큘럼</div><ol class="pk-cur">${chapters.map(t => `<li>${t}</li>`).join('')}</ol></div>
    <div class="pk-act"><button class="btn line hb ${S.saved.has(cd) ? 'on' : ''}" data-save="${cd}" aria-label="관심 목록">${I.heart}</button><button class="btn ink" data-apply>${S.auth ? '수강 신청하기' : '로그인하고 신청하기'}</button></div>
    <a class="pk-more" href="#c/${cd}">상세 페이지 전체 보기 ${I.right}</a>`;
}
function peekSkill(k) {
  const s = skillOf(k); if (!s) return '';
  const crs = CAREERS.filter(c => c.pool.includes(s.k)), cs = skillContents(s.k, 3);
  return `<div class="pk-media icn">${FI(s.g, 72)}</div>
    <div class="chips"><span class="chip ink">스킬</span><span class="chip">${esc(s.fam)}</span></div>
    <h3 class="pk-t">${esc(s.k)}</h3><p class="pk-d">${esc(s.k)}${josa(s.k, '은', '는')} ${esc(s.fam)} 영역의 스킬이에요. 업무에서 쓰면 판단이 빨라지고, 팀과 결과를 맞추기 쉬워져요.</p>
    ${kvs([['평균 포인트', `${hash(s.k) % 600 + 400}pt`], ['콘텐츠', `${countFor(s.k).toLocaleString()}개`], ['쓰는 커리어', `${crs.length}개`], ['내 상태', S.liked.has(s.k) ? '관심 스킬' : '-']])}
    ${crs.length ? `<div class="pk-s"><div class="lbl">이 스킬을 쓰는 커리어</div><div class="chips">${crs.slice(0, 6).map(c => `<button class="pill sm" data-peek="careers/${encodeURIComponent(c.k)}">${esc(c.k)}</button>`).join('')}</div></div>` : ''}
    <div class="pk-s"><div class="lbl">이 스킬을 키우는 콘텐츠</div>${cs.map(pkMini).join('')}</div>
    <div class="pk-act"><button class="btn ink" data-save="s:${esc(s.k)}">${S.liked.has(s.k) ? '관심 스킬에서 빼기' : '관심 스킬로 담기'}</button></div>
    <a class="pk-more" href="#skills/${encodeURIComponent(s.k)}">상세 페이지 전체 보기 ${I.right}</a>`;
}
function peekCareer(k) {
  const c = careerOf(k); if (!c) return '';
  const cs = match([c.k, ...c.pool.slice(0, 4)], 3), mine = S.careers.includes(c.k);
  return `<div class="pk-media icn">${CI(c.tags[0], 72)}</div>
    <div class="chips"><span class="chip ink">커리어</span><span class="chip">${esc(c.fam)}</span></div>
    <h3 class="pk-t">${esc(c.k)}</h3><p class="pk-d">${c.pool.slice(0, 3).map(esc).join(', ')} 같은 스킬로 ${esc(c.fam)} 업무를 이끄는 커리어예요.</p>
    ${kvs([['필요 스킬', `${c.pool.length}개`], ['보유자', `${(hash(c.k) % 5000 + 800).toLocaleString()}명`], ['콘텐츠', `${(countFor(c.pool[0]) + countFor(c.pool[1])).toLocaleString()}개`], ['직무군', esc(c.fam)]])}
    <div class="pk-s"><div class="lbl">필요 스킬</div><div class="chips">${c.pool.slice(0, 8).map(x => `<button class="pill sm" data-peek="skills/${encodeURIComponent(x)}">${esc(x)}</button>`).join('')}</div></div>
    <div class="pk-s"><div class="lbl">이 커리어에서 많이 학습하는 콘텐츠</div>${cs.map(pkMini).join('')}</div>
    <div class="pk-act"><button class="btn ${mine ? 'line' : 'ink'}" data-save="k:${esc(c.k)}">${mine ? '마이커리어에 담겨 있어요' : '마이커리어로 담기'}</button></div>
    <a class="pk-more" href="#careers/${encodeURIComponent(c.k)}">상세 페이지 전체 보기 ${I.right}</a>`;
}
function peekBody(key) {
  const [t, ...r] = key.split('/'), a = decodeURIComponent(r.join('/'));
  return t === 'c' ? peekContent(a) : t === 'skills' ? peekSkill(a) : t === 'careers' ? peekCareer(a) : '';
}
function peekDraw() {
  const { sec, keys, i, key } = PK, pk = sec.querySelector(':scope > .peek');
  pk.innerHTML = `<div class="pk-h"><button class="pk-nav" data-pk="-1" ${i <= 0 ? 'disabled' : ''} aria-label="이전">${I.left}</button><span class="pk-n">${i >= 0 ? `<b>${i + 1}</b> / ${keys.length}` : '연결된 항목'}</span><button class="pk-nav" data-pk="1" ${i < 0 || i >= keys.length - 1 ? 'disabled' : ''} aria-label="다음">${I.right}</button><span class="sp"></span><button class="pk-nav" data-pk="x" aria-label="닫기">${I.close}</button></div><div class="pk-b">${peekBody(key)}</div>`;
  pk.scrollTop = 0;
  sec.querySelectorAll('.card.on').forEach(c => c.classList.remove('on'));
  const cur = i >= 0 ? sec.querySelector(`.sec-main .card[data-go="${CSS.escape(keys[i])}"]`) : null;
  if (cur) { cur.classList.add('on'); cur.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
}
function openPeek(sec, key) {
  document.querySelectorAll('.sec.peeking').forEach(x => { if (x !== sec) closePeek(x); });
  if (!sec.querySelector(':scope > .sec-main')) {
    const m = document.createElement('div'); m.className = 'sec-main';
    while (sec.firstChild) m.appendChild(sec.firstChild);
    const pk = document.createElement('aside'); pk.className = 'peek'; pk.setAttribute('aria-label', '선택한 항목 정보');
    sec.append(m, pk); sec.classList.add('pk-ready'); void sec.offsetWidth;
  }
  const keys = [...sec.querySelectorAll('.sec-main .card[data-go]')].map(c => c.dataset.go).filter((k, j, a) => a.indexOf(k) === j);
  PK = { sec, keys, key, i: keys.indexOf(key) };
  peekDraw();
  sec.classList.add('peeking');
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
const ROUTES = { guest: renderGuest, home: renderHome, login: renderLogin, onboard: renderOnboard, mycareer: renderMyCareer, building: renderBuilding, contents: renderContents, c: renderContent, skills: renderSkills, careers: renderCareers, premium: renderPremium, search: a => renderSearch(a || 'AI'), myclass: renderMyclass };
function render() {
  const [p, ...rest] = location.hash.slice(1).split('/'), arg = rest.length ? decodeURIComponent(rest.join('/')) : '';
  const page = ROUTES[p] ? p : 'guest';
  if (page !== 'building') { buildT.forEach(clearTimeout); buildT = []; }
  if (['home', 'myclass', 'onboard', 'mycareer', 'building'].includes(page)) S.auth = true;
  if (page === 'guest' || page === 'login') S.auth = false;
  if (page === 'myclass' && !S.careers.length) S.careers = ['서비스 기획자'];
  document.body.classList.toggle('bare', ['login', 'onboard', 'mycareer', 'building'].includes(page));
  if (S.dash === 'full' && current[0] && (current[0] !== page || current[1] !== arg)) S.dash = 'open';   // 다른 화면으로 가면 크게 보기는 풀린다
  current = [page, arg];
  renderAll(); mainEl.scrollTop = 0; window.scrollTo(0, 0);
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
  const pn = e.target.closest('[data-pk]');
  if (pn) { const v = pn.dataset.pk; if (v === 'x') closePeek(PK.sec); else stepPeek(+v); return; }
  const pp = e.target.closest('[data-peek]');
  if (pp && PK) { const key = pp.dataset.peek; PK.key = key; PK.i = PK.keys.indexOf(key); peekDraw(); return; }
  if (e.target.closest('[data-apply]')) { S.auth ? toast('수강 신청 화면으로 이어져요 (시안)') : go('login'); return; }
  const t = e.target.closest('[data-go]'); if (!t || e.target.closest('a,button')) return;
  const sec = t.classList.contains('card') && t.closest('.sec');
  if (sec) { if (PK && PK.sec === sec && PK.key === t.dataset.go && sec.classList.contains('peeking')) closePeek(sec); else openPeek(sec, t.dataset.go); return; }
  go(t.dataset.go);
});
addEventListener('hashchange', render);
render();
