'use client'
import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'
import { signOut } from 'next-auth/react'

const AuthButton = ({ user }) => {
    return (
        <div> {user ? <div className='flex items-center gap-2'>
            <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-color border border-primary-color text-accent text-sm font-semibold hover:bg-base-700 transition-all"
            >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
            </Link>
            <button onClick={() => signOut()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-secondary text-accent text-sm font-semibold">Logout</button>
        </div> : <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-color border border-primary-color text-accent text-sm font-semibold hover:bg-base-700 transition-all"
        >
            <LayoutDashboard className="w-4 h-4" />
           Admin Login
        </Link>}</div>
    )
}

export default AuthButton