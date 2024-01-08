//Get (read)
import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB(); // Connect to the database

    const prompt = await Prompt.findById(params.id).populate("creator").lean(); // for better performance
    if (!prompt) {
      new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), {
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

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    //updating the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(prompt), {
      status: 200,
      headers: { "Content-Type": "application/json" }, // Set content type
    });
  } catch (error) {
    return new Response("Failed to update the prompts", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

export const DELETE = async (resquest, { params }) => {
  try {
    await connectToDB();

    //Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response(" Prompt deleted successfully ", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
