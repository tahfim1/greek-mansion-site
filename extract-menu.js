const fs = require('fs');
const path = require('path');

async function extractPDF() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  
  const pdfPath = path.join(__dirname, '..', 'Greek Menu.pdf');
  const dataBuffer = new Uint8Array(fs.readFileSync(pdfPath));
  
  const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
  const pdf = await loadingTask.promise;
  
  console.log('Total pages:', pdf.numPages);
  
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    console.log(`\n=== PAGE ${pageNum} ===\n`);
    
    let lastY = null;
    let line = '';
    
    for (const item of textContent.items) {
      if (item.str === undefined) continue;
      const y = Math.round(item.transform[5]);
      
      if (lastY !== null && Math.abs(y - lastY) > 3) {
        if (line.trim()) console.log(line.trim());
        line = '';
      }
      
      line += item.str;
      lastY = y;
    }
    if (line.trim()) console.log(line.trim());
  }
}

extractPDF().catch(err => console.error('Error:', err));
