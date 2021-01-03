import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConference } from 'app/shared/model/conference.model';

type EntityResponseType = HttpResponse<IConference>;
type EntityArrayResponseType = HttpResponse<IConference[]>;

@Injectable({ providedIn: 'root' })
export class ConferenceService {
  public resourceUrl = SERVER_API_URL + 'api/conferences';

  constructor(protected http: HttpClient) {}

  create(conference: IConference): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conference);
    return this.http
      .post<IConference>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(conference: IConference): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conference);
    return this.http
      .put<IConference>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConference>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConference[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(conference: IConference): IConference {
    const copy: IConference = Object.assign({}, conference, {
      startDateTime: conference.startDateTime && conference.startDateTime.isValid() ? conference.startDateTime.toJSON() : undefined,
      expectedEndDateTime:
        conference.expectedEndDateTime && conference.expectedEndDateTime.isValid() ? conference.expectedEndDateTime.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDateTime = res.body.startDateTime ? moment(res.body.startDateTime) : undefined;
      res.body.expectedEndDateTime = res.body.expectedEndDateTime ? moment(res.body.expectedEndDateTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((conference: IConference) => {
        conference.startDateTime = conference.startDateTime ? moment(conference.startDateTime) : undefined;
        conference.expectedEndDateTime = conference.expectedEndDateTime ? moment(conference.expectedEndDateTime) : undefined;
      });
    }
    return res;
  }
}
