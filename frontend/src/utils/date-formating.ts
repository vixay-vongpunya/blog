
export function formatDate(utcString: string){
    const date = new Date(utcString)
    return new Intl.DateTimeFormat('default',{
        // year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
}