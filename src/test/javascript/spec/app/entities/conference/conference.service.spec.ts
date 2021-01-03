import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ConferenceService } from 'app/entities/conference/conference.service';
import { IConference, Conference } from 'app/shared/model/conference.model';

describe('Service Tests', () => {
  describe('Conference Service', () => {
    let injector: TestBed;
    let service: ConferenceService;
    let httpMock: HttpTestingController;
    let elemDefault: IConference;
    let expectedResult: IConference | IConference[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ConferenceService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Conference(0, 'AAAAAAA', 'image/png', 'AAAAAAA', currentDate, currentDate, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startDateTime: currentDate.format(DATE_TIME_FORMAT),
            expectedEndDateTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Conference', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startDateTime: currentDate.format(DATE_TIME_FORMAT),
            expectedEndDateTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDateTime: currentDate,
            expectedEndDateTime: currentDate
          },
          returnedFromService
        );

        service.create(new Conference()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Conference', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            thumbnail: 'BBBBBB',
            startDateTime: currentDate.format(DATE_TIME_FORMAT),
            expectedEndDateTime: currentDate.format(DATE_TIME_FORMAT),
            description: 'BBBBBB',
            price: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDateTime: currentDate,
            expectedEndDateTime: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Conference', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            thumbnail: 'BBBBBB',
            startDateTime: currentDate.format(DATE_TIME_FORMAT),
            expectedEndDateTime: currentDate.format(DATE_TIME_FORMAT),
            description: 'BBBBBB',
            price: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDateTime: currentDate,
            expectedEndDateTime: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Conference', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
