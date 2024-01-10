import { client } from "./client"

export async function getTitle() {
    const query = `*[_type == "home"][0]{
        title
    }`
    const result = await client.fetch(query)
    return result.title
}