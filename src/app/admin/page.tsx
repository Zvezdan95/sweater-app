import Link from "next/link";
import React from "react";




export default function AdminPage() {
    return (
        <div>
            <h1>Admin Dashboard</h1>

            <Link href="/">home</Link>
            {/* ... content specific to your admin page */}
        </div>
    );
}