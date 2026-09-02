import re
with open('src/data/menu.ts', 'r', encoding='utf-8') as f: content = f.read()
matches = re.finditer(r"name:\s*'([^']+)',[\s\n]*description:\s*'[^']+',[\s\n]*image:\s*('',|\"\",)", content)
for m in matches: print(m.group(1))
