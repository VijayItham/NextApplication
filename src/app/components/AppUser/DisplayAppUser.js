"use client"

import { useDispatch, useSelector } from "react-redux"
//import { fetchAppUser } from "../../redux/AppUserSlice"
import { useEffect, useState } from "react";
import DataTable from "../../common/DataTable";
//import { column } from "../../constants/AppUserConst";
import { isEmpty } from 'lodash';
import EditAppUser from "./EditAppUser";
import DeleteAppUser from "./DeleteAppUser";
import LoadingSpinner from "../../common/Loading";

export default function DisplayAppUser() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const { isLoading, appUserData } = useSelector((data) => data.appUserReducer)
  console.log('data==>', isLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAppUser())
  }, [fetchAppUser])
  return (
    // 
    <div>
      {isLoading ? <LoadingSpinner /> :
        !isEmpty(appUserData) &&
        <div>
          <DataTable searchBy="UserName" setIsEdit={setIsEdit} setIsDelete={setIsDelete} setSelectedRow={setSelectedRow} data={appUserData} column={column} />
          {
            isEdit && <EditAppUser data={selectedRow} isEdit={isEdit} setIsEdit={setIsEdit} />
          }
          {
            isDelete && <DeleteAppUser data={selectedRow} isDelete={isDelete} setIsDelete={setIsDelete} />
          }
        </div>
      }
    </div>
  )
}