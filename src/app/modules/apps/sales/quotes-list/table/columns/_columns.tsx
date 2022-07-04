import { Column } from "react-table";
import clsx from "clsx";
import { UserInfoCell } from "./UserInfoCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserSelectionCell } from "./UserSelectionCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserSelectionHeader } from "./UserSelectionHeader";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";
import { QuoteStatus } from "../../../../../../enums/QuoteStatus.enum";
import { QuoteType } from "../../../../../../enums/QuoteType.enum";

const usersColumns: ReadonlyArray<Column<QuoteModel>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: "selection",
    Cell: ({ ...props }) => (
      <UserSelectionCell id={props.data[props.row.index].id} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Người Liên Hệ"
        className="min-w-125px"
      />
    ),
    id: "contact_id",
    Cell: ({ ...props }) => (
      <UserInfoCell quote={props.data[props.row.index]} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Tạo bởi"
        className="min-w-100px"
      />
    ),
    accessor: "saleName",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Ngày tạo"
        className="min-w-100px"
      />
    ),
    accessor: "createdAtText",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Loại Đơn Hàng"
        className="min-w-100px"
      />
    ),
    accessor: "typeName",
    Cell: ({ data, row, value }) => (
      <div
        className={clsx(
          "badge",
          data[row.index].type === QuoteType.Sale
            ? "badge-info"
            : "badge-success"
        )}
      >
        {value}
      </div>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Chất lượng hàng hoá"
        className="min-w-125px"
      />
    ),
    accessor: "package_quality",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Tình trạng"
        className="min-w-100px"
      />
    ),
    accessor: "statusName",
    Cell: ({ data, row }) => (
      <div
        className={clsx(
          "badge",
          data[row.index].status === QuoteStatus.Wating
            ? "badge-warning"
            : "badge-success"
        )}
      >
        {data[row.index].statusName}
      </div>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Actions"
        className="text-end min-w-100px"
      />
    ),
    id: "actions",
    Cell: ({ ...props }) => (
      <UserActionsCell id={props.data[props.row.index].id} />
    ),
  },
];

export { usersColumns };
