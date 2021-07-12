
export class Image {
    constructor(
        private id: string,
        private subtitle: string,
        private author: string,
        private date: Date,
        private file: string,
        private tags: string[],
        private collection: string,
        private user_image_id: string
    ) {};

    public getId(): string {
        return this.id;;
    }

    public getSubtitle(): string {
        return this.subtitle;
    };

    public getAuthor(): string {
        return this.author;
    };

    public getDate(): Date {
        return this.date;
    };

    getFile(): string {
        return this.file;
    };

    getTags(): string[] {
        return this.tags;
    };

    getCollection(): string {
        return this.collection;
    };

    getUserImageId(): string {
        return this.user_image_id;
    }
};


