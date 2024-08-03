import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserModel} from '../interfaces';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly _currentUserSubject: BehaviorSubject<UserModel | null>;
    public currentUser: Observable<UserModel | null>;

    constructor(private readonly _http: HttpClient) {
        this._currentUserSubject = new BehaviorSubject<UserModel | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
        this.currentUser = this._currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserModel | null {
        return this._currentUserSubject.value;
    }

    login(email: string, password: string): Observable<UserModel> {
        return this._http.post<any>(`${environment.apiUrl}/auth/token/login/`, {email, password})
            .pipe(map(response => {
                const user: UserModel = {
                    email,
                    token: response.token
                };
                localStorage.setItem('currentUser', JSON.stringify(user));
                this._currentUserSubject.next(user);
                return user;
            }));
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this._currentUserSubject.next(null);
    }
}