"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchFundRequest } from "@/app/redux/FundRequestSlice";
import DataTable from "../../common/DataTable";
import LoadingSpinner from "../../common/Loading";
import AddFundRequest from "./AddFundRequest";
import DeleteFundRequest from "./DeleteFundRequest";
import { column } from "@/app/constants/FundRequestConst";
import { usePathname } from "next/navigation";

export default function DisplayFundRequest() {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { isLoading, fundRequestData } = useSelector((data) => data.fundRequestReducer);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAddFundRequest, setIsAddFundRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
      dispatch(fetchFundRequest());
  }, []);

  const updatedFundRequestData = fundRequestData.map((item) =>item);


  console.log('updatedFundRequestData', updatedFundRequestData)

  const handleFundRequest = () => setIsAddFundRequest(true);
  const selectedAllRowData = fundRequestData.filter(
    (item) => item.fundRequestId === selectedRow.fundRequestId
  );
  return (
    <div style={{ position:'fixed', width: "80vw", top: "5.9rem", bottom: 0, height:"100vh",  backgroundColor: "#FBF8F3",   left: "17.5rem", overflowY: "auto",}}>
       <Box sx={{ width:"93%", margin:"20px auto" , marginRight:"3rem"}}>
      <Box sx={{display:"flex"}}>
      <Box mb={2} sx={{marginTop:"10px"}}>
        {!isAddFundRequest && !isEdit &&  (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleFundRequest}
          >
            Add Fund Request
          </Button>
        )}
      </Box>
      <Box sx={{marginTop:"5px", textAlign:"center", color:"#333333", position:"relative", left:"20rem" ,fontSize:"25px"}}>{pathName.split('/').pop()}</Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !isEmpty(updatedFundRequestData) &&
        !isAddFundRequest &&
        !isEdit && (
          <DataTable
            searchBy="paymentMode"
            setIsEdit={setIsEdit}
            setIsDelete={setIsDelete}
            setSelectedRow={setSelectedRow}
            data={updatedFundRequestData}
            column={column}
          />
        )
      )}
      {(isAddFundRequest || isEdit) && (
        <AddFundRequest
          setIsEdit={setIsEdit}
          setIsAddFundRequest={setIsAddFundRequest}
          isEdit={isEdit}
          setOpenSnackbar={setOpenSnackbar}
          setMessage={setMessage}
          data={selectedAllRowData[0]}
        />
      )}
      {isDelete && (
        <DeleteFundRequest
          data={selectedRow}
          setOpenSnackbar={setOpenSnackbar}
          setMessage={setMessage}
          isDelete={isDelete}
          setIsDelete={setIsDelete}
        />
      )}
      </Box>
    </div>
  );
}
