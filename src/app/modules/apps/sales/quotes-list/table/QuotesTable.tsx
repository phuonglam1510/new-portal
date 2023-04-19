import React, { useMemo } from "react";
import { useTable, ColumnInstance, Row } from "react-table";
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn";
import { CustomRow } from "./columns/CustomRow";
import { usersColumns } from "./columns/_columns";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { KTCardBody } from "../../../../../../_metronic/helpers";
import { useQuoteContext } from "../core/QuoteProvider";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuotesListPagination } from "../components/pagination/QuotesListPagination";
import {useListViewAddonContext} from "../core/ListViewAddonProvider";
import {useListLateDeliveryContext} from "../core/ListLateDeliveryProvider";

const QuotesTable = () => {
  const { companies, isLoading } = useQuoteContext();
  const data = useMemo(() => companies, [companies]);
  const columns = useMemo(() => usersColumns, []);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
    const { delivery, openDelivery } = useListLateDeliveryContext();
  return (
    <KTCardBody className="py-4">
      <div className="table-responsive">
        <div className="notice">
            <button
                type="button"
                className="btn btn-light-danger btn-sm me-3"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                onClick={() => openDelivery()}
            >
                Trẽ hạn giao hàng { delivery.length > 0 ? `(${delivery.length})` : ""    }
            </button>
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-light-primary btn-sm me-3"*/}
            {/*    data-kt-menu-trigger="click"*/}
            {/*    data-kt-menu-placement="bottom-end"*/}
            {/*    onClick={() => open()}*/}
            {/*>*/}
            {/*    models*/}
            {/*</button>*/}
        </div>
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
          {...getTableProps()}
        >
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              {headers.map((column: ColumnInstance<QuoteModel>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<QuoteModel>, i) => {
                prepareRow(row);
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    Chưa có dữ liệu
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <QuotesListPagination />
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  );
};

export { QuotesTable };
