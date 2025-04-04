export const category = [
    {
        type: "sports",
        number: 20
    },
    {
        type: "food",
        number: 300
    },

]

const blogItem = {
    Key: "key",
    Title: "title",
    Content: "content",
    Author: "author",
    Created: "created",
} as const

type blogItem = (typeof blogItem)[keyof typeof blogItem]

export type blogValues = {
    [blogItem.Key] : string,
    [blogItem.Title] : string,
    [blogItem.Content] : string,
    [blogItem.Author] : string,
    [blogItem.Created] : string,
    
}

export const blogs: blogValues[] = [
    {
        key: "java",
        title: "java",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "1/27/2025",
    },
    {
        key: "python",
        title: "python",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "1/27/2025",
    },
    {
        key: "typescript",
        title: "typescript",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "1/27/2025",
    },
    {
        key: "My last summer beach party",
        title: "My last summer beach party",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "1/27/2025",
    },
    {
        key: "An incident back in the 90s",
        title: "An incident back in the 90s",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "1/27/2025",
    },
    {
        key: "The dream hotel with my family",
        title: "The dream hotel with my family",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "1/27/2025",
    },
    {
        key: "A single young lady and her lovely cats",
        title: "A single young lady and her lovely cats",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "1/27/2025",
    },
    {
        key: "The application of AI in todays world that would shocks you",
        title: "The application of AI in todays world that would shocks you",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "1/27/2025",
    }
]