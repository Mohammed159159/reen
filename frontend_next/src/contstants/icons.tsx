import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

//Define icons to map user choices
const icons: Record<string, JSX.Element> = {
    facebook: <FaFacebook />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
};

export default icons