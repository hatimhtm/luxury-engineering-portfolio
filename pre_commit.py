def pre_commit_instructions():
    print("Pre-commit instructions:")
    print("1. Ensure all tests pass (`npm run test` or `npx jest`)")
    print("2. Ensure code is correctly formatted and linted (`npm run lint`)")
    print("3. Check for any unresolved console errors or warnings")
    print("4. Review changes against the original issue description")

if __name__ == "__main__":
    pre_commit_instructions()
