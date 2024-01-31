import GeneralPageCardAdmin from "../../../common/pages/GeneralPageCardAdmin";

export default function NewsMngt() {
  return (
    <div>
      <GeneralPageCardAdmin
        titlePage="list_news"
        pathRedirect="them-tin-tuc"
        typePage="NEWS"
        textBtnDelete="delete_news"
        textBtnEdit="edit_news"
        hiddenStar={true}
      />
    </div>
  );
}
