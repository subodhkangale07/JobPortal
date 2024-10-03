import { v2 as Cloudinary } from 'cloudinary';

// Function to upload image to Cloudinary
export const uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        // Set up the options for the upload
        const options = { folder }; // Mandatory folder parameter

        // Optional height parameter
        if (height) {
            options.height = height;
            options.crop = "scale"; // Ensures the image is scaled to the specified height
        }

        // Optional quality parameter
        if (quality) {
            options.quality = quality;
        }

        // Set resource_type to auto to handle all file types (e.g., images, videos)
        options.resource_type = "auto";

        // Upload the file to Cloudinary
        const response = await Cloudinary.uploader.upload(file.tempFilePath, options);

        // Return the response from Cloudinary
        return response;

    } catch (error) {
        // Handle any errors that occur during the upload
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Failed to upload image to Cloudinary.");
    }
};
