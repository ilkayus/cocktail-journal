import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import SearchIngredients from "./SearchFieldIngs";
import ingredientsData from "../data/ingredients.json";
import categoriesData from "../data/categories.json";
import typeData from "../data/typeAlcoholic.json";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface Props {
  advancedSearch: boolean;
  handleAdvancedSearchClick: any;
}

const AdvancedSearcModal = ({
  advancedSearch,
  handleAdvancedSearchClick,
}: Props) => {
  return (
    <Modal
      open={advancedSearch}
      onClose={handleAdvancedSearchClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal--box">
        <h2>Find Your Favorite Cocktails!</h2>
        <SearchIngredients
          multiSelection={false}
          data={typeData}
          dataTitle="Type"
        />
        <SearchIngredients
          multiSelection={false}
          data={categoriesData}
          dataTitle="Categories"
        />
        <SearchIngredients
          multiSelection={true}
          data={ingredientsData}
          dataTitle="Ingredients"
        />
        <Button variant="outlined" className="btn--advanced-search-results">
          BIRING!
        </Button>
      </Box>
    </Modal>
  );
};

export default AdvancedSearcModal;
