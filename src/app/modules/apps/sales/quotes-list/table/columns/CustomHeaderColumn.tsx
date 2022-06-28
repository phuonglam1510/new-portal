import { FC } from "react";
import { ColumnInstance } from "react-table";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";

type Props = {
  column: ColumnInstance<QuoteModel>;
};

const CustomHeaderColumn: FC<Props> = ({ column }) => (
  <>
    {column.Header && typeof column.Header === "string" ? (
      <th {...column.getHeaderProps()}>{column.render("Header")}</th>
    ) : (
      column.render("Header")
    )}
  </>
);

export { CustomHeaderColumn };
