"use client"

import { useDispatch, useSelector } from "react-redux"
import { fetchOperatorType } from "../../redux/OperatorTypeSlice"
import { useEffect, useState } from "react";
import DataTable from "../../common/DataTable"
import { column } from "../../constants/OperatorTypeConst";
import { isEmpty } from 'lodash';
import EditOperatorType from "./EditOperatorType";
import DeleteOperatorType from "./DeleteOperatorType";
import LoadingSpinner from "../../common/Loading"

export default function DisplayOperatorType() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const { isLoading, operatorTypeData } = useSelector((data) => data.operatorTypeReducer)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOperatorType())
  }, [fetchOperatorType])
  return (
    <div>
      {isLoading ? <LoadingSpinner /> :
        !isEmpty(operatorTypeData) &&
        <div>
          <DataTable searchBy="operatorTypeName" setIsEdit={setIsEdit} setIsDelete={setIsDelete} setSelectedRow={setSelectedRow} data={operatorTypeData} column={column} />
          {
            isEdit && <EditOperatorType data={selectedRow} isEdit={isEdit} setIsEdit={setIsEdit} />
          }
          {
            isDelete && <DeleteOperatorType data={selectedRow} isDelete={isDelete} setIsDelete={setIsDelete} />
          }
        </div>
      }
    </div>
  )
}