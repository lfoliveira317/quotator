import { Quote } from "@/lib/data";
import { Card, Button, Badge } from "react-bootstrap";
import { Heart, HeartFill, Share, Clipboard } from "react-bootstrap-icons";
import { toast } from "sonner";

interface QuoteCardProps {
  quote: Quote;
  onToggleFavorite: (id: number) => void;
}

export default function QuoteCard({ quote, onToggleFavorite }: QuoteCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    toast.success("Quote copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Quotator",
          text: `"${quote.text}" - ${quote.author}`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      handleCopy();
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0 quote-card overflow-hidden">
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
        style={{ 
          backgroundImage: 'url(/images/quote-card-bg.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Card.Body className="d-flex flex-column position-relative" style={{ zIndex: 1 }}>
        <div className="mb-3">
          <Badge bg="light" text="dark" className="border">
            {quote.category}
          </Badge>
        </div>
        <blockquote className="blockquote mb-4 flex-grow-1">
          <p className="mb-3 fs-4 fw-medium">"{quote.text}"</p>
          <footer className="blockquote-footer mt-2 text-secondary">
            <cite title="Source Title">{quote.author}</cite>
          </footer>
        </blockquote>
        <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
          <Button
            variant="link"
            className="p-0 text-decoration-none text-danger"
            onClick={() => onToggleFavorite(quote.id)}
            aria-label={quote.isFavorite ? "Unfavorite" : "Favorite"}
          >
            {quote.isFavorite ? <HeartFill size={20} /> : <Heart size={20} />}
          </Button>
          <div className="d-flex gap-2">
            <Button
              variant="light"
              size="sm"
              className="rounded-circle p-2 d-flex align-items-center justify-content-center"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              <Clipboard size={16} />
            </Button>
            <Button
              variant="light"
              size="sm"
              className="rounded-circle p-2 d-flex align-items-center justify-content-center"
              onClick={handleShare}
              title="Share quote"
            >
              <Share size={16} />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
