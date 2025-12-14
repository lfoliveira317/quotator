import { Table, Badge, Button, Card, Row, Col } from "react-bootstrap";
import { Eye, Pencil, Trash, Calendar, Person } from "react-bootstrap-icons";
import { Quotation } from "@/lib/data";

interface QuotationListProps {
  quotations: Quotation[];
  onView: (quotation: Quotation) => void;
  onEdit: (quotation: Quotation) => void;
  onDelete: (id: string) => void;
}

export default function QuotationList({ quotations, onView, onEdit, onDelete }: QuotationListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft": return "secondary";
      case "Sent": return "primary";
      case "Accepted": return "success";
      case "Rejected": return "danger";
      default: return "light";
    }
  };

  // Mobile Card View Component
  const MobileCard = ({ q }: { q: Quotation }) => (
    <Card className="mb-3 border shadow-sm d-md-none">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 className="fw-bold mb-0">{q.number}</h6>
            <small className="text-muted">{q.date}</small>
          </div>
          <Badge bg={getStatusBadge(q.status)} className="rounded-pill">
            {q.status}
          </Badge>
        </div>
        
        <div className="mb-3">
          <div className="d-flex align-items-center text-muted mb-1">
            <Person size={14} className="me-2" />
            <span className="text-truncate">{q.clientName}</span>
          </div>
          <div className="fw-bold fs-5 mt-2">
            ${q.total.toLocaleString()}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 border-top pt-2 mt-2">
          <Button variant="outline-secondary" size="sm" onClick={() => onView(q)}>
            <Eye size={16} /> View
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => onEdit(q)}>
            <Pencil size={16} /> Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(q.id)}>
            <Trash size={16} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      {/* Desktop Table View */}
      <div className="table-responsive d-none d-md-block">
        <Table hover className="align-middle">
          <thead className="bg-light">
            <tr>
              <th>Number</th>
              <th>Client</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => (
              <tr key={q.id}>
                <td className="fw-medium">{q.number}</td>
                <td>{q.clientName}</td>
                <td>{q.date}</td>
                <td className="fw-bold">${q.total.toLocaleString()}</td>
                <td>
                  <Badge bg={getStatusBadge(q.status)} className="px-3 py-2 rounded-pill">
                    {q.status}
                  </Badge>
                </td>
                <td className="text-end">
                  <Button variant="link" className="text-dark p-1" onClick={() => onView(q)} title="View">
                    <Eye size={18} />
                  </Button>
                  <Button variant="link" className="text-dark p-1" onClick={() => onEdit(q)} title="Edit">
                    <Pencil size={18} />
                  </Button>
                  <Button variant="link" className="text-danger p-1" onClick={() => onDelete(q.id)} title="Delete">
                    <Trash size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile List View */}
      <div className="d-md-none">
        {quotations.map((q) => (
          <MobileCard key={q.id} q={q} />
        ))}
      </div>

      {quotations.length === 0 && (
        <div className="text-center py-5 text-muted">
          No quotations found. Create your first one!
        </div>
      )}
    </>
  );
}
