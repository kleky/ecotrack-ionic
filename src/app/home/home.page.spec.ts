import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ToastController} from "@ionic/angular";
import {UserDataStore} from "./data-stores/user-data/UserDataStore";

import {HomePage} from "./home.page";
import {FuelLog} from "./models/FuelLog";
import {FileStore} from "./services/file-store.service";
import {LogService} from "./services/log.service";

describe("HomePage", () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            providers: [
                {
                    provide: FileStore,
                    value: jasmine.createSpyObj("store", ["get", "set", "loadOptions", "loadDataFile"])
                },
                {
                    provide: UserDataStore,
                    value: { Version: "0.1", fuelLog: new FuelLog()}
                },
                {
                    provide: LogService,
                    useValue: jasmine.createSpy("LogService")
                },
                {
                    provide: ToastController,
                    useValue: jasmine.createSpy("ToastController")
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should release observables upon destroy", () => {

    });
});
