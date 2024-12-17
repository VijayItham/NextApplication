"use client";

import { useState } from "react";
import { updateOperatorType } from "../../redux/OperatorTypeSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

import { useDispatch } from "react-redux";

export default function EditOperatorType({ data, setIsEdit, isEdit }) {
    const { operatorTypeId, operatorTypeName } = data
    const [updateOperatorTypeName, setUpdateOperatorTypeName] = useState(operatorTypeName);
     const dispatch = useDispatch();

    const handleEditSave = () => {
        dispatch(updateOperatorType({operatorTypeId,operatorTypeName:updateOperatorTypeName}))
        setIsEdit(false)
    }

    return (
        <Dialog open={isEdit} onClose={() => setIsEdit(false)}>
            <DialogTitle>Edit Operator Type</DialogTitle>
            <DialogContent>
                    <TextField
                    label="Operator Type" 
                        name="name"
                        fullWidth
                        margin="normal"
                        value={updateOperatorTypeName}
                        onChange={(e) => setUpdateOperatorTypeName(e.target.value)}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsEdit(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEditSave} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}