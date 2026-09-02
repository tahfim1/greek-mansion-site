import json
import sys

target = 'MenuPageClient.tsx'
best_content = None

with open(r'C:\Users\LENOVO\.gemini\antigravity-ide\brain\41e5a39d-ecdb-4ac1-82b4-e5cfa727e2c4\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
        
        if 'tool_calls' in data:
            for tc in data['tool_calls']:
                # If it's a file write
                if tc['name'] == 'write_to_file':
                    args = tc.get('args', {})
                    if target in args.get('TargetFile', ''):
                        best_content = args.get('CodeContent')
                # If it's a file replace
                elif tc['name'] in ['multi_replace_file_content', 'replace_file_content']:
                    args = tc.get('args', {})
                    if target in args.get('TargetFile', ''):
                        # The file content after replace isn't in the arguments.
                        # But wait! multi_replace_file_content doesn't have the full file in args, just the chunks.
                        # Oh, the logs might have the full file in the diff output? No, just diffs.
                        pass

        # Stop looking after we reach the font bump step
        if 'bump fonts' in str(data).lower() or 'bump_fonts' in str(data).lower() or 'Bump Fonts Menu' in str(data):
            break

if best_content:
    with open('src/app/menu/MenuPageClient.tsx', 'w', encoding='utf-8') as out:
        out.write(best_content)
    print("Restored original MenuPageClient.tsx base")
else:
    print("Could not find base")
