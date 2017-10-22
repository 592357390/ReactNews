import * as React from "react/cjs/react.production.min";
import {Col, Row} from "antd";
import '../App.css'

export default class Footer extends React.Component {
    render() {
        return (
            <Row>
                <Col span={2}/>
                <Col span={20}>
                    <footer className="Footer">
                        <span>新闻在线</span>
                    </footer>
                </Col>
                <Col span={2}/>
            </Row>
        );
    }
}