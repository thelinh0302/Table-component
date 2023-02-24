import React, { CSSProperties } from 'react';
import Spinner from '../spinner';
import SearchInput from '../search-input';
import TableHeader from './TableHeader';
import TableItem from './TableItem';
import TablePaginateItems from './TablePaginate';
import { sortTableBy } from '@/utils';
// import './style.scss';

function extractHeaderData(data: any) {
  let headerData: any = [];
  if (data.length > 0) {
    const keys = Object.keys(data[0]);
    headerData = keys.map(key => ({
      key,
      node: key
    }));
    return headerData;
  }
  return headerData;
}

interface Props {
  id: string;
  data: any;
  itemResolver: any;
  headerResolver: any;
  className: string;
  options: {
    items: [];
    style: {};
  };
  styles: CSSProperties;
  onSort: any;
  config: any;
  primaryKey: string;
  searchInput: boolean;
  handleSearch: (data: string) => void;
  itemsPerpage: number;
  loading: boolean;
}
const Table: React.FC<Partial<Props>> = ({
  id,
  data: dataProp,
  itemResolver,
  headerResolver,
  options,
  onSort,
  config,
  primaryKey,
  itemsPerpage,
  loading,
  handleSearch
}) => {
  const [data, setData] = React.useState(dataProp);
  const [sortBy, setSortBy] = React.useState([]);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [checkboxData, setCheckboxData] = React.useState([]);
  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerpage;
    const currentItems = dataProp?.slice(itemOffset, endOffset);

    const pageCountCurr = Math.ceil(dataProp?.length / itemsPerpage);
    setPageCount(pageCountCurr);
    setData(currentItems);
  }, [dataProp, itemOffset, itemsPerpage]);

  const sortHandler = (field: any) => () => {
    let newSortBy = [...sortBy];
    const index = sortBy.findIndex(s => s.field === field);
    if (index !== -1) {
      const fieldSortBy = { ...sortBy[index] };
      if (fieldSortBy.order === 'asc') {
        fieldSortBy.order = 'desc';
        newSortBy[index] = fieldSortBy;
      } else {
        newSortBy.splice(index, 1);
      }
    } else {
      newSortBy = [
        {
          field,
          order: 'asc'
        },
        ...newSortBy
      ];
    }

    setSortBy(newSortBy);

    if (onSort) {
      onSort(newSortBy);
    } else {
      const sorted = sortTableBy([...data], newSortBy);
      setData(sorted);
    }
  };
  const handleChangeCheckBox = (value: any) => {
    let array = [...checkboxData];
    const findIndex = array.findIndex((item: any) => item.id === value.id);
    if (findIndex > -1) {
      array.splice(findIndex, 1);
    } else {
      array = [...checkboxData, value];
    }
    setCheckboxData(array);
  };
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerpage) % dataProp.length;
    setItemOffset(newOffset);
  };
  const renderHeader = () => {
    if (data?.length > 0) {
      const headerData = extractHeaderData(data);
      return (
        <TableHeader
          id={id}
          data={headerData}
          resolver={headerResolver}
          options={options}
          sortHandler={sortHandler}
          sortables={config?.sortables}
          sensitives={config?.sensitives}
          primaryKey={primaryKey}
          sortBy={sortBy}
        />
      );
    }
    return null;
  };
  const renderItems = (groupData = data) => {
    if (groupData?.length > 0) {
      return (
        <div className="core-list__items">
          {groupData.map((d: any, idx: any) => {
            let itemData = d;

            if (itemResolver) {
              itemData = {
                ...itemResolver(d, idx)
              };
            }
            return (
              <TableItem
                key={`core-list__item-${id}_${idx}`}
                content={itemData}
                options={options}
                handleChangeCheckBox={handleChangeCheckBox}
                primaryKey={primaryKey}
              />
            );
          })}
        </div>
      );
    }
    return 'You have an empty list.';
  };
  const handleSearchChange = (value: any) => {
    handleSearch(value);
  };
  const renderList = () => {
    return (
      <>
        {renderHeader()}
        {renderItems()}
      </>
    );
  };
  return !loading ? (
    <div className="core-container">
      {<SearchInput onSearch={handleSearchChange} />}
      <div className="core-list">
        <div className="core-list__container">
          <div className="core-list__list">{renderList()}</div>
        </div>
      </div>
      {data?.length && (
        <div className="core-paginate-Table">
          <TablePaginateItems
            handlePageClick={handlePageClick}
            itemsPerpage={itemsPerpage}
            pageCount={pageCount}
          />
        </div>
      )}

      {checkboxData?.length > 0 && JSON.stringify(checkboxData)}
    </div>
  ) : (
    <Spinner />
  );
};
export default Table;
