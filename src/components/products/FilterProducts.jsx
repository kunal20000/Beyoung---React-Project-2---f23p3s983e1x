import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
  Box,
  Chip,
} from "@mui/material";
import './product.css';

// parameters for the dropdown menu's  item height, padding, and menu properties
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "auto",
      minWidth: "fit-content",
    },
  },
};

const FilterProducts = ({ values, type, filter, setFilter }) => {
  // console.log("values, type, filter",values, type, filter);
  const [selectedValues, setSelectedValues] = useState(filter[type] || []);

  //This useEffect updates the selected values when the filter or type props change.
  useEffect(() => {
    setSelectedValues(filter[type] || []);
  }, [filter, type]);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedValues(selected);

    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: selected,
    }));
  };
  return (
    <FormControl className="formMediaQuery"
      variant="standard"
      size="small"
      sx={{ m: 1, width: "100%", margin: 0 }}
    >
      <InputLabel id={`select-multiple-checkbox-${type}-label`}>
        {type === "subCategory" ? "category" : type}
      </InputLabel>
      <Select
        labelId={`select-multiple-checkbox-${type}-label`}
        id={`select-multiple-checkbox-${type}`}
        multiple
        value={selectedValues}
        onChange={handleChange}
        MenuProps={MenuProps}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                sx={
                  type === "color" && value !== "black"
                    ? { backgroundColor: value }
                    : type === "color" && value === "black"
                    ? { backgroundColor: "black", color: "white" }
                    : {}
                }
              />
            ))}
          </Box>
        )}
      >
        {values.map((value) => (
          <MenuItem
            key={value}
            value={value}
            sx={{
              paddingLeft: "0",
              "& .MuiListItemIcon-root, & .MuiTypography-root": {
                fontSize: "0.8rem",
              },
            }}
          >
            <Checkbox
              checked={selectedValues.indexOf(value) > -1}
              sx={
                type === "color"
                  ? {
                      "& .MuiSvgIcon-root": { fill: value, fontSize: "10px" },
                      border: "1px solid black",
                      backgroundColor: value,
                      margin: "0 1rem",
                      "&:hover": {
                        background: "transparent !important",
                      },
                    }
                  : {}
              }
            />
            <ListItemText primary={value} sx={{ fontSize: "0.8rem" }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterProducts;
