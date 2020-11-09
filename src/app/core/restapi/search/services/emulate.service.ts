import { Station } from '../models/station.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmulateService {
  // It's only for challenge purpose, emulate connction issues.
  public connection$(data: Station[]): Observable<Station[]> {
    return Math.floor(Math.random() * 10) === 1
      ? throwError(new Error('Connection error'))
      : of(data);
  }

  // It's only for challenge purpose, as the query usualy is done by backend service.
  public filterQuery(query: string, data: Station[]): Station[] {
    return data.filter(
      station => this.getFirstLetters(station.stationName, query.length) === query?.toLowerCase()
    );
  }

  private getFirstLetters(name: string, length: number): string {
    return name.toLowerCase().substr(0, length);
  }
}
