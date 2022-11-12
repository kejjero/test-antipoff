import ReactPaginate from "react-paginate";
import React from "react";
import {IPagination} from "./types";

const Pagination: React.FC<IPagination> = ({onChange, totalPages, forcePage}) => {
    return (
        <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="→"
            onPageChange={(evt) => onChange(evt.selected + 1)}
            pageRangeDisplayed={2}
            pageCount={totalPages}
            previousLabel="←"
            forcePage={forcePage}
        />
    )

}

export default Pagination;