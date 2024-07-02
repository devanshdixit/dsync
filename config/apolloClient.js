import * as Realm from "realm-web";
import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";

// Add your Realm App ID
const graphqlUri = `https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/${process.env.NEXT_PUBLIC_MONGO_APP_ID}/graphql`;
// Connect to your MongoDB Realm app
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_MONGO_APP_ID });

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
    console.log("token validating..");
    // Guarantee that there's a logged in user with a valid access token
    if (!app.currentUser) {

        console.log("no user while token validating..");
        // If no user is logged in, log in an anonymous user. The logged in user will have a valid
        // access token.
        await app.logIn(Realm.Credentials.anonymous());
    }
    return app.currentUser.accessToken;
}

// Configure the ApolloClient to connect to your app's GraphQL endpoint
const client = new ApolloClient({
    link: new HttpLink({
        uri: graphqlUri,
        // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
        // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
        // access token before sending the request.
        fetch: async (uri, options) => {
            const accessToken = await getValidAccessToken();
            options.headers.Authorization = `Bearer ${accessToken}`;
            return fetch(uri, options);
        },
    }),
    cache: new InMemoryCache(),
});
export function AppWithApollo({ children }) {
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
};
