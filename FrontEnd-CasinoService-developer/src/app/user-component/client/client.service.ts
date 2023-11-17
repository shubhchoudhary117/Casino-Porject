import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from './client-panel.interface';
import { clientAndAgnetData, ClientApiDataResponse, clientDetails, SingleApiRes } from './client-panel.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clientData = new BehaviorSubject<any>(null);
  private baseUrl = environment.apiUrl;
  token = localStorage.getItem('token');
  private shareClientData =new BehaviorSubject<any>(null);
  shareClientData$ = this.shareClientData.asObservable();
  subId;
  agentId = parseInt(localStorage.getItem('agentId'));

  constructor(private http: HttpClient) { }
  getData(page: number): Observable<ClientApiDataResponse> {
    return this.http.get<ClientApiDataResponse>(`${this.baseUrl}/v1/client/page/${page}`)
  }
  updateData(data: any) {
    this.shareClientData.next(data);
  }
  getSingleClient(id:any):Observable<clientAndAgnetData>{
    const url = `${this.baseUrl}/v1/client/${id}`;
    return this.http.get<clientAndAgnetData>(url)
  }
  setSingleClient(data:any){
    return this.clientData.next(data)
  }
  setSingleClientData(){
    return this.clientData.asObservable()
  }
  createClient(clientId:number,data:Client):Observable<Client>{
    const url = `${this.baseUrl}/v1/client/${clientId}/save`;
    return this.http.post<Client>(url, data)

  }
    updateClient(id,data:Client){
    const url = `${this.baseUrl}/v1/client/${id}/update`;
    return this.http.put<Client>(url,data)
  }
  getSuperClientData(id:any):Observable<any>{
    const url = `${this.baseUrl}/v1/client/agent/${id}`;
    return this.http.get(url);

  }
}
