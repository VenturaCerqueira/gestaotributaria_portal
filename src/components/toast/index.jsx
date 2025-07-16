import { toast } from "react-toastify";

export function notify(type, message) {
    toast[type](
        <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">
            {message}
        </p>,
        {
            position: 'top-center',
            hideProgressBar: false,
            theme: "colored",
        }
    );
}

