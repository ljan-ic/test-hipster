import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOmniUser } from 'app/shared/model/omni-user.model';

type EntityResponseType = HttpResponse<IOmniUser>;
type EntityArrayResponseType = HttpResponse<IOmniUser[]>;

@Injectable({ providedIn: 'root' })
export class OmniUserService {
  public resourceUrl = SERVER_API_URL + 'api/omni-users';

  constructor(protected http: HttpClient) {}

  create(omniUser: IOmniUser): Observable<EntityResponseType> {
    return this.http.post<IOmniUser>(this.resourceUrl, omniUser, { observe: 'response' });
  }

  update(omniUser: IOmniUser): Observable<EntityResponseType> {
    return this.http.put<IOmniUser>(this.resourceUrl, omniUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOmniUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOmniUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
