import styles from "./Contact.module.scss";
import { AiFillMessage, AiFillPhone } from "react-icons/ai";
import { BaseSyntheticEvent, SyntheticEvent, useRef, useState } from "react";
import {
    FormData,
    Contact as newContact,
    User,
    WebsiteImages,
} from "@/contstants/types";
import { client, urlFor } from "@/api/client";
import text from "@/contstants/text";

export default function Contact({
    user,
    contactImage,
}: {
    user: User;
    contactImage: string;
}) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const { name, email, message } = formData;
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleInputChange = (e: BaseSyntheticEvent) => {
        const {
            name: inputName,
            value: inputValue,
        }: { name: string; value: string } = e.target;
        setFormData({ ...formData, [inputName]: inputValue });
    };

    const handleFormSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        setIsFormLoading(true);

        const contact: newContact = {
            _type: "contact",
            name: name,
            email: email,
            message: message,
        };

        client
            .create(contact)
            .then(() => {
                setIsFormLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={styles["app__contact"] + " app__flex app__wrap "}>
            <div className={styles["app__contact-left"]}>
                <div className={styles["app__contact-links"]}>
                    <div className={styles["phone"]}>
                        <AiFillPhone />
                        <a href="tel: ">{user.phone}</a>
                    </div>
                    <div className={styles["email"]}>
                        <AiFillMessage />
                        <a href="mailto:">{user.email}</a>
                    </div>
                </div>
                {!isFormSubmitted ? (
                    <form>
                        <input
                            type="text"
                            required={true}
                            value={name}
                            placeholder="Your Name"
                            name="name"
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            required={true}
                            value={email}
                            placeholder="Your Email"
                            name="email"
                            onChange={handleInputChange}
                        />
                        <textarea
                            required={true}
                            value={message}
                            placeholder="Your Message"
                            name="message"
                            onChange={handleInputChange}
                            rows={10}
                        />
                        <button
                            type="submit"
                            onClick={handleFormSubmit}
                            disabled={isFormLoading}
                        >
                            {isFormLoading ? "Sending" : "Submit"}
                        </button>
                    </form>
                ) : (
                    <h1 className="head-text">{text.responseThank}</h1>
                )}
            </div>
            <div className={styles["app__contact-right"] + " app__flex "}>
                <div className={styles["app__contact-image"]}>
                    <img src={urlFor(contactImage).url()} alt="Footer Image" />
                </div>
            </div>
        </div>
    );
}
