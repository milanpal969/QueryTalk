const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Define the model to use
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the prompt with a prefix and suffix


// Function to generate the SQL query
const generate = async ({database,query,table}) => {
  try {
    const prefix = "I want you to write a sql query and nothing else. You should only display the sql query and nothing else. ";
const suffix = `use database = ${database} and table = ${table}`

    const prompt = prefix+`${query}`+suffix;
    // Make the request to generate content
    const result = await model.generateContent(prompt);

    // Extract the SQL query text from the response
    const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
        console.log("original text",text);
        const ntext = text.slice(6, -3);
        console.log("ntext",ntext);
        if(text[0]=='`')return ntext;
        else return text;
      console.log("Generated SQL Query:", text); // Display only the 'text' part
       // Call function to execute the query
    } else {
      console.log("Unable to extract text: Response structure may differ.");
    }
  } catch (error) {
    console.error("Error generating content:", error.message);
  }
};



// Run the generate function to start the process
module.exports = generate;