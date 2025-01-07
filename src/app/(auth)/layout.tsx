import { redirect } from 'next/navigation';
import { auth } from 'auth';

export default async function LoggedInLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!!session?.user?.id) {
        redirect('/profile');
    }

    return children;
}
