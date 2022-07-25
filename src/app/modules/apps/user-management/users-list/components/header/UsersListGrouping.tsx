import { useQueryClient, useMutation } from "react-query";
import { QUERIES } from "../../../../../../../_metronic/helpers";
import { useGlobalContext } from "../../../../core/GlobalProvider";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { deleteSelectedUsers } from "../../core/_requests";

const UsersListGrouping = () => {
  const { selected, clearSelected } = useListView();
  const queryClient = useQueryClient();
  const { query } = useQueryResponse();
  const { confirm } = useGlobalContext();

  const deleteSelectedItems = useMutation(() => deleteSelectedUsers(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
      clearSelected();
    },
  });

  const onDelete = async () => {
    confirm({
      title: "Xoá người dùng",
      message: "Bạn có chắc muốn xoá không?",
      onOk: () => deleteSelectedItems.mutateAsync(),
    });
  };

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="fw-bolder me-5">
        <span className="me-2">{selected.length}</span> Đã chọn
      </div>

      <button type="button" className="btn btn-danger" onClick={onDelete}>
        Xoá mục đã chọn
      </button>
    </div>
  );
};

export { UsersListGrouping };
