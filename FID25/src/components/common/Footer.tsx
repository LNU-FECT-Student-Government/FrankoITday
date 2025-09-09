import InstagramIcon from "./svg/InstagramIcon";
import TelegramIcon from "./svg/TelegramIcon";
import TikTokIcon from "./svg/TikTokIcon";

function Footer() {
    return (
        <footer>
            <div className="flex flex-col">
                <div className="h-0.25 xl:h-0.5 w-[80%] mx-auto my-9 bg-yellow-500 -mb-0"></div>
                <div className="flex flex-row gap-2 mx-auto">
                    <InstagramIcon className="w-10 mx-1 my-2" />
                    <TikTokIcon className="w-10 mx-1 my-2" />
                    <TelegramIcon className="w-10 mx-1 my-2" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;