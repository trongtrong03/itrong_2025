export const normId = (id: string | number | null | undefined) =>
    String(id ?? '').padStart(3, '0')
