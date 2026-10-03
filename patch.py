import sys

file = 'src/vfs/postsData.ts'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('**Presidio**', '**Microsoft Presidio**')

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
