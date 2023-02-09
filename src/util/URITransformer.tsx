import { uriTransformer } from "react-markdown"

export function URITransformer(uri:string) {
    const url = uriTransformer(uri);
    if (url.startsWith("/")){
        return "/notes/" + url;
    }
    return url;
}