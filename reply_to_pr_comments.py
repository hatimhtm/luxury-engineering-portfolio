import urllib.request
import json
import sys

def reply_to_pr_comments(replies):
    try:
        req = urllib.request.Request('http://localhost:8000/reply_to_pr_comments', method='POST')
        req.add_header('Content-Type', 'application/json')
        data = {
            "replies": replies
        }
        res = urllib.request.urlopen(req, data=json.dumps(data).encode('utf-8'))
        print(res.read().decode())
    except Exception as e:
        print(f"Error submitting: {e}")

if __name__ == '__main__':
    replies = '''[
            {
                "comment_id": "4306856337",
                "reply": "Understood. Acknowledging that this work is now obsolete and stopping work on this task."
            }
        ]'''
    reply_to_pr_comments(replies)
