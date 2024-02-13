import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';

// Fonction pour calculer les pages à afficher
function calculatePagesToShow(current: number, max: number): number[] {
  let start = Math.max(current - 2, 1);
  let end = Math.min(start + 4, max);

  // Ajuster le début si on est proche de la fin
  if (end === max) {
    start = Math.max(end - 4, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

interface PaginationTableProps {
  currentPage: number;
  maxPage: number;
  setCurrentPage: (page: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export default function PaginationTable({
  currentPage,
  maxPage,
  setCurrentPage,
  handlePrevPage,
  handleNextPage,
}: PaginationTableProps) {
  const pagesToShow = calculatePagesToShow(currentPage, maxPage);

  return (
    <>
      {maxPage > 1 && (
        <Pagination className="mt-8">
          <PaginationContent className="text-slate-50">
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handlePrevPage} />
            </PaginationItem>
            {currentPage > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink href="#" onClick={() => setCurrentPage(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}
            {pagesToShow.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === currentPage} onClick={() => setCurrentPage(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < maxPage - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" onClick={() => setCurrentPage(maxPage)}>
                    {maxPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem hidden={currentPage === maxPage}>
              <PaginationNext href="#" onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
