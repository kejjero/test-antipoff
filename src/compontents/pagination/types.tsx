
export interface IPagination {
    onChange: (evt: number) => void
    totalPages: number
    forcePage: number
}