import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

/**
 * Generate a PDF Certificate
 */
export const generateCertificatePDF = async (certificateData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        studentName,
        courseName,
        trackName,
        score,
        issueDate,
        certificateId,
        verificationUrl
      } = certificateData;

      // Generate QR Code
      const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);
      const qrImageBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');

      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      doc.on('error', reject);

      // Certificate Design
      
      // Border
      doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();
      doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).stroke();

      // Title
      doc.fontSize(40).text('CERTIFICATE OF COMPLETION', 0, 100, { align: 'center' });
      
      // Subtitle
      doc.fontSize(16).text('This is to certify that', 0, 160, { align: 'center' });
      
      // Student Name
      doc.fontSize(36).fillColor('#2563eb').text(studentName, 0, 200, { align: 'center' });
      doc.fillColor('#000000');
      
      // Course Info
      doc.fontSize(16).text('has successfully completed the', 0, 260, { align: 'center' });
      doc.fontSize(24).text(`${courseName} - ${trackName}`, 0, 290, { align: 'center' });
      
      // Score and Date
      doc.fontSize(16).text(`with a score of ${score}%`, 0, 340, { align: 'center' });
      doc.fontSize(16).text(`Date: ${new Date(issueDate).toLocaleDateString()}`, 0, 370, { align: 'center' });

      // ID and QR Code
      doc.fontSize(12).text(`Certificate ID: ${certificateId}`, 50, doc.page.height - 80);
      doc.image(qrImageBuffer, doc.page.width - 150, doc.page.height - 150, { fit: [100, 100] });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
