/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  initialQueryState,
  KTSVG,
  useDebounce,
} from "../../../../../../../_metronic/helpers";
import { useCustomerContext } from "../../core/CustomerProvider";

const UsersListSearchComponent = () => {
  const { updateFilter } = useCustomerContext();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(
    () => {
      if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
        updateFilter({ search: debouncedSearchTerm, ...initialQueryState });
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div className="card-title">
      {/* begin::Search */}
      <div className="d-flex align-items-center position-relative my-1">
        <KTSVG
          path="/media/icons/duotune/general/gen021.svg"
          className="svg-icon-1 position-absolute ms-6"
        />
        <input
          type="text"
          data-kt-user-table-filter="search"
          className="form-control form-control-solid w-250px ps-14"
          placeholder="Search user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { UsersListSearchComponent };
