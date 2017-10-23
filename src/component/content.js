import React from "react";
import {Row, Col, Modal, Carousel} from 'antd'
import src1 from '../images/carousel_1.jpg';
import src2 from '../images/carousel_2.jpg';
import src3 from '../images/carousel_3.jpg';
import src4 from '../images/carousel_4.jpg';
import {Menu, Icon, Tabs, message, Form, Input, Button} from 'antd';
import '../App.css';
import NewsBlock from "./text_block";

const TabPane = Tabs.TabPane;

export default class Content extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };

        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="Main-Content">
                        <div className="Main-left-content">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img style={{height: 200}} src={src1}/></div>
                                    <div><img style={{height: 200}} src={src2}/></div>
                                    <div><img style={{height: 200}} src={src3} alt="3"/></div>
                                    <div><img style={{height: 200}} src={src4} alt="4"/></div>
                                </Carousel>
                            </div>
                        </div>
                        <Tabs className="tabs_news">
                            <TabPane tab="头条新闻" key="1">
                                <NewsBlock count={22} type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <NewsBlock count={22} type="guoji" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}