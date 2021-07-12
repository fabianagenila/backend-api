import moment from "moment";
import imageDatabase, {ImageDatabase} from "../data/ImageDatabase";
import { CustomError } from "../errors/CustomError";
import { Image } from "../model/Image";
import idGenerator, { IdGenerator } from "../services/idGenerator";
import tokenGenerator, { TokenGenerator } from "../services/tokenGenerator";

export class ImageBusiness {
  
  constructor(
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private imageDatabase: ImageDatabase
  ) {}

  public async createImage(
    subtitle: string,
    author: string,
    file: string,
    tags: string[],
    collection: string,
    user_image_id: string,
    token: string
  ) {
    try {

      if (!subtitle || !author || !file || !tags || !collection || !user_image_id) {
        throw new CustomError(422, "Missing input");
      }

      const verifyToken = this.tokenGenerator.verify(token);

      if(!verifyToken) {
        throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
     }

      const id = this.idGenerator.generate();

      let unformattedDate: Date = new Date() as any
      const date = (unformattedDate.getFullYear() + "-" + 
      ((unformattedDate.getMonth() + 1)) + "-" + (unformattedDate.getDate())) as any;                 

      await this.imageDatabase.createImage(
        new Image(id, 
          subtitle, 
          author, 
          date, 
          file, 
          tags, 
          collection, 
          user_image_id
      ));

    } catch (error) {
      const statusCode = (error as CustomError).statusCode;
      const message = (error as CustomError).message;
        throw new CustomError(statusCode, message)
    }
  };

  public async getAllImages(token: string) {
    try {

       const accessToken = this.tokenGenerator.verify(token);
       if(!accessToken){
          throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
       };  

       const result = await this.imageDatabase.getAllImages();

       return { result }
      
    } catch (error) {
       const statusCode = (error as CustomError).statusCode;
       const message = (error as CustomError).message;
       throw new CustomError(statusCode, message)
    }
  };

  public async getImageById(id: string, token: string) {
    try {

       const accessToken = this.tokenGenerator.verify(token);

       if (!id) {
          throw new CustomError(422, "User not found. Possibly wrong Id input");
       }

       if(!accessToken) {
          throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
       }

       const result = await this.imageDatabase.getImageById(id);
       
       return { result }

    } catch (error) {
      const statusCode = (error as CustomError).statusCode;
      const message = (error as CustomError).message;
       throw new CustomError(statusCode, message)
    }
 };

 public async getImageBySubtitle(subtitle: string, token: string) {
  try {

     const accessToken = this.tokenGenerator.verify(token);

     if (!subtitle) {
        throw new CustomError(422, "Title not found! Please, search again");
     }

     if(!accessToken) {
        throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
     }

     const result = await this.imageDatabase.getImageBySubtitle(subtitle);

     return { result }

  } catch (error) {
     const statusCode = (error as CustomError).statusCode
     const message = (error as CustomError).message
     throw new CustomError(statusCode, message)
  }
};
};

export default new ImageBusiness(
  idGenerator,
  tokenGenerator,
  imageDatabase
)

