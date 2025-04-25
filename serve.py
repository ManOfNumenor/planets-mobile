# copied and modified from [this SO answer](https://stackoverflow.com/a/66514587)

serve_port = 8080

from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler

class handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # self.send_response(200)
        # self.send_header('Content-type','text/html')
        # self.end_headers()

        # message = "Hello, World! Here is a GET response"
        # self.wfile.write(bytes(message, "utf8"))
        SimpleHTTPRequestHandler.do_GET(self)
    def do_POST(self):
        print(self.headers)

        #object_attrs = dir(self.request)
        #print(object_attrs)
        #print(self.request.recvmsg)

        # google's AI try (see jonathan@persephone screenshots 2024-11-14 around 11pm):
        content_length = int(self.headers['Content-Length'])
        message = self.rfile.read(content_length)
        print(message.decode('utf-8'))

        # google AI worked! Holy crud!
        # It linked me to [this page](https://esp32.com/viewtopic.php?t=14465#p56155), 
        # which seems _totally_ unrelated, but somehow includes the exact snippets of
        # code needed to make this thing work.

        # TODO: pretty-print the any JSON strings in the error message, and 
        # we should be golden!!

        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()

        message = "Hello, World! Here is a POST response"
        self.wfile.write(bytes(message, "utf8"))

with HTTPServer(('', serve_port), handler) as server:
    server.serve_forever()


