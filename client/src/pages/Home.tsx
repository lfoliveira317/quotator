import { useState, useMemo } from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { PlusLg, Quote as QuoteIcon } from "react-bootstrap-icons";
import { initialQuotes, Quote } from "@/lib/data";
import QuoteCard from "@/components/QuoteCard";
import AddQuoteModal from "@/components/AddQuoteModal";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(quotes.map((q) => q.category));
    return Array.from(cats).sort();
  }, [quotes]);

  // Filter quotes based on search, category, and favorites
  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesSearch =
        quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? quote.category === selectedCategory
        : true;
      const matchesFavorite = showFavoritesOnly ? quote.isFavorite : true;

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [quotes, searchTerm, selectedCategory, showFavoritesOnly]);

  const handleAddQuote = (newQuote: Omit<Quote, "id" | "isFavorite">) => {
    const quote: Quote = {
      ...newQuote,
      id: Math.max(...quotes.map((q) => q.id), 0) + 1,
      isFavorite: false,
    };
    setQuotes([quote, ...quotes]);
  };

  const handleToggleFavorite = (id: number) => {
    setQuotes(
      quotes.map((q) =>
        q.id === id ? { ...q, isFavorite: !q.isFavorite } : q
      )
    );
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm sticky-top mb-4">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center gap-2 fw-bold text-primary">
            <QuoteIcon size={24} />
            Quotator
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" active>Home</Nav.Link>
              <Nav.Link href="#">Categories</Nav.Link>
              <Nav.Link href="#">Authors</Nav.Link>
            </Nav>
            <Button 
              variant="primary" 
              className="d-flex align-items-center gap-2"
              onClick={() => setShowAddModal(true)}
            >
              <PlusLg /> Add Quote
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="flex-grow-1 pb-5">
        {/* Hero Section */}
        <div className="text-center py-5 mb-5 position-relative overflow-hidden bg-white border-bottom">
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
            style={{ 
              backgroundImage: 'url(/images/hero-bg.png)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
          <div className="position-relative" style={{ zIndex: 1 }}>
            <img 
              src="/images/banner-art.png" 
              alt="Quotator Art" 
              className="img-fluid mb-4 d-none d-md-inline-block"
              style={{ maxHeight: "120px", objectFit: "contain" }} 
            />
            <h1 className="display-3 fw-bold mb-3 ls-tight">Discover & Share Wisdom</h1>
            <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: "600px", fontWeight: 400 }}>
              A curated collection of inspiring quotes to motivate, educate, and enlighten.
              Find your daily dose of inspiration here.
            </p>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />

        {/* Quotes Grid */}
        {filteredQuotes.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredQuotes.map((quote) => (
              <Col key={quote.id}>
                <QuoteCard
                  quote={quote}
                  onToggleFavorite={handleToggleFavorite}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <div className="mb-3 text-muted">
              <QuoteIcon size={48} className="opacity-25" />
            </div>
            <h3>No quotes found</h3>
            <p className="text-muted">
              Try adjusting your search or filters, or add a new quote.
            </p>
            <Button 
              variant="outline-primary" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setShowFavoritesOnly(false);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer className="bg-white py-4 mt-auto border-top">
        <Container className="text-center text-muted">
          <p className="mb-0">&copy; {new Date().getFullYear()} Quotator. All rights reserved.</p>
        </Container>
      </footer>

      {/* Add Quote Modal */}
      <AddQuoteModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAddQuote={handleAddQuote}
      />
    </div>
  );
}
