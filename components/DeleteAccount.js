import {
    CogIcon, XIcon,
    ExclamationIcon
} from "@heroicons/react/outline";

import toast from "react-hot-toast";
import classNames from "classnames";

function DeleteAccount(props) {



    const notify = () => {
        toast.custom(
            (t) => (
                <div className={classNames(["toastWrapper", t.visible ? "visible " : "hidden",])}>
                    <div className={classNames(["notificationWrapper", t.visible ? "top-0" : "top-96",])}>

                        <div className="flex h-60">
                            <ExclamationIcon className="text-red-700 h-12" />
                            <div className="closeIcon" onClick={() => toast.dismiss(t.id)}>
                                <XIcon className="btn h-4" />
                            </div>

                            <p className="font-bold">You are about to delete all your data.</p>
                        </div>


                        <div className="flex justify-end">
                            <div className="grid grid-cols-2 gap-1 items-center">
                                <button className="col-span-1 bg-red-700 text-white rounded-lg p-2">
                                    Cancel
                                </button>
                                <button className="col-span-1 bg-green-600 text-white rounded-lg p-2">
                                    Yes, I'm sure.
                                </button>
                            </div>
                        </div>



                    </div>
                </div>


            ),
            { id: "unique-notification", position: 'top-center' }
        );
    };





    return (
        <div className="pl-4">
            <CogIcon className="h-7 cursor-pointer" onClick={notify} />

        </div>
    );
}

export default DeleteAccount;