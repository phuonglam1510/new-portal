import { KTSVG } from "../../../../../_metronic/helpers";
import { formatMoney } from "../../../../helpers/Number.helper";
import { QuoteItemModel } from "../../../../models/sales/QuoteItem.model";

interface ItemProps {
  item: QuoteItemModel;
  index: number;
  onEdit: () => any;
  onRemove: () => any;
  onSelect?: () => any;
  selected?: boolean;
  showSelection?: boolean;
}

export const QuoteRowItem: React.FC<ItemProps> = ({
  item,
  index,
  onEdit,
  onRemove,
  onSelect,
  selected,
  showSelection,
}) => {
  const {
    asking_price_model,
    quotation_model,
    manufacturer,
    unit,
    quantity,
    net_unit_price_no_vat,
    vat,
    commission,
  } = item;
  return (
    <tr>
      {showSelection && (
        <td className="text-muted fw-bold">
          <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selected}
              onChange={onSelect}
            />
          </div>
        </td>
      )}
      <td>
        <a
          href="#"
          className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
        >
          {asking_price_model}
        </a>
        <span className="text-muted fw-bold d-block">{quotation_model}</span>
      </td>
      <td className="text-muted fw-bold">{manufacturer}</td>
      <td className="text-muted fw-bold">
        {quantity} x {unit}
      </td>
      <td className="text-end fw-bold">{formatMoney(net_unit_price_no_vat)}</td>
      <td className="text-end fw-bold">{commission}</td>
      <td className="text-end fw-bold">{vat}</td>
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
          <a
            onClick={onEdit}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <KTSVG
              path="/media/icons/duotune/art/art005.svg"
              className="svg-icon-3"
            />
          </a>
          <a
            onClick={onRemove}
            className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
          >
            <KTSVG
              path="/media/icons/duotune/general/gen027.svg"
              className="svg-icon-3"
            />
          </a>
        </div>
      </td>
    </tr>
  );
};
