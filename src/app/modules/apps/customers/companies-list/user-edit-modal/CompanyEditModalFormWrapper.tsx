import { useQuery } from "react-query";
import { CompanyEditModalForm } from "./CompanyEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getCompanyById } from "../core/_requests";
import { CompanyFormModel } from "../core/_models";
import { Builder } from "builder-pattern";

const CompanyEditModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView();
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getCompanyById(itemIdForUpdate).then((company) =>
        Builder(CompanyFormModel, company).build()
      );
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined);
        console.error(err);
      },
    }
  );

  if (!itemIdForUpdate) {
    return (
      <CompanyEditModalForm
        isUserLoading={isLoading}
        company={new CompanyFormModel()}
      />
    );
  }

  if (!isLoading && !error && user) {
    return <CompanyEditModalForm isUserLoading={isLoading} company={user} />;
  }

  return null;
};

export { CompanyEditModalFormWrapper };
