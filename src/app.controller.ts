import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import Verifier from '@exoshtw/admob-ssv';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Index Page' };
  }

  @Post('test')
  test(@Body() body: any) {
    console.log(body);
    return 'Success!';
  }

  @Get('callback')
  async callback(@Req() req: Request) {
    const verifier = new Verifier();
    verifier
      .verify(req.query)
      .then((isValid) => {
        if (!isValid) {
          new BadRequestException("'Verifier is invalid'");
        }
        console.log(isValid);
      })
      .catch((e) => {
        console.log(e);
        new BadRequestException('Verifier has error');
        return { message: 'Verifier has error' };
        // res.send({ message: 'Verifier has error' });
      });
    // console.log(req);
    console.log(req.query);
    console.log(req.query.user_id);
    // res.send({ message: 'Verify success!' });
    return { message: 'Verify success!', query: req.query };
  }
}
