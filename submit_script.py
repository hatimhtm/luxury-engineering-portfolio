import subprocess
import sys

def run_command(command):
    try:
        result = subprocess.run(command, check=True, shell=True, capture_output=True, text=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}\n{e.stderr}", file=sys.stderr)
        return None

def main():
    print("Gathering branch info...")
    branch_name = run_command("git rev-parse --abbrev-ref HEAD").strip()

    commit_msg_raw = run_command("git log -1 --pretty=%B").strip()

    # Split the commit message into title and description
    lines = commit_msg_raw.split('\n')
    title = lines[0]
    description = '\n'.join(lines[1:]).strip()

    # Write a python script to run the submit function via the system's python environment
    # Wait, the `submit` tool is a system level tool that the AI agent calls, not a CLI command.
    print("Please use the 'submit' JSON tool call with the following arguments:")
    print(f"branch_name: {branch_name}")
    print(f"commit_message: {commit_msg_raw}")
    print(f"title: {title}")
    print(f"description: {description}")

if __name__ == "__main__":
    main()
