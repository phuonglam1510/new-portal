import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserSelectionCell } from "./UserSelectionCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserSelectionHeader } from "./UserSelectionHeader";
import { User } from "../../../../../../models/users/User.interface";

const usersColumns: ReadonlyArray<Column<User>> = [
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
    id: "name",
    Cell: ({ ...props }) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Role"
        className="min-w-125px"
      />
    ),
    accessor: "roleName",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="SĐT"
        className="min-w-125px"
      />
    ),
    accessor: "phone",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Chức vụ"
        className="min-w-125px"
      />
    ),
    accessor: "position",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Nhóm"
        className="min-w-100px"
      />
    ),
    accessor: "groupText",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Joined day"
        className="min-w-125px"
      />
    ),
    accessor: "joinAt",
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
