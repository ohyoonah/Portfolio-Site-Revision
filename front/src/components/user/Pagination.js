import styled from "styled-components";

const PageButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;

  button {
    width: 80px;
    border: none;
    font-size: 1.3rem;
    padding: 20px;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.textColor};

    &:hover {
      background: gray;
    }
  }
`;

const Pagination = ({ total, page, setCount }) => {
  return (
    <PageButton>
      <button
        className="paginationBtn"
        onClick={() => setCount((prev) => ({ ...prev, page: page - 1 }))}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array(total)
        .fill()
        .map((v, i) => (
          <button
            className="paginationBtn"
            key={i + 1}
            onClick={() => setCount((prev) => ({ ...prev, page: i + 1 }))}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}
      <button
        className="paginationBtn"
        onClick={() => setCount((prev) => ({ ...prev, page: page + 1 }))}
        disabled={page === total}
      >
        &gt;
      </button>
    </PageButton>
  );
};

export default Pagination;
