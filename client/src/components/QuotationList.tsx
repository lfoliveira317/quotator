import { Table, Badge, Button } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
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

  return (
    <div className="table-responsive">
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
          {quotations.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-5 text-muted">
                No quotations found. Create your first one!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
