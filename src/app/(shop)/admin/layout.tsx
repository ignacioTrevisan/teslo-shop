import { auth } from "@/auth.config";

export default async function AdminLayout({ children }: {
    children: React.ReactNode
}) {
    const session = await auth();
    if (session?.user.role !== 'admin') {
        return <p>No tienes permisos para acceder a este sitio</p>
    }
    return (



        <div>

            {children}
        </div>


    );
};