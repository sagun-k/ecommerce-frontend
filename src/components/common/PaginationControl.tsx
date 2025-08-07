import { Button } from "react-bootstrap";

interface PaginationControlProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControl = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationControlProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="d-flex justify-content-center mt-4">
      <Button
        variant="outline-secondary"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="me-2"
      >
        Previous
      </Button>
      <span className="align-self-center">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline-secondary"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="ms-2"
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControl;
