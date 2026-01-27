require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const OpenAI = require('openai');
const { glob } = require('glob');

// 1. Setup Clients
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Directory containing your pattern images
const PATTERNS_DIR = './patterns_to_process'; 

async function processImages() {
  // Find all jpg/png files
  const files = await glob(`${PATTERNS_DIR}/*.{jpg,jpeg,png}`);
  console.log(`Found ${files.length} images to process...`);

  for (const file of files) {
    const filename = path.basename(file);
    console.log(`\nProcessing: ${filename}...`);

    try {
      // A. Upload Image to Sanity first
      const imageBuffer = fs.readFileSync(file);
      const asset = await sanity.assets.upload('image', fs.createReadStream(file), {
        filename: filename,
      });
      console.log(` - Image uploaded to Sanity (ID: ${asset._id})`);

      // B. Analyze with GPT-4o (Vision)
      const base64Image = imageBuffer.toString('base64');
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this quilting stitch pattern. Return ONLY a valid JSON object (no markdown formatting) with these fields: title (creative name based on look), category (must be one of: 'modern', 'floral', 'whimsical', 'traditional'), density (must be one of: 'light', 'medium', 'heavy'), tags (array of 5 descriptive strings)." },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
            ],
          },
        ],
        max_tokens: 300,
      });

      // C. Parse AI Response
      const aiContent = completion.choices[0].message.content.replace(/```json|```/g, '').trim();
      const metadata = JSON.parse(aiContent);
      console.log(` - AI generated: ${metadata.title} (${metadata.category})`);

      // D. Create Document in Sanity
      await sanity.create({
        _type: 'pantograph',
        title: metadata.title,
        category: metadata.category.toLowerCase(), // Ensure match with schema options
        density: metadata.density.toLowerCase(),
        tags: metadata.tags,
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
      });
      console.log(` - ✅ Saved to Database!`);

      // Optional: Move file to a "done" folder so we don't re-process
      // fs.renameSync(file, `./processed/${filename}`);

    } catch (err) {
      console.error(` ❌ Error processing ${filename}:`, err.message);
    }
  }
}

processImages();