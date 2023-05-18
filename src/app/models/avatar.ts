import { MetaLink } from "./metalink";


export interface Avatar {
    id?: string;
    name?: string;
    aka?: string;
    avatar?: string;
    bgAvatar?: string;
    bio?: string;
    links?: [MetaLink];
}