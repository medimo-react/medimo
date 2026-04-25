import styles from "./Pagination.module.css";

function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) {
  const paginationClassName = [styles.pagination, className]
    .filter(Boolean)
    .join(" ");

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  return (
    <nav className={paginationClassName} aria-label="페이지네이션">
      <button
        type="button"
        className={styles.button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>

      <div className={styles.pageList}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={[
              styles.pageButton,
              page === currentPage ? styles.active : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => handlePageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </nav>
  );
}

export default Pagination;