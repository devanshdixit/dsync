export const makeHasuraAdminRequest = async (query: any, options?: any) => {
    const requestOptions: any = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET
        },
        body: JSON.stringify({
            query: query,
            variables: options?.variables
        })
    };
    const raw = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API_URL || "", requestOptions);
    const res = await raw.json()
    return res
}