import GeneralPageCardAdmin from "../../../common/pages/GeneralPageCardAdmin";

export default function VideosMngt() {
  return (
    <div>
      <GeneralPageCardAdmin
        titlePage="list_video"
        pathRedirect="them-video"
        typePage="VIDEO"
        isVideo={true}
        textBtnDelete="delete_video"
        textBtnEdit="edit_video"
        hiddenStar={true}
      />
    </div>
  );
}
