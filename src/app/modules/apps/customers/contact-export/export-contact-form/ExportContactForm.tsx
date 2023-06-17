import {businessTypeOptions} from "../../../../../constants/businessTypeOptions.constant";
import { FormDropdown } from "../../../../../components/FormDropdown";
import { KTCardBody } from "../../../../../../_metronic/helpers";
import { SendMailModel } from "../../../../../models/customers/SendMail.class";
import { Editor } from '@tinymce/tinymce-react';
import { toast } from "../../../../../helpers/Toast.helper";
import { showError } from "../../../../../helpers/Error.helper";
import { sendMail } from "../../companies-list/core/_requests";

import React, {useState} from "react";
import {Builder} from "builder-pattern";
import {Dropdown} from "../../../../../components/Dropdown";
import {useGlobalContext} from "../../../core/GlobalProvider";
import {Routing} from "../../../../../enums/Routing.enum";
import {useCustomerContext} from "../../companies-list/core/CustomerProvider";
import {useContactContext} from "../../contacts-list/core/ContactProvider";

const ExportContactForm = () => {
    let data: Record<string, any> = {
        company_id: null
    }

    const { companies, isLoading, loading, exportCompanyReport } = useCustomerContext();
    const { exportContactReport, exportAllContactReport } = useContactContext();
    const [ companyId, setCompanyId ] = useState();

    const companyItems = React.useMemo(() => {
        return (
            companies?.map((item) => ({
                value: item.id || 0,
                text: item.company_name,
            })) || []
        );
    }, [companies]);

    //@ts-ignore
    const setCompany = (value) => {
        setCompanyId(value);
    }


    const exportContact = async () => {
        if (!companyId) {
            showError("Vui lòng chọn công ty trước khi xuất file người liên hệ!");
        } else {
            const status = await exportContactReport(companyId);
            if (status) {
                toast("Đã xuất file liên hệ thành công.")
            }
        }
    }

    const exportAllContact = async () => {
        const status = await exportAllContactReport();
        if (status) {
            toast("Đã xuất file liên hệ thành công.")
        }
    }

    return(
        <>
        <KTCardBody className="py-4">
            <div className='card card-custom  card-stretch gutter-b'>
                {/* begin::Header */}
                <div className='card-header border-0'>
                    <h3 className='card-title fw-bolder fs-3'>Xuất Danh Sách Công Ty</h3>
                </div>
                <div className='card-body pt-4'>
                    <div className="fv-row">
                        {
                            !isLoading &&
                            <>
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-primary me-5"
                                        disabled={loading}
                                        onClick={() => exportCompanyReport()}
                                    >
                                        Xuất Toàn Bộ Công Ty
                                    </button>
                                </>
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-primary me-5"
                                        disabled={loading}
                                        onClick={() => exportAllContact()}
                                    >
                                        Xuất Toàn Bộ Người Liên Hệ
                                    </button>
                                </>
                            </>
                        }
                    </div>
                </div>
            </div>
        </KTCardBody>
            <KTCardBody>
                <div className='card card-custom  card-stretch gutter-b'>
                    {/* begin::Header */}
                    <div className='card-header border-0'>
                        <h3 className='card-title fw-bolder fs-3'>Xuất Danh Sách Người Liên Hệ</h3>
                    </div>
                    <div className="card-body">
                        <Dropdown
                            items={companyItems}
                            label="Danh Sách Công Ty"
                            onChange={setCompany}
                        />

                        <button
                            type="button"
                            className="btn btn-primary me-5"
                            disabled={loading}
                            onClick={() => exportContact()}
                        >
                            Xuất Người Liên Hệ Theo Công Ty
                        </button>
                    </div>
                </div>
            </KTCardBody>
        </>
    );
};

export { ExportContactForm };