import { CustomerProvider } from "../companies-list/core/CustomerProvider";
import { SendEmailForm } from "./email-form/SendEmailForm";

const EmailMarketingWrapper = () => (
    <CustomerProvider>
        <SendEmailForm/>
    </CustomerProvider>
);

export { EmailMarketingWrapper };
