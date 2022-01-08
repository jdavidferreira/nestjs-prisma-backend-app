import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { Response } from 'express'

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let unhandled = false
    let statusCode = HttpStatus.BAD_REQUEST
    const message = exception.message.replace(/\n/g, '')

    // TODO: handle more error codes (https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine)
    switch (exception.code) {
      case 'P2002':
        statusCode = HttpStatus.CONFLICT
        break
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND
        break
      default:
        unhandled = true
        // default 500 error code
        super.catch(exception, host)
        break
    }

    if (unhandled) {
      super.catch(exception, host)
    } else {
      response.status(statusCode).json({
        statusCode,
        message,
      })
    }
  }
}
