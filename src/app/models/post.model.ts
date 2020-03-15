export interface Post {
    id?: string;
    title: string;
    body: string;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}
