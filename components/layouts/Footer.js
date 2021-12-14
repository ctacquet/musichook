import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <div className="grid grid-cols-4 gap-4 justify-between items-center p-4">
            <div className="col-span-1" />
            <div className="col-span-2" />
            <div className="col-span-1 text-black dark:text-white text-opacity-25 dark:text-opacity-25 text-center">
                <p className="inline pr-3">@2021 MusicHook</p>
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
