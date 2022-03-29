import { useState } from "react";
import "./App.css";

function App() {
  const initializeValues = { userName: "", mailAddress: "", passWord: "" };

  const [formValues, setFormValues] = useState(initializeValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    // console.log(e.target.name);
    // setFormValues(e.target.value);
    const { name, value } = e.target;
    // []でプロパティにアクセス
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // バリデーションチェック
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    // どこがエラーか
    const errors = {};
    // メールアドレス式
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    // ユーザー名が存在しなかったら
    if (!values.userName) {
      errors.userName = "ユーザー名を入力してください。";
    }
    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください。";
      // test() メソッドは、正規表現と指定された文字列の一致を調べるための検索を実行します。 true または false を返します。
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください。";
    }
    if (!values.passWord) {
      errors.passWord = "パスワードを入力してください。";
    } else if (values.passWord.length < 4) {
      errors.passWord = "4文字以上を入力してください。";
    } else if (values.passWord.length > 15) {
      errors.passWord = "4文字以上15文字以下を入力してください。";
    }
    return errors;
  };
  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>ログインフォーム</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label htmlFor="">ユーザー名</label>
            {/* インライン(input) */}
            <input
              type="text"
              placeholder="ユーザー名"
              name="userName"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.userName}</p>
          <div className="formField">
            <label htmlFor="">メールアドレス</label>
            {/* インライン(input) */}
            <input
              type="text"
              placeholder="メールアドレス"
              name="mailAddress"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <p className="errorMsg">{formErrors.mailAddress}</p>
          <div className="formField">
            <label htmlFor="">パスワード</label>
            {/* インライン(input) */}
            <input
              type="text"
              placeholder="パスワード"
              // 入力欄コントロールの名前。名前/値の組の部分としてフォームと一緒に送信される
              name="passWord"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.passWord}</p>
          <button className="submitLogin">ログイン</button>
          {/* Object.keys() は、object で直接発見された列挙可能なプロパティに対応する文字列を要素とする配列を返します。 */}
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className="msgOk">ログインに成功しました。</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
