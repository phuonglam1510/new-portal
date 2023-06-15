import {businessTypeOptions} from "../../../../../constants/businessTypeOptions.constant";
import {FormDropdown} from "../../../../../components/FormDropdown";
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

const SendEmailForm = () => {
    const [userForEdit] = useState<SendMailModel>(
        Builder(SendMailModel, new SendMailModel()).build()
    );

    let data: Record<string, any> = {
        type: null,
        subject: null,
        content: null,
    }

    //@ts-ignore
    const setBusinessType = (value) => {
        data.type = value;
    }
    //@ts-ignore
    const setSubject = (event) => {
        data.subject = event.target.value;
    }
    //@ts-ignore
    const setContent = (value) => {
        data.content = value;
        console.log(data);
    }

    const { confirm } = useGlobalContext();

    const sendMailForm = async () => {
        if (!data.type || !data.content || !data.subject) {
            showError("Ngành nghề, tiêu đề và nội dung email là bắt buộc !");
        } else {
            confirm({
                title: "Email Marketing",
                message: `Bạn có muôn gửi mail cho toàn bộ danh sách liên hệ cho ngành nghề ${data.type}`,
                onOk: async () => {
                    try {
                        await sendMail(data as any as SendMailModel);

                        toast(`Đã gửi mail thành công đến danh sách liên hệ thuộc ${data.type}`)
                        // @ts-ignore
                        window.location = `/${Routing.CustomerCompaniesg}`;
                    } catch (e) {
                        showError("Không thể gửi email, vui lòng thử lại sau");
                    }
                }
            });
        }
    }

    return(
        <KTCardBody className="py-4">
            <div className='card card-custom  card-stretch gutter-b'>
                {/* begin::Header */}
                <div className='card-header border-0'>
                    <h3 className='card-title fw-bolder fs-3'>Gửi Mail Theo Ngành Nghề</h3>
                </div>
                <div className='card-body pt-4'>
                    <div className="fv-row">
                        <Dropdown
                            items={businessTypeOptions.map((businessType) => ({
                                value: businessType,
                                text: businessType,
                            }))}
                            label="Ngành Nghề"
                            onChange={setBusinessType}
                        />
                    </div>

                    <div className="fv-row mb-7">
                        <label className="required fw-bold fs-6 mb-2">Tiêu Đề Mail</label>
                        <input type="text" className="form-control" name="subject" onChange={setSubject}/>
                    </div>

                    <div className="fv-row mb-7">
                        <label className="required fw-bold fs-6 mb-2">Nội Dung</label>
                        <Editor
                            tinymceScriptSrc={"/assets/plugins/custom/tinymce/tinymce.bundle.js"}
                            initialValue='<p>Nội dung email</p>'
                            init={{
                                plugins: 'lists link paste help wordcount',
                                menubar: false,
                                toolbar: 'blocks | bold italic underlined | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
                            }}
                            onEditorChange={setContent}
                        />
                    </div>
                </div>
                <div className="card-footer">
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={sendMailForm}
                            className="btn btn-primary"
                            data-kt-users-modal-action="submit"
                        >
                            <span className="indicator-label">Gửi</span>
                        </button>
                    </div>
                </div>
            </div>
        </KTCardBody>
    );
};

export { SendEmailForm };