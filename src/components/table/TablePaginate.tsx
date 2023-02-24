import React from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
  itemsPerpage: number;
  handlePageClick: any;
  pageCount: number;
}

const TablePaginateItems: React.FC<Props> = ({
  pageCount,
  handlePageClick
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%'
      }}
    >
      <ReactPaginate
        activeClassName={'item active '}
        breakClassName={'item break-me '}
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        pageClassName={'item pagination-page '}
        previousClassName={'item previous'}
        nextLabel={
          <img width={10} src="/static/images/icon/right-arrow.png" alt="" />
        }
        previousLabel={
          <img width={10} src="/static/images/icon/left-arrow.png" alt="" />
        }
        pageCount={pageCount}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default TablePaginateItems;
