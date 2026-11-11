"""나눠 둔 파일(index.html · proto.html · assets/ · fonts/)을 공유용 한 파일 dist/index.html 로 묶는다.

    python3 build.py

dist/index.html 하나만 올리면 된다 (Vercel 등). 글꼴·그림·프로토타입이 모두 안에 들어간다.
"""
import base64, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_LINK = '<link rel="stylesheet" href="fonts/fonts.css">\n'
MARKER = '<!-- build.py 가 여기에 글꼴·그림·프로토타입을 한 파일로 넣는다 (나눠 둔 파일로 열 때는 비어 있음) -->'
MIME = {'svg': 'image/svg+xml', 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'gif': 'image/gif', 'webp': 'image/webp'}

# 묶은 파일에서는 프로토타입이 srcdoc 으로 뜨므로 assets/ 경로를 바깥 창의 ASSETS(data URI)로 바꿔 끼운다
SHIM = r'''<script>
(function () {
  var P = window.parent, A = (P && P !== window && P.ASSETS) || {};
  if (P && P.FONT_CSS) { var s = document.createElement('style'); s.textContent = P.FONT_CSS; document.head.appendChild(s); }
  if (A['assets/v/main-video.jpg']) document.documentElement.style.setProperty('--main-video', 'url(' + A['assets/v/main-video.jpg'] + ')');
  function fix(el) {
    if (el.nodeType !== 1) return;
    if (el.tagName === 'IMG') { var s = el.getAttribute('data-asset') || el.getAttribute('src'); if (s && A[s]) { el.removeAttribute('data-asset'); el.setAttribute('src', A[s]); } }
    var st = el.getAttribute('style');
    if (st && st.indexOf('url(assets/') > -1) el.setAttribute('style', st.replace(/url\((assets\/[^)]+)\)/g, function (m, p) { return A[p] ? 'url(' + A[p] + ')' : m; }));
  }
  new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      if (m.type === 'attributes') { fix(m.target); return; }
      m.addedNodes.forEach(function (n) { if (n.nodeType === 1) { fix(n); n.querySelectorAll('img,[style]').forEach(fix); } });
    });
  }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'style', 'data-asset'] });
})();
</script>
'''


def read(name):
    with open(os.path.join(HERE, name), encoding='utf-8') as f:
        return f.read()


def data_uri(path, mime):
    with open(path, 'rb') as f:
        return 'data:%s;base64,%s' % (mime, base64.b64encode(f.read()).decode())


def js_string(s):
    # <script> 안에 넣으므로 </ 를 끊어 둔다
    return json.dumps(s, ensure_ascii=False).replace('</', '<\\/')


def font_css():
    css = read('fonts/fonts.css')
    return re.sub(r'url\(([^)]+\.woff2)\)', lambda m: 'url(%s)' % data_uri(os.path.join(HERE, 'fonts', m.group(1)), 'font/woff2'), css)


def assets():
    out = {}
    root = os.path.join(HERE, 'assets')
    for d, _, files in sorted(os.walk(root)):
        for name in sorted(files):
            ext = name.rsplit('.', 1)[-1].lower()
            if ext not in MIME:
                continue
            path = os.path.join(d, name)
            out[os.path.relpath(path, HERE).replace(os.sep, '/')] = data_uri(path, MIME[ext])
    return out


def bundle_proto():
    html = read('proto.html')
    if FONT_LINK not in html:
        raise SystemExit('proto.html: <head> 안에 %s 줄이 있어야 합니다' % FONT_LINK.strip())
    html = html.replace(FONT_LINK, SHIM, 1)
    # srcdoc 으로 뜨면 assets/ 가 배포 주소 기준으로 풀려 404 가 나므로, 미리 data-asset 으로 바꿔 두고 SHIM 이 채운다
    html = html.replace('src="assets/', 'data-asset="assets/')
    return html.replace('url(assets/v/main-video.jpg)', 'var(--main-video)')


def main():
    shell = read('index.html')
    if MARKER not in shell:
        raise SystemExit('index.html: 표시 줄(%s)이 없습니다' % MARKER)
    data = '\n'.join([
        '<script>',
        'window.FONT_CSS = %s;' % js_string(font_css()),
        'window.ASSETS = %s;' % json.dumps(assets(), ensure_ascii=False),
        'window.PROTO_HTML = %s;' % js_string(bundle_proto()),
        "(function () { var s = document.createElement('style'); s.textContent = window.FONT_CSS; document.head.appendChild(s); })();",
        '</script>',
    ])
    shell = shell.replace(FONT_LINK, '', 1).replace(MARKER, data, 1)
    os.makedirs(os.path.join(HERE, 'dist'), exist_ok=True)
    out = os.path.join(HERE, 'dist', 'index.html')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(shell)
    print('dist/index.html  %.1f MB' % (os.path.getsize(out) / 1e6))


if __name__ == '__main__':
    main()
