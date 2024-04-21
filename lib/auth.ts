import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import UserModel from "@/lib/models/UserModel";
import bcrypt from 'bcryptjs'
import NextAuth from "next-auth";
import pool from "@/lib/dbhandler";

// @ts-ignore
export const config = {
    providers: [
        CredentialsProvider({
            credentials:{
                email:{
                    type: 'email',
                },
                password: {type: 'password'},
            },
            async authorize(credentials: any){
                // await dbConnect() // TODO
                if(credentials == null) return null

                console.log("Credential Email", credentials.email);
                // @ts-ignore
                const user = await UserModel.findOne({
                    where: {
                        email: credentials.email
                    },
                    raw: true
                });


                const temp = JSON.parse(JSON.stringify(user));
                console.log("Password", temp['password']);
                console.log("Credentials pass", credentials.password);


                if (user){
                    // const isMatch = await bcrypt.compare(
                    //     credentials.password as string,
                    //     temp.password
                    // )
                    const isMatch = credentials.password ==  temp['password'];
                    if (isMatch){
                        return temp;
                    }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: '/signin',
        newUser: '/register',
        error: '/signin',
    },
    callbacks: {
        authorized({request, auth}: any) {
            const protectedPaths = [
                /\/shipping/,
                /\/payment/,
                /\/place-order/,
                /\/profile/,
                /\/order\/(.*)/,
                /\/admin/,
            ]
            const { pathname } = request.nextUrl
            if (protectedPaths.some((p) => p.test(pathname))) return !!auth
            return true
        },
        async jwt({user, trigger, session, token}: any) {
            if (user) {
                token.user = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                }
            }
            if (trigger === 'update' && session) {
                token.user = {
                    ...token.user,
                    email: session.user.email,
                    name: session.user.name,
                }
            }
            return token
        },
        session: async ({session, token}: any) => {
            if(token) {
                session.user = token.user 
            }
            return session
        },
    },
}

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth(config)