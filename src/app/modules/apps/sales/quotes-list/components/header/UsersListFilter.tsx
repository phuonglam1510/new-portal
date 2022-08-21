import moment from "moment";
import React, { useEffect, useState } from "react";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { DatePicker } from "../../../../../../components/DatePicker";
import { Dropdown } from "../../../../../../components/Dropdown";
import { quoteStatuses } from "../../../../../../constants/quoteStatuses.constant";
import { quoteTypes } from "../../../../../../constants/quoteTypes.constant";
import { QuoteStatus } from "../../../../../../enums/QuoteStatus.enum";
import { QuoteType } from "../../../../../../enums/QuoteType.enum";
import { useContactContext } from "../../../../customers/contacts-list/core/ContactProvider";
import { useQueryResponseData } from "../../../../user-management/users-list/core/QueryResponseProvider";
import { QuotesFilter, useQuoteContext } from "../../core/QuoteProvider";

const UsersListFilter = () => {
  const { updateFilter, isLoading } = useQuoteContext();
  const { contacts } = useContactContext();
  const users = useQueryResponseData();
  const [contactId, setContactId] = useState<number | "">("");
  const [date, setDate] = useState<string>(moment().toISOString());
  const [saleId, setSaleId] = useState<number | "">("");
  const [status, setStatus] = useState<QuoteStatus | "">("");
  const [type, setType] = useState<QuoteType | "">("");

  const constactItems = React.useMemo(
    () =>
      contacts?.map((contact) => ({
        text: contact.contact_name,
        value: contact.id || 0,
      })) || [],
    [contacts]
  );
  const userItems = React.useMemo(
    () =>
      users?.map((users) => ({
        text: users.name || "",
        value: users.id || 0,
      })) || [],
    [users]
  );

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const resetData = () => {
    updateFilter(new QuotesFilter());
    setContactId("");
    setType("");
    setStatus("");
    setSaleId("");
    setDate(moment().toISOString());
  };

  const filterData = () => {
    updateFilter({
      contact_id: contactId || undefined,
      status: status || undefined,
      type: type || undefined,
      sale_id: saleId || undefined,
      date: date ? moment(date).format("DD-MM-YYYY") : undefined,
    });
  };

  return (
    <>
      <button
        disabled={isLoading}
        type="button"
        className="btn btn-light-primary me-3"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <KTSVG
          path="/media/icons/duotune/general/gen031.svg"
          className="svg-icon-2"
        />
        Bộ lọc
      </button>
      <div
        className="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
        data-kt-menu="true"
      >
        <div className="px-7 py-5">
          <div className="fs-5 text-dark fw-bolder">Filter Options</div>
        </div>

        <div className="separator border-gray-200"></div>

        <div className="px-7 py-5" data-kt-user-table-filter="form">
          <div className="mb-10">
            <Dropdown
              value={contactId}
              onChange={(value) => setContactId(Number(value))}
              optional
              items={constactItems}
              label="Người liên hệ"
            />
          </div>

          <div className="mb-10">
            <Dropdown
              value={saleId}
              onChange={(value) => setSaleId(Number(value))}
              optional
              items={userItems}
              label="Người tạo"
            />
          </div>

          <div className="mb-10">
            <Dropdown
              value={status}
              onChange={(value: any) => setStatus(value || "")}
              optional
              items={quoteStatuses}
              label="Tình trạng"
            />
          </div>
          <div className="mb-10">
            <Dropdown
              value={type}
              onChange={(value: any) => setType(value || "")}
              optional
              items={quoteTypes}
              label="Loại đơn hàng"
            />
          </div>
          <div className="mb-10">
            <DatePicker
              key="filter_quote_date"
              value={date}
              onChange={(value: any) => setDate(value)}
              optional
              label="Ngày tạo"
            />
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              disabled={isLoading}
              onClick={resetData}
              className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="reset"
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type="button"
              onClick={filterData}
              className="btn btn-primary fw-bold px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="filter"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { UsersListFilter };
