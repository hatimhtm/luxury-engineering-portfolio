import re

with open('app/services/page.tsx', 'r') as f:
    content = f.read()

imports = ['Zap', 'Bot', 'ArrowUpRight', 'Check', 'X', 'Shield', 'Rocket', 'RefreshCw', 'Code2', 'Smartphone', 'Database', 'Brain']

for imp in imports:
    matches = re.findall(r'\b' + imp + r'\b', content)
    print(f"{imp}: {len(matches)}")
