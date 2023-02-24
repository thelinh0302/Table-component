import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

interface Props {
  id: string;
  onClickHandler: any;
  order: any;
}

const TableSortButton: React.FC<Partial<Props>> = ({
  id,
  onClickHandler,
  order
}) => {
  const _ListSortButton = classnames('core-list__sort--btn');

  return (
    <button className="core-list__sort--btn" id={id} onClick={onClickHandler}>
      <svg width={16} height={16} order={order}>
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.99878 12C7.73349 12 7.47907 11.8946 7.29152 11.707L5.29274 9.70732C4.9023 9.31671 4.90244 8.68355 5.29304 8.29311C5.68365 7.90267 6.31682 7.9028 6.70726 8.29341L7.99878 9.58548L9.2903 8.29341C9.68074 7.9028 10.3139 7.90267 10.7045 8.29311C11.0951 8.68355 11.0953 9.31671 10.7048 9.70732L8.70604 11.707C8.51849 11.8946 8.26407 12 7.99878 12Z"
            fill={order === 'desc' ? '#4F5A60' : null}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.99878 3C7.73349 3 7.47907 3.10542 7.29152 3.29304L5.29274 5.29268C4.9023 5.68329 4.90244 6.31645 5.29304 6.70689C5.68365 7.09733 6.31682 7.0972 6.70726 6.70659L7.99878 5.41452L9.2903 6.70659C9.68074 7.0972 10.3139 7.09733 10.7045 6.70689C11.0951 6.31645 11.0953 5.68329 10.7048 5.29268L8.70604 3.29304C8.51849 3.10542 8.26407 3 7.99878 3Z"
            fill={order === 'asc' ? '#4F5A60' : null}
          />
        </>
      </svg>
    </button>
  );
};

export default TableSortButton;
