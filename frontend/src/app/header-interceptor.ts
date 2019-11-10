import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class headerInterceptor implements HttpInterceptor {
	
	intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
		
		console.log("Intercepting: -> " +req.url);
		
		const newReq = req.clone({ withCredentials: true, 
							headers: req.headers.set('Content-Type', 'application/json',)});
		
		console.log(newReq);
		return next.handle(newReq);
	}
}
