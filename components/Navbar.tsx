import Link from 'next/link';
import Image from 'next/image';
import ModeToggle from "@/components/ModeToggle";

export default function Navbar() {

    return (
        <nav className="border-b">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex gap-2 items-center">
                            <Image
                                src={"./logo.svg"}
                                height={40}
                                width={40}
                                alt="RecruiterFinder"
                                className="h-8 w-8"
                                priority={true}
                            />
                            <span className="text-xl font-bold">
                                {process.env.NEXT_PUBLIC_APP_NAME as string}
                            </span>
                        </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};