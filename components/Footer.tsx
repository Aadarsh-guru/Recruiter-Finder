
const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="h-16 w-full flex items-center justify-center border-t" >
            <span className="p-4">
                <p className="text-xs font-semibold text-gray-500">© {currentYear} {process.env.NEXT_PUBLIC_APP_NAME as string} All rights reserved.</p>
            </span>
        </footer>
    );
};

export default Footer;