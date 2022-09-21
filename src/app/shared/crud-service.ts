import { HttpClient } from "@angular/common/http";
import { delay, Observable, take, tap } from "rxjs";

// padrão repository
export class CrudService <T>{

    constructor(protected http: HttpClient, private API_URL: string){

    }
    list(): Observable<T[]> {
        return this.http.get<T>(this.API_URL).
        pipe(
          delay(2000),
          tap(console.log)
        );
      }
    
      listById(id: number): Observable<T> {
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
      }
    
      private create(record: T): Observable<T>{
        return this.http.post<T>(this.API_URL, record).pipe(take(1));
      }
      private update(record: T): Observable<T>{
        return this.http.put<T>(`${this.API_URL}/${record['id' as keyof T]}`, record).pipe(take(1));
      }
    
      save(record: T): Observable<T> {
        if (record['id' as keyof T]){
          return this.update(record);
        }
        return this.create(record);
      }
    
      remove(id: number): Observable<T> {
        return this.http.delete<T>(`${this.API_URL}/${id}`).pipe(take(1));
      }
    
}
