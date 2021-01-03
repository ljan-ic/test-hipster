import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConference, Conference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';
import { ConferenceComponent } from './conference.component';
import { ConferenceDetailComponent } from './conference-detail.component';
import { ConferenceUpdateComponent } from './conference-update.component';

@Injectable({ providedIn: 'root' })
export class ConferenceResolve implements Resolve<IConference> {
  constructor(private service: ConferenceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConference> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((conference: HttpResponse<Conference>) => {
          if (conference.body) {
            return of(conference.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Conference());
  }
}

export const conferenceRoute: Routes = [
  {
    path: '',
    component: ConferenceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'omniviewfrontApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConferenceDetailComponent,
    resolve: {
      conference: ConferenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'omniviewfrontApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConferenceUpdateComponent,
    resolve: {
      conference: ConferenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'omniviewfrontApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConferenceUpdateComponent,
    resolve: {
      conference: ConferenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'omniviewfrontApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
