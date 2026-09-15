import path from 'node:path';
import xlsx from 'xlsx';

export type OrderEditData = {
  testCaseId: string;
  baseUrl: string;
  orderNumber: string;
};

const workbookPath = path.resolve(process.cwd(), 'test-data/order-edit-data.xlsx');

export function readOrderEditData(): OrderEditData[] {
  const workbook = xlsx.readFile(workbookPath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
  });

  return rows.map((row, index) => ({
    testCaseId: String(row.testCaseId || `order-edit-${index + 1}`),
    baseUrl: String(row.baseUrl || '').trim(),
    orderNumber: String(row.orderNumber || '').trim(),
  }));
}