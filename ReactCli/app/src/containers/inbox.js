import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Message from "./message";

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: Math.random() * 100
        };
    }

    shouldComponentUpdate() {
        console.log("parent shouldComponentUpdate");
        return true;        // 记得要返回true
    }

    propsChange() {
        console.info("更新父组件state");
        this.setState({
            num: Math.random() * 100
        });
    }

    setLifeCycleState() {
        console.info("更新子组件state");
        this.refs.rLifeCycle.setTheState();
    }

    forceLifeCycleUpdate() {
        console.info("强制更新子组件");
        this.refs.rLifeCycle.forceItUpdate();
    }

    parentForceUpdate() {
        console.info("强制更新父组件");
        this.forceUpdate();
    }

    render() {
        console.log("parent render")

        return (
            <div>
                <a href="javascript:void(0);" className="weui_btn weui_btn_primary" onClick={this.propsChange.bind(this)}>更新父组件state</a><br/>
                <a href="javascript:void(0);" className="weui_btn weui_btn_primary" onClick={this.setLifeCycleState.bind(this)}>更新子组件state</a><br/>
                <a href="javascript:void(0);" className="weui_btn weui_btn_primary" onClick={this.forceLifeCycleUpdate.bind(this)}>forceUpdate 子组件</a><br/>
                <a href="javascript:void(0);" className="weui_btn weui_btn_primary" onClick={this.parentForceUpdate.bind(this)}>forceUpdate 父组件</a>
                <Message ref="rLifeCycle" num={this.state.num}></Message>
            </div>
        );
    }
}

export default Inbox;