import { CustomerProvider } from "../companies-list/core/CustomerProvider";
import { ContactProvider } from "../contacts-list/core/ContactProvider";
import { ExportContactForm } from "./export-contact-form/ExportContactForm";

const ExportContactWrapper = () => (
    <CustomerProvider>
        <ContactProvider>
            <ExportContactForm/>
        </ContactProvider>
    </CustomerProvider>
);

export { ExportContactWrapper };
