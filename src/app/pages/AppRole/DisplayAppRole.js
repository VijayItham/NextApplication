"use client"

import { useDispatch, useSelector } from "react-redux"
import { fetchAppRole } from "../../redux/AppRoleSlice"
import { useEffect, useState } from "react";
import DataTable from "../../common/DataTable"
import { column } from "../../constants/AppRoleConst";
import { isEmpty } from 'lodash';
import EditAppRole from "./EditAppRole";
import DeleteAppRole from "./DeleteAppRole";
import LoadingSpinner from "../../common/Loading"
import { Box } from "@mui/material";

export default function DisplayAppRole() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const { isLoading, appRoleData } = useSelector((data) => data.appRoleReducer)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAppRole())
  }, [dispatch])

  return (
    <Box>
      {isLoading ? <LoadingSpinner /> :
        !isEmpty(appRoleData) &&
        <Box>
          <DataTable searchBy="roleName" setIsEdit={setIsEdit} setIsDelete={setIsDelete} setSelectedRow={setSelectedRow} data={appRoleData} column={column} />
          {
            isEdit && <EditAppRole data={selectedRow} isEdit={isEdit} setIsEdit={setIsEdit} />
          }
          {
            isDelete && <DeleteAppRole data={selectedRow} isDelete={isDelete} setIsDelete={setIsDelete} />
          }
        </Box>
      }
    </Box>
  )
}