/* eslint-disable react/prop-types */
const Filter = ({ searchText, onSearch }) => {
	return <input type="text" placeholder="Search contacts" value={searchText} onChange={onSearch} className="border border-slate-800 rounded-xl py-2 px-4 outline-none w-full" />;
};

export default Filter;
