import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';

import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class catalogoService {
    constructor(private http: HttpClient) { }

    getAreas() {
        return this.http.post<any[]>(environment.apiEndpoint + '/areas', null).pipe(
            map((res: any) => res.data),
            catchError(this.handleErrorObservable)
        );
    }

    getProgramas(_area: string) {
        return this.http.post<any[]>(environment.apiEndpoint + '/programas/' + _area, null).pipe(
            map((res: any) => res.data),
            catchError(this.handleErrorObservable)
        );
    }

    getRegiones() {
        return this.http.post<any[]>(environment.apiEndpoint + '/regiones', null).pipe(
            map((res: any) => res.data),
            catchError(this.handleErrorObservable)
        );
    }

    getDistritos() {
        return this.http.post<any[]>(environment.apiEndpoint + '/distritos', null).pipe(
            map((res: any) => res.data),
            catchError(this.handleErrorObservable)
        );
    }

    getMunicipios(_distrito: string, _region: string) {
        return this.http.post<any[]>(environment.apiEndpoint + '/municipios', {
            distrito: _distrito,
            region: _region
        }).pipe(
            map((res: any) => res.data),
            catchError(this.handleErrorObservable)
        );
    }

    private handleErrorObservable(error: HttpErrorResponse) {
        return throwError(error);
    }
}
