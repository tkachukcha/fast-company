/* eslint-disable multiline-ternary */

import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, columns, selectedSort }) => {
  const handleSort = (item) => {
    if (item === selectedSort.path) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  const renderOrderIcon = (item) => {
    if (item === selectedSort.path) {
      if (selectedSort.order === 'asc') {
        return <i className="bi bi-caret-down-fill"></i>;
      } else if (selectedSort.order === 'desc') {
        return <i className="bi bi-caret-up-fill"></i>;
      }
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            scope="col"
            key={column}
            className="w-25"
            onClick={
              columns[column].path !== 'qualities'
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{
              role: columns[column].path !== 'qualities' ? 'button' : 'false'
            }}
          >
            {columns[column].name}
            {renderOrderIcon(columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default TableHeader;
