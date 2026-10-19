# ilearn-glass-orb

연수원 AI Tutor(iLearn) 플로팅 버튼의 주목도 프로토타입.
유색 퀵메뉴 위에서 버튼이 얼마나 눈에 들어오는지를 색 대비 · 부양 그림자 · 반복 모션 세 축으로 비교한다.

- `index.html` 단일 파일, 외부 라이브러리 없음 (CSS/SVG만 사용)
- 아이런 심볼은 PNG 알파를 CSS 마스크로 사용 → 색은 `--sym` 변수로 제어
- 최종 적용 시 심볼은 SVG 원본으로 교체 권장 (같은 마스크 자리에 파일만 교체)

## 조정 포인트
- 구체 색: `.orb-wrap[data-tone]` 의 `--orb-c0/c1/c2`
- 구슬 속 안개 색: `.orb-wrap[data-tone]` 의 `--mist-a/b/deep`
- 그림자: `--sh-y`, `--sh-blur`, `--sh-a`
- 모션 주기: `--float-d`, `--float-y`, `--ping-d`(링 주기), `--swirl-d`(안개 순환 주기)
