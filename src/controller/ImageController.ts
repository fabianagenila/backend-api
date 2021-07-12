import { Request, Response } from 'express';
import imageBusiness from '../business/ImageBusiness'
import { CustomError } from '../errors/CustomError';

export class ImageController {

    public async createImage(req: Request, res: Response) {

        try {

            const { subtitle, author, date, file, tags, collection, user_image_id } = req.body
            const token = req.headers.authorization as string;

            const result = await imageBusiness.createImage(
                subtitle,
                author,
                file,
                tags,
                collection,
                user_image_id,
                token
            );
            res.status(200).send(result);
            
        } catch (error) {
          const statusCode = (error as CustomError).statusCode
          const message = (error as CustomError).message
            res.status(statusCode || 400).send({ message });
        }
    };

    public async getAllImages(req: Request, res: Response){
      try {
  
        const token = req.headers.authorization as string;
        const result = await imageBusiness.getAllImages(token);
  
        res.status(200).send(result);
      } catch (error) {
        const statusCode = (error as CustomError).statusCode;
        const message = (error as CustomError).message;
        res.status(statusCode || 400).send({ message });
      }
    };

    public async getImageById(req: Request, res: Response) {
        try {
    
          const { id } = req.params;
          const token = req.headers.authorization as string;
    
          const result = await imageBusiness.getImageById(id, token);
    
          res.status(200).send(result);
          
        } catch (error) {
          const statusCode = (error as CustomError).statusCode
          const message = (error as CustomError).message
          res.status(statusCode || 400).send({ message });
        }
      };

      public async getImageBySubtitle(req: Request, res: Response) {
        try {
    
          const subtitle = req.query.subtitle as string
          const token = req.headers.authorization as string;
    
          const result = await imageBusiness.getImageBySubtitle(subtitle, token);
    
          res.status(200).send(result);
          
        } catch (error) {
          const statusCode = (error as CustomError).statusCode;
          const message = (error as CustomError).message;
          res.status(statusCode || 400).send({ message });
        }
      }
}

export default new ImageController()