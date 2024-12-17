"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Snackbar } from "@mui/material";
import { fetchFundRequest } from "@/app/redux/FundRequestSlice";
import DataTable from "./DataTable";
import LoadingSpinner from "../../common/Loading";
import ConfirmFundRequest from "./ConfirmFundRequest";
import { column } from "@/app/constants/FundRequestConst";

export default function DisplayFundRequest() {
  const dispatch = useDispatch();
  const { isLoading, fundRequestData } = useSelector((data) => data.fundRequestReducer);
  const [isApprove, setIsApprove] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchFundRequest());
  }, []);

  const updatedFundRequestData = fundRequestData.map((item) =>item);

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
