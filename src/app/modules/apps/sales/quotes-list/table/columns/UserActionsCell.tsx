/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from "react";
import {useMutation, useQueryClient} from "react-query";
import {MenuComponent} from "../../../../../../../_metronic/assets/ts/components";
import {ID, KTSVG} from "../../../../../../../_metronic/helpers";
import {useQuoteContext} from "../../core/QuoteProvider";
import {deleteUser} from "../../core/_requests";
import {Link} from "react-router-dom";
import {useGlobalContext} from "../../../../core/GlobalProvider";
import {toast} from "../../../../../../helpers/Toast.helper";
import {showError} from "../../../../../../helpers/Error.helper";
import {useCurrentUser} from "../../../../core/CurrentUserProvider";
import {UserRole} from "../../../../../../enums/UserRole.enum";

type Props = {
  id: ID;
};

const UserActionsCell: FC<Props> = ({ id }) => {
  const { query } = useQuoteContext();
  const queryClient = useQueryClient();
  const { confirm } = useGlobalContext();

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const deleteItem = useMutation(() => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`quote-list-${query}`]);
      toast(`Xoá báo giá #${id} thành công!`);
    },
    onError: (error: Error) => {
      showError(error.message);
    },
  });
  const user = useCurrentUser();
  const onDelete = async () => {
    confirm({
      title: "Xoá báo giá",
      message: "Bạn có chắc muốn xoá không?",
      onOk: () => deleteItem.mutateAsync(),
    });
  };

  return (
    <>
      <a
        href="#"
        className="btn btn-light btn-active-light-primary btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        Thao Tác
        <KTSVG
          path="/media/icons/duotune/arrows/arr072.svg"
          className="svg-icon-5 m-0"
        />
      </a>
      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <Link to={id?.toString() || ""} className="menu-link px-3">
            Chỉnh Sửa
          </Link>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        {user.role !== UserRole.Monitor &&
            <div className="menu-item px-3">
              <a
                  className="menu-link px-3"
                  data-kt-users-table-filter="delete_row"
                  onClick={onDelete}
              >
                Xóa
              </a>
            </div>
        }
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { UserActionsCell };
