import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <div className="flex justify-center my-8">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaChevronRight className="text-sm" />}
        previousLabel={<FaChevronLeft className="text-sm" />}
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={currentPage}
        renderOnZeroPageCount={null}
        className="flex items-center gap-2"
        pageClassName="transition-colors"
        pageLinkClassName="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600"
        activeClassName="!bg-pink-500"
        activeLinkClassName="!text-white hover:!bg-pink-500"
        previousClassName="transition-colors"
        nextClassName="transition-colors"
        previousLinkClassName="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600"
        nextLinkClassName="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600"
        disabledClassName="opacity-50 cursor-not-allowed"
        breakClassName="text-gray-400"
      />
    </div>
  );
};

export default Pagination;