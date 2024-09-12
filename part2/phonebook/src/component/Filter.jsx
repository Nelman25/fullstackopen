/* eslint-disable react/prop-types */
const Filter = ({ searchText, onSearch }) => {
	return <input type="text" value={searchText} onChange={onSearch} />;
};

export default Filter;
