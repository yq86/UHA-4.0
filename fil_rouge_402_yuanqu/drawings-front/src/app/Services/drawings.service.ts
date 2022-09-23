import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drawings } from '../Models/drawings';

@Injectable({
  providedIn: 'root'
})
export class DrawingsService {

  private apiServerUrl = 'http://localhost:9090';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getAllDrawings(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/drawings`) 
  }


  public getDrawingById(drawingId: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/drawings/${drawingId}`) ;
  }

  public addOneShapeToDrawing(drawingId: number, shapeId: number ): Observable<any> {
    const body = {drawingId, shapeId}
    return this.http.post<any>(`${this.apiServerUrl}/drawings/${drawingId}/add/${shapeId}`, body, this.httpOptions) ;
  }

  public addDrawing(drawingName: string, shapeId: number ): Observable<any> {
    const body = {drawingName, shapeId}
    return this.http.post<any>(`${this.apiServerUrl}/drawings/add/${drawingName}/${shapeId}`, body, this.httpOptions) ;
  }

  public deleteOneShapeFromDrawing(drawingId: number, shapeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/drawings/delete/${drawingId}/${shapeId}`, this.httpOptions) ;
  }

  public deleteDrawing(drawingId: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/drawings/delete/${drawingId}`, {responseType: 'text'}) ;
  }

}
function body<T>(arg0: string, body: any): Observable<any> {
  throw new Error('Function not implemented.');
}

