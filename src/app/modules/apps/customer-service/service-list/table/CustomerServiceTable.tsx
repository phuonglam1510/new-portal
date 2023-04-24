import { useMemo } from "react";
import { useTable, ColumnInstance, Row } from "react-table";
import { CustomHeaderColumn } from "../table/columns/CustomHeaderColumn";
import { CustomRow } from "../table/columns/CustomRow";
import { useCustomerServiceContext} from "../core/CustomerServiceProvider";
import { usersColumns } from "./columns/_columns";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { CustomerServiceListPagination } from "../components/pagination/UsersListPagination";
import { KTCardBody } from "../../../../../../_metronic/helpers";
import {CustomerServiceModel} from "../../../../../models/customers/CustomerService.class";

const CustomerServiceTable = () => {
  const { customerServices, isLoading } = useCustomerServiceContext();
  const data = useMemo(() => customerServices, [customerServices]);
  const columns = useMemo(() => usersColumns, []);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <KTCardBody className="py-4">
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
          {...getTableProps()}
        >
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              {headers.map((column: ColumnInstance<CustomerServiceModel>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<CustomerServiceModel>, i) => {
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
      <CustomerServiceListPagination />
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  );
};

export { CustomerServiceTable };
