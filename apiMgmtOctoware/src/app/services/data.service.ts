import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { AllUserInfo, FavApiId, UserInfo, UserInfoResponse } from '../models/basicInfoUser';
import { StorageService } from './storage.service';
import { APICount, MethodCount, TableData, TableDataResponse } from '../models/catalogTableData';
import { FavApiUsrResponse } from '../models/basicInfoUser';
import { Categories, DetailedAPI, Endpoints, SpecificEndpoint, Resp, Params, Header } from '../models/detailedApiData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  //APIs---------------------------------------------------------------------------------------------------------
  getAPIs(): Observable<TableDataResponse> {
    return this.http.get<TableDataResponse>("http://localhost:4000/apis/table");
  }

  getDetailedAPI(id_api:Number): Observable<DetailedAPI> {
    return this.http.get<DetailedAPI>("http://localhost:4000/apis/" + id_api);
  }

  postAPI(body:any){
    return this.http.post("http://localhost:4000/apis/", body);
  }

  putAPI(body: any, id_api:Number){
    return this.http.put("http://localhost:4000/apis/" + id_api, body);
  }

  deleteAPI(id_api: Number){
    return this.http.delete("http://localhost:4000/apis/" + id_api);
  }


  //Categories----------------------------------------------------------------------------------------------------
  getCategoriesByID(id_api:Number){
    return this.http.get<Categories[]>("http://localhost:4000/categories/" + id_api);
  }

  postCategory(body:any, id_api:Number){
    return this.http.post("http://localhost:4000/categories/" + id_api, body);
  }

  putCategoryName(body: any, id_cat:Number){
    return this.http.put("http://localhost:4000/categories/" + id_cat, body);
  }

  deleteCategory(id_cat: Number){
    return this.http.delete("http://localhost:4000/categories/" + id_cat);
  }


  //Endpoints-----------------------------------------------------------------------------------------------------
  getEndpointsByCat(){
    return this.http.get<Endpoints[]>("http://localhost:4000/endpoints/");
  }

  getSpecificEndpointByID(id_end:Number){
    return this.http.get<SpecificEndpoint>("http://localhost:4000/endpoints/" + id_end);
  }

  addMethod(body:any, id_cat: Number){
    return this.http.post("http://localhost:4000/endpoints/" + id_cat, body);
  }

  putMethod(body: any, id_end:Number){
    return this.http.put("http://localhost:4000/endpoints/" + id_end, body);
  }

  deleteMethod(id_end:Number){
    return this.http.delete("http://localhost:4000/endpoints/" + id_end);
  }


  //Favorites-----------------------------------------------------------------------------------------------------
  getFavById(data: any): Observable<FavApiId> {
    let params = new HttpParams();
    params = params.append('id_api', data.id_api);
    params = params.append('id_usr', data.id_usr);
    return this.http.get<FavApiId>("http://localhost:4000/favorites/", {
      params: params,
    });
  }

  getFavs(id_usr: number): Observable<FavApiUsrResponse> {
    let params = new HttpParams();
    params = params.append('id_usr', id_usr);
    return this.http.get<FavApiUsrResponse>("http://localhost:4000/favorites/table/", {
      params: params,
    });
  }

  postFav(body: any){
    return this.http.post("http://localhost:4000/favorites/", body);
  }

  putFav(body: any){
    return this.http.put("http://localhost:4000/favorites/", body);
  }


  //Requests------------------------------------------------------------------------------------------------------
  getEndpointParams(id_end:Number){
    return this.http.get<Params[]>("http://localhost:4000/param/" + id_end);
  }

  getEndpointResponse(id_end:Number){
    return this.http.get<Resp[]>("http://localhost:4000/response/" + id_end);
  }

  addParam(body:any, id_end: Number){
    return this.http.post("http://localhost:4000/param/" + id_end, body);
  }

  putParam(body: any, id_param:Number){
    return this.http.put("http://localhost:4000/param/" + id_param, body);
  }

  deleteParam(id_param:Number){
    return this.http.delete("http://localhost:4000/param/" + id_param);
  }

  addResponse(body:any, id_end: Number){
    return this.http.post("http://localhost:4000/response/" + id_end, body);
  }

  putResponse(body: any, id_respuestas_end:Number){
    return this.http.put("http://localhost:4000/response/" + id_respuestas_end, body);
  }

  deleteResponse(id_respuestas_end:Number){
    return this.http.delete("http://localhost:4000/response/" + id_respuestas_end);
  }

  //Users---------------------------------------------------------------------------------------------------------
  getAllUsers(): Observable<AllUserInfo[]> {
    return this.http.get<AllUserInfo[]>("http://localhost:4000/users/");
  }

  getUserData(data: any): Observable<UserInfo[]> {
    let params = new HttpParams();
    params = params.append('email', data);
    return this.http.get<UserInfo[]>('http://localhost:4000/users/email/', {
      params: params,
    });
  }

  registerUser(body: any) {
    return this.http.post('http://localhost:4000/users', body);
  }

  changeUserRole(id_usr: number, body:any){
    return this.http.put("http://localhost:4000/users/" + id_usr, body);
  }

  logicUserDeleteByID(id_usr: number){
    return this.http.put("http://localhost:4000/users/status/" + id_usr, {});
  }

  logicUserActivationByID(id_usr: number){
    return this.http.put("http://localhost:4000/users/active/" + id_usr, {});
  }

//AUTH-------------------------------------------------------------------------------------------------------------
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

  setJsonValue(key: string, value: UserInfo) {
    this.storageService.secureStorage.setItem(key, value);
  }

  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }

  clearToken() {
    return this.storageService.secureStorage.clear();
  }

  sendGetRequest(url: string, params: Params[], headers: Header[], input:any[]) {
    let searchParams= new HttpParams();
    for (let index = 0; index < params.length; index++) {
      const element = params[index].nombre_param.toLowerCase();
      searchParams = searchParams.append(element, input[index]);
    }
    let httpHeaders = new HttpHeaders();    
    for (let index = 0; index < headers.length; index++) {
      const element = headers[index].nombre.toLowerCase();
      httpHeaders = httpHeaders.append(element, headers[index].key);
    }

    let options = {
      headers: httpHeaders,
      params: searchParams
    }; 
    return this.http.get(url, options);
  }

  sendPostRequest(url: string, params: Params[], headers: Header[], input:any[], body: any) {
    let searchParams= new HttpParams();
    for (let index = 0; index < params.length; index++) {
      const element = params[index].nombre_param.toLowerCase();
      searchParams = searchParams.append(element, input[index]);
    }
    let httpHeaders = new HttpHeaders();    
    for (let index = 0; index < headers.length; index++) {
      const element = headers[index].nombre.toLowerCase();
      httpHeaders = httpHeaders.append(element, headers[index].key);
    }  

    let options = {
      headers: httpHeaders,
      params: searchParams
    }; 

    body = JSON.parse(body);

    return this.http.post(url, body,  options);
  }

  sendPutRequest(url: string, params: Params[], headers: Header[], input:any[], body: any) {
    let searchParams= new HttpParams();
    for (let index = 0; index < params.length; index++) {
      const element = params[index].nombre_param.toLowerCase();
      searchParams = searchParams.append(element, input[index]);
    }
    let httpHeaders = new HttpHeaders();    
    for (let index = 0; index < headers.length; index++) {
      const element = headers[index].nombre.toLowerCase();
      httpHeaders = httpHeaders.append(element, headers[index].key);
    }

    let options = {
      headers: httpHeaders,
      params: searchParams
    }; 

    return this.http.put(url, body, options);
  }

  sendDeleteRequest(url: string, params: Params[], headers: Header[], input:any[]) {
    let searchParams= new HttpParams();
    for (let index = 0; index < params.length; index++) {
      const element = params[index].nombre_param.toLowerCase();
      searchParams = searchParams.append(element, input[index]);
    }
    let httpHeaders = new HttpHeaders();    
    for (let index = 0; index < headers.length; index++) {
      const element = headers[index].nombre.toLowerCase();
      httpHeaders = httpHeaders.append(element, headers[index].key);
    }

    let options = {
      headers: httpHeaders,
      params: searchParams
    }; 
    return this.http.delete(url, options);
  }

  checkAvailability(url: string, key: string){
    if(key != 'NA'){
      const headers= new HttpHeaders()
      .set('Authorization', key);
      return this.http.get(url, {'headers':headers} );
    }else{
      return this.http.get(url);
    }
  }

  updateDisp(id_api: number, state: string, ult_conexion_api: Date){
    var body: any = {
      state: state,
      ult_conexion_api: ult_conexion_api
    }
    return this.http.put("http://localhost:4000/apis/disp/" + id_api, body);
  }

  getApiCount(){
    return this.http.get<APICount>("http://localhost:4000/dashboard/api/");
  }

  getMethodCount(){
    return this.http.get<MethodCount[]>("http://localhost:4000/dashboard/method/");
  }

  getRandomAPI(){
    return this.http.get<TableData>("http://localhost:4000/dashboard/rand/");
  }
}
