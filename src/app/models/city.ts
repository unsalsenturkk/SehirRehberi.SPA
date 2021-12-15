import { Photo } from "./photo";

export class City {
    id: number | undefined
    name: string | undefined
    description: string | undefined
    userId: number | undefined
    photoUrl: string | undefined
    photos: Photo[] | undefined
}
