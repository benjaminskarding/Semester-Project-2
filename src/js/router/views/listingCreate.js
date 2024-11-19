import { authGuard } from "../../utilities/authGuard";
import { updateHeader } from "../../utilities/conditionallyDisplay";

authGuard();
updateHeader();
