import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Audio } from 'src/app/interfaces/audio/Audio';

@Injectable({
    providedIn: 'root'
})
export class AudioService {

    audioFile !: File;

    constructor(
        private http: HttpClient,
        private puente: PuenteDatosService
    ) { }

    url = this.puente.geturl();

    setAudioFile(file : any) {
        this.audioFile = file;
    }

    getAudioFile(file : any) {
        return this.audioFile;
    }

    getAll(): Observable<Audio[]> {
        return this.http.get<Audio[]>(this.url + 'api/audio/');
    }
    getById(id: number): Observable<Audio> {
        return this.http.get<Audio>(this.url + 'api/audio/' + id + '/');
    }
    post(form: FormData) {
        return this.http.post(this.url + 'api/audio/', form);
    }
    put(id: number, form: FormData) {
        return this.http.put(this.url + 'api/audio/' + id + '/', form);
    }
    delete(id: number) {
        return this.http.delete(this.url + 'api/audio/' + id + '/');
    }


}
