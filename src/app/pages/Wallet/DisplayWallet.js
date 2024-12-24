import { fetchAllWallets } from "@/app/redux/WalletSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { useState } from "react";
import { column } from "@/app/constants/WalletConst";
import LoadingSpinner from "@/app/common/Loading";
import DataTable from "@/app/common/DataTable";
import { useSelector } from "react-redux";
import DeleteWallet from "./DeleteWallet";
import EditWallet from "./EditWallet";

export default function DisplayWallet() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const { isLoading, wallets } = useSelector((data) => data?.walletReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllWallets());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !isEmpty(wallets) && (
          <div>
            <DataTable
              searchBy="walletName"
              setIsEdit={setIsEdit}
              setIsDelete={setIsDelete}
              setSelectedRow={setSelectedRow}
              data={wallets}
              column={column}
            />
            {isEdit && (
              <EditWallet
                data={selectedRow}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            )}
            {isDelete && (
              <DeleteWallet
                data={selectedRow}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
              />
            )}
          </div>
        )
      )}
    </div>
  );
}
