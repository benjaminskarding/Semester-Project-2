import { authGuard } from '../../utilities/authGuard';
import { conditionallyUpdateUI } from '../../utilities/conditionallyDisplay';
import { setupCreateListing } from '../../ui/listing/create';

authGuard();
conditionallyUpdateUI();
setupCreateListing();
