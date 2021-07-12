import { CustomError } from "../errors/CustomError";
import { Music } from "../model/Music";
import BaseDataBase from "./BaseDatabase";
import BaseDatabase from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {

    protected tableName: string = "Music";

    private toModelMusic(dbModel?: any): Music | undefined {
        return (
            dbModel && 
            new Music (
                dbModel.id,
                dbModel.title,
                dbModel.author,
                dbModel.date,
                dbModel.file,
                dbModel.genre,
                dbModel.album,
                dbModel.user_music_id
            )
        );
    };

    public async createMusic(music: Music): Promise<void> {
        try {

            await BaseDatabase.connection.raw(`
                INSERT INTO ${this.tableName} (id, title, author, album, genre, file, date, user_music_id)
                VALUES (
                    '${music.getId()}',
                    '${music.getTitle()}',
                    '${music.getAuthor()}',
                    '${music.getAlbum()}',
                    '${music.getGenre()}',
                    '${music.getFile()}',
                    '${music.getDate()}',
                    '${music.getUserMusicId()}'
                )
            `)
            
        } catch (error) {
            const sqlMessage = (error as any).sqlMessage;
            const message = (error as Error).message;
            throw new Error(sqlMessage || message)
        }
    };

    public async getAllMusic(): Promise<Music[] | undefined> {
        try {
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${this.tableName}
            `);
            return result[0].map((res: any) => {
                return this.toModelMusic(res);
            });
        } catch (error) {
            const sqlMessage = (error as any).sqlMessage;
            const message = (error as Error).message;
            throw new Error(sqlMessage || message)
        }
    };

    public async getMusicById(id: string): Promise<Music | undefined> {
        try {
           const result = await BaseDatabase.connection.raw(`
              SELECT * from ${this.tableName} WHERE id = '${id}'
           `);
           return this.toModelMusic(result[0][0]);
        } catch (error) {
            const sqlMessage = (error as any).sqlMessage;
            const message = (error as Error).message;
           throw new Error(sqlMessage || message)
        }
     };

     public async getMusicByTitle(title: string): Promise<Music | undefined> {
        try {
           const result = await BaseDataBase.connection.raw(`
              SELECT * from ${this.tableName} WHERE title LIKE '%${title}%'
           `);
           console.log(title, result);
  
           return result[0].map((res: any) => ({
              title: res.title, 
              album: res.album
           }));
           
        } catch (error) {
           const message = (error as Error).message;
           const sqlMessage = (error as any).sqlMessage;
           throw new Error(sqlMessage || message)
        }
     };

     public async getMusicByAlbum(album: string): Promise<Music | undefined> {
        try {
           const result = await BaseDataBase.connection.raw(`
              SELECT * from ${this.tableName} WHERE album LIKE '%${album}%'
           `);
           console.log(album, result);
  
           return result[0].map((res: any) => ({
              album: res.album, 
              user_music_id: res.user_music_id
           }));
           
        } catch (error) {
           const message = (error as Error).message;
           const sqlMessage = (error as any).sqlMessage;
           throw new Error(sqlMessage || message)
        }
     };
};

export default new MusicDatabase()