import PageForms from "./adoption/forms/page-forms";
import { Popup, PopupProps } from "@/components/PopUp";

function batata() {}

export default function Root() {
  return (
    <>
      <PageForms />

      {/* <Popup on_close={batata} title="potato" text="asfaso"></Popup> */}
      {/* <Modal inset={10} /> */}
    </>
  );
}
