package com.jt.demo;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;

import java.util.List;

/**
 * @author wangxuekai
 * @date 2016-03-04
 */
public class Indexcontroller extends Controller {
    public void index(){
        this.render("index.html");
    }

    public void sayHello(){
        String sKey = this.getPara("sKey");
        try {
            this.setAttr("result",sKey);
            this.render("/page/test/hello.jsp");
        } catch (Exception e) {
            this.render("/page/comm/error.jsp");
        }
    }

    public void search(){
        TestGetUrl getUrl = new TestGetUrl();
        String sKey = this.getPara("sKey");
        String page = this.getPara("page");
        try {
            Page<SongInfo> songInfoList = getUrl.search(sKey);
            this.setAttr("songInfoList", songInfoList);
            this.render("/page/list.jsp");
        } catch (Exception e) {
            this.render("/page/comm/error.jsp");
        }
    }

    public void error(){
        this.render("/page/comm/mi_error.jsp");
    }
}
