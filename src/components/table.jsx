import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import PropTypes from 'prop-types';

const Table = ({ columns, selectedSort, onSort, data, children }) => {
  return (
    <table className="table" style={{ height: 400 }}>
      {children || (
        <>
          <TableHeader
            columns={columns}
            selectedSort={selectedSort}
            onSort={onSort}
          />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};
Table.propTypes = {
  data: PropTypes.array,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  onSort: PropTypes.func,
  children: PropTypes.array
};

export default Table;
