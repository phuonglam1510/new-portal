import React, {useEffect} from "react";
import moment from "moment";
import {KTSVG} from "../../../../../../../_metronic/helpers";
import {Link} from "react-router-dom";
import {LateQuoteModel} from "../../../../../../models/sales/LateQuote.model";
interface Props {
    quotes: LateQuoteModel[];
    onClose: () => void;
}

const InfoRow = ({ quote_id, due_date }:{ quote_id: number, due_date: Date|string }) => {
    return (
        <div className="d-flex align-items-center bg-light-danger rounded p-2 mb-2">
            <Link to={`${quote_id}/info`} className="fw-bold text-gray-800 text-hover-primary fs-6 p-2">
                Báo Giá #{quote_id} - Chưa cập nhật giá - Hạn chót ({moment(due_date).format("DD/MM/YYYY")}).
            </Link>
        </div>
    );
};

const LateQuoteModal: React.FC<Props> = ({ quotes, onClose}) => {
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
                            <h2 className="fw-bolder">Danh Sách Chưa Cập Nhật Giá</h2>
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
                            {quotes.map((item, i) => <InfoRow
                                quote_id={item.quote_id}
                                due_date={item.due_date}
                            />)}

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )
}

export default LateQuoteModal;