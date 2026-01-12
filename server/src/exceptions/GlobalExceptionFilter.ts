import { ArgumentsHost, Catch, ExceptionFilter, HttpException,HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch (exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status: number = exception instanceof HttpException 
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = exception instanceof HttpException 
            ? exception.getResponse() : "Internal Server Error";

        if ((exception as any).code == 'P2002') {
            status = HttpStatus.CONFLICT;
            message = "Email already exists"
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            message: typeof message === 'object' ? (message as any).message 
                : message,
            timestamp: new Date().toISOString()
        })
    }
}