import { Manifest } from "deno-slack-sdk/mod.ts";
import { PostIssueMessage } from "./functions/post_issue_message.ts";
import { TypeHello } from "./functions/type_hello.ts";
import SubmitIssueWorkflow from "./workflows/submit_issue.ts";
import Example from "./workflows/example.ts"

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Internal GitHub Integration",
  description: "A bot to make our internal lives easier with GitHub.",
  icon: "assets/mr-xumble.png",
  workflows: [SubmitIssueWorkflow, Example],
  functions: [PostIssueMessage, TypeHello],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
