export async function searchShows(query) {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();
    return data.map(result => result.show);
}

export async function getShowDetails(id) {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await response.json();
    return data;
}