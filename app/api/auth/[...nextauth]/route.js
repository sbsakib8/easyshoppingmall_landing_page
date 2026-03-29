import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
    name: 'Credentials',
    // credentials: {
    //   username: { label: "Username", type: "text", placeholder: "jsmith" },
    //   password: { label: "Password", type: "password" }
    // },
    async authorize(credentials) {
                const { email, password } = credentials;
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;
                if (!email || !password) {
                    return null;
                }
                try {
                    if (email !== adminEmail) {
                        return null;
                    }
                    if (password !== adminPassword) {
                        return null;
                    }

                    return {email};
                } catch (error) {
                    console.error("Error in NextAuth authorize:", error);
                    return null;
                }
            }
  })
   ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }