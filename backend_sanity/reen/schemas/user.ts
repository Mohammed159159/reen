import "./objects/socials"

export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: "Add your name"
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
            description: "Add your phone number"

        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            description: "Add your email address"

        },
        {
            name: 'profile',
            title: 'Profile Picture',
            type: 'image',
            options: {
                hotspot: true
            },
            description: "Add your profile picture"

        },
        {
            name: 'roles',
            title: 'Roles',
            type: 'array',
            of: [{ type: 'string' }],
            description: "Add the jobs you can do (ex. photographer)"

        },
        {
            name: 'socials',
            title: 'Socials',
            type: 'array',
            of: [{ type: 'social' }],
            description: "Add your social media links",

        }

    ]
}