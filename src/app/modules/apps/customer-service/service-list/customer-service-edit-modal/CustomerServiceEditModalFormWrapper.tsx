import { useQuery } from "react-query";
import { CustomerServiceEditModalForm } from "./CustomerServiceEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getCustomerServiceById } from "../core/_requests";
import { Builder } from "builder-pattern";
import {CustomerServiceModel} from "../../../../../models/customers/CustomerService.class";

const CustomerServiceEditModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView();
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
  const {
    isLoading,
    data: customerService,
    error,
  } = useQuery(
    `${QUERIES.CUSTOMER_SERVICE_LIST}-service-${itemIdForUpdate}`,
    () => {
      return getCustomerServiceById(itemIdForUpdate).then((customerService) =>
        Builder(CustomerServiceModel, customerService).build()
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
      <CustomerServiceEditModalForm
        isUserLoading={isLoading}
        customerService={new CustomerServiceModel()}
      />
    );
  } else if (itemIdForUpdate && !error && customerService) {
    return <CustomerServiceEditModalForm isUserLoading={isLoading} customerService={customerService} />;
  }

  return null;
};

export { CustomerServiceEditModalFormWrapper };
