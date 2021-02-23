import { apiInitializer } from "discourse/lib/api";
import RawHtml from "discourse/widgets/raw-html";

export default apiInitializer("0.8", (api) => {
  api.decorateWidget("post-contents:after-cooked", (dec) => {
    const attrs = dec.attrs;
    const signature =
      settings.signature_source === "custom user field"
        ? attrs.userCustomFields[
            `user_field_${settings.custom_user_field_number}`
          ]
        : settings.global_signature;

    if (signature && attrs.staff && attrs.user_id > 0) {
      return [
        dec.h("hr"),
        dec.h(
          "div",
          new RawHtml({
            html: `<div class='staff-signature'>${signature}</div>`,
          })
        ),
      ];
    }
  });
});
