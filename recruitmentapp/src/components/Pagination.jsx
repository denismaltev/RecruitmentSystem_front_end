import React from "react";

const Pagination = ({ itemsPerPage, totalItem, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItem / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.length > 1 ? (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pageNumbers.map(number => (
              <li key={number} className="page-item">
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Pagination;
