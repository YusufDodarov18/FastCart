import { useDispatch } from "react-redux";
import { Input } from "antd";
import { Box } from "@mui/material";

const { Search } = Input;

export default function SearchProducts({ query, setSearchQuery }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Box className="block md:hidden">
        <Search
          placeholder="What are you looking for?"
          onSearch={null}
          value={query}
          size="middle"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          enterButton
          className="w-64"
        />
      </Box>
    </div>
  );
}
