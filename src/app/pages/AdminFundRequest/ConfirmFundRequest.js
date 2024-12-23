"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { fetchFundRequest, updateFundRequestByAdmin } from "@/app/redux/FundRequestSlice";
import { getUserDetails } from "../api/authCookies";

import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ConfirmFundRequest({
  data,
  setIsApprove,
  isApprove,
  isReject,
  setIsReject,
  setMessage,
  setOpenSnackbar,
}) {
  const dispatch = useDispatch();
  const [remark, setRemark] = useState('')

  const handleApproveOrReject = async () => {
    const {fundRequestId, fundAmount} = data;
    const userName = getUserDetails().userName;
    const status = isApprove?1:2
    const requestData = {userName, fundRequestId, amount:fundAmount,status, remark}
    await dispatch(updateFundRequestByAdmin(requestData));
    setIsReject(false);
    setIsApprove(false)
    setMessage("Fund Request Updated Succefully!");
    setOpenSnackbar(true);
    dispatch(fetchFundRequest());
  };

  const handleClose = () => {
    setIsApprove(false);
    setIsReject(false);
  };

  return (
    <Dialog open={isApprove || isReject} onClose={handleClose}>
      <DialogTitle>{isApprove ? "Approve" : "Reject"} Confirmation</DialogTitle>
      <DialogContent>
        <TextField
          label="Remark"
          name="remark"
          fullWidth
          margin="normal"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleApproveOrReject} color="secondary">
          {isApprove ? "Approve" : "Reject"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
