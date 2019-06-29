import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, TestBed} from "@angular/core/testing";
import {ToastController} from "@ionic/angular";
import {UserDataStore} from "./data-stores/user-data/UserDataStore";
import {DateLoggedPipe, DateTimeProvider} from "./date-logged.pipe";
import {HomePage} from "./home.page";
import {FuelLog} from "./models/FuelLog";
import {FileStore} from "./services/file-store.service";
import {LogService} from "./services/log.service";

describe('DateLoggedPipe', () => {
  let pipe: DateLoggedPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateLoggedPipe],
      providers: [
          DateLoggedPipe,
        {
          provide: DateTimeProvider,
          value: { get: new Date(2019, 6, 21) }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    pipe = TestBed.get(DateLoggedPipe);
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("should return a x", () => {
    const result = pipe.transform(1561809606361);

    expect(result).toEqual(new Date(2019, 6, 21));
  });

});
