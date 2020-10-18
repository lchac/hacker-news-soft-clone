function getStories(endpoint, quantity) {
    return fetch(endpoint)
        .then((res) => res.json())
        .then((storyIds) => {
            if (storyIds.message) {
                throw new Error(storyIds.message)
            }

            const topStoryIds = storyIds.slice(0, quantity)
            const items = topStoryIds.map((id) => getItem(id))
            return Promise.all(items)
        })
}

export function getUser(username) {
    return fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`)
        .then((res) => res.json())
}

export function getItem(id) {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => res.json())
}

export function getItems(ids) {
    ids = ids.slice(0, 30)
    const items = ids.map((id) => getItem(id))
    return Promise.all(items)
}

export function getTopStories(quantity) {
    const endpoint = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    return getStories(endpoint, quantity)
}

export function getNewStories(quantity) {
    const endpoint = 'https://hacker-news.firebaseio.com/v0/newstories.json'
    return getStories(endpoint, quantity)
}
