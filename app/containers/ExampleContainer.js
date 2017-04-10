class ExampleContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions } = this.props;
        console.log("Props", this.props, state, actions); // everything ok here

        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
                    <Scene key="echo" clone component={EchoView} />
                    <Scene key="register" component={Register} title="Register"/>
                    <Scene key="home" component={Home} title="Replace" type="replace"/>
                    <Scene key="launch" component={Launch} title="Launch" initial={true} state={state} {...actions} />
                    .... lots of other scenes ...
                    </Scene>
                </Scene>
                <Scene key="error" component={Error}/>
            </Scene>
        </Router>;
    }
}


export default connect(state => ({
   state: state.counter
 }),
 (dispatch) => ({
   actions: bindActionCreators(actions, dispatch)
 })
)(ExampleContainer);