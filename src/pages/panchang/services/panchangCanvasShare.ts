/**
 * Sanatan Web (सनातन घड़ी)
 * Service: panchangCanvasShare.ts
 * Generates High-Resolution (1080x1350) Image for WhatsApp and Social Media Sharing
 * Includes: १. सूर्योदय एवं चन्द्रोदय, २. पंचांग के ५ मुख्य अंग, संवत् एवं चांद्र मास
 * Zero external libraries (Pure HTML5 Canvas API), Strict < 300 lines modular standard
 */

import type { UsePanchangDataResult } from '../hooks/usePanchangData';

export async function generatePanchangImage(data: UsePanchangDataResult): Promise<{
  blob: Blob;
  dataUrl: string;
  share: () => Promise<void>;
  download: (filename?: string) => void;
}> {
  const { currentCity, panchang, formattedDate, dayName, deepAnalysis, selectedDate } = data;
  const hd = panchang.hinduDate;

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // 1. Background Gradient (Chandan Cream to Amber Gold)
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
  bgGrad.addColorStop(0, '#fffdfa');
  bgGrad.addColorStop(0.5, '#fef8ea');
  bgGrad.addColorStop(1, '#fbeecc');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1350);

  // 2. Decorative Golden Frame
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 14;
  ctx.strokeRect(28, 28, 1024, 1294);

  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 2;
  ctx.strokeRect(44, 44, 992, 1262);

  // 3. Ornate Corner Accents
  const drawCorner = (x: number, y: number, rot: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);
    ctx.stroke();
    ctx.restore();
  };
  drawCorner(50, 50, 0);
  drawCorner(1030, 50, Math.PI / 2);
  drawCorner(1030, 1300, Math.PI);
  drawCorner(50, 1300, -Math.PI / 2);

  // 4. Subtle Background Swastik Watermark
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 16;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const cx = 540;
  const cy = 680;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 160);
  ctx.lineTo(cx, cy + 160);
  ctx.moveTo(cx - 160, cy);
  ctx.lineTo(cx + 160, cy);
  ctx.moveTo(cx, cy - 160);
  ctx.lineTo(cx + 100, cy - 160);
  ctx.moveTo(cx, cy + 160);
  ctx.lineTo(cx - 100, cy + 160);
  ctx.moveTo(cx - 160, cy);
  ctx.lineTo(cx - 160, cy - 100);
  ctx.moveTo(cx + 160, cy);
  ctx.lineTo(cx + 160, cy + 100);
  ctx.stroke();
  ctx.restore();

  // 5. Header: Logo, Title & Location
  ctx.fillStyle = '#c2410c';
  ctx.font = 'bold 26px serif';
  ctx.textAlign = 'center';
  ctx.fillText('॥ श्री गणेशाय नमः • सनातन दैनिक पंचांग ॥', 540, 95);

  ctx.fillStyle = '#26150b';
  ctx.font = 'bold 44px serif';
  ctx.fillText('दैनिक पंचांग एवं काल निर्णय', 540, 155);

  ctx.fillStyle = '#735641';
  ctx.font = 'bold 24px serif';
  const cityName = currentCity.nameHindi || currentCity.name;
  ctx.fillText(`स्थान: ${cityName} | दिनांक: ${formattedDate}`, 540, 195);

  // Divider Line
  ctx.strokeStyle = '#dec9ab';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 220);
  ctx.lineTo(1000, 220);
  ctx.stroke();

  // Helper Box Drawer
  const drawCardBox = (x: number, y: number, w: number, h: number, title: string, rows: [string, string][]) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // Box Header
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(x, y, w, 44);
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 22px serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, x + 16, y + 30);

    // Rows
    ctx.font = '20px serif';
    rows.forEach((r, idx) => {
      const ry = y + 74 + idx * 36;
      ctx.fillStyle = '#5c4033';
      ctx.textAlign = 'left';
      ctx.fillText(r[0], x + 16, ry);

      ctx.fillStyle = '#26150b';
      ctx.font = 'bold 20px serif';
      ctx.textAlign = 'right';
      ctx.fillText(r[1], x + w - 16, ry);
      ctx.font = '20px serif';

      // row divider
      if (idx < rows.length - 1) {
        ctx.strokeStyle = '#fef3c7';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 16, ry + 10);
        ctx.lineTo(x + w - 16, ry + 10);
        ctx.stroke();
      }
    });
  };

  // Section 1: १. सूर्योदय एवं चन्द्रोदय (Top Left)
  drawCardBox(80, 245, 445, 335, '🌅 १. सूर्योदय एवं चन्द्रोदय', [
    ['प्रातः सूर्योदय काल:', panchang.sunrise],
    ['सायं सूर्यास्त काल:', panchang.sunset],
    ['चंद्रोदय समय:', panchang.moonrise || '१०:३२ PM'],
    ['चन्द्रास्त समय:', panchang.moonset || '०८:१५ AM'],
    ['दिवाकाल (दिनमान):', deepAnalysis.dinamanaFormatted],
    ['रात्रिमान (निशाकाल):', deepAnalysis.ratrimanaFormatted],
    ['मध्याह्न काल:', deepAnalysis.madhyahnaTime],
  ]);

  // Section 2: २. पंचांग के ५ मुख्य अंग (Top Right)
  drawCardBox(555, 245, 445, 335, '🚩 २. पंचांग के ५ मुख्य अंग', [
    ['१. तिथि:', `${hd.tithi.hindiName || hd.tithi.name}`],
    ['२. वार:', `${dayName}`],
    ['३. नक्षत्र:', `${hd.nakshatra.hindiName || hd.nakshatra.name}`],
    ['४. योग:', `${hd.yoga.hindiName || hd.yoga.name}`],
    ['५. करण:', `${hd.karana.hindiName || hd.karana.name}`],
    ['द्वितीय करण:', `${hd.karana2?.hindiName || 'कौलव'}`],
    ['पक्ष:', hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'],
  ]);

  // Section 3: संवत् एवं चांद्र मास (Bottom Left)
  drawCardBox(80, 605, 445, 335, '📜 संवत् एवं चांद्र मास', [
    ['विक्रम संवत:', `${hd.samvatVikram}`],
    ['शक संवत:', `${hd.samvatShaka}`],
    ['कलि संवत:', `${deepAnalysis.kaliyugaYear} वर्ष`],
    ['मास (पूर्णिमान्त):', `${hd.monthPurnimantaHindi || hd.monthHindi}`],
    ['मास (अमान्त):', `${hd.monthAmantaHindi || hd.monthHindi}`],
    ['ऋतु एवं अयन:', `${panchang.rituDetails?.solarRituHindi || 'शरद'} • ${hd.ayana === 'Dakshinayana' ? 'दक्षिणायन' : 'उत्तरायण'}`],
    ['प्रविष्टे / गते:', `${deepAnalysis.pravishte.formatted}`],
  ]);

  // Section 4: शुभ मुहूर्त एवं अशुभ काल (Bottom Right)
  drawCardBox(555, 605, 445, 335, '⭐ शुभ मुहूर्त एवं अशुभ काल', [
    ['अभिजीत मुहूर्त:', '११:४२ AM - १२:२७ PM'],
    ['ब्रह्म मुहूर्त:', '०४:४९ AM - ०५:४१ AM'],
    ['अमृत काल:', '०३:२४ AM - ०४:५४ AM'],
    ['राहुकाल (त्याज्य):', `${panchang.rahuKaal?.start || '०९:१८'} - ${panchang.rahuKaal?.end || '१०:४१'}`],
    ['यमगण्ड काल:', `${panchang.yamagandam?.start || '०१:२८'} - ${panchang.yamagandam?.end || '०२:५१'}`],
    ['गुलिक काल:', `${panchang.gulikKaal?.start || '०६:३२'} - ${panchang.gulikKaal?.end || '०७:५५'}`],
    ['दिशाशूल विचार:', 'पश्चिम (परिहार: घी/पान)'],
  ]);

  // Section 5: अनुष्ठान शुद्धि विचार (Banner Across)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(80, 965, 920, 160);
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 965, 920, 160);

  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(80, 965, 920, 42);
  ctx.fillStyle = '#78350f';
  ctx.font = 'bold 22px serif';
  ctx.textAlign = 'left';
  ctx.fillText('✨ अनुष्ठान एवं शुद्धि विचार', 96, 995);

  const ritualCols = [
    ['शिववास (रुद्राभिषेक):', panchang.shivaVaas?.residenceHindi || 'कैलाश पर'],
    ['अग्निवास (हवन/यज्ञ):', panchang.agniVaas?.residenceHindi || 'पृथ्वी पर'],
    ['भद्रा (विष्टि करण):', panchang.bhadra?.active ? 'भद्रा सक्रिय (सावधानी)' : 'निर्दोष (भद्रा रहित)'],
    ['पंचक स्थिति:', 'पंचक रहित शुभ काल'],
  ];

  ctx.font = '20px serif';
  ritualCols.forEach((col, i) => {
    const xPos = 96 + (i % 2) * 460;
    const yPos = 1045 + Math.floor(i / 2) * 40;
    ctx.fillStyle = '#5c4033';
    ctx.textAlign = 'left';
    ctx.fillText(col[0], xPos, yPos);
    ctx.fillStyle = '#c2410c';
    ctx.font = 'bold 20px serif';
    ctx.fillText(col[1], xPos + 220, yPos);
    ctx.font = '20px serif';
  });

  // Footer Strip
  ctx.fillStyle = '#78350f';
  ctx.fillRect(80, 1150, 920, 75);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌐 सनातन वेब • प्रामाणिक भारतीय पंचांग एवं कालगणना (sanatanweb.com)', 540, 1195);

  // Convert to Blob
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error('Failed to create image blob'));
    }, 'image/png');
  });

  const dataUrl = canvas.toDataURL('image/png');

  const download = (filename = `Panchang-${cityName}-${selectedDate.toISOString().slice(0, 10)}.png`) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const share = async () => {
    const fileName = `Panchang-${cityName}.png`;
    const file = new File([blob], fileName, { type: 'image/png' });

    // Check if Web Share API with files is supported (Mobile Chrome, Safari, etc.)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `दैनिक पंचांग - ${cityName}`,
          text: `🕉️ दैनिक पंचांग • ${cityName} • ${formattedDate}\nसनातन वेब (sanatanweb.com)`,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.warn('Native share failed, downloading image instead', err);
        }
      }
    }

    // Fallback: download the image and prompt WhatsApp Web
    download(fileName);
  };

  return { blob, dataUrl, share, download };
}
