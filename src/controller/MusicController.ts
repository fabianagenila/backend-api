import { Request, Response } from "express";
import musicBusiness from '../business/MusicBusiness';
import { CustomError } from "../errors/CustomError";

export class MusicController {

    public async createMusic(req: Request, res: Response) {
        try {
            const { title, author, date, file, genre, album, user_music_id } = req.body;
            const result = await musicBusiness.createMusic(
                title, author, date, file, genre, album, user_music_id
            );
        res.status(200).send(result);            
        } catch (error) {
          const statusCode = (error as CustomError).statusCode;
          const message = (error as CustomError).message;
            res.status(statusCode || 400).send({ message });
        }
    };

    public async getAllMusic(req: Request, res: Response){
      try {
  
        const token = req.headers.authorization as string;
        const result = await musicBusiness.getAllMusic(token);
  
        res.status(200).send(result);
      } catch (error) {
        const statusCode = (error as CustomError).statusCode;
        const message = (error as CustomError).message;
        res.status(statusCode || 400).send({ message });
      }
    };
  

    public async getMusicById(req: Request, res: Response) {
        try {
    
          const { id } = req.params;
          const token = req.headers.authorization as string;
    
          const result = await musicBusiness.getMusicById(id, token);
    
          res.status(200).send(result);
          
        } catch (error) {
          const statusCode = (error as CustomError).statusCode;
          const message = (error as CustomError).message;
          res.status(statusCode || 400).send({ message });
        }
      };

      public async getMusicByTitle(req: Request, res: Response) {
        try {
    
          const title = req.query.title as string
          const token = req.headers.authorization as string;
    
          const result = await musicBusiness.getMusicByTitle(title, token);
    
          res.status(200).send(result);
          
        } catch (error) {
          const statusCode = (error as CustomError).statusCode;
          const message = (error as CustomError).message;
          res.status(statusCode || 400).send({ message });
        }
      };

      public async getMusicByAlbum(req: Request, res: Response) {
        try {
    
          const album = req.query.album as string
          const token = req.headers.authorization as string;
    
          const result = await musicBusiness.getMusicByTitle(album, token);
    
          res.status(200).send(result);
          
        } catch (error) {
          const statusCode = (error as CustomError).statusCode;
          const message = (error as CustomError).message;
          res.status(statusCode || 400).send({ message });
        }
      }
};

export default new MusicController()