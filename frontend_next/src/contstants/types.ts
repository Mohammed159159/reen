//Define types of sanity data

//Types for user data and preferences
type User = {
    name: string;
    phone: string;
    email: string;
    profile: string;
    roles: string[];
    socials: Social[];
};

type Social = {
    platform: string;
    url: string;
};

type WebsiteImages = {
    header: string;
    contact: string;
};

type Bio = {
    about: string;
};

type WorkStyle =  {
    standards: Standard[];
    styles: string[];
}

type Standard = {
    title: string;
    description: string
}
type Data = {
    user: User;
    websiteImages: WebsiteImages;
    about: Bio;
    workStyle: WorkStyle
};


//Types for collecting contact messages
type FormData = {
    name: string;
    email: string;
    message: string;
};

type Contact = FormData & { _type: string };

export type { User, WebsiteImages, Data, Bio, FormData, Contact, WorkStyle };
