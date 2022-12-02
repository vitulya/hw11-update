import axios from "axios";

export async function getImage(query,page,limit) {
    const response = await axios.get(`https://pixabay.com/api/?q=${query}&image_type=photo&orientation=horizontal&safesearch=true&key=31754694-dbfcbb04bb6ff6c5ba99a7a93&page=${page}&per_page=${limit}`)
    return response.data
}

// export function getImage(query,page,limit) {
//     return fetch(`https://pixabay.com/api/?q=${query}&image_type=photo&orientation=horizontal&safesearch=true&key=31754694-dbfcbb04bb6ff6c5ba99a7a93&page=${page}&per_page=${limit}`)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }


