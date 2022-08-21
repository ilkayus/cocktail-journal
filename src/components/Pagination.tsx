import React from "react";
import UsePagination from "@mui/material/Pagination";

export interface Props {
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
  pageInfo: number[];
}

const Pagination = ({ setPageNumber, pageInfo }: Props) => {
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    console.log(newPage);
    setPageNumber(([pageNumber, pageMax]) => [newPage, pageMax]);
  };
  return (
    <UsePagination
      className="pagination"
      count={pageInfo[1]}
      shape="rounded"
      color="primary"
      size="large"
      variant="outlined"
      page={pageInfo[0]}
      onChange={handleChangePage}
      showFirstButton={pageInfo[1] > 5}
      showLastButton={pageInfo[1] > 5}
    />
  );
};

export default Pagination;
