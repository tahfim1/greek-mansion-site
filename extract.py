import json

with open(r'C:\Users\LENOVO\.gemini\antigravity-ide\brain\41e5a39d-ecdb-4ac1-82b4-e5cfa727e2c4\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if '"toolSummary":"Home page component"' in line:
            data = json.loads(line)
            tool_call = data['tool_calls'][0]
            if 'CodeContent' in tool_call:
                content = tool_call['CodeContent']
            elif 'args' in tool_call and 'CodeContent' in tool_call['args']:
                content = tool_call['args']['CodeContent']
            else:
                continue
            with open('src/app/page.tsx', 'w', encoding='utf-8') as out:
                out.write(content)
            print("Successfully extracted page.tsx")

with open(r'C:\Users\LENOVO\.gemini\antigravity-ide\brain\41e5a39d-ecdb-4ac1-82b4-e5cfa727e2c4\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if '"toolSummary":"Menu page client"' in line:
            data = json.loads(line)
            tool_call = data['tool_calls'][0]
            if 'CodeContent' in tool_call:
                content = tool_call['CodeContent']
            elif 'args' in tool_call and 'CodeContent' in tool_call['args']:
                content = tool_call['args']['CodeContent']
            else:
                continue
            with open('src/app/menu/MenuPageClient.tsx', 'w', encoding='utf-8') as out:
                out.write(content)
            print("Successfully extracted MenuPageClient.tsx")
            break
