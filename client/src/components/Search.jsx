import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import SearchInput from "@/components/ui/SearchInput";

const Search = ({ filter, onlineUsers, users, setUsers }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    let filtered = users;

    if (filter === 'online') filtered = filtered.filter((user) => onlineUsers.includes(user.id));
    if (debouncedValue) filtered = filtered.filter((user) => user.name.toLowerCase().includes(debouncedValue.toLowerCase()));

    setUsers(filtered);
  }, [debouncedValue, users, filter, onlineUsers, setUsers]);

  return (
    <SearchInput
      placeholder="Search by name..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

Search.propTypes = {
  filter: PropTypes.string.isRequired,
  onlineUsers: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default Search;
