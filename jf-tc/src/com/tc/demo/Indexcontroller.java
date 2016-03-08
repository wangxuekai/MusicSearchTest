package com.tc.demo;

import com.jfinal.core.Controller;

/**
 * @author wangxuekai
 * @date 2016-03-04
 */
public class Indexcontroller extends Controller {
    public void index(){
        //renderText("这是tomcat 下的 index 页面");
        render("/index.jsp");
    }

    public void sayHello(){
        System.out.println("09090090");
        String userName = this.getPara("userName");
        String sayHello = "Hello " + userName + ", welcome to JFinal world.";
        this.setAttr("sayHello", sayHello);
        this.render("/page/hello.jsp");
    }
}
