import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OmniviewfrontSharedModule } from 'app/shared/shared.module';
import { OmniUserComponent } from './omni-user.component';
import { OmniUserDetailComponent } from './omni-user-detail.component';
import { OmniUserUpdateComponent } from './omni-user-update.component';
import { OmniUserDeleteDialogComponent } from './omni-user-delete-dialog.component';
import { omniUserRoute } from './omni-user.route';

@NgModule({
  imports: [OmniviewfrontSharedModule, RouterModule.forChild(omniUserRoute)],
  declarations: [OmniUserComponent, OmniUserDetailComponent, OmniUserUpdateComponent, OmniUserDeleteDialogComponent],
  entryComponents: [OmniUserDeleteDialogComponent]
})
export class OmniviewfrontOmniUserModule {}
