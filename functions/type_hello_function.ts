import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
//import MessageWorkFlow from "../workflows/message_workflow.ts";

export const TypeHello = DefineFunction({
  callback_id: "type_hello_function",
  title: "Type Hello",
  description: "Type Hello",
  source_file: "functions/type_hello_function.ts",
  //these parameters are entered in the workflow step that calls the function
  input_parameters: {
    properties: {
      recipient: {
        type: Schema.slack.types.user_id,
        description: "recipient",
      },
      message: {
        type: Schema.types.string,
        description: "message",
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["message", "recipient"],
  },
  //this is what we output to the next step in the workflow
});

export default SlackFunction(TypeHello, async ({ inputs, client }) => {
  const { recipient, message, channel } = inputs;

  //we need the channel, so if we do not have it throw an errors
  if (!channel) {
    return {
      outputs: {
        recipient,
        message,
        channel,
      },
    };
  }

  await client.chat.postMessage({
    channel,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<@${recipient}> - here is your http cat! (${message})`,
        },
      },
      {
        type: "image",
        image_url: `https://http.cat/${message}`,
        alt_text: `status code ${message} cat!`,
      },
    ],
  });

  // Send a message to channel using a nicely formatted
  // message using block elements from Block Kit.
  // https://api.slack.com/block-kit
  //await client.chat.postMessage({
  //   channel,
  //   blocks: [
  //     {
  //       type: "section",
  //       text: {
  //         type: "mrkdwn",
  //         text: `<@${recipient}> says ${message} :wave:`,
  //       },
  //     },
  //     {
  //       type: "image",
  //       image_url: "https://media.giphy.com/media/pHngFeGqY7Ea9k1cXG/giphy.gif",
  //       alt_text: "Image of the day!",
  //     },
  //   ],
  // });

  return {
    outputs: {
      recipient,
      message,
      channel,
    },
  };
});
