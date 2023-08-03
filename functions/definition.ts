import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";


export const TypeHello = DefineFunction({
  callback_id: "HY_slack_bot",
  title: "HY Slack Bot Function",
  description: "Slack bot",
  source_file: `functions/mod.ts`,
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
