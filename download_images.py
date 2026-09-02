import re
import urllib.request
import urllib.parse
import json
import time
import os

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r"name:\s*'([^']+)',[\s\n]*description:\s*'[^']+',[\s\n]*image:\s*('',|\"\",)", re.DOTALL)
matches = list(pattern.finditer(content))

def get_wiki_image(query):
    # Simplify query for better wiki hits
    q = query.replace('Mansion ', '').replace(' (Meat Only)', '').replace(' (Full Rack)', '').replace(' (Half Rack)', '').replace(' Plate', '')
    if 'Stick' in q: q = 'Souvlaki'
    if 'Gyros' in q: q = 'Gyro (food)'
    if 'Veggies' in q: q = 'Vegetable'
    
    url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(q)}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=5).read()
        pages = json.loads(res)['query']['pages']
        for page_id in pages:
            if 'original' in pages[page_id]:
                return pages[page_id]['original']['source']
    except:
        pass
        
    # fallback search
    url2 = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&format=json"
    try:
        req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
        res2 = urllib.request.urlopen(req2, timeout=5).read()
        results = json.loads(res2)['query']['search']
        if results:
            title = results[0]['title']
            url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(title)}"
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            res = urllib.request.urlopen(req, timeout=5).read()
            pages = json.loads(res)['query']['pages']
            for page_id in pages:
                if 'original' in pages[page_id]:
                    return pages[page_id]['original']['source']
    except:
        pass
    
    # Absolute fallback to a generic placeholder if wiki fails
    return "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=600&auto=format&fit=crop"

print(f"Found {len(matches)} missing images to download.")

for match in matches:
    name = match.group(1)
    # Ignore categories that got caught
    if name in ['Choice of Sides', 'Mansion Extras', 'Mansion Pita Wraps', 'Sandwiches on a Bun', 'Mansion Favourites', 'Desserts']:
        continue
        
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    filename = f"{slug}.jpg"
    filepath = f"public/images/food/{filename}"
    
    print(f"Fetching: {name}")
    try:
        img_url = get_wiki_image(name)
        print(f"URL: {img_url}")
        
        req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
            
        original_match_str = match.group(0)
        if "''" in original_match_str:
            new_match_str = original_match_str.replace("image: '',", f"image: '/images/food/{filename}',")
        else:
            new_match_str = original_match_str.replace("image: \"\",", f"image: '/images/food/{filename}',")
            
        content = content.replace(original_match_str, new_match_str, 1)
        print(f"Saved {filepath}")
    except Exception as e:
        print(f"Failed for {name}: {e}")

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
