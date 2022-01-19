import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  const renderListItem = (items) => {
    if (typeof items === 'object' && !Array.isArray(items) && items !== null) {
      const newItems = Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          className={`list-group-item ${
            items[item] === selectedItem ? 'active' : ''
          }`}
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
          {items[item][contentProperty]}
        </li>
      ));
      return newItems;
    } else if (Array.isArray(items)) {
      const newItems = items.map((item) => (
        <li
          key={item[valueProperty]}
          className={`list-group-item ${item === selectedItem ? 'active' : ''}`}
          onClick={() => onItemSelect(item)}
          role="button"
        >
          {item[contentProperty]}
        </li>
      ));
      return newItems;
    }
  };

  return <ul className="list-group">{renderListItem(items)}</ul>;
};
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export default GroupList;
