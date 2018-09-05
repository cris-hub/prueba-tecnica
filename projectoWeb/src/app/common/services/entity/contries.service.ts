import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ConfigService } from "../../config/config.service";
import { ConstrieModel } from "../../models/contries.model";

@Injectable()
export class ContriesService {
    private header: HttpHeaders;
    private urlServer: string;

    constructor(
        private http: HttpClient,
        private configSrv: ConfigService
    ) {
        this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.urlServer = 'https://restcountries.eu/rest/v2/all';


    }


    public getContries(): Observable<ConstrieModel[]> {
        return this.http.get<ConstrieModel[]>(
            this.urlServer

        );
    }



}
