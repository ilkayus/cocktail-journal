import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import SearchIngredients from "./SearchFieldIngs";
import ingredientsData from "../data/ingredients.json";
import categoriesData from "../data/categories.json";
import typeData from "../data/typeAlcoholic.json";
import { fetchData } from "../services/fetchData";
import renderNew from "../services/renderNew";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(70vw,500px)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface Props {
  advancedSearch: boolean;
  handleAdvancedSearchClick: any;
  setCocktailData: any;
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const AdvancedSearcModal = ({
  advancedSearch,
  handleAdvancedSearchClick,
  setCocktailData,
  setPageNumber,
}: Props) => {
  const [typeValue, setTypeValue] = React.useState<{ title: string } | null>(
    null
  );
  const [categoriesValue, setCategoriesValue] = React.useState<{
    title: string;
  } | null>(null);
  const [ingredientsValue, setIngredientsValue] = React.useState<
    { title: string }[] | null
  >(null);
  const handleBringClick = async () => {
    const type = typeValue?.title.toString();
    const category = categoriesValue?.title.toString();
    const ings = ingredientsValue?.map((el) => {
      return el?.title;
    });
    fetchData(
      "search",
      `${type + ":" + category + ":" + ings?.join(",")}`
    ).then((data) => renderNew(setCocktailData, setPageNumber, data));
    setTypeValue(null);
    setCategoriesValue(null);
    setIngredientsValue(null);
    handleAdvancedSearchClick();
  };
  return (
    <Modal
      open={advancedSearch}
      onClose={handleAdvancedSearchClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal--box">
        <h2>Find Your Favorite Cocktails!</h2>
        <div className="modal--box-content">
          <SearchIngredients
            multiSelection={false}
            data={typeData}
            dataTitle="Type"
            setValue={setTypeValue}
          />
          <SearchIngredients
            multiSelection={false}
            data={categoriesData}
            dataTitle="Categories"
            setValue={setCategoriesValue}
          />
          <SearchIngredients
            multiSelection={true}
            data={ingredientsData}
            dataTitle="Ingredients"
            setValue={setIngredientsValue}
          />
        </div>
        <div className="modal--box-button-container">
          <Button
            variant="outlined"
            className="btn--advanced-search-results"
            onClick={handleBringClick}
          >
            BIRING!
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AdvancedSearcModal;
