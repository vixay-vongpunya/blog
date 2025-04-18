export type Category = {
    type: string;
    number: number;
}

export const category: Category[] = [
    {
        type: "sports",
        number: 20
    },
    {
        type: "food",
        number: 300
    },
    {
        type: "sociology",
        number: 300
    },
    {
        type: "science",
        number: 300
    },
    {
        type: "games",
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
        key: "1",
        title: "java",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "Nov 29, 2015",
    },
    {
        key: "2",
        title: "python",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "Nov 29, 2015",
    },
    {
        key: "3",
        title: "typescript",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "Nov 29, 2015",
    },
    {
        key: "4",
        title: "My last summer beach party, where i found A single young lady and her lovely cats. My last summer beach party",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "Nov 29, 2015",
    },
    {
        key: "5",
        title: "An incident back in the 90s",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "Nov 29, 2015",
    },
    {
        key: "6",
        title: "The dream hotel with my family",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "Nov 29, 2015",
    },
    {
        key: "7",
        title: "A single young lady and her lovely cats",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "Nov 29, 2015",
    },
    {
        key: "8",
        title: "The application of AI in todays world that would shocks you and  The dream hotel with my family",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo vitae autem vero odio est cupiditate modi quisquam ut. Doloremque, ullam est. Illo saepe culpa veniam labore? Aperiam, deleniti explicabo.",
        author: "Mr. X",
        created: "Nov 29, 2015",
    },
    
    
]