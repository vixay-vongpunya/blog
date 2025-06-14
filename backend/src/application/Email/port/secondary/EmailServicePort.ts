

export interface EmailServicePort {
    sendPostSubscription(data: { email: string, authorName: string, title: string, preview: string, url: string, authorURL: string }): Promise<void>
}