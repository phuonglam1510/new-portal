import { FC } from "react";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";
import { useListViewAddonContext } from "../../core/ListViewAddonProvider";

type Props = {
  quote: QuoteModel;
};

const QuoteModelsCell: FC<Props> = ({ quote }) => {
  const { open } = useListViewAddonContext();
  const { exportedItemIds } = quote;
  return (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-light-primary btn-sm me-3"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
        onClick={() => open(quote)}
      >
        {exportedItemIds?.length} models
      </button>
    </div>
  );
};

export { QuoteModelsCell };
