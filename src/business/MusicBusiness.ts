import musicDatabase,{MusicDatabase} from "../data/MusicDatabase";
import { CustomError } from "../errors/CustomError";
import { Music } from "../model/Music";
import idGenerator, { IdGenerator } from "../services/idGenerator";
import tokenGenerator, { TokenGenerator } from "../services/tokenGenerator";

export class MusicBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private musicDatabase: MusicDatabase,
        private tokenGenerator: TokenGenerator
    ){};

    public async createMusic(
        title: string,
        author: string,
        date: Date,
        file: string,
        genre: string[],
        album: string,
        user_music_id: string        
    ) {
        try {

            if(!title || !author || !album || !genre || !file || !user_music_id) {
                throw new CustomError(422, "Missing input")
            }

            const id = this.idGenerator.generate() as any;

            let unformattedDate: Date = new Date() as any
            const date = (unformattedDate.getFullYear() + "-" + 
            ((unformattedDate.getMonth() + 1)) + "-" + (unformattedDate.getDate())) as any;  

            await this.musicDatabase.createMusic(
                new Music(
                id, 
                title, 
                author, 
                date, 
                file, 
                genre,
                album,
                user_music_id
            ));
            
            const accessToken = this.tokenGenerator.generate(id); 
            
        } catch (error) {
            const statusCode = (error as CustomError).statusCode;
            const message = (error as CustomError).message;
            throw new CustomError(statusCode, message)
        }
    };

    public async getAllMusic(token: string) {
      try {

         const accessToken = this.tokenGenerator.verify(token);
         if(!accessToken){
            throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
         };  

         const result = await this.musicDatabase.getAllMusic();

         return { result }
        
      } catch (error) {
         const statusCode = (error as CustomError).statusCode;
         const message = (error as CustomError).message;
         throw new CustomError(statusCode, message)
      }
    }

    public async getMusicById(id: string, token: string) {
        try {
    
           const accessToken = this.tokenGenerator.verify(token);
    
           if (!id) {
              throw new CustomError(422, "User not found. Possibly wrong Id input");
           }
    
           if(!accessToken) {
              throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
           }
    
           const result = await this.musicDatabase.getMusicById(id);
           
           return { result }
    
        } catch (error) {
            const statusCode = (error as CustomError).statusCode
            const message = (error as CustomError).message
           throw new CustomError(statusCode, message)
        }
     };

     public async getMusicByTitle(title: string, token: string) {
        try {
  
           const accessToken = this.tokenGenerator.verify(token);
  
           if (!title) {
              throw new CustomError(422, "Title not found! Please, search again");
           }
  
           if(!accessToken) {
              throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
           }
  
           const result = await this.musicDatabase.getMusicByTitle(title);
  
           return { result }
  
        } catch (error) {
           const statusCode = (error as CustomError).statusCode
           const message = (error as CustomError).message
           throw new CustomError(statusCode, message)
        }
     };

     public async getMusicByAlbum(album: string, token: string) {
      try {

         const accessToken = this.tokenGenerator.verify(token);

         if (!album) {
            throw new CustomError(422, "Album not found! Please, search again");
         }

         if(!accessToken) {
            throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
         }

         const result = await this.musicDatabase.getMusicByTitle(album);

         return { result }

      } catch (error) {
         const statusCode = (error as CustomError).statusCode
         const message = (error as CustomError).message
         throw new CustomError(statusCode, message)
      }
   }
  };

export default new MusicBusiness(
    idGenerator,
    musicDatabase,
    tokenGenerator
 )