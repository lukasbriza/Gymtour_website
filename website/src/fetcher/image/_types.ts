import { CustomErrorResponseObject } from "src/utils";

export type GetImage = { id?: string };
export type GetImageResponse = CustomErrorResponseObject<null>;

export type PostImages = {
    card?: File;
    main?: File;
    others?: File[]
}

type PostImageType = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    id: string;
    filename: string;
    matadata: string | null;
    bucketName: string;
    chunkSize: number;
    size: number;
    uploadDate: string;
    contentType: string;
}

export type PostImage = {
    card?: PostImageType[];
    main?: PostImageType[];
    others?: PostImageType[]
}
export type PostImagesResponse = CustomErrorResponseObject<PostImage>

export type RemoveImages = { ids: string[] }
export type RemoveImagesResponse = CustomErrorResponseObject<boolean>
