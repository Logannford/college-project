import { Manifest } from "deno-slack-sdk/mod.ts";
//import { TypeHello } from "./functions/type_hello.ts";
import WorkFlow from "./workflows/message_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Internal GitHub Integration",
  description: "A bot to make our internal lives easier with GitHub.",
  icon: "assets/mr-xumble.png",
  workflows: [WorkFlow],
  //functions: [TypeHello],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
