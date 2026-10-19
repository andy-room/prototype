# ilearn-glass-orb

연수원 AI Tutor(iLearn) 플로팅 버튼의 주목도 프로토타입.
유색 퀵메뉴 위에서 버튼이 얼마나 눈에 들어오는지를 색 대비 · 부양 그림자 · 반복 모션 세 축으로 비교한다.

- `index.html` 단일 파일, 외부 라이브러리 없음 (CSS/SVG만 사용)
- 처음엔 가로형 캡슐(아이콘 + 안내 문구 + X)로 펼쳐져 있고, X를 누르면 문구 영역이 접히며 아이콘만 남은 구슬이 된다
- 배경색·안개 순환·입체 음영·그림자·부양은 펼친 캡슐과 접힌 구슬이 같은 결로 공유하고, 상단 유리 광택(`.glass::after`)만 접힌 구슬에서 보인다
- 아이런 심볼은 Figma 「iLearn UI 리뉴얼」 컴포넌트의 logo 벡터(SVG)를 CSS 마스크(`--icon-mask`)로 사용 → 색은 `--sym` 변수로 제어

## 조정 포인트
- 플로팅 전체 크기: `--ilearn-scale` (현재 .88 — 구슬 64px 기준 약 56px, 안내 문구 15px → 약 13px)
- 안내 문구 접기·펼치기: `.orb[data-open]` (`.tail` 의 `grid-template-columns` 1fr ↔ 0fr)
  - 접힘: 문구·X ease-in 으로 빠짐 → 캡슐 .4s `cubic-bezier(.86,0,.07,1)` (전체 약 .45s)
  - 펼침: 캡슐 .6s `cubic-bezier(.16,1,.3,1)` → 문구가 뒤따라 나타남
- 접힌 구슬 마우스 오버 시 확대: `--hover-scale` (기본 1.08, .25s)
- 구체 색: `.orb-wrap[data-tone]` 의 `--orb-c0/c1/c2`
- 구슬 속 안개 색: `.orb-wrap[data-tone]` 의 `--mist-a/b/deep`
- 구슬 그림자: `--sh-y`, `--sh-blur`, `--sh-a`
- 둥실 부양 (`.stage[data-float]`): `--float-d`(부양 주기), `--float-y`(부양 높이)
- 구슬 속 움직임 (`.stage[data-inner]`): `--swirl-d`(안개 순환 주기), `--turn-d`(심볼 선회 주기)
