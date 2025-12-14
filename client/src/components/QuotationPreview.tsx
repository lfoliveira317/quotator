import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import { Printer, X } from "react-bootstrap-icons";
import { Quotation, Client } from "@/lib/data";

interface QuotationPreviewProps {
  show: boolean;
  onHide: () => void;
  quotation: Quotation;
  client?: Client;
}

export default function QuotationPreview({ show, onHide, quotation, client }: QuotationPreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="quotation-preview-modal">
      <Modal.Header className="d-print-none">
        <Modal.Title>Quotation Preview</Modal.Title>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={handlePrint}>
            <Printer className="me-2" /> Print
          </Button>
          <Button variant="light" onClick={onHide}>
            <X size={24} />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className="p-5 bg-white">
        <div className="printable-content">
          {/* Header */}
          <div className="d-flex justify-content-between mb-5 border-bottom pb-4">
            <div>
              <h2 className="fw-bold text-primary mb-0">QUOTATION</h2>
              <p className="text-muted mb-0">#{quotation.number}</p>
            </div>
            <div className="text-end">
              <h4 className="fw-bold">Your Company Name</h4>
              <p className="mb-0 text-muted">123 Business Rd, Tech City</p>
              <p className="mb-0 text-muted">contact@yourcompany.com</p>
              <p className="mb-0 text-muted">(555) 000-0000</p>
            </div>
          </div>

          {/* Client & Date Info */}
          <Row className="mb-5">
            <Col md={6}>
              <h6 className="text-uppercase text-muted small fw-bold mb-3">Bill To</h6>
              <h5 className="fw-bold mb-1">{client?.name || quotation.clientName}</h5>
              <p className="mb-0 text-muted">{client?.address || "Address not available"}</p>
              <p className="mb-0 text-muted">{client?.email}</p>
              <p className="mb-0 text-muted">{client?.phone}</p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="mb-2">
                <span className="text-muted me-3">Date:</span>
                <span className="fw-bold">{quotation.date}</span>
              </div>
              <div className="mb-2">
                <span className="text-muted me-3">Valid Until:</span>
                <span className="fw-bold">{quotation.validUntil}</span>
              </div>
              <div>
                <span className="text-muted me-3">Status:</span>
                <span className="fw-bold text-uppercase">{quotation.status}</span>
              </div>
            </Col>
          </Row>

          {/* Items Table */}
          <Table className="mb-4">
            <thead className="bg-light">
              <tr>
                <th className="py-3 ps-3">Description</th>
                <th className="py-3 text-center">Quantity</th>
                <th className="py-3 text-end">Unit Price</th>
                <th className="py-3 text-end pe-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item) => (
                <tr key={item.id}>
                  <td className="ps-3 py-3">{item.description}</td>
                  <td className="text-center py-3">{item.quantity}</td>
                  <td className="text-end py-3">${item.unitPrice.toFixed(2)}</td>
                  <td className="text-end pe-3 py-3 fw-medium">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Totals */}
          <Row className="justify-content-end mb-5">
            <Col md={5}>
              <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">${quotation.subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
                <span className="text-muted">Tax ({quotation.taxRate}%)</span>
                <span>${quotation.taxAmount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between pt-2">
                <span className="h5 fw-bold">Total</span>
                <span className="h5 fw-bold text-primary">${quotation.total.toFixed(2)}</span>
              </div>
            </Col>
          </Row>

          {/* Notes */}
          {quotation.notes && (
            <div className="bg-light p-4 rounded">
              <h6 className="fw-bold mb-2">Notes & Terms</h6>
              <p className="mb-0 text-muted small">{quotation.notes}</p>
            </div>
          )}
          
          {/* Footer */}
          <div className="mt-5 pt-4 border-top text-center text-muted small">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
