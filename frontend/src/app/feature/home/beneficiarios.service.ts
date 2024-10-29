import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';

import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class beneficarioService {
    constructor(private http: HttpClient) { }

    getBeneficiarios(_form: UntypedFormGroup, _page: number = 1, _limit: number = 10) {
        return this.http.post(environment.apiEndpoint + '/beneficiarios/' + _page + '/' + _limit, _form).pipe(
            map((res: any) => res.data),
            catchError(this.handleErrorObservable)
        );
    }


    private handleErrorObservable(error: HttpErrorResponse) {
        return throwError(error);
    }
}
