import React, {Component} from 'react';
import { connect } from 'react-redux' //追加
import { Field, reduxForm} from 'redux-form' //新規画面用
import { Link } from 'react-router-dom' //新規画面用
import { getEventAction, deleteEventAction, postEventAction, putEventAction } from '../actions' // 新規登録処理



class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmitFunc = this.onSubmitFunc.bind(this); //決まり文句。生成時にバインドする
    this.onDeleteClickFunc = this.onDeleteClickFunc.bind(this); //決まり文句。生成時にバインドする
  }

  componentDidMount() {
    // コンポーネント生成時、idが渡ってきていたらその値でサーバーを検索
    const {id} = this.props.match.params;
    if (id) {
      this.props.getEventAction(id);
    }
  }


  // JSX中のField要素のcomponent属性で指定された関数
  renderField(field) {
    // ES6の分割代入記法
    const { input, label, type, meta: {touched, error} } = field;
    console.log("@@EventsShow#renderField", input, label, type, touched, error);
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );

  }

  async onSubmitFunc(values) {
    console.log("** EventsShow#async onSubmitFunc() in");
    // この時点でpropsの中に入っている、関数が入った変数readEventsActionが実行。実体はactions/index.jsの中
    await this.props.putEventAction(values);
    console.log("** EventsShow#async onSubmitFunc() putEventActionが終わり");
    this.props.history.push("/"); //トップページの履歴を追加
  }

  async onDeleteClickFunc() {
    // matchがどこから出てくるのか不明。
    console.log("** EventsShow#onDeleteClickFunc() in", this.props.match);
    const { id } = this.props.match.params;
    await this.props.deleteEventAction(id);
    this.props.history.push("/"); //トップページの履歴を追加
  }

  render() {
    // render()内に来る時点で、propsの中に定義した値やActionが入っている。
    console.log("@@ EventsShow#render() in. this.props", this.props);
    // pristineは画面の未入力状態を判別できる
    // submittingはサブミットしている状態ならtrueになる。二重押し防止に使える。
    const {handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmitFunc)}>
          <div>
            <Field label="たいとる" name="title" type="text" component={this.renderField}  />
            <Field label="ぼでー" name="body" type="text" component={this.renderField}  />
          </div>

          <div>
            <input type="submit" value="送信するよ" disabled={pristine || submitting || invalid} />
            <Link to="/" >キャンセル</Link>
            &nbsp;
            <Link to="/" onClick={this.onDeleteClickFunc}>消すよ</Link>
          </div>

        </form>
      </React.Fragment>
    
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventVal = state.events[ownProps.match.params.id];
  return {initialValues: eventVal, eventVal};

};

//react-reduxのマニュアルにも書いてある省略記法パターン
const mapDispatchToProps = ({ postEventAction, deleteEventAction, getEventAction, putEventAction });
//const mapDispatchToProps = null;

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
// enableReinitializeは、mapStateToPropsで渡ってくるinitialValueが変わったらフォーム初期化。
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(
    {validate,
    form: 'eventShowForm',
    enableReinitialize: true}
    )(EventsShow)
)

// https://redux-form.com/8.3.0/docs/gettingstarted.md/
// reduxForm({ validate, form: 'eventNewForm'})(EventsNew)は以下と同じ。
// createReduxForm = reduxForm({ validate, form: 'eventNewForm'}) // 設定された関数を新規作成
// XxxForm = createReduxForm(EventsNew) //引数にコンポーネントをとって関数を実行

