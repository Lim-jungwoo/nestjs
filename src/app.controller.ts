import { Controller, Get, Query, Render, Req, Res } from '@nestjs/common';
import Verifier from '@exoshtw/admob-ssv';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Index Page' };
  }

  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    const verifier = new Verifier();
    verifier
      .verify(req.query)
      .then((isValid) => {
        if (!isValid) {
          res.status(500);
          res.json({
            error: 'verifier error',
          });
        }
        console.log(isValid);
      })
      .catch((e) => {
        console.log(e);
        res.status(400);
        res.statusMessage = 'Verifier has error';
        res.send({ message: 'Verifier has error' });
      });
    res.send({ message: 'Verify success!' });
  }
}
