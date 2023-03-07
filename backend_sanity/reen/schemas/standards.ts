import "./objects/standard"
export default {
    name:'workStyle',
    title:'Work Style',
    type:'document',
    fields:[
        {
            name:'standards',
            title:'Standards',
            type: 'array',
            of: [{ type: 'standard' }],
            description: "Add your photography standards"
        },

        {
            name:'styles',
            title:'Photography Styles',
            type: 'array',
            of: [{ type: "string" }],
            description: "Choose your favourite photography styles",
            options: {
                list: [
                    {title: "Nature Photography", value: "nature"},
                    {title: "Animal Photography", value: "animal"},
                    {title: "Macro Photography", value: "macro"},
                    { title: "Architecture Photography", value: "architecture" },
                    { title: "Portrait Photography", value: "portrait" },
                    { title: "Headshot Photography", value: "headshot" },
                    { title: "Fashion Photography", value: "fashion" },
                    { title:  "Documentary Photography", value: "documentary" },
                    
                    
                    
                    
                ]
            }
        },

       
    ]
}