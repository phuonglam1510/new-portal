import clsx from "clsx";
import { FC, PropsWithChildren, useMemo } from "react";
import { HeaderProps } from "react-table";
import { initialQueryState } from "../../../../../../../_metronic/helpers";
import { ContactModel } from "../../../../../../models/customers/Contact.class";
import { useContactContext } from "../../core/ContactProvider";

type Props = {
  className?: string;
  title?: string;
  tableProps: PropsWithChildren<HeaderProps<ContactModel>>;
};
const UserCustomHeader: FC<Props> = ({ className, title, tableProps }) => {
  const id = tableProps.column.id;
  const { filter: state, updateFilter } = useContactContext();

  const isSelectedForSorting = useMemo(() => {
    return state.sort && state.sort === id;
  }, [state, id]);
  const order: "asc" | "desc" | undefined = useMemo(() => state.order, [state]);

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === "actions" || id === "selection") {
      return;
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateFilter({ sort: id, order: "asc", ...initialQueryState });
      return;
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === "asc") {
        // enable sort desc
        updateFilter({ sort: id, order: "desc", ...initialQueryState });
        return;
      }

      // disable sort
      updateFilter({ sort: undefined, order: undefined, ...initialQueryState });
    }
  };

  return (
    <th
      {...tableProps.column.getHeaderProps()}
      className={clsx(
        className,
        isSelectedForSorting && order !== undefined && `table-sort-${order}`
      )}
      style={{ cursor: "pointer" }}
      onClick={sortColumn}
    >
      {title}
    </th>
  );
};

export { UserCustomHeader };
