
export const getFavoritePartners = (): object[] => {
    let data = localStorage.getItem('partners')
    data = JSON.parse(String(data))
    return Array.isArray(data) ? data : []
}