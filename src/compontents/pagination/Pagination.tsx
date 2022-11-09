import ReactPaginate from "react-paginate";
import React from "react";

const Pagination: React.FC<any> = ({onChange, totalPages, forcePage, statusCards}) => {
    return (
        statusCards === 'success' ?
        <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="→"
            onPageChange={(evt) => onChange(evt.selected + 1)}
            pageRangeDisplayed={2}
            pageCount={totalPages}
            previousLabel="←"
            forcePage={forcePage}
        /> : <></>
    )

}

export default Pagination;