import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table, Card } from "react-bootstrap";
import { Plus, Trash } from "react-bootstrap-icons";
import { Quotation, Client, LineItem, QuotationStatus } from "@/lib/data";
import { nanoid } from "nanoid";

interface QuotationFormProps {
  initialData?: Quotation;
  clients: Client[];
  onSave: (quotation: Quotation) => void;
  onCancel: () => void;
}

export default function QuotationForm({ initialData, clients, onSave, onCancel }: QuotationFormProps) {
  const [formData, setFormData] = useState<Quotation>({
    id: initialData?.id || nanoid(),
    number: initialData?.number || `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
    date: initialData?.date || new Date().toISOString().split('T')[0],
    validUntil: initialData?.validUntil || "",
    clientId: initialData?.clientId || "",
    clientName: initialData?.clientName || "",
    items: initialData?.items || [],
    subtotal: initialData?.subtotal || 0,
    taxRate: initialData?.taxRate || 10,
    taxAmount: initialData?.taxAmount || 0,
    total: initialData?.total || 0,
    status: initialData?.status || "Draft",
    notes: initialData?.notes || "",
  });

  // Calculate totals whenever items or tax rate changes
  useEffect(() => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const total = subtotal + taxAmount;

    setFormData(prev => ({ ...prev, subtotal, taxAmount, total }));
  }, [formData.items, formData.taxRate]);

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = e.target.value;
    const client = clients.find(c => c.id === clientId);
    setFormData({ ...formData, clientId, clientName: client?.name || "" });
  };

  const addItem = () => {
    const newItem: LineItem = { id: nanoid(), description: "", quantity: 1, unitPrice: 0 };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    const newItems = formData.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (id: string) => {
    setFormData({ ...formData, items: formData.items.filter(item => item.id !== id) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Mobile Line Item Component
  const MobileLineItem = ({ item }: { item: LineItem }) => (
    <Card className="mb-3 bg-light border-0 d-md-none">
      <Card.Body className="p-3">
        <Form.Group className="mb-2">
          <Form.Label className="small text-muted mb-1">Description</Form.Label>
          <Form.Control 
            type="text" 
            value={item.description} 
            onChange={e => updateItem(item.id, 'description', e.target.value)}
            placeholder="Item description"
            required
          />
        </Form.Group>
        <Row className="g-2">
          <Col xs={4}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Qty</Form.Label>
              <Form.Control 
                type="number" 
                min="1"
                value={item.quantity} 
                onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Price</Form.Label>
              <Form.Control 
                type="number" 
                min="0"
                step="0.01"
                value={item.unitPrice} 
                onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Total</Form.Label>
              <div className="form-control bg-white border-0 fw-bold px-2">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <div className="text-end mt-2">
          <Button variant="link" className="text-danger p-0 text-decoration-none small" onClick={() => removeItem(item.id)}>
            <Trash className="me-1" /> Remove Item
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-3 p-md-4">
          <h4 className="mb-4">Quotation Details</h4>
          <Row className="g-3 mb-4">
            <Col xs={12} md={4}>
              <Form.Group>
                <Form.Label>Quotation Number</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.number} 
                  onChange={e => setFormData({...formData, number: e.target.value})}
                  required 
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={4}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  required 
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={4}>
              <Form.Group>
                <Form.Label>Valid Until</Form.Label>
                <Form.Control 
                  type="date" 
                  value={formData.validUntil} 
                  onChange={e => setFormData({...formData, validUntil: e.target.value})}
                  required 
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Client</Form.Label>
                <Form.Select 
                  value={formData.clientId} 
                  onChange={handleClientChange}
                  required
                >
                  <option value="">Select Client...</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value as QuotationStatus})}
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mb-3">Line Items</h5>
          
          {/* Desktop Table View */}
          <div className="d-none d-md-block">
            <Table bordered hover className="mb-3">
              <thead className="bg-light">
                <tr>
                  <th style={{ width: "40%" }}>Description</th>
                  <th style={{ width: "15%" }}>Quantity</th>
                  <th style={{ width: "20%" }}>Unit Price</th>
                  <th style={{ width: "20%" }}>Total</th>
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Form.Control 
                        type="text" 
                        value={item.description} 
                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Item description"
                        required
                      />
                    </td>
                    <td>
                      <Form.Control 
                        type="number" 
                        min="1"
                        value={item.quantity} 
                        onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                        required
                      />
                    </td>
                    <td>
                      <Form.Control 
                        type="number" 
                        min="0"
                        step="0.01"
                        value={item.unitPrice} 
                        onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                        required
                      />
                    </td>
                    <td className="align-middle fw-bold text-end">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                    <td className="align-middle text-center">
                      <Button variant="link" className="text-danger p-0" onClick={() => removeItem(item.id)}>
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Mobile List View */}
          <div className="d-md-none">
            {formData.items.map((item) => (
              <MobileLineItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 gap-4">
            <Button variant="outline-primary" size="sm" onClick={addItem} className="w-100 w-md-auto">
              <Plus size={20} /> Add Item
            </Button>
            
            <div className="w-100 w-md-25">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span className="fw-bold">${formData.subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Tax Rate (%):</span>
                <Form.Control 
                  type="number" 
                  size="sm" 
                  style={{ width: "70px" }}
                  value={formData.taxRate}
                  onChange={e => setFormData({...formData, taxRate: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax Amount:</span>
                <span className="fw-bold">${formData.taxAmount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between border-top pt-2">
                <span className="h5 mb-0">Total:</span>
                <span className="h5 mb-0 text-primary">${formData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label>Notes</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              placeholder="Payment terms, delivery details, etc."
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" onClick={onCancel}>Cancel</Button>
            <Button variant="primary" type="submit">Save Quotation</Button>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
}
