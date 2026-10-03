import docx

doc = docx.Document('Nicholas_Napoli_Resume.docx')
for p in doc.paragraphs:
    if 'Software Engineering, Security & Ops:' in p.text:
        for r in p.runs:
            print(f"RUN: {r.text}")
            print(f"BOLD: {r.bold}, ITALIC: {r.italic}")
