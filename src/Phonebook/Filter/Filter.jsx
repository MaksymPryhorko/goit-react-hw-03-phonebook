import React from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

export default function Filter({ filter, onChange }) {
  return (
    <div className={style.filterContainer}>
      <label className={style.labelFilter}>
        <input
          className={style.inputFilter}
          type="text"
          value={filter}
          onChange={onChange}
        />
        Find contacts by name
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
