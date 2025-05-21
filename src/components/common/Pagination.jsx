import React from 'react';
import ReactPaginate from 'react-paginate';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      breakLabel={<span className="px-3 py-2">...</span>}
      nextLabel={
        <button className="px-3 py-2 hover:bg-pink-50 rounded-lg flex items-center gap-1 text-pink-500">
          Next
          <HiChevronRight className="text-lg" />
        </button>
      }
      previousLabel={
        <button className="px-3 py-2 hover:bg-pink-50 rounded-lg flex items-center gap-1 text-pink-500">
          <HiChevronLeft className="text-lg" />
          Prev
        </button>
      }
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={currentPage}
      renderOnZeroPageCount={null}
      className="flex items-center justify-center gap-2 text-sm font-medium"
      pageClassName="overflow-hidden rounded-lg"
      pageLinkClassName="px-4 py-2 hover:bg-pink-50 text-gray-700 hover:text-pink-500 transition-colors flex items-center justify-center"
      activeClassName="!bg-pink-500 text-white"
      activeLinkClassName="!text-white hover:!bg-pink-500 hover:!text-white"
      disabledClassName="opacity-50 cursor-not-allowed"
      disabledLinkClassName="hover:bg-transparent cursor-not-allowed"
      breakClassName="text-gray-400"
    />
  );
};

export default Pagination;