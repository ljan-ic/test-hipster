import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'omni-user',
        loadChildren: () => import('./omni-user/omni-user.module').then(m => m.OmniviewfrontOmniUserModule)
      },
      {
        path: 'conference',
        loadChildren: () => import('./conference/conference.module').then(m => m.OmniviewfrontConferenceModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class OmniviewfrontEntityModule {}
