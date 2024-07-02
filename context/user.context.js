import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import * as Realm from "realm-web";
import { useAccount, useConnect } from "wagmi";
const {
    BSON: { ObjectId },
} = Realm;
import { notification } from 'antd';
import { async } from "@firebase/util";
import axios from "axios";
import { makeHasuraAdminRequest } from "../config/fetch-requests";
import { createUser, getUser, getUserByWalletId } from "../utils/queries";

// Creating a Realm App Instance
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_MONGO_APP_ID || "" });

// Creating a user context to manage and access all the user related functions
// across different components and pages.
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingWallet, setLoadingWallet] = useState(false);
    const [wallet, setWallet] = useState("");
    // Function to log in user into our App Service app using their email & password
    const emailPasswordLogin = async (email, password) => {
        const credentials = Realm.Credentials.emailPassword(email, password);
        const authenticatedUser = await app.logIn(credentials);
        const userId = authenticatedUser?.currentUser?.id;
        console.log("userID:", userId);
        await checkUser(userId);
        return authenticatedUser;
    };

    // Function to sign up user into our App Service app using their email & password
    const emailPasswordSignup = async (email, password, name) => {
        try {
            await app.emailPasswordAuth.registerUser(email, password);
            // Since we are automatically confirming our users, we are going to log in
            // the user using the same credentials once the signup is complete.
            const credentials = Realm.Credentials.emailPassword(email, password);
            const authenticatedUser = await app.logIn(credentials);
            console.log("create user");
            const user = {
                "uid": authenticatedUser.id,
                "name": name,
                "email": email,
                "provider": "email",
                "photoUrl": ""
            }
            await createUser(user);
            return authenticatedUser;
        } catch (error) {
            throw error;
        }
    };

    // Function to reset the password
    //  const resetPassword = async (email) => {
    //     try {
    //         await app.emailPasswordAuth.registerUser(email, password);
    //         // Since we are automatically confirming our users, we are going to log in
    //         // the user using the same credentials once the signup is complete.
    //         return emailPasswordLogin(email, password);
    //     } catch (error) {
    //         throw error;
    //     }
    // };
    const { connector: activeConnector, isConnected, address } = useAccount({
        async onConnect({ address, connector, isReconnected }) {
            setWallet(address);
            if (user) {
                if (address !== user.walletAddress) {
                    console.log("wallet address changed");
                    await checkUserWallet(address);
                }
            }
            if (!user && address) {
                await checkUserWallet(address);
            }
        },
        async onDisconnect() {
            console.log('Disconnected')
            logOutUser();
        },
    })
    // Function to fetch the user (if the user is already logged in) from local storage
    const fetchUser = async () => {
        if (!app?.currentUser) return false;
        if (loading) return false;
        console.log("connected wallet:", { isConnected, address });
        if (isConnected) {
            await checkUserWallet(address);
            return false;
        }
        try {
            setLoading(true);
            await app?.currentUser.refreshCustomData();
            const userId = app?.currentUser?.id;
            console.log("userID:", userId);
            await checkUser(userId);

            // Now, if we have a user, we are setting it to our user context
            // so that we can use it in our app across different components.
            //setUser(app.currentUser);
        } catch (error) {
            notification.error({ message: "Error in fetching!" })
        }
    }


    // async function createUser(data) {
    //     const mongo = app.currentUser.mongoClient("asyncNewUI");
    //     const collection = mongo.db("async-new-ui").collection("users");
    //     const res = await collection.insertOne(data);
    //     setUser(data);
    //     return res;
    // }
    async function checkUser(uid) {
        const mongo = app.currentUser.mongoClient("asyncNewUI");
        const collection = mongo.db("async-new-ui").collection("users");
        await collection.findOne({ "uid": uid }).then((user) => {
            console.log("user:", user);
            setLoading(false);
            if (!user) {
                return
            }
            setUser(user)
            return user;
        }).catch((er) => {
            console.log(er);
        });
    }

    async function createProject(data) {
        let response;
        const mongo = app.currentUser.mongoClient("asyncNewUI");
        const collection = mongo.db("async-new-ui").collection("project");
        await collection.findOne({ "name": data.name }).then((res) => {
            console.log("project find: ", res);
            if (res) {
                response = {
                    error: true,
                    message: "The project name already exist"
                }
            }
        }).catch((er) => {
            console.log("project find error:", er);
            response = {
                error: true,
                message: er
            };
        });
        if (response) {
            return response;
        }
        data.createdBy = user._id.toString();
        await collection.insertOne(data)
            .then((res) => {
                console.log("project created: ", res);
                response = {
                    error: false,
                    projectId: res.insertedId.toString(),
                    message: "Project Created!"
                };
            }).catch((er) => {
                console.log("project craete error:", er);
                response = {
                    error: true,
                    message: er
                };
            });
        return response;
    }
    const fetchTokens = async () => {
        let response;
        if (!app?.currentUser) {
            response = {
                error: true,
                message: "Task data Empty"
            }
            return response
        }
        const mongo = app.currentUser.mongoClient("asyncNewUI");
        const collection = mongo.db("async-new-ui").collection("tokens");
        await collection.find().then((res) => {
            console.log("tokens fetched: ", res);
            response = {
                error: false,
                message: "",
                data: res,
            };
            return response;
        })
            .catch((err) => {
                console.log("token fetching error:", err);
                response = {
                    error: true,
                    message: err
                };
            });
        return response;
    }


    async function updateTask(title, projectId, data) {
        let response;
        if (!data) {
            response = {
                error: true,
                message: "Task data Empty"
            }
            return response
        }
        console.log(`${window.location.origin}`);
        await axios.post(`${window.location.origin}/api/updatetask`, {
            title: title,
            projectId: projectId,
            data: data
        })
            .then((res) => {
                if (res) {
                    response = {
                        error: false,
                        message: "Task updated!"
                    }
                }
            })
            .catch((err) => {
                console.log("task find error:", err);
                response = {
                    error: true,
                    message: err
                };
            })
        // const mongo = app.currentUser.mongoClient("asyncNewUI");
        // const collection = mongo.db("async-new-ui").collection("task");
        // await collection.updateOne({ "title": title }, { $set: data }).then((res) => {
        //     console.log("task found: ", res);
        //     if (res) {
        //         response = {
        //             error: false,
        //             message: "Task updated!"
        //         }
        //     }
        // }).catch((er) => {
        //     console.log("task find error:", er);
        //     response = {
        //         error: true,
        //         message: er
        //     };
        // });
        return response;
    }
    async function deleteTask(taskTitle, projectId) {
        let response;
        if (!taskTitle || !projectId) {
            response = {
                error: true,
                message: "Task title Empty"
            }
            return response
        }
        const mongo = app.currentUser.mongoClient("asyncNewUI");
        const collection = mongo.db("async-new-ui").collection("task");
        await collection.deleteOne({ "title": taskTitle, "projectId": projectId }).then((res) => {
            console.log("task deleted: ", res);
            if (res) {
                response = {
                    error: false,
                    message: "Task deleted!"
                }
            }
        }).catch((er) => {
            console.log("task find error:", er);
            response = {
                error: true,
                message: er
            };
        });
        return response;
    }
    async function createTask(data) {
        let response;
        console.log(data);
        if (!data?.title) {
            response = {
                error: true,
                message: "Task data Empty"
            }
            return response
        }
        const mongo = app.currentUser.mongoClient("asyncNewUI");
        const collection = mongo.db("async-new-ui").collection("task");
        await collection.findOne({ "title": data.title, "createdBy": data.createdBy }).then((res) => {
            console.log("task found: ", res);
            if (res) {
                response = {
                    error: true,
                    message: "Task already exist"
                }
            }
        }).catch((er) => {
            console.log("task find error:", er);
            response = {
                error: true,
                message: er
            };
        });

        if (response) {
            return response;
        }
        data.createdBy = user._id.toString();
        console.log("final", data)
        await collection.insertOne(data)
            .then((res) => {
                console.log("task created: ", res);
                response = {
                    error: false,
                    taskId: res.insertedId.toString(),
                    message: "Task Created!"
                };
            }).catch((er) => {
                console.log("task create error:", er);
                response = {
                    error: true,
                    message: er
                };
            });
        return response;
    }

    // Function to logout user from our App Services app
    const logOutUser = async () => {
        try {
            await app?.currentUser?.logOut();
            // Setting the user to null once loggedOut.
            setUser(null);
            return true;
        } catch (error) {
            setUser(null);
            console.log(user);
        }
    }

    async function resetPassword(email, password) {
        const args = [];
        console.log("vals", email, password)
        await app.emailPasswordAuth.callResetPasswordFunction({ email, password }, args)
            .then((res) => {
                console.log(res);
                return res
            })
            .catch((error) => {
                return error;
            });
    }

    async function checkUserWallet(walletAddress) {
        try {
            if (loadingWallet) {
                return
            }
            setLoadingWallet(true);
            await makeHasuraAdminRequest(getUserByWalletId, {
                variables: { walletAddress: walletAddress }
            }).then(async (res) => {
                if (res?.data?.asyncnewui_users?.length === 0) {
                    await makeHasuraAdminRequest(createUser, {
                        variables: {
                            walletAddress: walletAddress,
                            provider: "wallet"
                        }
                    }).then((resp) => { return });
                }
                if (res?.data?.asyncnewui_users?.length !== 0) {
                    const userData = res?.data?.asyncnewui_users[0];
                    setUser(userData);
                    return;
                }
            });
        } catch (error) {
            console.log(error);
            notification.error({ message: "Error in fetching!" })
        } finally {
            setLoadingWallet(false);
        }
    }
    async function getValidAccessToken() {
        console.log("token validating..");
        // Guarantee that there's a logged in user with a valid access token
        if (!app.currentUser) {

            console.log("no user while token validating..");
            // If no user is logged in, log in an anonymous user. The logged in user will have a valid
            // access token.
            await app.logIn(Realm.Credentials.anonymous());
        } else {
            // An already logged in user's access token might be stale. Tokens must be refreshed after 
            // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
            await app.currentUser.refreshAccessToken();
        }

        return app.currentUser.accessToken;
    }

    return <UserContext.Provider value={{ fetchTokens, deleteTask, user, updateTask, getValidAccessToken, createTask, createProject, checkUserWallet, resetPassword, setUser, emailPasswordLogin, emailPasswordSignup, logOutUser }}>
        {children}
    </UserContext.Provider>;
}