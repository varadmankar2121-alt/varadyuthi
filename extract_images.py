import re
import base64
import shutil
from pathlib import Path

# ===== CONFIG =====
HTML_FILE = "index.html"
OUTPUT_FOLDER = "images"

# ==================

html_path = Path(HTML_FILE)

if not html_path.exists():
    print("❌ index.html not found.")
    exit()

# Backup
backup = html_path.with_suffix(".backup.html")
shutil.copy2(html_path, backup)
print(f"✅ Backup created: {backup.name}")

html = html_path.read_text(encoding="utf-8", errors="ignore")

Path(OUTPUT_FOLDER).mkdir(exist_ok=True)

count = 1

pattern = re.compile(
    r'data:image/(?P<ext>[a-zA-Z0-9]+);base64,(?P<data>[A-Za-z0-9+/=\r\n]+)'
)

def replace(match):
    global count

    ext = match.group("ext").lower()

    if ext == "jpeg":
        ext = "jpg"

    filename = f"image{count}.{ext}"

    image_path = Path(OUTPUT_FOLDER) / filename

    try:
        image_data = base64.b64decode(match.group("data"))
    except Exception:
        print(f"❌ Failed image {count}")
        return match.group(0)

    image_path.write_bytes(image_data)

    print(f"Saved {filename}")

    count += 1

    return f"{OUTPUT_FOLDER}/{filename}"

new_html = pattern.sub(replace, html)

html_path.write_text(new_html, encoding="utf-8")

print("\n========================")
print(f"Extracted {count-1} images.")
print("Finished successfully.")