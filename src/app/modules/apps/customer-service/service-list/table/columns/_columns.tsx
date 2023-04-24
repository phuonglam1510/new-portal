import { Column } from "react-table";
import { UserActionsCell } from "./UserActionsCell";
import { UserSelectionCell } from "./UserSelectionCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserSelectionHeader } from "./UserSelectionHeader";
import {CustomerServiceModel} from "../../../../../../models/customers/CustomerService.class";
import clsx from "clsx";
import {CustomerServiceStatus} from "../../../../../../enums/CustomerServiceType.enum";

const getBadgeInfo = (status: string) => {
  let className: string = "badge-info";
  switch (status) {
    case CustomerServiceStatus.DONE:
      className = "badge-success";
      break;
    case CustomerServiceStatus.OVER:
      className = "badge-danger";
      break;
    default:
      break;
  }

  return className;
}
const usersColumns: ReadonlyArray<Column<CustomerServiceModel>> = [
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
            title="Người Tạo"
            className="min-w-100px"
        />
    ),
    accessor: "saleName",
  },
  {
    Header: (props) => (
        <UserCustomHeader
            tableProps={props}
            title="Khách Hàng"
            className="min-w-100px"
        />
    ),
    accessor: "companyName",
  },
  {
    Header: (props) => (
        <UserCustomHeader
            tableProps={props}
            title="Đối Tượng Làm Việc"
            className="min-w-100px"
        />
    ),
    accessor: "contact_name",
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
            title="Tình trạng"
            className="min-w-100px"
        />
    ),
    accessor: "status",
    Cell: ({ data, row }) => (
        <div
            className={clsx(
                "badge",
                getBadgeInfo(data[row.index].status)
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
