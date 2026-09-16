const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'Reports', 'makalah_inetl.html');
  await page.goto(`file:///${htmlPath}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: path.resolve(__dirname, 'Reports', 'Makalah_Kelompok6_IMK_INETL.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '2.5cm',
      right: '2.5cm',
      bottom: '2.5cm',
      left: '3cm'
    }
  });

  console.log('PDF berhasil dibuat: Makalah_Kelompok6_IMK_INETL.pdf');
  await browser.close();
})();
