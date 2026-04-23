import sys
import json

def reply_to_pr_comments(replies):
    print("Pretending to reply to PR comments with:", replies)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        reply_to_pr_comments(sys.argv[1])
