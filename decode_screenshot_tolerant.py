from pathlib import Path
import base64
import re

source = Path(
    r"C:/Users/vo1d/AppData/Roaming/Code/User/workspaceStorage/9a0f69ed05457a61b6bf2bef594420e7/GitHub.copilot-chat/chat-session-resources/116b0ef4-82f9-4acf-b4ee-8f38b5b7789d/call_ZIDS5atV67UrsouGJbk8eswx__vscode-1781793575900/content.txt"
)
if not source.exists():
    raise FileNotFoundError(source)
text = source.read_text(encoding="utf-8").strip()
if text.startswith('"') and text.endswith('"'):
    text = text[1:-1]
# Remove non-base64 characters and whitespace
text = re.sub(r"[^A-Za-z0-9+/=]", "", text)
# Pad to multiple of 4
padding = len(text) % 4
if padding:
    text += "=" * (4 - padding)
out_dir = Path("docs")
out_dir.mkdir(parents=True, exist_ok=True)
out_file = out_dir / "catalog-screenshot.png"
out_file.write_bytes(base64.b64decode(text))
print(f"Saved {out_file}")
