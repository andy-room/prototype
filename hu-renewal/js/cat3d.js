// =========================================================
// 콘텐츠 분류 2.5D 플랫 아이콘 (48 그리드, 외곽선 없이 면 + 명암 2~3단)
// =========================================================
(() => {
  // 돌출 블록: 아랫면(진한 색) 위에 윗면을 얹어 두께감
  const blk = (x,y,w,h,top,side,r=4,d=3) => `<rect x="${x}" y="${y+d}" width="${w}" height="${h}" rx="${r}" fill="${side}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${top}"/>`;
  const hi = (x,y,w,h,r=2,o=.35) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#fff" opacity="${o}"/>`;
  const svg = (inner) => `<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">${inner}</svg>`;
  const shadow = (cx=24, cy=43, rx=15) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="2.6" fill="#000" opacity=".08"/>`;

  window.CAT3D = [
    // 전체: 색 블록 4개
    { c:'#5B5BF0', bg:'#F0F0FF', svg: svg(shadow(24,43,16)
      + blk(7,8,15,15,'#FF5A6E','#D93A50') + hi(10,10.5,6,2.5)
      + blk(26,8,15,15,'#3D8BFF','#2068D6') + hi(29,10.5,6,2.5)
      + blk(7,25,15,15,'#20C47A','#119A5C') + hi(10,27.5,6,2.5)
      + blk(26,25,15,15,'#FFC23D','#E09A12') + hi(29,27.5,6,2.5)) },
    // 리더십: 산 정상의 깃발
    { c:'#F0384E', bg:'#FFF0F2', svg: svg(shadow(24,43,18)
      + `<path d="M4 41 L19 17 L34 41Z" fill="#B9BCD6"/><path d="M19 17 L34 41 L24 41Z" fill="#9A9EC0"/>`
      + `<path d="M16 41 L29 21 L44 41Z" fill="#8F94BD"/><path d="M29 21 L44 41 L35 41Z" fill="#7177A6"/>`
      + `<path d="M25.6 26.2 L29 21 L32.4 26.2 L30.4 25 L29 26.6 L27.4 25Z" fill="#fff"/>`
      + `<rect x="28.2" y="6" width="1.8" height="16" rx=".9" fill="#5A5F86"/>`
      + `<path d="M30 6.5 L41 9.8 L30 13.4Z" fill="#F0384E"/><path d="M30 10.2 L41 9.8 L30 13.4Z" fill="#C81F35"/>`) },
    // 비즈니스: 서류 가방
    { c:'#2E5BD9', bg:'#EEF3FF', svg: svg(shadow()
      + `<path d="M18 13 a3 3 0 0 1 3 -3 h6 a3 3 0 0 1 3 3 v3 h-3 v-2.5 h-6 V16 h-3Z" fill="#203E99"/>`
      + blk(7,15,34,24,'#3E6FF0','#2448B8',5,4) + hi(10,18,10,2.5)
      + `<rect x="7" y="24" width="34" height="3.2" fill="#2A54C8"/>`
      + blk(20.5,22,7,7,'#FFC23D','#E09A12',2,2)) },
    // 업무생산성: 체크 클립보드
    { c:'#14A361', bg:'#EAF9F1', svg: svg(shadow()
      + blk(10,8,28,33,'#1DB86E','#128A51',5,3)
      + `<rect x="13.5" y="12" width="21" height="26" rx="3" fill="#fff"/>`
      + blk(18,5.5,12,6,'#6B7084','#4C5063',3,2)
      + `<path d="M17 19.5 l2.4 2.4 l4 -4.4" stroke="#1DB86E" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="25.5" y="18.6" width="6" height="2.4" rx="1.2" fill="#D5DAE3"/>`
      + `<path d="M17 28.5 l2.4 2.4 l4 -4.4" stroke="#1DB86E" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="25.5" y="27.6" width="6" height="2.4" rx="1.2" fill="#D5DAE3"/>`) },
    // AI: 칩 + 반짝이
    { c:'#7B4DFF', bg:'#F3EEFF', svg: svg(shadow()
      + [14,20,26,32].map(p=>`<rect x="${p}" y="6.5" width="2.4" height="5" rx="1.2" fill="#A98BFF"/><rect x="${p}" y="36.5" width="2.4" height="5" rx="1.2" fill="#A98BFF"/><rect x="6.5" y="${p}" width="5" height="2.4" rx="1.2" fill="#A98BFF"/><rect x="36.5" y="${p}" width="5" height="2.4" rx="1.2" fill="#A98BFF"/>`).join('')
      + blk(10,10,28,27,'#8457FF','#5B2FD6',6,3) + hi(13,13,9,2.5)
      + `<path d="M24 15.5 C25 21 26.5 22.5 32 23.5 C26.5 24.5 25 26 24 31.5 C23 26 21.5 24.5 16 23.5 C21.5 22.5 23 21 24 15.5Z" fill="#FFD84D"/>`
      + `<path d="M38 3 C38.4 5.2 39 5.8 41.2 6.2 C39 6.6 38.4 7.2 38 9.4 C37.6 7.2 37 6.6 34.8 6.2 C37 5.8 37.6 5.2 38 3Z" fill="#FFC23D"/>`) },
    // 데이터 사이언스: 입체 막대그래프
    { c:'#0FA3A3', bg:'#E8F8F8', svg: svg(shadow(24,42,17)
      + [[8,26,'#7FDCDC','#4CC4C4','#2FA8A8'],[19,16,'#3FD0D0','#16B5B5','#0B9292'],[30,8,'#16B5B5','#0B9292','#067575']].map(([x,y,t,f,s])=>
        `<path d="M${x} ${y} l5 -3 l5 3 l-5 3Z" fill="${t}"/><path d="M${x} ${y} l5 3 v${39-y-3} l-5 -3Z" fill="${f}"/><path d="M${x+5} ${y+3} l5 -3 v${39-y-3} l-5 3Z" fill="${s}"/>`).join('')) },
    // 인문/교양: 펼친 책
    { c:'#F07A1A', bg:'#FFF3E8', svg: svg(shadow(24,42,18)
      + `<path d="M4 15 Q14 12 24 16 Q34 12 44 15 V38 Q34 35 24 39 Q14 35 4 38Z" fill="#D9620A"/>`
      + `<path d="M6 12 Q15 9.5 24 13.5 V36 Q15 32 6 34.5Z" fill="#FFFFFF"/><path d="M42 12 Q33 9.5 24 13.5 V36 Q33 32 42 34.5Z" fill="#F4EFE9"/>`
      + `<path d="M10 17 Q15 15.6 20 17.4 M10 21.5 Q15 20.1 20 21.9 M10 26 Q15 24.6 20 26.4 M28 17.4 Q33 15.6 38 17 M28 21.9 Q33 20.1 38 21.5" stroke="#F5A15A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
      + `<path d="M31 9 h5 v11 l-2.5 -2 l-2.5 2Z" fill="#F07A1A"/>`) },
    // 어학: 겹친 말풍선 (A / 가)
    { c:'#1C9BF0', bg:'#EAF6FF', svg: svg(shadow(24,43,16)
      + `<path d="M22 30 l-3 7 l8 -7Z" fill="#E09A12"/>` + blk(18,17,26,17,'#FFC23D','#E09A12',7,3)
      + `<text x="31" y="29.6" text-anchor="middle" font-size="11" font-weight="800" fill="#7A4A00" font-family="Pretendard Variable, sans-serif">가</text>`
      + `<path d="M12 21 l-2 7 l8 -6Z" fill="#1176C2"/>` + blk(4,6,26,18,'#2EA8FF','#1176C2',7,3) + hi(8,9,7,2.4)
      + `<text x="17" y="19.4" text-anchor="middle" font-size="11.5" font-weight="800" fill="#fff" font-family="SUIT Variable, sans-serif">A</text>`) },
    // 라이프: 화분
    { c:'#5DAA1E', bg:'#F1F9E8', svg: svg(shadow(24,43,13)
      + `<path d="M24 26 C24 18 22 14 15 10 C13.5 17 16 23 24 26Z" fill="#7CCB2E"/><path d="M24 26 C19 22 16.5 17 15 10 C19 14 22 18 24 26Z" fill="#5DAA1E"/>`
      + `<path d="M24 26 C24 16 27 11 35 8 C36 16 32.5 23 24 26Z" fill="#8FDB3F"/><path d="M24 26 C28 20 31 14 35 8 C32 14 28.5 19 24 26Z" fill="#6BBD24"/>`
      + `<rect x="23" y="20" width="2" height="8" fill="#4E8E1A"/>`
      + `<path d="M13 27 h22 l-3 14 a2 2 0 0 1 -2 1.6 h-12 a2 2 0 0 1 -2 -1.6Z" fill="#E46A3E"/><path d="M24 27 h11 l-3 14 a2 2 0 0 1 -2 1.6 h-6Z" fill="#C9532A"/>`
      + `<rect x="11.5" y="25" width="25" height="5" rx="2" fill="#F07D50"/>`) },
    // 커리어: 계단 + 상승 화살표
    { c:'#FF6B4A', bg:'#FFF1ED', svg: svg(shadow(24,43,18)
      + blk(6,31,12,9,'#FF8A6E','#E0583A',2,3) + blk(18,23,12,17,'#FF7656','#D94A2E',2,3) + blk(30,15,12,25,'#FF6B4A','#C73E24',2,3)
      + hi(8,33,5,2) + hi(20,25,5,2) + hi(32,17,5,2)
      + `<path d="M8 25 L19 15 L24 19 L35 8" stroke="#2B2D36" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M29.5 7 L36.5 6.6 L36 13.6" stroke="#2B2D36" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`) },
  ];
})();
