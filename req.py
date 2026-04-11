import urllib.request
import json
try:
    req = urllib.request.Request('http://localhost:8000/frontend_verification_complete', method='POST')
    req.add_header('Content-Type', 'application/json')
    data = json.dumps({"screenshot_path": "/home/jules/verification/screenshots/verification.png", "additional_media_paths": ["/home/jules/verification/videos/115d2fb9bd5128cda0e4da98778699d3.webm"]})
    response = urllib.request.urlopen(req, data=data.encode('utf-8'))
    print(response.read().decode())
except Exception as e:
    pass
