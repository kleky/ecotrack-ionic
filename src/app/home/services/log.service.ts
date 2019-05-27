import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable({providedIn: "root"})
export class LogService  {

    public Messages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    log(msg: string, obj: any = null) {
        if (obj) {
            this.Messages.next(
                [msg + ": " + JSON.stringify(obj)].concat(this.Messages
                    .getValue()));
        } else {
            this.Messages.next(
                [msg].concat(this.Messages
                    .getValue()));
        }
    }

}
