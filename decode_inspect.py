from pathlib import Path
import re

source = Path(
    r"C:/Users/vo1d/AppData/Roaming/Code/User/workspaceStorage/9a0f69ed05457a61b6bf2bef594420e7/GitHub.copilot-chat/chat-session-resources/116b0ef4-82f9-4acf-b4ee-8f38b5b7789d/call_ZIDS5atV67UrsouGJbk8eswx__vscode-1781793575900/content.txt"
)
text = source.read_text(encoding="utf-8")
print("exists", source.exists())
print("length", len(text))
print("first100", repr(text[:100]))
print("last100", repr(text[-100:]))
clean = re.sub(r"[^A-Za-z0-9+/=]", "", text)
print("cleaned length", len(clean))
print("cleaned mod4", len(clean) % 4)
invalid = [
    c
    for c in text
    if c not in 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r"'
]
print("invalid chars count", len(invalid), set(invalid))
print("quoted", text.startswith('"') and text.endswith('"'))
print("num quotes", text.count('"'))
