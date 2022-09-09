import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { Response } from 'express'
import { PrismaError } from 'src/utils/prismaError'

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let handled = true
    let statusCode = HttpStatus.BAD_REQUEST

    let message = exception.message.replace(/\n/g, '')

    // TODO: handle more error codes (https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine)
    switch (exception.code) {
      case PrismaError.UniqueConstraintFailed:
        statusCode = HttpStatus.CONFLICT
        message = `Unique constraint failed: '${exception.meta?.target}'.`
        break
      case PrismaError.RecordDoesNotExist: // Record not found
        statusCode = HttpStatus.NOT_FOUND
        message = 'Record not found.'
        break
      default:
        handled = false
        break
    }

    if (handled) {
      response.status(statusCode).json({
        statusCode,
        message,
      })
    } else {
      // default 500 error code
      super.catch(exception, host)
    }
  }
}
