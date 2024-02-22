import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { E_Role } from "src/constants/role.enum";

export class StudentGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { role } = request.user
        if (role === E_Role.STUDENT)
            return true
        throw new HttpException("This role cannot access this resource!", HttpStatus.FORBIDDEN)
    }
}