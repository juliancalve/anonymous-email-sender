import EmailSender from "../container/EmailSender/EmailSender";
import { Paths } from "./Paths";

export const Routes = {

    public: [
        {
            path: Paths.home,
            component: EmailSender
        }
    ]
};
