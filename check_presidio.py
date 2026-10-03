import docx

doc = docx.Document('Nicholas_Napoli_Resume_v2.docx')
for para in doc.paragraphs:
    if 'PHI/PII' in para.text:
        print(para.text)
