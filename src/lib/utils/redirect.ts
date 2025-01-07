export const imageWithBasePath = (url: string) =>
    process.env.NEXT_PUBLIC_ENV === 'local' ? `${process.env.NEXT_PUBLIC_BASE_PATH}${url}` : `${url}`;
