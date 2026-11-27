"""프로토타입용 로컬 서버 — http.server와 같지만 캐시를 끈다(수정한 파일이 새로고침만으로 바로 보이게).
사용: python3 .claude/serve_nocache.py [포트=8765]  →  http://127.0.0.1:8765/
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    ThreadingHTTPServer(("127.0.0.1", port), partial(NoCacheHandler, directory=".")).serve_forever()
