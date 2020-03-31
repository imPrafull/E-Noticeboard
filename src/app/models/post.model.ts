export interface Post {
    _id?: string;
    title: string;
    body: string;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}
