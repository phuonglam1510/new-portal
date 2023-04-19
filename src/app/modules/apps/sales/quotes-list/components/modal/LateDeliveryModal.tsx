import React, {useEffect} from "react";
import {LateDeliveryModel} from "../../../../../../models/sales/LateDelivery.model";
import moment from "moment";
import {KTSVG} from "../../../../../../../_metronic/helpers";
import {WarrantyConfirmModel} from "../../../quote-detail/components/models/WarrantyConfirmModal";
import {ModelsTable} from "../../../quote-detail/components/models/ModelsTable";
import {Routing} from "../../../../../../enums/Routing.enum";
import {Link} from "react-router-dom";
interface Props {
    delivery: LateDeliveryModel[];
    onClose: () => void;
}

const InfoRow = ({item_id, quote_id, po_number, item_model, due_date}:{item_id: number, quote_id: number, po_number: string, item_model: string, due_date: string}) => {
    return (
        <div className="d-flex align-items-center bg-light-danger rounded p-2 mb-2">
            <Link to={`${quote_id}/export-info`} className="fw-bold text-gray-800 text-hover-primary fs-6 p-2">
                Báo Giá #{quote_id} - PO# {po_number} - {item_model} gần tới hạn giao hàng ({moment(due_date).format("DD/MM/YYYY")}).
            </Link>
        </div>
    );
};

const LateDeliveryModal: React.FC<Props> = ({ delivery, onClose}) => {
    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    return (
        <>
            <div
                className="modal fade show d-block"
                id="kt_modal_add_user"
                role="dialog"
                tabIndex={-1}
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered mw-950px">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* begin::Modal title */}
                            <h2 className="fw-bolder">Danh sách báo giá trễ hạn giao hàng</h2>
                            <div
                                className="btn btn-icon btn-sm btn-active-icon-primary"
                                data-kt-users-modal-action="close"
                                onClick={onClose}
                                style={{ cursor: "pointer" }}
                            >
                                <KTSVG
                                    path="/media/icons/duotune/arrows/arr061.svg"
                                    className="svg-icon-1"
                                />
                            </div>
                            {/* end::Close */}
                        </div>
                        <div className="modal-body scroll-y">
                            {delivery.map((item, i) => <InfoRow
                                item_id={item.item_id}
                                quote_id={item.quote_id}
                                po_number={item.po_number}
                                item_model={item.item_model}
                                due_date={item.due_date}
                                key={item.item_id}
                            />)}

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )
}

export default LateDeliveryModal;