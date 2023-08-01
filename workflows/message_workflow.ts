import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { TypeHello } from "../functions/type_hello_function.ts";

export const TypeHelloWorkflow = DefineWorkflow({
  callback_id: "send_message_workflow",
  title: "HTTP Cat Bot",
  description: "Send a http cat to a channel",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
        description: "interactivity",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "channel",
      },
    },
    required: ["interactivity"],
  },
});

//the form that is displayed to the user when the bot is triggered
const inputForm = TypeHelloWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Choose a photo!",
  interactivity: TypeHelloWorkflow.inputs.interactivity,
  submit_label: "Submit",
  fields: {
    elements: [
      {
        name: "status_code_selection",
        title: "Choose a http cat!",
        type: Schema.types.string,
      },
      {
        name: "submitting_user",
        title: "submitting_user",
        type: Schema.slack.types.user_id,
      },
    ],
    required: ["status_code_selection"],
  },
});

//the 'TypeHello' function is called here
const runCustomFunction = TypeHelloWorkflow.addStep(
  TypeHello,
  //this is what we are passing into the function called above
  {
    channel: TypeHelloWorkflow.inputs.channel,
    recipient: inputForm.outputs.fields.submitting_user,
    message: inputForm.outputs.fields.status_code_selection,
  }
);

//this is the step that sends the message to the channel that the bot was called in
// TypeHelloWorkflow.addStep(
//     Schema.slack.functions.SendMessage,
//     {
// 			message: runCustomFunction.outputs.greeting,
// 			channel_id: TypeHelloWorkflow.inputs.channel,
//     }
// );

export default TypeHelloWorkflow;
