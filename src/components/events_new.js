import React, {Component} from 'react';
import { connect } from 'react-redux' //追加
import { Field, reduxForm} from 'redux-form' //新規画面用
import { Link } from 'react-router-dom' //新規画面用
import { postEventAction} from '../actions' // 新規登録処理



class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmitFunc = this.onSubmitFunc.bind(this); //決まり文句。生成時にバインドする
  }


  // JSX中のField要素のcomponent属性で指定された関数
  renderField(field) {
    // ES6の分割代入記法
    const { input, label, type, meta: {touched, error} } = field;
    console.log("@@EventsNew#renderField", input, label, type, touched, error);
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );

  }

  async onSubmitFunc(values) {
    console.log("** async onSubmitFunc() in");
    // この時点でpropsの中に入っている、関数が入った変数readEventsActionが実行。実体はactions/index.jsの中
    await this.props.postEventAction(values);
    console.log("** async onSubmitFunc() postEventActionが終わり");
    this.props.history.push("/"); //トップページの履歴を追加
  }

  render() {
    // render()内に来る時点で、propsの中に定義した値やActionが入っている。
    console.log("@@ EventsNew#render() in. this.props", this.props);

    const {handleSubmit } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmitFunc)}>
          <div>
            <Field label="たいとる" name="title" type="text" component={this.renderField}  />
            <Field label="ぼでー" name="body" type="text" component={this.renderField}  />
          </div>

          <div>
            <input type="submit" value="送信するよ" disabled={false} />
            <Link to="/" >キャンセル</Link>
          </div>

        </form>
      </React.Fragment>
    
    )
  }
}


//react-reduxのマニュアルにも書いてある省略記法パターン
const mapDispatchToProps = ({ postEventAction });

//バリデーションのルールがここに入る。
const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "タイトルいれてちょ";
  }
  if (!values.body) {
    errors.title = "ボディいれてちょ";
  }
  return errors;
};
// react-reduxで必要な処理。connect関数を使って紐付ける。
// このコンポーネントをreduxFormで包むのをdecorateという。{}の中はreduxFormのオプション。
export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm'})(EventsNew)
)

// https://redux-form.com/8.3.0/docs/gettingstarted.md/
// reduxForm({ validate, form: 'eventNewForm'})(EventsNew)は以下と同じ。
// createReduxForm = reduxForm({ validate, form: 'eventNewForm'}) // 設定された関数を新規作成
// XxxForm = createReduxForm(EventsNew) //引数にコンポーネントをとって関数を実行

