import InstagramIcon from "./svg/InstagramIcon";
import TelegramIcon from "./svg/TelegramIcon";
import TikTokIcon from "./svg/TikTokIcon";

function Footer() {
    return (
        <footer>
            <div className="flex flex-col py-10">
                <div className="h-0.25 xl:h-0.5 w-[80%] mx-auto bg-yellow-500 -mb-0"></div>
                <div className="flex flex-row gap-4 mx-auto pt-8">
                    <a
                        href="https://www.instagram.com/electronics_lnu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75 transition"
                    >
                        <InstagramIcon className="w-10 mx-1 my-2" />
                    </a>
                    <a
                        href="https://www.tiktok.com/@electronics_lnu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75 transition"
                    >
                        <TikTokIcon className="w-10 mx-1 my-2" />
                    </a>
                    <a
                        href="https://t.me/electronics_lnu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75 transition"
                    >
                        <TelegramIcon className="w-10 mx-1 my-2" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;