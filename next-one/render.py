"""Single Gesture — '다음 하나' 핵심 루프 캔버스 (python3 render.py → next-one.png)"""
import os
from PIL import Image, ImageDraw, ImageFont

S = 2                      # 슈퍼샘플링 배율
W, H = 3200, 2000
HERE = os.path.dirname(os.path.abspath(__file__))
SKILL_FONTS = os.path.expanduser(
    '~/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/'
    '022f9269-8b53-40dc-89bf-c9e6ec404cbd/d56f9bb5-2887-4e51-8298-002bf6e39a67/skills/canvas-design/canvas-fonts')
SD = '/System/Library/Fonts/AppleSDGothicNeo.ttc'
SD_W = {'thin': 10, 'light': 8, 'regular': 0, 'medium': 2, 'semibold': 4, 'bold': 6}

BG, INK = '#F3F1EC', '#15171B'
G1, G2, G3, G4 = '#6E7179', '#A9ABB0', '#DCDAD4', '#ECEAE5'
WHITE, BLUE = '#FFFFFF', '#0066FF'
RING = ['#BCD5FF', '#D9E7FF', '#ECF3FF']

img = Image.new('RGB', (W * S, H * S), BG)
d = ImageDraw.Draw(img)
_cache = {}


def kr(size, w='regular'):
    k = ('kr', size, w)
    if k not in _cache:
        _cache[k] = ImageFont.truetype(SD, size * S, index=SD_W[w])
    return _cache[k]


def mono(size):
    k = ('mono', size)
    if k not in _cache:
        _cache[k] = ImageFont.truetype(os.path.join(SKILL_FONTS, 'GeistMono-Regular.ttf'), size * S)
    return _cache[k]


def tw(text, font, track=0):
    if not track:
        return d.textlength(text, font=font) / S
    return sum(d.textlength(c, font=font) / S for c in text) + track * (len(text) - 1)


def text(x, y, s, font, fill, anchor='l', track=0, base=False):
    """x: 왼쪽/가운데/오른쪽 기준, y: 글자 윗선(base=True면 기준선)."""
    w = tw(s, font, track)
    x0 = x - (w / 2 if anchor == 'c' else w if anchor == 'r' else 0)
    a = 'ls' if base else 'lt'
    if not track:
        d.text((x0 * S, y * S), s, font=font, fill=fill, anchor=a)
        return w
    cx = x0
    by = y if base else y + font.getmetrics()[0] / S   # 글자별로 그려도 기준선이 같도록
    for c in s:
        d.text((cx * S, by * S), c, font=font, fill=fill, anchor='ls')
        cx += d.textlength(c, font=font) / S + track
    return w


def rrect(x0, y0, x1, y1, r, fill=None, outline=None, width=1):
    d.rounded_rectangle((x0 * S, y0 * S, x1 * S, y1 * S), radius=r * S, fill=fill, outline=outline, width=int(width * S))


def circle(cx, cy, r, fill=None, outline=None, width=1):
    d.ellipse(((cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S), fill=fill, outline=outline, width=int(width * S))


def line(pts, fill, width):
    d.line([(x * S, y * S) for x, y in pts], fill=fill, width=int(width * S), joint='curve')


def arc(cx, cy, r, a0, a1, fill, width):
    d.arc(((cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S), a0, a1, fill=fill, width=int(width * S))


def cap(x, y, r, fill):
    circle(x, y, r, fill=fill)


# ── 헤더 ──────────────────────────────────────────────
M = 200
text(M, 132, '다음 하나', kr(112, 'thin'), INK)
text(M + 4, 292, 'SKILL-BASED LEARNING  —  CORE LOOP', mono(20), G1, track=3)
text(W - M, 150, 'FIG. 01', mono(20), G1, 'r', track=3)
text(W - M, 186, '4 SCREENS  ·  1 GESTURE', mono(20), G2, 'r', track=3)

# ── 화면 틀 ───────────────────────────────────────────
PW, PH, PY = 560, 1140, 440
GAP = (W - 2 * M - 4 * PW) / 3
XS = [M + i * (PW + GAP) for i in range(4)]
LABELS = ['다음 하나', '짧은 콘텐츠', '업데이트', '직무 완성도']
PAD = 52

for i, x in enumerate(XS):
    text(x + 4, PY - 40, f'0{i + 1}', mono(20), INK, track=2, base=True)
    text(x + 52, PY - 40, LABELS[i], kr(24, 'medium'), G1, base=True)
    rrect(x, PY, x + PW, PY + PH, 60, fill=WHITE, outline=G3, width=2)
    text(x + PAD, PY + 40, '9:41', mono(18), G2)
    # 화면 사이 연결선
    if i < 3:
        y = PY + PH / 2
        x0, x1 = x + PW + 34, XS[i + 1] - 34
        line([(x0, y), (x1, y)], G2, 2)
        line([(x1 - 12, y - 10), (x1, y), (x1 - 12, y + 10)], G2, 2)


def center(i):
    return XS[i] + PW / 2


def percent(cx, y, num, size, anchor='c'):
    f_num, f_pct = kr(size, 'thin'), kr(int(size * 0.42), 'light')
    wn, wp = tw(num, f_num), tw('%', f_pct)
    x0 = cx - (wn + wp + 6) / 2 if anchor == 'c' else cx
    text(x0, y, num, f_num, INK, base=True)
    text(x0 + wn + 6, y, '%', f_pct, INK, base=True)


# 01 · 다음 하나 ─────────────────────────────────────
x, cx = XS[0], center(0)
text(x + PAD, PY + 132, '데이터 PM까지', kr(26, 'medium'), G1)
percent(x + PAD - 6, PY + 330, '68', 168, anchor='l')
bx0, bx1, by = x + PAD, x + PW - PAD, PY + 384
line([(bx0, by), (bx1, by)], G4, 6)
line([(bx0, by), (bx0 + (bx1 - bx0) * .68, by)], INK, 6)
circle(cx, PY + 700, 150, fill=BLUE)
text(cx, PY + 700 + 13, '다음 하나', kr(38, 'semibold'), WHITE, 'c', base=True)
text(cx, PY + 922, '엑셀 스킬과 가장 가까워요', kr(24), G1, 'c')
text(cx, PY + 966, '7 MIN', mono(18), G2, 'c', track=3)

# 02 · 짧은 콘텐츠 ───────────────────────────────────
x, cx = XS[1], center(1)
text(x + PAD, PY + 132, '피벗 테이블로', kr(36, 'semibold'), INK)
text(x + PAD, PY + 180, '보고서 만들기', kr(36, 'semibold'), INK)
mx0, my0, mx1, my1 = x + PAD, PY + 280, x + PW - PAD, PY + 580
rrect(mx0, my0, mx1, my1, 22, fill=G4)
tcx, tcy = (mx0 + mx1) / 2, (my0 + my1) / 2
line([(tcx - 18, tcy - 28), (tcx + 30, tcy), (tcx - 18, tcy + 28), (tcx - 18, tcy - 28)], INK, 2.5)
ty = PY + 636
line([(mx0, ty), (mx1, ty)], INK, 6)
text(mx0, ty + 26, '07:00', mono(18), G2, track=2)
text(mx1, ty + 26, '07:00', mono(18), G2, 'r', track=2)
for k in range(7):                      # 1분 단위 눈금
    tx = mx0 + (mx1 - mx0) * k / 7
    if k:
        line([(tx, ty - 14), (tx, ty - 6)], G2, 2)
circle(cx, PY + 900, 34, fill=INK)
line([(cx - 14, PY + 901), (cx - 4, PY + 911), (cx + 15, PY + 890)], WHITE, 4)
text(cx, PY + 960, '완료', kr(26, 'semibold'), INK, 'c')

# 03 · 업데이트 (손맛) ────────────────────────────────
x, cx = XS[2], center(2)
text(x + PAD, PY + 132, '업데이트할 수 있는', kr(36, 'semibold'), INK)
text(x + PAD, PY + 180, '스킬이 있어요', kr(36, 'semibold'), INK)
kx0, ky0, kx1, ky1 = x + PAD, PY + 280, x + PW - PAD, PY + 500
rrect(kx0, ky0, kx1, ky1, 22, fill='#F7F6F3', outline=G4, width=2)
text(kx0 + 36, ky0 + 40, '데이터 분석', kr(30, 'semibold'), INK)
vy = ky0 + 100
w = text(kx0 + 36, vy, 'v1.2', mono(22), G2, track=2)
text(kx0 + 36 + w + 18, vy, '→', mono(22), G2, track=0.01)
text(kx0 + 36 + w + 58, vy, 'v1.3', mono(22), INK, track=2)
segs, sx0, sx1, sy = 10, kx0 + 36, kx1 - 36, ky0 + 162
sw = (sx1 - sx0 - (segs - 1) * 8) / segs
for k in range(segs):
    a = sx0 + k * (sw + 8)
    fill = INK if k < 2 else BLUE if k == 2 else G3
    rrect(a, sy, a + sw, sy + 12, 6, fill=fill)
by = PY + 790
for r, c in zip((222, 186, 150), RING[::-1]):
    circle(cx, by, r, outline=c, width=2)
circle(cx, by, 112, fill=BLUE)
text(cx, by + 12, '업데이트', kr(34, 'semibold'), WHITE, 'c', base=True)
text(cx, PY + 1050, '관련 스킬 2개도 함께 올라가요', kr(22), G1, 'c')

# 04 · 직무 완성도 ───────────────────────────────────
x, cx = XS[3], center(3)
text(x + PAD, PY + 132, '데이터 PM', kr(26, 'medium'), G1)
rcx, rcy, rr = cx, PY + 470, 186
arc(rcx, rcy, rr, 0, 360, G4, 12)
arc(rcx, rcy, rr, -90, -90 + 360 * .68, INK, 12)
arc(rcx, rcy, rr, -90 + 360 * .68 + 1.2, -90 + 360 * .74, BLUE, 12)
percent(rcx, rcy + 52, '74', 140)
text(rcx, rcy + 84, '+6', mono(22), BLUE, 'c', track=2)
text(cx, PY + 760, '스킬 6 / 9', kr(24), G1, 'c')
dots = 9
dx0 = cx - (dots - 1) * 26 / 2
for k in range(dots):
    circle(dx0 + k * 26, PY + 818, 7, fill=INK if k < 5 else BLUE if k == 5 else G3)
rrect(cx - 150, PY + 960, cx + 150, PY + 1044, 42, fill=BLUE)
text(cx, PY + 1002 + 12, '다음 하나', kr(30, 'semibold'), WHITE, 'c', base=True)

# ── 순환선: 04 → 01 ───────────────────────────────────
ly0, ly1, rad = PY + PH + 30, PY + PH + 150, 48
x4, x1 = center(3), center(0)
line([(x4, ly0), (x4, ly1 - rad)], G2, 2)
arc(x4 - rad, ly1 - rad, rad, 0, 90, G2, 2)
mid = (x1 + x4) / 2
lab = '다시, 다음 하나'
lw = tw(lab, kr(24, 'medium')) + 48
line([(x4 - rad, ly1), (mid + lw / 2, ly1)], G2, 2)
line([(mid - lw / 2, ly1), (x1 + rad, ly1)], G2, 2)
text(mid, ly1 - 15, lab, kr(24, 'medium'), INK, 'c')
arc(x1 + rad, ly1 - rad, rad, 90, 180, G2, 2)
line([(x1, ly1 - rad), (x1, ly0 + 2)], G2, 2)
line([(x1 - 10, ly0 + 14), (x1, ly0 + 2), (x1 + 10, ly0 + 14)], G2, 2)

# ── 바닥 표기 ─────────────────────────────────────────
fy = H - 120
text(M, fy, '콘텐츠  →  스킬  →  직무', kr(22, 'medium'), G1)
text(W - M, fy + 4, 'PROTOTYPE 0.1', mono(18), G2, 'r', track=3)

out = img.resize((W, H), Image.LANCZOS)
out.save(os.path.join(HERE, 'next-one.png'), optimize=True)
print('saved', os.path.join(HERE, 'next-one.png'))
