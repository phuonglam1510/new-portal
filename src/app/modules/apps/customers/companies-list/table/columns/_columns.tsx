import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserSelectionCell } from "./UserSelectionCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserSelectionHeader } from "./UserSelectionHeader";
import { CompanyModel } from "../../../../../../models/customers/Company.class";

const usersColumns: ReadonlyArray<Column<CompanyModel>> = [
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
        title="Tên công ty"
        className="min-w-125px"
      />
    ),
    id: "company_name",
    Cell: ({ ...props }) => (
      <UserInfoCell company={props.data[props.row.index]} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Địa chỉ"
        className="min-w-125px"
      />
    ),
    accessor: "company_address",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Ngành nghề"
        className="min-w-125px"
      />
    ),
    accessor: "business_type",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Loại khách hàng"
        className="min-w-125px"
      />
    ),
    accessor: "typeText",
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
