import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { OmniviewfrontTestModule } from '../../../test.module';
import { ConferenceDetailComponent } from 'app/entities/conference/conference-detail.component';
import { Conference } from 'app/shared/model/conference.model';

describe('Component Tests', () => {
  describe('Conference Management Detail Component', () => {
    let comp: ConferenceDetailComponent;
    let fixture: ComponentFixture<ConferenceDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ conference: new Conference(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OmniviewfrontTestModule],
        declarations: [ConferenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConferenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConferenceDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load conference on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.conference).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
