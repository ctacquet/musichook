import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <div className="grid grid-cols-4 gap-4 justify-between items-center">
            <div className="hidden lg:inline lg:col-span-1" />
            <div className="hidden lg:inline lg:col-span-2" />
            <div className="pointer-events-auto col-span-4 lg:col-span-1 text-black dark:text-white text-opacity-25 dark:text-opacity-25 text-center p-4">
                <p className="inline pr-3">© MusicHook - 2021</p>
                <Link href="https://www.linkedin.com/company/musichook">
                    <a target="_blank">
                        <FontAwesomeIcon
                        icon={faLinkedin}
                        className="h-6 text-blue-700 dark:text-blue-500 inline btn -translate-y-0.5"
                        />
                    </a>
                </Link>
            </div>
        </div>
    )
}
