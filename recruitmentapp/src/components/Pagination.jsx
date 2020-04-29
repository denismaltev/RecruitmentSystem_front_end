import React from "react";

const Pagination = ({ itemsPerPage, totalItem, paginate }) => {
  const pageNumbers = [];
  // i <= Math.ceil(totalItem / itemsPerPage)
  for (let i = 1; i <= Math.ceil(totalItem / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* <li className="page-item">
                    <a className="btn btn-primary">Previous</a>
                     
                </li> */}
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
        {/* 
                <li className="page-item">
                    <a className="btn btn-primary">Next</a>
                </li> */}
      </ul>
    </nav>
  );
};
export default Pagination;