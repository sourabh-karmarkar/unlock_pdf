const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function unlockPDF(inputPath, password, outputPath) {
    try {
        // Read the PDF file
        const pdfBytes = fs.readFileSync(inputPath);

        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Check if the PDF is password protected
        if (pdfDoc.isEncrypted) {
            // Attempt to unlock the PDF with the provided password
            await pdfDoc.unlock(password);
        } else {
            throw new Error('PDF is not password protected');
        }

        // Save the unlocked PDF to a new file
        const modifiedPdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, modifiedPdfBytes);

        console.log('PDF unlocked successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Usage: node unlock_pdf.js input.pdf password output.pdf
const [, , inputPath, password, outputPath] = process.argv;

if (!inputPath || !password || !outputPath) {
    console.error('Usage: node unlock_pdf.js input.pdf password output.pdf');
    process.exit(1);
}

unlockPDF(inputPath, password, outputPath);
