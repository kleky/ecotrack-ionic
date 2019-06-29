import {Injectable, Pipe, PipeTransform} from "@angular/core";



@Injectable({providedIn: "root"})
export class DateTimeProvider {
  now(): Date {
    return new Date();
  }
}

@Pipe({
  name: 'dateLogged'
})
export class DateLoggedPipe implements PipeTransform {

  constructor(private dateTimeProvider: DateTimeProvider) {}

  /**
   * For date a fuel log was logged
   * @param value Date number in UTC
   */
  transform(value: number): any {

    return this.dateTimeProvider.now;
  }

}
