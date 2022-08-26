import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface Props {
  multiSelection: boolean;
  data: { title: string }[];
  dataTitle: string;
}

const SearchIngredients = ({ multiSelection, data, dataTitle }: Props) => {
  const [value, setValue] = React.useState<
    { title: string } | { title: string }[] | null
  >([]);
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        console.log(value);
      }}
      className="advanced--search-checkboxes"
      multiple={multiSelection}
      id="checkboxes-tags-demo"
      options={data}
      disableCloseOnSelect
      getOptionLabel={(option: any) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={dataTitle} placeholder="Favorites" />
      )}
    />
  );
};

export default SearchIngredients;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
