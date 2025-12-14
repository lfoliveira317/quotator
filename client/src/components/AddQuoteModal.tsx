import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Quote } from "@/lib/data";

interface AddQuoteModalProps {
  show: boolean;
  onHide: () => void;
  onAddQuote: (quote: Omit<Quote, "id" | "isFavorite">) => void;
}

export default function AddQuoteModal({ show, onHide, onAddQuote }: AddQuoteModalProps) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddQuote({ text, author, category });
    setText("");
    setAuthor("");
    setCategory("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Quote</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="quoteText">
            <Form.Label>Quote Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter the quote..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="quoteAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Who said this?"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="quoteCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Inspiration, Life, Work"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Quote
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
