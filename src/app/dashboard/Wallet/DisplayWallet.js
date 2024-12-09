

import { fetchAllWallets } from "../../redux/WalletSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { useState } from "react";
import { column } from "../../constants/WalletConst";
import LoadingSpinner from "@/app/common/Loading";
import DataTable from "../../common/DataTable"
import { useSelector } from "react-redux";
import DeleteWallet from "./DeleteWallet";
import EditWallet from "./EditWallet";

export default function DisplayWallet() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const { loading, wallets } = useSelector((data) => data.walletReducer)
  console.log('wallets=111=>', wallets)
  const data = wallets

  console.log('data=111=>', data)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllWallets());
  }, [fetchAllWallets])

  return (
    <div>
      {loading ? <LoadingSpinner /> :
        !isEmpty(wallets) &&
        <div>
          <DataTable searchBy="walletName" setIsEdit={setIsEdit} setIsDelete={setIsDelete} setSelectedRow={setSelectedRow} data={data} column={column} />
          {
            isEdit && <EditWallet data={selectedRow} isEdit={isEdit} setIsEdit={setIsEdit} />
          }
          {
            isDelete && <DeleteWallet data={selectedRow} isDelete={isDelete} setIsDelete={setIsDelete} />
          }
        </div>
      }
    </div>
  )
} 