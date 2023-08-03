import { TypeHello } from "./definition.ts";
import { SlackFunction, Schema } from "deno-slack-sdk/mod.ts";
import { HTTP_CAT, OPPENHEIMER } from "./constants.ts";
import sendMessageBlocks from "./blocks.ts";

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

  const blocks = sendMessageBlocks(inputs);

  // Send a message to channel using a nicely formatted
  // message using block elements from Block Kit.
  // https://api.slack.com/block-kit

  const selectionResponse = await client.chat.postMessage({
    channel,
    blocks,
    text: "Select a gif to send to the channel!",
  });

  if (!selectionResponse.ok) 
    console.log(selectionResponse.error);

  return{
    completed: false
  }
}).addBlockActionsHandler(
  [OPPENHEIMER, HTTP_CAT],

  async ({ action, body, client }) => {

    console.log("Incoming action", action);

    const response = action.action_id === HTTP_CAT;

    const msgResponse = await client.chat.postMessage({
        channel: body.container.channel_id,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${response ? "Here is your http cat :cat:" : "You have become death :bomb:"} <@${body.user.id}>!`,
            },
          },
          {
            type: "image",
            image_url: response
              ? `https://http.cat/${body.function_data.inputs.message}`
              : "https://media.giphy.com/media/W253qp879vSwM/giphy.gif",
            alt_text: `status code ${body.function_data.inputs.message} cat!`,
          },
        ],
    });

    const msgUpdate = await client.chat.update({
      channel: body.container.channel_id,
      ts: body.container.selectionResponse.ts,
      blocks: sendMessageBlocks(body.function_data.inputs).concat([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "sent!"
          }
        }
      ])
    })
    
    await client.functions.completeSuccess({
      function_execution_id: body.function_execution_id,
      outputs: {}
    })
});
