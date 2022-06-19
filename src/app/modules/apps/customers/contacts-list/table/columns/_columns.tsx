import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserSelectionCell } from "./UserSelectionCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserSelectionHeader } from "./UserSelectionHeader";
import { ContactModel } from "../../../../../../models/customers/Contact.class";

const usersColumns: ReadonlyArray<Column<ContactModel>> = [
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
        title="Name"
        className="min-w-125px"
      />
    ),
    id: "contact_name",
    Cell: ({ ...props }) => (
      <UserInfoCell contact={props.data[props.row.index]} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Công ty"
        className="min-w-125px"
      />
    ),
    accessor: "companyName",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Số điện thoại"
        className="min-w-125px"
      />
    ),
    accessor: "contact_phone",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Chức vụ"
        className="min-w-125px"
      />
    ),
    accessor: "contact_position",
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
