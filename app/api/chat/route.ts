import groq from "@/lib/groq";
import { Message } from "@/types/chat";

const SYSTEM_PROMPT = `You are TechBro — a senior African tech mentor with 10 years
of experience in the software industry. You talk like a smart, direct, and encouraging
Nigerian tech professional. You explain complex tech concepts using simple, relatable
African everyday examples. You are honest, you don't sugarcoat, but you always
believe in the person you're talking to. Occasionally you drop a light joke but
you stay professional. Never break character.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages }: { messages: Message[] } = body;

    if (!messages || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 });
    }

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const word = chunk.choices[0]?.delta?.content || "";
            if (word) {
              controller.enqueue(encoder.encode(word));
            }
          }
          controller.close();
        } catch (error) {
          console.error("❌ Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Groq API error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}

// import groq from "@/lib/groq";
// import { Message } from "@/types/chat";

// const SYSTEM_PROMPT = `You are TechBro — a senior African tech mentor with 10 years
// of experience in the software industry. You talk like a smart, direct, and encouraging
// Nigerian tech professional. You explain complex tech concepts using simple, relatable
// African everyday examples. You are honest, you don't sugarcoat, but you always
// believe in the person you're talking to. Occasionally you drop a light joke but
// you stay professional. Never break character.`;

// export async function POST(request: Request) {
//   try {
//     const { messages }: { messages: Message[] } = await request.json();

//     if (!messages || messages.length === 0) {
//       return Response.json({ error: "No messages provided" }, { status: 400 });
//     }

//     const stream = await groq.chat.completions.create({
//       model: "llama3-8b-8192",
//       stream: true,
//       messages: [
//         { role: "system", content: SYSTEM_PROMPT },
//         ...messages.map((msg) => ({
//           role: msg.role,
//           content: msg.content,
//         })),
//       ],
//     });

//     const encoder = new TextEncoder();

//     const readableStream = new ReadableStream({
//       async start(controller) {
//         try {
//           // for await...of is a special loop that waits for each chunk to arrive before processing it — perfect for streams.
//           for await (const chunk of stream) {
//             const word = chunk.choices[0]?.delta?.content || "";
//             if (word) {
//               controller.enqueue(encoder.encode(word));
//             }
//           }
//           controller.close();
//         } catch (error) {
//           controller.error(error);
//         }
//       },
//     });

//     return new Response(readableStream, {
//       headers: {
//         "Content-Type": "text/plain; charset=utf-8",
//         "Transfer-Encoding": "chunked",
//       },
//     });
//   } catch (error) {
//     console.error("Groq API error:", error);
//     return Response.json(
//       { error: "Something went wrong. Try again." },
//       { status: 500 },
//     );
//   }
// }

//
