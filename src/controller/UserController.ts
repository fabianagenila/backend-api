import { Request, Response } from "express";
import userBusiness from "../business/UserBusiness";
import { CustomError } from "../errors/CustomError";

export class UserController {
  public async signup(req: Request, res: Response) {
    try {

      const { name, nickname, password, email, role } = req.body;
      // console.log({name, nickname, password, email, role});

      const result = await userBusiness.signup(
        name, 
        nickname, 
        password, 
        email, 
        role
        );
      
      res.status(200).send(result);
    } catch (error) {
      const statusCode = (error as CustomError).statusCode;
      const message = (error as CustomError).message;
      res.status(statusCode || 400).send({ message });
    }
  }

  public async login(req: Request, res: Response) {
    try {

      const { email, password } = req.body;
      const result = await userBusiness.login(email, password);
      
      res.status(200).send(result);
    } catch (error) {
      const statusCode = (error as CustomError).statusCode;
      const message = (error as CustomError).message;
      res.status(statusCode || 400).send({ message });
    }
  }

  public async getAllUsers(req: Request, res: Response){
    try {

      const token = req.headers.authorization as string;
      const result = await userBusiness.getAllUsers(token);

      res.status(200).send(result);
    } catch (error) {
      const statusCode = (error as CustomError).statusCode;
      const message = (error as CustomError).message;
      res.status(statusCode || 400).send({ message });
    }
  };

  public async getUserById(req: Request, res: Response) {
    try {

      const { id } = req.params;
      const token = req.headers.authorization as string;

      const result = await userBusiness.getUserById(id, token);

      res.status(200).send(result);
      
    } catch (error) {
      const statusCode = (error as CustomError).statusCode;
      const message = (error as CustomError).message;
      res.status(statusCode || 400).send({ message });
    }
  }

  public async getUserByName(req: Request, res: Response) {
    try {

      const name = req.query.name as string
      const token = req.headers.authorization as string;

      const result = await userBusiness.getUserByName(name, token);

      res.status(200).send(result);
      
    } catch (error) {
      const statusCode = (error as CustomError).statusCode;
      const message = (error as CustomError).message;
      res.status(statusCode || 400).send({ message });
    }
  }
}

export default new UserController();
