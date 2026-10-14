# Motion Styles (from Jitter templates)

Jitter 템플릿에서 읽어낸 모션 스타일 스펙 모음. 각 폴더에 사람이 읽는 `README.md`와 기계가 읽는 `motion-style.json`이 한 쌍으로 들어 있다. 새 템플릿을 추가할 때는 같은 구조로 폴더를 하나 더 만든다.

| 폴더 | 템플릿 | 한 줄 요약 |
|---|---|---|
| [petals](petals/) | Gradients: Petals | 네이비 배경 위 그라데이션 원 6개가 Exclusion 블렌드로 겹치며 3비트로 스케일·회전, 필름 그레인 오버레이. 4.55s, 텍스트 없음 |
| [blur-bubbles-carousel](blur-bubbles-carousel/) | Blur: Bubbles & Carousel | 블랙 캔버스에 사진 버블 링이 블러와 함께 스핀 인, 타이틀 블러 인/아웃, 히어로 버블 줌 → 세로 캐러셀 → 블러 아웃. 14s, Poppins |

## 사용법

AI 어시스턴트(또는 본인)에게 해당 폴더의 `motion-style.json`을 넘기고 "이 스펙의 구조·이징·타이밍을 유지하되 내 에셋으로 교체해 모션을 만들어줘"라고 요청한다. 구체적인 브리프 예시는 각 폴더 README의 "How to use with your own assets" 참고.

## 출처

모든 값은 jitter.video 템플릿 편집기에서 읽었으며, 타임라인 바에서 읽은 시작 시간은 근사치다. 파생물 공개 시 템플릿 라이선스를 확인할 것.
