"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { omit, isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchFundRequest } from "@/app/redux/FundRequestSlice";
import DataTable from "./DataTable";
import LoadingSpinner from "../../common/Loading";
import ConfirmFundRequest from "./ConfirmFundRequest";
import { column } from "@/app/constants/FundRequestConst";
import { isLoggedIn } from "../../api/auth";
import { useRouter } from "next/navigation";

export default function DisplayFundRequest() {
  const dispatch = useDispatch();
  const { isLoading, fundRequestData } = useSelector((data) => data.fundRequestReducer);
  console.log('fundRequestData', fundRequestData)
  const [isApprove, setIsApprove] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAddFundRequest, setIsAddFundRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(fetchFundRequest());
    }
    else{
      router.push('/')
    }
  }, []);

  const updatedFundRequestData = fundRequestData.map((item) =>item);


  console.log('updatedFundRequestData', updatedFundRequestData)

  // const handleFundRequest = () => setIsAddFundRequest(true);
  // const selectedAllRowData = fundRequestData.filter(
  //   (item) => item.fundRequestId === selectedRow.fundRequestId
  // );

  console.log('IsApprove-', isApprove, 'IsReject', isReject)
  return (
    <div style={{ position: 'relative', minHeight: '200px' }}>
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
        !isEmpty(updatedFundRequestData) &&(
          <DataTable
            searchBy="paymentMode"
            setIsApprove={setIsApprove}
            setIsReject={setIsReject}
            setSelectedRow={setSelectedRow}
            data={updatedFundRequestData}
            column={column}
          />
        )
      )}
      {(isApprove || isReject) && (
        <ConfirmFundRequest
          data={selectedRow}
          setOpenSnackbar={setOpenSnackbar}
          setMessage={setMessage}
          isApprove={isApprove}
          isReject={isReject}
          setIsApprove={setIsApprove}
          setIsReject={setIsReject}
        />
      )}
    </div>
  );
}
