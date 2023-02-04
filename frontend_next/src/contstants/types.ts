//Define types of sanity data
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
    header: string,
    footer: string
}

type Bio = {
    about: string
}

type Data = {
    user: User,
    websiteImages: WebsiteImages,
    about: Bio
}

export type {
    User, WebsiteImages, Data, Bio
}

