import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Albums } from '../models/albums.models';
import { Songs } from '../models/songs.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Albums[]> {
    return this.http.get<Albums[]>(`${this.url}/albums`)
  }

  getSongs(): Observable<Songs[]> {
    return this.http.get<Songs[]>(`${this.url}/songs`)
  }
  addAlbum(album: Albums): Observable<Albums> {
    return this.http.post<Albums>(`${this.url}/albums`, album);
  }

  deleteAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/albums/${id}`);
  }

  addSong(song: Songs): Observable<Songs> {
    return this.http.post<Songs>(`${this.url}/songs`, song);
  }

  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/songs/${id}`);
  }

}
