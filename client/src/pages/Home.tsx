import { useState } from "react";
import { Container, Navbar, Button, Nav, Tab, Tabs } from "react-bootstrap";
import { FileEarmarkText, PlusLg } from "react-bootstrap-icons";
import { initialQuotations, initialClients, Quotation } from "@/lib/data";
import QuotationList from "@/components/QuotationList";
import QuotationForm from "@/components/QuotationForm";
import QuotationPreview from "@/components/QuotationPreview";
import { toast } from "sonner";

export default function Home() {
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingQuotation, setEditingQuotation] = useState<Quotation | undefined>(undefined);
  const [previewQuotation, setPreviewQuotation] = useState<Quotation | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const handleCreateNew = () => {
    setEditingQuotation(undefined);
    setView("form");
  };

  const handleEdit = (quotation: Quotation) => {
    setEditingQuotation(quotation);
    setView("form");
  };

  const handleView = (quotation: Quotation) => {
    setPreviewQuotation(quotation);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this quotation?")) {
      setQuotations(quotations.filter(q => q.id !== id));
      toast.success("Quotation deleted successfully");
    }
  };

  const handleSave = (quotation: Quotation) => {
    if (editingQuotation) {
      setQuotations(quotations.map(q => q.id === quotation.id ? quotation : q));
      toast.success("Quotation updated successfully");
    } else {
      setQuotations([quotation, ...quotations]);
      toast.success("Quotation created successfully");
    }
    setView("list");
  };

  const filteredQuotations = activeTab === "all" 
    ? quotations 
    : quotations.filter(q => q.status.toLowerCase() === activeTab);

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm sticky-top mb-4 border-bottom">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center gap-2 fw-bold text-dark">
            <div className="bg-dark text-white p-1 rounded">
              <FileEarmarkText size={20} />
            </div>
            Quotator
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" active={view === "list"} onClick={() => setView("list")}>Dashboard</Nav.Link>
              <Nav.Link href="#">Clients</Nav.Link>
              <Nav.Link href="#">Settings</Nav.Link>
            </Nav>
            {view === "list" && (
              <Button 
                variant="primary" 
                className="d-flex align-items-center gap-2"
                onClick={handleCreateNew}
              >
                <PlusLg /> New Quotation
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="flex-grow-1 pb-5">
        {view === "list" ? (
          <>
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h2 className="fw-bold mb-1">Quotations</h2>
                <p className="text-muted mb-0">Manage your business proposals and estimates.</p>
              </div>
            </div>

            <div className="bg-white rounded shadow-sm border p-4">
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || "all")}
                className="mb-4"
              >
                <Tab eventKey="all" title="All" />
                <Tab eventKey="draft" title="Drafts" />
                <Tab eventKey="sent" title="Sent" />
                <Tab eventKey="accepted" title="Accepted" />
                <Tab eventKey="rejected" title="Rejected" />
              </Tabs>

              <QuotationList 
                quotations={filteredQuotations}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <Button variant="link" className="ps-0 text-decoration-none text-muted" onClick={() => setView("list")}>
                &larr; Back to Dashboard
              </Button>
              <h2 className="fw-bold mt-2">{editingQuotation ? "Edit Quotation" : "New Quotation"}</h2>
            </div>
            <QuotationForm 
              initialData={editingQuotation}
              clients={initialClients}
              onSave={handleSave}
              onCancel={() => setView("list")}
            />
          </>
        )}
      </Container>

      {/* Preview Modal */}
      {previewQuotation && (
        <QuotationPreview
          show={!!previewQuotation}
          onHide={() => setPreviewQuotation(null)}
          quotation={previewQuotation}
          client={initialClients.find(c => c.id === previewQuotation.clientId)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white py-4 mt-auto border-top">
        <Container className="text-center text-muted small">
          <p className="mb-0">&copy; {new Date().getFullYear()} Quotator Business System. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}
