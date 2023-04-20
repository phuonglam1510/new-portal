import React, {useEffect} from "react";
import {KTSVG} from "../../../../../../../_metronic/helpers";
import {QuoteModel} from "../../../../../../models/sales/Quote.model";
import {Dropdown, DropdownItemProps} from "../../../../../../components/Dropdown";

interface Props {
    quote: QuoteModel;
    onClose: () => void;
    onUpdate: (value: number) => void;
}

const PercentPOModal: React.FC<Props> = ({ quote, onClose, onUpdate }) => {
    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);
    const options = [];
    for (let i = 0; i <= 100; i = i + 10) {
        options.push(<option value={i} key={i}>{i}%</option>)
    }
    return (
        <>
            <div
                className="modal fade show d-block"
                id="kt_modal_update_percent"
                role="dialog"
                tabIndex={-1}
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered mw-950px">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="fw-bolder">Cập nhật % chốt PO cho báo giá #{quote.id}</h2>
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
                        </div>
                        <div className="modal-body scroll-y">
                            <select className="form-control" value={quote.possible_percent} onChange={(event) => { onUpdate(Number(event.target.value))}}>
                                { options }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )
}

export default PercentPOModal;