export class Music {
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: Date,
        private file: string,
        private genre: string[],
        private album: string,
        private user_music_id: string
    ){};

    public getId(): string {
        return this.id;
     }
    
    public getTitle(): string {
        return this.title;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getDate(): Date {
        return this.date;
    }

    public getFile(): string {
        return this.file;
    }

    public getGenre(): string[] {
        return this.genre;
    }

    public getAlbum(): string {
        return this.album;
    }

    public getUserMusicId(): string {
        return this.user_music_id;
    }
}