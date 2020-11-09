import { Station } from '../models/station.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppConfig } from '@core/config/app-config';
import { map, mergeMap, retry } from 'rxjs/operators';
import { EmulateService } from './emulate.service';

@Injectable({
  providedIn: 'root'
})
export class SearchRestapiService {
  constructor(private httpClient: HttpClient, private emulateService: EmulateService) {}

  public getStations$(queryString: string): Observable<Station[]> {
    const url =
      'https://raw.githubusercontent.com/abax-as/coding-challenge/master/station_codes.json';

    return this.httpClient.get<Station[]>(url).pipe(
      mergeMap(data => this.emulateService.connection$(data)),
      map(data => this.emulateService.filterQuery(queryString, data)),
      retry(AppConfig.retrySearchLimit)
    );
  }
}
