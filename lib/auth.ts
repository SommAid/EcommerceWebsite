import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import UserModel from "./models/UserModel";
import bcrypt from 'bcryptjs'
import NextAuth from "next-auth";
const client = require('./postgres');

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

                const user = await UserModel.findOne({email: credentials.email})
                console.log(user)

                if (user){
                    const isMatch = user['password'] == credentials.password;
                    if (isMatch){
                        return user
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
                    _id: user.customer_id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isadmin,
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