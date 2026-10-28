import { Request, Response, NextFunction } from 'express';
import { inMemoryStore } from './auth.controller.js';
import { AppError } from '../middleware/error.middleware.js';

export const collectOfflinePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { invoice_id, amount_paid, payment_mode, transaction_reference } = req.body;

    const invoice = inMemoryStore.invoices.find(i => i.id === invoice_id);
    if (!invoice) {
      throw new AppError('Invoice not found', 404);
    }

    const receiptNumber = `REC-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    invoice.paidAmount += amount_paid;
    invoice.status = invoice.paidAmount >= invoice.totalAmount ? 'PAID' : 'PARTIALLY_PAID';

    res.json({
      success: true,
      data: {
        receipt_number: receiptNumber,
        amount_settled: amount_paid,
        remaining_invoice_balance: invoice.totalAmount - invoice.paidAmount,
        invoice_status: invoice.status,
        receipt_download_url: `http://localhost:4000/api/v1/finance/receipts/${receiptNumber}/pdf`
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getInvoices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, status } = req.query;
    let invoices = [...inMemoryStore.invoices];

    if (studentId) {
      invoices = invoices.filter(i => i.studentId === studentId);
    }

    if (status) {
      invoices = invoices.filter(i => i.status === status);
    }

    res.json({
      success: true,
      data: invoices
    });
  } catch (err) {
    next(err);
  }
};