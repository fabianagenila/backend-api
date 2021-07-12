import BaseDatabase from "./BaseDatabase";
import { Image } from "../model/Image";
import BaseDataBase from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {
  protected tableName: string = "Image";

  private ToModelImage(dbModel?: any): Image | undefined {
    return (
      dbModel &&
      new Image(
        dbModel.id,
        dbModel.subtitle,
        dbModel.author,
        dbModel.date,
        dbModel.file,
        dbModel.tags,
        dbModel.collection,
        dbModel.user_image_id
      )
    );
  }

  public async createImage(image: Image): Promise<void> {
    try {
      await BaseDatabase.connection.raw(`
                INSERT INTO ${
                  this.tableName
                } (id, subtitle, author, date, file, tags, collection, user_image_id)
                VALUES (
                    '${image.getId()}',
                    '${image.getSubtitle()}',
                    '${image.getAuthor()}',
                    '${image.getDate()}',
                    '${image.getFile()}',
                    '${image.getTags()}',
                    '${image.getCollection()}',
                    '${image.getUserImageId()}'
                )
            `);
    } catch (error) {
      const sqlMessage = (error as any).sqlMessage;
      const message = (error as Error).message;
      throw new Error(sqlMessage || message)
    }
  };

  public async getAllImages(): Promise<Image[] | undefined> {
      try {

        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.tableName}
        `);
        return result[0].map((res: any) => {
            return this.ToModelImage(res);
        });
          
      } catch (error) {
        const sqlMessage = (error as any).sqlMessage;
        const message = (error as Error).message;
        throw new Error(sqlMessage || message)
      }
  };

  public async getImageById(id: string): Promise<Image | undefined> {
    try {
       const result = await BaseDatabase.connection.raw(`
          SELECT * from ${this.tableName} WHERE id = '${id}'
       `);
       return this.ToModelImage(result[0][0]);
    } catch (error) {
      const sqlMessage = (error as any).sqlMessage;
      const message = (error as Error).message;
       throw new Error(sqlMessage || message)
    }
 };

 public async getImageBySubtitle(subtitle: string): Promise<Image | undefined> {
  try {
     const result = await BaseDataBase.connection.raw(`
        SELECT * from ${this.tableName} WHERE subtitle LIKE '%${subtitle}%'
     `);
     console.log(subtitle, result);

     return result[0].map((res: any) => ({
        subtitle: res.subtitle, 
        collection: res.collection
     }));
     
  } catch (error) {
     const message = (error as Error).message;
     const sqlMessage = (error as any).sqlMessage;
     throw new Error(sqlMessage || message)
  }
};
}

export default new ImageDatabase();
