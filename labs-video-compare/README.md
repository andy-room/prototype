# labs-video-compare

커넥트 화상 개선안 vs 기존안 비교 — https://labs-video-compare.vercel.app 에 올라가 있던 한 파일을 수정할 수 있게 다시 나눈 것.

| 파일 | 내용 |
|---|---|
| `index.html` | 비교 화면 (왼쪽 단계 목록, 화면 크기, 나란히/개선안만/기존안만, 크게 보기). 단계 목록은 `STAGES` |
| `proto.html` | 프로토타입 본체. 혼자 열어도 되고 `proto.html?legacy=1` 이 기존안 |
| `assets/` | 아이콘·사진 (`assets/v/` 는 화상 화면용) |
| `fonts/` | Pretendard (SUIT 이름도 같은 파일을 쓴다) |
| `build.py` | 위 파일들을 공유용 한 파일 `dist/index.html` 로 묶는다 |

## 수정하고 보기

iframe 끼리 서로 불러야 해서 파일을 더블클릭하면 안 되고, 저장소 맨 위(`prototype/`)에서 로컬 서버로 연다.

```bash
python3 -m http.server 8765
```

→ http://localhost:8765/labs-video-compare/

## 다시 한 파일로 묶기

```bash
python3 build.py
```

`dist/index.html` 하나에 글꼴·그림·프로토타입이 모두 들어간다. 이 파일만 올리면 된다.
