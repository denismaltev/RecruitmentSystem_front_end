import React from "react";

const Pagination = ({ paginate }) => {
  const pageNumbers = [];
  // i <= Math.ceil(totalItem / itemsPerPage)
  for (let i = 1; i <= 10; i++) {
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
              href="javascript:void(0)"
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
