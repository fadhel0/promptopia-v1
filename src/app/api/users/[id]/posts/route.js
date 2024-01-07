import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB(); // Connect to the database

    const prompts = await Prompt.find({ creator: params.id })
      .populate("creator")
      .lean(); // for better performance
    console.log(params.id);
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: { "Content-Type": "application/json" }, // Set content type
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response("Failed to fetch prompts", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    }); // Set content type for error response
  }
};
