import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/authService';

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Wrong body');
    }
    const token = await authService.signUp(email, password);
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send({ accessToken: token.accessToken });
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Wrong body');
    }
    const token = await authService.signIn(email, password);
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send({ accessToken: token.accessToken });
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error('Wrong token');
    }
    const token = await authService.refreshToken(refreshToken);
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send(token.accessToken);
  }

  async info(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    const email = await authService.info(id);
    return res.send(email);
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie('refreshToken', { secure: true, httpOnly: true });
    return res.send('You are logout');
  }
}

export const userController = new UserController();
