// =========================================================
// 콘텐츠 분류 2.5D 플랫 아이콘 (48 그리드, 외곽선 없이 면 + 명암 2단, 반사·그림자 없음, 채도 -10%)
// =========================================================
(() => {
  // 돌출 블록: 아랫면(진한 색) 위에 윗면을 얹어 두께감
  const blk = (x,y,w,h,top,side,r=2.5,d=2) => `<rect x="${x}" y="${y+d}" width="${w}" height="${h}" rx="${r}" fill="${side}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${top}"/>`;
  const hi = () => '';   // 하이라이트 반사 없음 (플랫)
  const svg = (inner) => `<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">${inner}</svg>`;
  const shadow = () => '';   // 바닥 그림자 없음 (플랫)

  window.CAT3D = [
    // 전체: 평면 블록 4개 — 다른 분류 색을 채도 한 단계 낮춘 모던 톤
    { c:'#3D4250', bg:'#F2F3F7', svg: svg(
      `<rect x="9" y="9" width="13.5" height="13.5" rx="3" fill="#E46A78"/>`
      + `<rect x="25.5" y="9" width="13.5" height="13.5" rx="3" fill="#4F7FE0"/>`
      + `<rect x="9" y="25.5" width="13.5" height="13.5" rx="3" fill="#2FA97A"/>`
      + `<rect x="25.5" y="25.5" width="13.5" height="13.5" rx="3" fill="#E8A93A"/>`) },
    // 리더십: 산 정상의 깃발
    { c:'#E43B4F', bg:'#FDE3E6', svg: svg(shadow(24,43,18)
      + `<path d="M4 41 L19 17 L34 41Z" fill="#B3B6D0"/><path d="M19 17 L34 41 L24 41Z" fill="#969ABA"/>`
      + `<path d="M16 41 L29 21 L44 41Z" fill="#8C90B6"/><path d="M29 21 L44 41 L35 41Z" fill="#6F759F"/>`
      + `<path d="M25.6 26.2 L29 21 L32.4 26.2 L30.4 25 L29 26.6 L27.4 25Z" fill="#fff"/>`
      + `<rect x="28.2" y="6" width="1.8" height="16" rx=".9" fill="#5A5E7F"/>`
      + `<path d="M30 6.5 L41 9.8 L30 13.4Z" fill="#E43B4F"/><path d="M30 10.2 L41 9.8 L30 13.4Z" fill="#B8283B"/>`) },
    // 비즈니스: 서류 가방
    { c:'#325BCD', bg:'#E1E9FD', svg: svg(shadow()
      + `<path d="M18 13 a3 3 0 0 1 3 -3 h6 a3 3 0 0 1 3 3 v3 h-3 v-2.5 h-6 V16 h-3Z" fill="#26408D"/>`
      + blk(7,15,34,24,'#416EE4','#2C4AAA',3.5,2) + hi(10,18,10,2.5)
      + `<rect x="7" y="24" width="34" height="3.2" fill="#3256B9"/>`
      + blk(20.5,22,7,7,'#F3BA40','#CD921D',2,2)) },
    // 업무생산성: 체크 클립보드
    { c:'#1C965D', bg:'#E0F4EA', svg: svg(shadow()
      + blk(10,8,28,33,'#25A96A','#187F4E',3.5,2)
      + `<rect x="13.5" y="12" width="21" height="26" rx="3" fill="#fff"/>`
      + blk(18,5.5,12,6,'#6B7084','#4C5063',3,2)
      + `<path d="M17 19.5 l2.4 2.4 l4 -4.4" stroke="#25A96A" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="25.5" y="18.6" width="6" height="2.4" rx="1.2" fill="#CED3DD"/>`
      + `<path d="M17 28.5 l2.4 2.4 l4 -4.4" stroke="#25A96A" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="25.5" y="27.6" width="6" height="2.4" rx="1.2" fill="#CED3DD"/>`) },
    // AI: 칩 + 반짝이
    { c:'#794EF4', bg:'#E9E1FD', svg: svg(shadow()
      + [14,20,26,32].map(p=>`<rect x="${p}" y="6.5" width="2.4" height="5" rx="1.2" fill="#A487F7"/><rect x="${p}" y="36.5" width="2.4" height="5" rx="1.2" fill="#A487F7"/><rect x="6.5" y="${p}" width="5" height="2.4" rx="1.2" fill="#A487F7"/><rect x="36.5" y="${p}" width="5" height="2.4" rx="1.2" fill="#A487F7"/>`).join('')
      + blk(10,10,28,27,'#8157F4','#5B34C9',4,2) + hi(13,13,9,2.5)
      + `<path d="M24 15.5 C25 21 26.5 22.5 32 23.5 C26.5 24.5 25 26 24 31.5 C23 26 21.5 24.5 16 23.5 C21.5 22.5 23 21 24 15.5Z" fill="#F4CF4E"/>`
      + `<path d="M38 3 C38.4 5.2 39 5.8 41.2 6.2 C39 6.6 38.4 7.2 38 9.4 C37.6 7.2 37 6.6 34.8 6.2 C37 5.8 37.6 5.2 38 3Z" fill="#F3BA40"/>`) },
    // 데이터 사이언스: 입체 막대그래프
    { c:'#179595', bg:'#DEF3F3', svg: svg(shadow(24,42,17)
      + [[8,26,'#7DD4D4','#4DBBBB','#359C9C'],[19,16,'#41C5C5','#1FA6A6','#138686'],[30,8,'#1FA6A6','#138686','#0C6B6B']].map(([x,y,t,f,s])=>
        `<path d="M${x} ${y} l5 -3 l5 3 l-5 3Z" fill="${t}"/><path d="M${x} ${y} l5 3 v${39-y-3} l-5 -3Z" fill="${f}"/><path d="M${x+5} ${y+3} l5 -3 v${39-y-3} l-5 3Z" fill="${s}"/>`).join('')) },
    // 인문/교양: 펼친 책
    { c:'#E27720', bg:'#FDEBDC', svg: svg(shadow(24,42,18)
      + `<path d="M4 15 Q14 12 24 16 Q34 12 44 15 V38 Q34 35 24 39 Q14 35 4 38Z" fill="#C66116"/>`
      + `<path d="M6 12 Q15 9.5 24 13.5 V36 Q15 32 6 34.5Z" fill="#FFFFFF"/><path d="M42 12 Q33 9.5 24 13.5 V36 Q33 32 42 34.5Z" fill="#EEE8E0"/>`
      + `<path d="M10 17 Q15 15.6 20 17.4 M10 21.5 Q15 20.1 20 21.9 M10 26 Q15 24.6 20 26.4 M28 17.4 Q33 15.6 38 17 M28 21.9 Q33 20.1 38 21.5" stroke="#EB9C5A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
      + `<path d="M31 9 h5 v11 l-2.5 -2 l-2.5 2Z" fill="#E27720"/>`) },
    // 어학: 겹친 말풍선 (A / 가)
    { c:'#2295E2', bg:'#DDEFFD', svg: svg(shadow(24,43,16)
      + `<path d="M22 30 l-3 7 l8 -7Z" fill="#CD921D"/>` + blk(18,17,26,17,'#F3BA40','#CD921D',5,2)
      + `<text x="31" y="29.6" text-anchor="middle" font-size="11" font-weight="800" fill="#6F4607" font-family="Pretendard Variable, sans-serif">가</text>`
      + `<path d="M12 21 l-2 7 l8 -6Z" fill="#1B71B2"/>` + blk(4,6,26,18,'#32A2F2','#1B71B2',5,2) + hi(8,9,7,2.4)
      + `<text x="17" y="19.4" text-anchor="middle" font-size="11.5" font-weight="800" fill="#fff" font-family="SUIT Variable, sans-serif">A</text>`) },
    // 라이프: 화분
    { c:'#5B9D25', bg:'#EAF4DE', svg: svg(shadow(24,43,13)
      + `<path d="M24 26 C24 18 22 14 15 10 C13.5 17 16 23 24 26Z" fill="#78BC36"/><path d="M24 26 C19 22 16.5 17 15 10 C19 14 22 18 24 26Z" fill="#5B9D25"/>`
      + `<path d="M24 26 C24 16 27 11 35 8 C36 16 32.5 23 24 26Z" fill="#8BD042"/><path d="M24 26 C28 20 31 14 35 8 C32 14 28.5 19 24 26Z" fill="#68AE2C"/>`
      + `<rect x="23" y="20" width="2" height="8" fill="#4C8320"/>`
      + `<path d="M13 27 h22 l-3 14 a2 2 0 0 1 -2 1.6 h-12 a2 2 0 0 1 -2 -1.6Z" fill="#D96941"/><path d="M24 27 h11 l-3 14 a2 2 0 0 1 -2 1.6 h-6Z" fill="#BA5532"/>`
      + `<rect x="11.5" y="25" width="25" height="5" rx="2" fill="#E57B51"/>`) },
    // 커리어: 계단 + 상승 화살표
    { c:'#F46A4C', bg:'#FDE7E0', svg: svg(shadow(24,43,18)
      + blk(6,31,12,9,'#F6876C','#D5583D',2,3) + blk(18,23,12,17,'#F47457','#CD4B32',2,3) + blk(30,15,12,25,'#F46A4C','#B8432C',2,3)
      + hi(8,33,5,2) + hi(20,25,5,2) + hi(32,17,5,2)
      + `<path d="M8 25 L19 15 L24 19 L35 8" stroke="#2B2D36" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M29.5 7 L36.5 6.6 L36 13.6" stroke="#2B2D36" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`) },
  ];
})();
