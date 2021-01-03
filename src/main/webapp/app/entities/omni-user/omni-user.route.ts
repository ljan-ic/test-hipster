import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOmniUser, OmniUser } from 'app/shared/model/omni-user.model';
import { OmniUserService } from './omni-user.service';
import { OmniUserComponent } from './omni-user.component';
import { OmniUserDetailComponent } from './omni-user-detail.component';
import { OmniUserUpdateComponent } from './omni-user-update.component';

@Injectable({ providedIn: 'root' })
export class OmniUserResolve implements Resolve<IOmniUser> {
  constructor(private service: OmniUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOmniUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((omniUser: HttpResponse<OmniUser>) => {
          if (omniUser.body) {
            return of(omniUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OmniUser());
  }
}

export const omniUserRoute: Routes = [
  {
    path: '',
    component: OmniUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'omniviewfrontApp.omniUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OmniUserDetailComponent,
    resolve: {
      omniUser: OmniUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'omniviewfrontApp.omniUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OmniUserUpdateComponent,
    resolve: {
      omniUser: OmniUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'omniviewfrontApp.omniUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OmniUserUpdateComponent,
    resolve: {
      omniUser: OmniUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'omniviewfrontApp.omniUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
