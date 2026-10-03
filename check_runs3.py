import docx

doc = docx.Document('Nicholas_Napoli_Resume_v2.docx')
for para in doc.paragraphs:
    if 'Architected Lakehouse' in para.text:
        print(f"Style: {para.style.name}")
        for r in para.runs:
            print(f"RUN: '{r.text}' BOLD: {r.bold} ITALIC: {r.italic}")
