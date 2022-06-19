import { useQuery } from "react-query";
import { ContactEditModalForm } from "./ContactEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getContactById } from "../core/_requests";
import { ContactModel } from "../../../../../models/customers/Contact.class";

const ContactEditModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView();
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
  const {
    isLoading,
    data: contact,
    error,
  } = useQuery(
    `${QUERIES.CONTACT_LIST}-contact-${itemIdForUpdate}`,
    () => {
      return getContactById(itemIdForUpdate);
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
      <ContactEditModalForm
        isUserLoading={isLoading}
        contact={new ContactModel()}
      />
    );
  }

  if (!isLoading && !error && contact) {
    return <ContactEditModalForm isUserLoading={isLoading} contact={contact} />;
  }

  return null;
};

export { ContactEditModalFormWrapper };
