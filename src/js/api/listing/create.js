import { createPost } from "../../api/post/create";


export async function onCreatePost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const postData = {
        title: formData.get("title"),
        body: formData.get("body"),
        tags: formData.get("tags") ? formData.get("tags").split(',').map(tag => tag.trim()) : [],
        media: formData.get("media") || "",
    };

    console.log("Form data collected for the post:", postData);
    
    try {
        await createPost(postData);
        alert("Post created successfully!");
        window.location.href = "/";
    } catch (error) {
        console.error("Error creating post:", error);
        alert ("Failed to create post");
    } 
};


