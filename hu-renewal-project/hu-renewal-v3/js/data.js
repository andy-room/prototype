// HU 리뉴얼 v2 — 강의 데이터 헬퍼
// 규칙: 이 프로토타입의 이미지는 전부 AI 제작 강의 썸네일이고, 제목은 그 강의의 강의명(name)을 그대로 쓴다.
//   → 화면에는 항상 course('과정코드')로 꺼낸 { title, img }를 짝으로 쓴다. 제목이나 이미지 주소를 손으로 적지 않는다.
// 강의 고르기: data/courses.js 의 HU_COURSES(7,368개)에서 과정코드(cd)를 찾아 아래 목록에 넣는다.

const course = cd => {
  const c = HU_COURSE(cd);
  if (!c) { console.error(`[hu-renewal-v2] AI 썸네일 목록에 없는 과정코드: ${cd}`); return null; }
  return { cd: c.cd, title: c.name, img: c.img, cat1: c.cat1, cat2: c.cat2, cat3: c.cat3, cp: c.cp };
};
const courses = (...cds) => cds.map(course).filter(Boolean);

// 강의 썸네일: course()로 꺼낸 강의만 받는다(AI 썸네일 + 강의명 짝 유지). inner는 썸네일 위에 얹을 배지 등
const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const thumb = (c, cls = '', inner = '') => `<div class="th ${cls}">${inner}<img src="${c.img}" alt="${esc(c.title)}" loading="lazy" decoding="async" onload="this.parentNode.classList.add('ok')" onerror="this.parentNode.classList.add('ok');this.remove()"></div>`;

// 화면에 쓸 강의 묶음은 여기에 과정코드로 정의한다. 예) const PICKS = courses('HLAP00412', 'HLAP00417');
