import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from 'docx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadExcelService {

  constructor() { }

  downloadExcel(fileName: string, headers: string[] = [], sampleData: any[] = []) {
    const filteredData = sampleData.map(row =>
      Object.fromEntries(headers.map(key => [key, row[key]]))
    );
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData, { header: headers });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, fileName);
  }
  

  downloadCSV(fileName: string, headers: string[] = [], data: any[] = []) {
    const filteredData = data.map(row =>
      Object.fromEntries(headers.map(key => [key, row[key]]))
    );
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData, { header: headers });
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

  downloadPDF(fileName: string, headers: string[] = [], data: any[] = []) {
    const doc = new jsPDF();
    const rows = data.map(row => headers.map(header => row[header] ?? ''));
    autoTable(doc, {
      head: [headers],
      body: rows
    });
    doc.save(`${fileName}.pdf`);
  }

  downloadDocx(fileName: string, headers: string[] = [], data: any[] = []) {
    const tableRows: TableRow[] = [];

    // Header row
    const headerRow = new TableRow({
      children: headers.map(header => new TableCell({
        children: [new Paragraph({ text: header })],
      })),
    });
    tableRows.push(headerRow);

    // Data rows
    data.forEach(item => {
      const row = new TableRow({
        children: headers.map(header => new TableCell({
          children: [new Paragraph(item[header] ?? '')],
        })),
      });
      tableRows.push(row);
    });

    const doc = new Document({
      sections: [{
        children: [new Table({ rows: tableRows })],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${fileName}.docx`);
    });
  }


}
