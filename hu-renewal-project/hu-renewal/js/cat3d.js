// =========================================================
// 콘텐츠 분류 아이콘 — 그라데이션 면 + 반투명 레이어, 타일 없음 (48 그리드)
// 한 색 안에서 밝은 → 진한 그라데이션, 포인트 요소는 1~2개만
// =========================================================
(() => {
  let n = 0;
  // 그라데이션 정의 (아이콘마다 고유 id)
  const lg = (c1, c2, dir='d') => {
    const id = `cg${n++}`, xy = dir==='v' ? 'x1="0" y1="0" x2="0" y2="1"' : 'x1="0" y1="0" x2="1" y2="1"';
    return { id, def:`<linearGradient id="${id}" ${xy}><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>` };
  };
  const svg = (defs, inner) => `<svg viewBox="0 0 48 48" width="52" height="52" aria-hidden="true"><defs>${defs.map(d=>d.def).join('')}</defs>${inner}</svg>`;
  const star = (cx, cy, r, fill, op=1) => `<path d="M${cx} ${cy-r} C${cx+r*.16} ${cy-r*.16} ${cx+r*.16} ${cy-r*.16} ${cx+r} ${cy} C${cx+r*.16} ${cy+r*.16} ${cx+r*.16} ${cy+r*.16} ${cx} ${cy+r} C${cx-r*.16} ${cy+r*.16} ${cx-r*.16} ${cy+r*.16} ${cx-r} ${cy} C${cx-r*.16} ${cy-r*.16} ${cx-r*.16} ${cy-r*.16} ${cx} ${cy-r}Z" fill="${fill}" opacity="${op}"/>`;

  const I = [];

  // 전체: 반투명 사각 4개 그리드
  { const a = lg('#4C8DFF','#2F5BFF'), b = lg('#7FD6FF','#3FB2FF');
    I.push({ c:'#2F5BFF', svg: svg([a,b],
      `<rect x="6" y="6" width="17" height="17" rx="5" fill="url(#${a.id})"/>`
      + `<rect x="25" y="6" width="17" height="17" rx="5" fill="url(#${b.id})" opacity=".85"/>`
      + `<rect x="6" y="25" width="17" height="17" rx="5" fill="url(#${b.id})" opacity=".85"/>`
      + `<rect x="25" y="25" width="17" height="17" rx="5" fill="url(#${a.id})"/>`) }); }

  // 리더십: 깃발 2겹
  { const a = lg('#FF6B81','#F2385A'), p = lg('#FFB3C0','#FF8FA3','v');
    I.push({ c:'#F2385A', svg: svg([a,p],
      `<rect x="10" y="5" width="3.4" height="38" rx="1.7" fill="url(#${p.id})"/>`
      + `<path d="M13.4 10 C21 6 26 14 38 9 V27 C26 32 21 24 13.4 28Z" fill="#FF9AAC" opacity=".55" transform="translate(3 3)"/>`
      + `<path d="M13.4 8 C21 4 26 12 38 7 V25 C26 30 21 22 13.4 26Z" fill="url(#${a.id})"/>`) }); }

  // 비즈니스: 서류 가방 (반투명 앞판)
  { const a = lg('#5A8CFF','#3148E6'), h = lg('#7FA6FF','#4A6BF0','v');
    I.push({ c:'#3148E6', svg: svg([a,h],
      `<path d="M17 14 V10.5 a3.5 3.5 0 0 1 3.5 -3.5 h7 a3.5 3.5 0 0 1 3.5 3.5 V14" fill="none" stroke="url(#${h.id})" stroke-width="3.4"/>`
      + `<rect x="5" y="14" width="38" height="27" rx="7" fill="url(#${a.id})"/>`
      + `<path d="M5 25 H43 V34 a7 7 0 0 1 -7 7 H12 a7 7 0 0 1 -7 -7Z" fill="#fff" opacity=".22"/>`
      + `<rect x="20.5" y="22" width="7" height="6.5" rx="2" fill="#fff" opacity=".95"/>`) }); }

  // 업무생산성: 겹친 종이 + 체크
  { const a = lg('#34D399','#10A971');
    I.push({ c:'#10A971', svg: svg([a],
      `<rect x="15" y="5" width="26" height="32" rx="5" fill="#7EE8C0" opacity=".55"/>`
      + `<rect x="7" y="11" width="28" height="32" rx="5" fill="url(#${a.id})"/>`
      + `<path d="M14 27.5 l4.6 4.6 L28 22" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`) }); }

  // AI: 반짝이 별 2개
  { const a = lg('#A57CFF','#6A3DF5'), b = lg('#D4BFFF','#A57CFF');
    I.push({ c:'#6A3DF5', svg: svg([a,b],
      star(21, 27, 17, `url(#${a.id})`) + star(37, 11, 7.5, `url(#${b.id})`) + star(39, 33, 4, `url(#${b.id})`, .8)) }); }

  // 데이터 사이언스: 반투명 막대
  { const a = lg('#2DD4BF','#0EA5A0','v'), b = lg('#7CE7D9','#2DD4BF','v');
    I.push({ c:'#0EA5A0', svg: svg([a,b],
      `<rect x="5" y="24" width="7.5" height="18" rx="3.75" fill="url(#${b.id})" opacity=".7"/>`
      + `<rect x="15" y="10" width="7.5" height="32" rx="3.75" fill="url(#${a.id})"/>`
      + `<rect x="25" y="19" width="7.5" height="23" rx="3.75" fill="url(#${b.id})" opacity=".7"/>`
      + `<rect x="35" y="6" width="7.5" height="36" rx="3.75" fill="url(#${a.id})"/>`) }); }

  // 인문/교양: 펼친 책
  { const a = lg('#FFB547','#FF8A1F'), b = lg('#FFD089','#FFB547');
    I.push({ c:'#FF8A1F', svg: svg([a,b],
      `<path d="M24 13 C18 8.5 11 8 4 10 V38 C11 36 18 36.5 24 41Z" fill="url(#${b.id})" opacity=".85"/>`
      + `<path d="M24 13 C30 8.5 37 8 44 10 V38 C37 36 30 36.5 24 41Z" fill="url(#${a.id})"/>`
      + `<path d="M30 9.4 V20 l3 -2.2 l3 2.2 V8.5" fill="#fff" opacity=".9"/>`) }); }

  // 어학: 겹친 말풍선
  { const a = lg('#4FC3FF','#1E88FF'), b = lg('#9BE0FF','#5CC8FF');
    I.push({ c:'#1E88FF', svg: svg([a,b],
      `<path d="M22 6 h14 a8 8 0 0 1 8 8 v4 a8 8 0 0 1 -8 8 h-1 l1 5 -6.5 -5 H22 a8 8 0 0 1 -8 -8 v-4 a8 8 0 0 1 8 -8Z" fill="url(#${b.id})" opacity=".75"/>`
      + `<path d="M12 17 h14 a8 8 0 0 1 8 8 v5 a8 8 0 0 1 -8 8 H17 l-7 5 1.5 -5.4 A8 8 0 0 1 4 30 v-5 a8 8 0 0 1 8 -8Z" fill="url(#${a.id})"/>`
      + `<rect x="10" y="24.5" width="16" height="3" rx="1.5" fill="#fff" opacity=".95"/><rect x="10" y="30" width="10" height="3" rx="1.5" fill="#fff" opacity=".75"/>`) }); }

  // 라이프: 겹친 하트 2개 (뒤 하트 반투명)
  { const a = lg('#FF8FB1','#FF4F7E'), b = lg('#FFC1D3','#FF8FB1');
    const heart = (dx, dy, k, fill, op=1) => `<path transform="translate(${dx} ${dy}) scale(${k})" d="M20 36 C8 28.5 3 22.5 3 16 C3 11 6.8 7 11.6 7 C15 7 18 9 20 11.8 C22 9 25 7 28.4 7 C33.2 7 37 11 37 16 C37 22.5 32 28.5 20 36Z" fill="${fill}" opacity="${op}"/>`;
    I.push({ c:'#FF4F7E', svg: svg([a,b],
      heart(18, 2, .72, `url(#${b.id})`, .8) + heart(2, 8, 1, `url(#${a.id})`)) }); }

  // 커리어: 계단 + 상승 화살표
  { const a = lg('#7C83FF','#4B4FE0','v'), r = lg('#A78BFA','#6D5BF2');
    I.push({ c:'#4B4FE0', svg: svg([a,r],
      `<rect x="4" y="30" width="12" height="13" rx="3" fill="url(#${a.id})" opacity=".5"/>`
      + `<rect x="18" y="22" width="12" height="21" rx="3" fill="url(#${a.id})" opacity=".75"/>`
      + `<rect x="32" y="14" width="12" height="29" rx="3" fill="url(#${a.id})"/>`
      + `<path d="M5 22 L20 9.5 L25 14 L35 5.5" fill="none" stroke="url(#${r.id})" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`
      + `<path d="M29.5 4.5 L37 4 L36.5 11.5" fill="none" stroke="url(#${r.id})" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`) }); }

  window.CAT3D = I;
})();
