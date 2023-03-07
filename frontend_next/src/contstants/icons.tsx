import { FaFacebook, FaFeatherAlt, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GiButterflyFlower, GiClothes, GiFilmProjector, GiHummingbird, GiWoodFrame } from "react-icons/gi"
import { BsBuilding } from "react-icons/bs"
import {IoIosPerson} from "react-icons/io"

//Define icons for user socials
const socialIcons: Record<string, JSX.Element> = {
    facebook: <FaFacebook />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
};

//Define icons for user styles
const styleIcons: Record<string, JSX.Element> = {
    nature: <GiButterflyFlower />,
    animal: <GiHummingbird />,
    macro: <FaFeatherAlt />,
    architecture: <BsBuilding />,
    portrait: <IoIosPerson />,
    headshot: <GiWoodFrame />,
    fashion: <GiClothes/>,
    documentary: <GiFilmProjector />,
};

export {socialIcons, styleIcons} 