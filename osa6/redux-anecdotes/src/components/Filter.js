import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
