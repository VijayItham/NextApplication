"use client"

import { useDispatch, useSelector } from "react-redux"
import { fetchAppRole } from "../redux/AppRoleSlice"
import { useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import { column } from "../constants/AppRoleConst";
import { isEmpty } from 'lodash';
import EditAppRole from "./EditAppRole";
import DeleteAppRole from "./DeleteAppRole";

export default function DisplayAppRole() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const data = useSelector((data) => data.appRoleReducer.appRoleData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAppRole())
  }, [fetchAppRole])
  return (
    // 
    <div>
      {!isEmpty(data) &&
        <div>
          <DataTable searchBy="roleName" setIsEdit={setIsEdit} setIsDelete={setIsDelete} setSelectedRow={setSelectedRow} data={data} column={column}/>
          {
            isEdit && <EditAppRole data = {selectedRow} isEdit={isEdit} setIsEdit={setIsEdit}/>
          }
          {
            isDelete && <DeleteAppRole data={selectedRow} isDelete={isDelete} setIsDelete={setIsDelete}/>
          }
        </div>
        }
    </div>
  )
}