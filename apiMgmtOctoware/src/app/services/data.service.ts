import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { AllUserInfo, UserInfo, UserInfoResponse } from '../models/basicInfoUser';
import { StorageService } from './storage.service';
import { TableDataResponse } from '../models/catalogTableData';
import { FavApiUsrResponse } from '../models/basicInfoUser';
import { Categories, DetailedAPI, Endpoints, Param, SpecificEndpoint, Resp } from '../models/detailedApiData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  verifyGoogle(body: any): Observable<any> {
    return this.http
      .post('http://localhost:4000/users/auth/google', body)
      .pipe(delay(1000));
  }

  verifyMS(body: any): Observable<any> {
    return this.http
      .post('http://localhost:4000/users/auth/ms', body)
      .pipe(delay(1000));
  }

  registerUser(body: any) {
    return this.http.post('http://localhost:4000/users', body);
  }

  getUserData(data: any): Observable<UserInfo[]> {
    let params = new HttpParams();
    params = params.append('email', data);
    return this.http.get<UserInfo[]>('http://localhost:4000/users/email/', {
      params: params,
    });
  }

  getAllUsers(): Observable<AllUserInfo[]> {
    return this.http.get<AllUserInfo[]>("http://localhost:4000/users");
  }

  setJsonValue(key: string, value: UserInfo) {
    this.storageService.secureStorage.setItem(key, value);
  }

  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }

  clearToken() {
    return this.storageService.secureStorage.clear();
  }

  getAPIs(): Observable<TableDataResponse> {
    return this.http.get<TableDataResponse>("http://localhost:4000/apis/table");
  }

  getDetailedAPI(id_api:Number): Observable<DetailedAPI> {
    return this.http.get<DetailedAPI>("http://localhost:4000/apis/" + id_api);
  }

  sendGetRequest(url: string) {
    return this.http.get(url);
  }

  sendPostRequest(url: string) {
    return this.http.post(url, {});
  }

  postAPI(body:any){
    return this.http.post("http://localhost:4000/apis", body);
  }

  postCategory(body:any, id_api:Number){
    return this.http.post("http://localhost:4000/categories/" + id_api, body);
  }
  
  changeUserRole(id_usr: number, body:any){
    return this.http.put("http://localhost:4000/users/" + id_usr, body);
  }

  getCategoriesByID(id_api:Number){
    return this.http.get<Categories[]>("http://localhost:4000/categories/" + id_api);
  }

  getEndpointsByCat(){
    return this.http.get<Endpoints[]>("http://localhost:4000/endpoints/");
  }

  getSpecificEndpointByID(id_end:Number){
    return this.http.get<SpecificEndpoint>("http://localhost:4000/endpoints/" + id_end);
  }

  getEndpointParams(id_end:Number){
    return this.http.get<Param[]>("http://localhost:4000/query/" + id_end);
  }

  getEndpointResponse(id_end:Number){
    return this.http.get<Resp[]>("http://localhost:4000/response/" + id_end);
  }

  getFavs(data: any): Observable<FavApiUsrResponse> {
    let params = new HttpParams();
    params = params.append('id_usr', data);
    return this.http.get<FavApiUsrResponse>("http://localhost:4000/tablefavs/", {
      params: params,
    });
  }

  //POST
  addMethod(body:any, id_cat: Number){
    return this.http.post("http://localhost:4000/endpoints/" + id_cat, body);
  }

  //DELETE
  deleteAPI(id_api: Number){
    return this.http.delete("http://localhost:4000/apis/" + id_api);
  }

  deleteCategory(id_cat: Number){
    return this.http.delete("http://localhost:4000/categories/" + id_cat);
  }

  deleteMethod(id_end:Number){
    return this.http.delete("http://localhost:4000/endpoints/" + id_end);
  }

  //PUT
  putAPI(body: any, id_api:Number){
    return this.http.put("http://localhost:4000/apis/" + id_api, body);
  }

  putCategoryName(body: any, id_cat:Number){
    return this.http.put("http://localhost:4000/categories/" + id_cat, body);
  }

  putMethod(body: any, id_end:Number){
    return this.http.put("http://localhost:4000/endpoints/" + id_end, body);
  }
}
