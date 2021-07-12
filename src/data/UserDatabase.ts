import BaseDataBase from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDataBase {

   protected tableName: string = "Users_Table";

   private toModel(dbModel?: any): User | undefined {
      return (
         dbModel &&
         new User(
            dbModel.id,
            dbModel.name,
            dbModel.nickname,
            dbModel.email,
            dbModel.password,
            dbModel.role
         )
      );
   }

   public async createUser(user: User): Promise<void> {
      try {
         await BaseDataBase.connection.raw(`
            INSERT INTO ${this.tableName} (id, name, nickname, password, email, role)
            VALUES (
            '${user.getId()}', 
            '${user.getName()}', 
            '${user.getNickname()}',
            '${user.getPassword()}',
            '${user.getEmail()}',
            '${user.getRole()}'
            )`
         );
      } catch (error) {
         const message = (error as Error).message;
         const sqlMessage = (error as any).sqlMessage;
         throw new Error(sqlMessage || message)
      }
   }

   public async getUserByEmail(email: string): Promise<User | undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE email = '${email}'
         `);
 
         return this.toModel(result[0][0]);
      } catch (error) {
         const message = (error as Error).message;
         const sqlMessage = (error as any).sqlMessage;
         throw new Error(sqlMessage || message)
      }
   }

   public async getUserById(id: string): Promise<User | undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE id = '${id}'
         `);
         return this.toModel(result[0][0]);
      } catch (error) {
         const message = (error as Error).message;
         const sqlMessage = (error as any).sqlMessage;
         throw new Error(sqlMessage || message)
      }
   }

   public async getUserByName(name: string): Promise<User | undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE name LIKE '%${name}%'
         `);
         console.log(name, result);

         return result[0].map((res: any) => ({
            name: res.name, 
            nickname: res.nickname
         }));
         
      } catch (error) {
         const message = (error as Error).message;
         const sqlMessage = (error as any).sqlMessage;
         throw new Error(sqlMessage || message)
      }
   }

   public async getAllUsers(): Promise<User[] | undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName}
         `);
         
         return result[0]
         .map((res: any) => {
            return ({
               id: res.id,
               name: res.name, 
               nickname: res.nickname
            })
         });         
      } catch (error) {
         const message = (error as Error).message;
         const sqlMessage = (error as any).sqlMessage;
         throw new Error(sqlMessage || message)
      }
   }
}

export default new UserDatabase()