import docx

doc = docx.Document('Nicholas_Napoli_Resume_v2.docx')
for para in doc.paragraphs:
    if 'Architected Lakehouse' in para.text:
        para.text = 'Architected distributed lakehouse data pipelines leveraging Big Data technologies (PySpark, Databricks, Delta Lake, AWS Glue) to process, clean, and transform 10,000+ multimodal patient records with strict ACID transactional guarantees.'
        para.style = 'List Bullet'

doc.save('Nicholas_Napoli_Resume_v2.docx')
