import { CustomError } from "../errors/CustomError";
import { stringToUserRole, User, USER_ROLES } from "../model/User";
import userDatabase, { UserDatabase } from "../data/UserDatabase";
import hashGenerator, { HashGenerator } from "../services/hashGenerator";
import idGenerator, { IdGenerator } from "../services/idGenerator";
import tokenGenerator, { TokenGenerator } from "../services/tokenGenerator";

export class UserBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private hashGenerator: HashGenerator,
      private userDatabase: UserDatabase,
      private tokenGenerator: TokenGenerator
   ) {}

   public async signup(
      name: string,
      nickname: string,
      password: string,
      email: string,
      role: string
   ) {
      try {
         
         if (!name || !nickname || !password || !email || !role) {
            throw new CustomError(422, "Missing input");
         }

         if (email.indexOf("@") === -1) {
            throw new CustomError(422, "Invalid email");
         }

         if (password.length < 6) {
            throw new CustomError(422, "Invalid password");
         }

         const id = this.idGenerator.generate();

         const cypherPassword = await this.hashGenerator.hash(password);

         await this.userDatabase.createUser(
            new User(id, name, nickname, email, cypherPassword, stringToUserRole(role))
         );

         const accessToken = this.tokenGenerator.generate({id, role});

         return { accessToken };
      } catch (error) {
         const statusCode = (error as CustomError).statusCode
         const message = (error as CustomError).message
         if (message.includes("key 'email'")) {
            throw new CustomError(409, "Email already in use")
         }
         throw new CustomError(statusCode, message)
      }
      
   }

   public async login(email: string, password: string) {

      try {
         if (!email || !password) {
            throw new CustomError(422, "Missing input");
         }

         const user = await this.userDatabase.getUserByEmail(email);
         
         if (!user) {
            throw new CustomError(401, "Invalid user");
         }
         
         const isPasswordCorrect = await this.hashGenerator.compareHash(
            password,
            user.getPassword()
         );

         if (!isPasswordCorrect) {
            throw new CustomError(401, "Invalid password");
         }

         const accessToken = this.tokenGenerator.generate({
            id: user.getId(),
            role: user.getRole(),
         });

         return { accessToken };
      } catch (error) {
         const statusCode = (error as CustomError).statusCode;
         const message = (error as CustomError).message;
         throw new CustomError(statusCode, message)
      }
   };

   public async getAllUsers(token: string) {
      try {

         const accessToken = this.tokenGenerator.verify(token);
         if(!accessToken){
            throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
         };  

         const result = await this.userDatabase.getAllUsers();

         return { result }
        
      } catch (error) {
         const statusCode = (error as CustomError).statusCode;
         const message = (error as CustomError).message;
         throw new CustomError(statusCode, message)
      }
    }

   public async getUserById(id: string, token: string) {
      try {

         const accessToken = this.tokenGenerator.verify(token);

         if (!id) {
            throw new CustomError(422, "User not found. Possibly wrong Id input");
         }

         if(!accessToken) {
            throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
         }

         const result = await this.userDatabase.getUserById(id);
         
         return { result }

      } catch (error) {
         const statusCode = (error as CustomError).statusCode;
         const message = (error as CustomError).message;
         throw new CustomError(statusCode, message)
      }
   }

   public async getUserByName(name: string, token: string) {
      try {

         const accessToken = this.tokenGenerator.verify(token);

         if (!name) {
            throw new CustomError(422, "User not found. Possibly wrong name input");
         }

         if(!accessToken) {
            throw new CustomError(401, "Unauthorized! You need to be authenticated to continue")
         }

         const result = await this.userDatabase.getUserByName(name);

         return { result }

      } catch (error) {
         const statusCode = (error as CustomError).statusCode
         const message = (error as CustomError).message
         throw new CustomError(statusCode, message)
      }
   };
}

export default new UserBusiness(
   idGenerator,
   hashGenerator,
   userDatabase,
   tokenGenerator
)
