# ilearn-glass-orb

연수원 AI Tutor(iLearn) 플로팅 버튼의 주목도 프로토타입.
유색 퀵메뉴 위에서 버튼이 얼마나 눈에 들어오는지를 색 대비 · 부양 그림자 · 반복 모션 세 축으로 비교한다.

- `index.html` 단일 파일, 외부 라이브러리 없음 (CSS/SVG만 사용)
- 아이런 심볼은 PNG 알파를 CSS 마스크로 사용 → 색은 `--sym` 변수로 제어
- 최종 적용 시 심볼은 SVG 원본으로 교체 권장 (같은 마스크 자리에 파일만 교체)

## 조정 포인트
- 플로팅 전체 크기: `--ilearn-scale` (현재 .8 — 구슬 64px 기준 약 51px, 말풍선 글자 15px → 12px)
- 구체 색: `.orb-wrap[data-tone]` 의 `--orb-c0/c1/c2`
- 구슬 속 안개 색: `.orb-wrap[data-tone]` 의 `--mist-a/b/deep`
- 구슬 그림자: `--sh-y`, `--sh-blur`, `--sh-a`
- 로고 플랫 그림자: `.sym` 의 `drop-shadow(2.5px 2.5px 0 …)`, 색은 `--sym-shadow` (마스크 로고라 `.icon` 이 아니라 `.sym` 에 준다)
- 둥실 부양 (`.stage[data-float]`): `--float-d`(부양 주기), `--float-y`(부양 높이)
- 구슬 속 움직임 (`.stage[data-inner]`): `--swirl-d`(안개 순환 주기), `--turn-d`(심볼 선회 주기)
